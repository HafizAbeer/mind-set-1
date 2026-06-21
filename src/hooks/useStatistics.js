import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

/* ---- reads (aggregations + history) ---- */

export function useOverview() {
  return useQuery({
    queryKey: queryKeys.statistics("overview"),
    queryFn: () => apiFetch("/statistics/overview"),
  });
}

export function useMindOMeter(period = "month") {
  return useQuery({
    queryKey: queryKeys.statistics("mind-o-meter", { period }),
    queryFn: () => apiFetch(`/statistics/mind-o-meter?period=${period}`),
  });
}

export function useGraph() {
  return useQuery({
    queryKey: queryKeys.statistics("graph"),
    queryFn: () => apiFetch("/statistics/graph"),
  });
}

export function useDiaryList(page = 1) {
  return useQuery({
    queryKey: queryKeys.diary(page),
    queryFn: () => apiFetch(`/diary?page=${page}&limit=10`),
  });
}

export function useReflectionList(page = 1) {
  return useQuery({
    queryKey: queryKeys.reflection(page),
    queryFn: () => apiFetch(`/reflection?page=${page}&limit=10`),
  });
}

export function useProtocolList(page = 1) {
  return useQuery({
    queryKey: queryKeys.protocol(page),
    queryFn: () => apiFetch(`/protocol?page=${page}&limit=10`),
  });
}

/* ---- writes ---- */

export function useFinalizeProtocol() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => apiFetch("/protocol", { method: "POST", body: payload }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["statistics"] }),
  });
}

export function useCreateDiary() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => apiFetch("/diary", { method: "POST", body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["diary"] }),
  });
}

export function useCreateReflection() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body) => apiFetch("/reflection", { method: "POST", body }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["reflection"] }),
  });
}
