import {
  collection,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getDocs,
  QueryDocumentSnapshot,
  getCountFromServer,
  QueryConstraint,
} from "firebase/firestore";
import { mountains_db } from "../utils/firebaseConfig";
import { MountainSearchParams, Mountain } from "../interface/mountainInterface";

/**
 * 산 검색 기능 (도시 조건이 여러 개인 경우, 각 도시별 쿼리를 실행하고 결과를 병합)
 * @param params 검색 조건 (MountainSearchParams)
 * @param lastVisibleDoc 페이지네이션을 위한 마지막 문서 (optional) – 도시 조건이 있을 때는 cursor 방식이 복잡할 수 있음.
 * @returns 조건에 맞는 산 결과(Mountain[])와 마지막 문서(있는 경우) 및 페이지네이션 정보(pageNumber, pageSize, totalElements, totalPages)를 포함하는 객체
 */
export async function searchMountains(
  params: MountainSearchParams,
  lastVisibleDoc?: QueryDocumentSnapshot<Mountain>
): Promise<{
  results: Mountain[];
  lastVisibleDoc?: QueryDocumentSnapshot<Mountain>;
  pagination: {
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
  };
}> {
  // 기본값 지정 (page가 없으면 1, perPage 기본은 50로 설정)
  const {
    mountain_name,
    cities,
    heightRange,
    tags,
    perPage = 50,
    page = 1,
    sortField = "mountain_name",
    sortOrder = "asc",
  } = params;

  const mountainsRef = collection(mountains_db, "mountains");

  // 공통 조건: 산 이름, 높이, 태그 조건 (도시 조건은 따로 처리)
  const baseConstraints: QueryConstraint[] = [];

  if (mountain_name && mountain_name.trim() !== "") {
    baseConstraints.push(where("mountain_name", ">=", mountain_name));
    baseConstraints.push(where("mountain_name", "<", mountain_name + "\uf8ff"));
  }

  if (heightRange) {
    baseConstraints.push(where("height", ">=", heightRange.min));
    baseConstraints.push(where("height", "<=", heightRange.max));
  }

  if (tags && tags.length > 0) {
    tags.forEach((tag) => {
      baseConstraints.push(where("tags", "array-contains", tag));
    });
  }

  // 만약 cities 조건이 제공되면, 각 도시에 대해 별도의 쿼리를 실행하여 결과를 병합
  if (cities && cities.length > 0) {
    // 도시별 결과 및 전체 count를 가져오기 위해
    // - 각 도시별 쿼리(조건은 baseConstraints + city-specific constraints)를 생성
    // - 결과 쿼리: limit(perPage) 적용 (현재 페이지의 데이터)
    // - count 쿼리: 동일 조건에서 limit 없이 전체 문서 수를 가져옴
    const resultSnapshotsPromises = cities.map((cityStr) => {
      const city = cityStr.trim();
      const cityConstraints: QueryConstraint[] = [
        where("address", ">=", city),
        where("address", "<", city + "\uf8ff"),
      ];
      // 불평등 조건이 address에 적용되었으므로, orderBy는 address로 먼저 정렬
      const orderConstraint: QueryConstraint = orderBy("address", sortOrder);
      const resultQuery = query(
        mountainsRef,
        ...baseConstraints,
        ...cityConstraints,
        orderConstraint,
        limit(perPage)
      );
      return getDocs(resultQuery);
    });

    const countSnapshotsPromises = cities.map((cityStr) => {
      const city = cityStr.trim();
      const cityConstraints: QueryConstraint[] = [
        where("address", ">=", city),
        where("address", "<", city + "\uf8ff"),
      ];
      const orderConstraint: QueryConstraint = orderBy("address", sortOrder);
      // count 쿼리는 limit 없이 실행 (cursor 조건 생략)
      const countQuery = query(
        mountainsRef,
        ...baseConstraints,
        ...cityConstraints,
        orderConstraint
      );
      return getCountFromServer(countQuery);
    });

    // 도시별 결과 실행
    const resultSnapshots = await Promise.all(resultSnapshotsPromises);
    const countSnapshots = await Promise.all(countSnapshotsPromises);

    // 병합된 결과 (중복 제거: doc.id 기준)
    const resultsMap = new Map<string, Mountain>();
    resultSnapshots.forEach((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const mountain = { id: doc.id, ...doc.data() } as Mountain;
        resultsMap.set(doc.id, mountain);
      });
    });
    const results = Array.from(resultsMap.values());

    // 전체 count는 각 도시 쿼리의 count 합산
    let totalElements = 0;
    countSnapshots.forEach((countSnap) => {
      totalElements += countSnap.data().count;
    });
    const totalPages = perPage > 0 ? Math.ceil(totalElements / perPage) : 0;

    return {
      results,
      pagination: {
        pageNumber: page,
        pageSize: perPage,
        totalElements,
        totalPages,
      },
    };
  } else {
    // 도시 조건이 없는 경우: 기존 쿼리 방식 사용
    let constraints: QueryConstraint[] = [...baseConstraints];
    constraints.push(orderBy(sortField, sortOrder));
    constraints.push(limit(perPage));
    if (lastVisibleDoc) {
      constraints.push(startAfter(lastVisibleDoc));
    }
    const q = query(mountainsRef, ...constraints);
    const snapshot = await getDocs(q);
    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Mountain[];

    const countSnapshot = await getCountFromServer(q);
    const totalElements = countSnapshot.data().count;
    const totalPages = perPage > 0 ? Math.ceil(totalElements / perPage) : 0;
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
    return {
      results,
      lastVisibleDoc: newLastDoc,
      pagination: {
        pageNumber: page,
        pageSize: perPage,
        totalElements,
        totalPages,
      },
    };
  }
}
