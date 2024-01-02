import { apiClient } from "@/utils/api.util";
import { useQuery } from "@tanstack/react-query";

const fetchSession = apiClient.get("/session");

export const useSessions = () =>
  useQuery({
    queryKey: ["sessions"],
    queryFn: () => fetchSession,
  });
