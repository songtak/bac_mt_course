import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useCommonStore from "../../stores/useCommonStore";

const usePreviousLocation = () => {
  const location = useLocation();
  const prevLocationRef = useRef(location);
  const commonStore = useCommonStore();

  useEffect(() => {
    prevLocationRef.current = location;
  }, [location]);

  return prevLocationRef.current;
};

export default usePreviousLocation;
