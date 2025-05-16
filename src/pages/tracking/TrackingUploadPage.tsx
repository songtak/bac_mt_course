import React, { useState, useRef, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Search, ChevronLeft, X, Plus } from "lucide-react";
import RatingSlider from "../../components/RatingSlider";
import { cities, searchTagList } from "../../models/common";

const DEFAULT_TAGS = [
  "트레일러닝",
  "단풍",
  "봄꽃",
  "계곡",
  "능선",
  "암릉",
  "초보추천",
];
const COURSE_TYPES = ["편도", "왕복", "순환형"];

const TrackingUploadPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [gpxFile, setGpxFile] = useState<File | null>(null);
  const [inputCourseName, setInputCourseName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [selectedCapitals, setSelectedCapitals] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [selectedCourseType, setSelectedCourseType] = useState<string>("");

  // Debounced course name update
  const debouncedSetCourseName = useCallback(
    debounce((value: string) => {
      setCourseName(value);
    }, 500),
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedSetCourseName.cancel();
    };
  }, []);

  // Course name input handler
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputCourseName(value); // Immediate input value update
    debouncedSetCourseName(value); // Debounced value update
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGpxFile(e.target.files[0]);
    }
  };

  const handleCapitalToggle = (capital: string) => {
    setSelectedCapitals((prev) => {
      if (prev.includes(capital)) {
        return prev.filter((c) => c !== capital);
      }
      if (prev.length >= 3) {
        alert("지역은 최대 3개까지 선택 가능합니다.");
        return prev;
      }
      return [...prev, capital];
    });
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      }
      if (prev.length >= 5) {
        alert("태그는 최대 5개까지 선택 가능합니다.");
        return prev;
      }
      return [...prev, tag];
    });
  };

  const addCustomTag = () => {
    if (newTag && !customTags.includes(newTag)) {
      if (selectedTags.length >= 5) {
        alert("태그는 최대 5개까지 선택 가능합니다.");
        return;
      }
      setCustomTags((prev) => [...prev, newTag]);
      setSelectedTags((prev) => [...prev, newTag]);
      setNewTag("");
    }
  };

  const handleClickGpxUpload = async () => {};

  const isFormValid =
    inputCourseName.trim().length > 0 &&
    selectedCapitals.length > 0 &&
    selectedCapitals.length <= 3 &&
    selectedCourseType &&
    rating > 0 &&
    difficulty > 0 &&
    selectedTags.length > 0 &&
    selectedTags.length <= 5 &&
    gpxFile;

  /** ============================================================================== */

  return (
    <div>
      <Header
        disableSearch={true}
        left={<ChevronLeft onClick={() => navigate(-1)} />}
      />
      <div
        className="p-8 pt-[120px] pb-[100px] overflow-y-auto"
        style={{ height: "calc(100vh)" }}
      >
        <div className="text-[24px] font-light mb-8">GPX 업로드</div>

        {/* Course Name Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="코스명을 입력하세요"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={inputCourseName}
            onChange={handleNameChange}
          />
        </div>

        {/* GPX File Upload */}
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            accept=".gpx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full p-3 border border-dashed border-gray-300 rounded-lg text-gray-500 min-h-[48px] whitespace-pre-wrap break-words text-left"
          >
            {gpxFile ? gpxFile.name : "GPX 파일을 선택하세요"}
          </button>
        </div>

        {/* Description */}
        <div className="mb-6">
          <textarea
            placeholder="코스 설명을 입력하세요 (선택, 최대 300자)"
            maxLength={300}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none"
          />
          <div className="text-right text-gray-500 text-sm">
            {description.length}/300
          </div>
        </div>

        {/* Course Type Selection */}
        <div className="mb-6">
          <div className="text-[16px] mb-2">코스 유형</div>
          <div className="flex flex-wrap gap-2">
            {COURSE_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedCourseType(type)}
                className={`h-[30px] px-3 py-1 border border-main-gray-200 text-[12px] rounded-full transition ${
                  selectedCourseType === type
                    ? "bg-main-green-200 text-white font-medium border-main-green-200 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
                    : "bg-white text-main-gray-300 hover:bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Capital Selection */}
        <div className="mb-6">
          <div className="text-[16px] mb-2">지역 선택 (최대 3개)</div>
          <div className="flex flex-wrap gap-2">
            {cities.map((item: string, i: number) => (
              <button
                key={i}
                onClick={() => handleCapitalToggle(item)}
                className={`h-[30px] px-3 py-1 border border-main-gray-200 text-[12px] rounded-full transition ${
                  selectedCapitals.includes(item)
                    ? "bg-main-green-200 text-white font-medium border-main-green-200 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
                    : "bg-white text-main-gray-300 hover:bg-gray-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Selection */}
        <div className="mb-6">
          <div className="text-[16px] mb-2">추천 태그 (최대 5개)</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[...DEFAULT_TAGS, ...customTags].map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`h-[30px] px-3 py-1 border border-main-gray-200 text-[12px] rounded-full transition ${
                  selectedTags.includes(tag)
                    ? "bg-main-green-200 text-white font-medium border-main-green-200 shadow-[0_4px_4px_rgba(0,0,0,0.1)]"
                    : "bg-white text-main-gray-300 hover:bg-gray-200"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          {/* Tags Selection - Input and Button Layout */}
          <div className="flex gap-2 max-w-[calc(100%-60px)]">
            <input
              type="text"
              placeholder="새로운 태그 추가"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-lg min-w-0 text-[12px]"
            />
            <button
              onClick={addCustomTag}
              className="w-[40px] h-[36px] bg-main-green-200 text-white rounded-lg flex-shrink-0 flex items-center justify-center"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Rating Slider */}
        <div className="mb-6">
          <div className="text-[16px] mb-2">예상 별점</div>
          <RatingSlider
            min={0}
            max={5}
            step={0.5}
            initialValue={0}
            onChange={(val: number) => setRating(val)}
          />
        </div>

        {/* Difficulty Slider */}
        <div className="mb-6">
          <div className="text-[16px] mb-2">예상 난이도</div>
          <RatingSlider
            min={0}
            max={5}
            step={0.5}
            initialValue={0}
            onChange={(val: number) => setDifficulty(val)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 rounded-[24px] font-medium transition focus:outline-none shadow-[0_4px_4px_rgba(0,0,0,0.1)] ${
            !isFormValid
              ? "bg-gray-300 text-gray-700"
              : "bg-main-green-200 text-main-white hover:bg-main-green-300"
          }`}
          onClick={handleClickGpxUpload}
        >
          업로드
        </button>
      </div>
    </div>
  );
};

export default TrackingUploadPage;
