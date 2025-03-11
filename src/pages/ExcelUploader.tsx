import { useState } from "react";
import { db } from "../utils/firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import * as XLSX from "xlsx";

const ExcelUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      await readExcel(uploadedFile);
    }
  };

  const readExcel = async (file: File) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onload = async (e) => {
      if (!e.target?.result) return;
      const bufferArray = e.target.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const data = XLSX.utils.sheet_to_json(ws);

      // Firestore에 데이터 저장
      const mountainsCollection = collection(db, "mountains");
      for (const item of data as any[]) {
        const id = item["id"] || `mountain-${Date.now()}`; // ID가 있으면 사용, 없으면 자동 생성
        await setDoc(doc(mountainsCollection, id.toString()), item);
      }
      alert("Firestore에 업로드 완료!");
    };
  };

  return (
    <div>
      <h2>엑셀 업로드</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );
};

export default ExcelUploader;
