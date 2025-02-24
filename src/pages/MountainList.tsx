import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mountains } from "../data/mountains";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import _ from "lodash";
import kor_bac from "../assets/kor_bac.json";

function MountainList() {
  /**  */
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {}, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          돌아가기
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          100대 명산 목록
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kor_bac.map((mountain) => (
            <div
              key={mountain.id}
              onClick={() => navigate(`/map/${mountain.name}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`/src/assets/bac_img/${mountain.name}.jpeg`}
                  alt={mountain.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {mountain.name}
                </h2>
                <p className="text-gray-600 mt-2">{mountain.height}m</p>
                <p className="text-gray-500 text-sm mt-1">{mountain.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MountainList;
