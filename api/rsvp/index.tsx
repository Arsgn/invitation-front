// api/rsvp/index.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "..";

const useGetGuests = (weddingId?: string) => {
  return useQuery({
    queryKey: ["guests", weddingId],
    queryFn: async () => {
      const res = await api.get(`/invitation/rsvp/${weddingId}`);
      return res.data;
    },
    enabled: Boolean(weddingId),
  });
};

 const useCreateRSVP = (weddingId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RSVP.CreateReq) => {
      const res = await api.post(`/invitation/rsvp/${weddingId}`, data);
      return res.data;
    },
    onSuccess: () => {
      // ❗ ВАЖНО — обновляем гостей, а не weddings
      queryClient.invalidateQueries({ queryKey: ["guests", weddingId] });
    },
  });
};

export { useGetGuests, useCreateRSVP };