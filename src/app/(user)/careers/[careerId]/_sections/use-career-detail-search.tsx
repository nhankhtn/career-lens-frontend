"use client";

import { CareerApi } from "@/api/career";
import useFunction from "@/hooks/use-function";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const useCareerDetailSearch = () => {
  const params = useParams();
  const getCareersByIdApi = useFunction(CareerApi.getCareerById);
  const career = useMemo(
    () => getCareersByIdApi.data,
    [getCareersByIdApi.data],
  );
  useEffect(() => {
    if (params.careerId) {
      getCareersByIdApi.call(params.careerId as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.careerId]);

  return {
    getCareersByIdApi,
    career,
  };
};

export default useCareerDetailSearch;
