import { apiClient } from "@/utils/api.util";
import { queryTransformer } from "@/utils/query.util";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useCallback } from "react";

const fetchSession = apiClient.get("/session");

export const useSessions = () =>
  useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetchSession,
    select: useCallback((data: AxiosResponse) => queryTransformer(data), []),
  });
