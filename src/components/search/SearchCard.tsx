import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cities, searchTagList } from "../../models/common";
import HeightSlider from "../../components/HeightSlider";
import { useMutation } from "@tanstack/react-query";
import { searchMountains } from "../../apis/searchApi";
import { MountainSearchParams } from "../../interface/mountainInterface";
import useComponentStore from "../../stores/useComponentStore";
import useSearchStore from "../../stores/useSearchStore";
import _ from "lodash";

const SearchCard = () => {
  const componentStore = useComponentStore();
  const searchStore = useSearchStore();

  // searchStore.searchParams가 null이 아니면 그 값을 초기값으로 사용
  const [mountainName, setMountainName] = useState<string>(
    searchStore.searchParams?.mountain_name || ""
  );
  const [selectedCities, setSelectedCities] = useState<string[]>(
    searchStore.searchParams?.cities || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    searchStore.searchParams?.tags || []
  );
  const [heightFilter, setHeightFilter] = useState<[number, number]>(
    searchStore.searchParams?.heightRange
      ? [
          searchStore.searchParams.heightRange.min,
          searchStore.searchParams.heightRange.max,
        ]
      : [0, 2000]
  );

  console.log("searchStore.searchParams", !_.isNull(searchStore.searchParams));

  // 필터 리셋 상태 (슬라이더 리셋에 사용)
  const [isFilterReset, setIsFilterReset] = useState<boolean>(false);
  // 검색 결과 상태
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // searchStore.searchParams가 변경되면 state 업데이트
  useEffect(() => {
    if (searchStore.searchParams) {
      setMountainName(searchStore.searchParams.mountain_name || "");
      setSelectedCities(searchStore.searchParams.cities || []);
      setSelectedTags(searchStore.searchParams.tags || []);
      if (searchStore.searchParams.heightRange) {
        setHeightFilter([
          searchStore.searchParams.heightRange.min,
          searchStore.searchParams.heightRange.max,
        ]);
      }
    }
  }, [searchStore.searchParams]);

  // 산 이름 input 변경 핸들러
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMountainName(e.target.value);
  };

  // 도시 버튼 클릭 핸들러
  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  // 태그 버튼 클릭 핸들러
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // React Query의 useMutation 사용: 검색 조건을 바탕으로 searchMountains 호출
  const searchMutation = useMutation({
    mutationFn: searchMountains,
    onSuccess: (data) => {
      console.log("검색 결과:", data);
      setSearchResults(data.results);
      searchStore.setSearchMountainList(data.results);
      searchStore.setPagination(data.pagination);
      if (_.isNull(searchStore.searchParams)) {
        componentStore.setOpenFullModal("searchResult");
      } else {
        searchStore.setCloseSearchCard();
      }
    },
    onError: (error: any) => {
      searchStore.setSearchParams(null);
      console.error("산 검색 중 오류 발생:", error);
    },
  });

  // 탐색 버튼 클릭 핸들러
  const handleSearch = () => {
    const searchParams: MountainSearchParams = {
      mountain_name: mountainName ? mountainName : undefined,
      cities: selectedCities.length > 0 ? selectedCities : undefined,
      heightRange: { min: heightFilter[0], max: heightFilter[1] },
      tags: selectedTags.length > 0 ? selectedTags : undefined,
      page: 1,
      sortField: "mountain_name",
      sortOrder: "asc",
    };

    searchStore.setSearchParams(searchParams);
    searchMutation.mutate(searchParams);
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-t-[20px] rounded-b-[24px] shadow-xl relative overflow-hidden">
      {/* 산 이름 검색 영역 */}
      <div className="absolute top-0 left-0 right-0 px-4 py-2 border-[2px] border-main-green-200 rounded-[24px] flex items-center bg-white focus:outline-none focus:ring-2 focus:ring-green-300 shadow-[0_4px_4px_rgba(0,0,0,0.1)]">
        <Search size={22} />
        <input
          type="text"
          placeholder="산 이름"
          value={mountainName}
          onChange={handleNameChange}
          className="w-full ml-2 text-[14px] font-extralight focus:outline-none"
        />
      </div>
      <div className="p-6 pt-[80px] shadow-[0_4px_4px_rgba(0,0,0,0.2)]">
        {/* 도시 태그 */}
        <div>
          <div className="text-sm text-main-gray-400 mb-2">도시</div>
          <div className="flex flex-wrap gap-2">
            {cities.map((item: string, i: number) => (
              <button
                key={i}
                onClick={() => toggleCity(item)}
                className={`h-[30px] px-3 py-1 border border-main-gray-200 text-[12px] rounded-full transition ${
                  selectedCities.includes(item)
                    ? "bg-main-green-200 text-white"
                    : "text-main-gray-300 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        {/* 높이 슬라이더 */}
        <div className="mt-8">
          <HeightSlider
            heightFilter={heightFilter}
            setHeightFilter={setHeightFilter}
            isFilterReset={isFilterReset}
          />
        </div>
        {/* 태그 */}
        <div className="mt-8">
          <div className="text-sm text-gray-600 mb-2">태그</div>
          <div className="flex flex-wrap gap-2">
            {searchTagList.map((item: any, i: number) => (
              <button
                key={i}
                onClick={() => toggleTag(item.title)}
                className={`h-[30px] px-3 py-1 border border-main-gray-200 text-[12px] rounded-full transition ${
                  selectedTags.includes(item.title)
                    ? "bg-main-green-200 text-white"
                    : "text-main-gray-300 hover:bg-gray-200"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
        {/* 탐색 버튼 */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSearch}
            className="w-[165px] h-[44px] py-2 bg-main-green-200 text-white rounded-[24px] text-[16px] font-[200] hover:bg-main-green-300 transition shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
          >
            {searchMutation.isLoading ? "로딩중..." : "탐색"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
