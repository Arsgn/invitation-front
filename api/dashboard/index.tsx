import { useQuery } from "@tanstack/react-query";
import { api } from "..";

 const useGetDashboard = (weddingId: string) =>
  useQuery<DASHBOARD.GetRes>({
    queryKey: ["dashboard", weddingId],
    queryFn: async () => {
      const res = await api.get(`/dashboard/${weddingId}`);
      return res.data;
    },
    enabled: !!weddingId,
  });

export { useGetDashboard };