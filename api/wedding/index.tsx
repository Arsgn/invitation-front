import { useQuery } from "@tanstack/react-query";
import { api } from "..";

const useGetWeddings = () =>
  useQuery<WEDDING.IWedding[]>({
    queryKey: ["weddings"],
    queryFn: async () => {
      const res = await api.get("/invitation/weddings");
      return res.data; // ✅ ВОТ ТАК
    },
  });

const useGetWedding = (id: string) =>
  useQuery<WEDDING.IWedding | null>({
    queryKey: ["weddings", id],
    queryFn: async () => {
      const res = await api.get<WEDDING.GetWeddingRes>(
        `/invitation/weddings/${id}`,
      );

      return res.data?.data ?? null; // 👈 безопасно
    },
    enabled: !!id,
  });

export { useGetWeddings, useGetWedding };
