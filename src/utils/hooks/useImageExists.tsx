import { useState, useEffect } from "react";

const useImageExists = (mountainName: string) => {
  const [exists, setExists] = useState<boolean | null>(null);
  const imageUrl = `https://songtak.github.io/bac_mt_course/assets/bac_img/${mountainName}.jpeg`;

  useEffect(() => {
    const checkImage = async () => {
      try {
        const response = await fetch(imageUrl, { method: "HEAD" });
        setExists(response.ok);
      } catch (error) {
        setExists(false);
      }
    };
    checkImage();
  }, [imageUrl]);

  return exists;
};

export default useImageExists;
