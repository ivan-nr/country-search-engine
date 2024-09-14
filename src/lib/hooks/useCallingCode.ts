import { useQuery } from "@tanstack/react-query";
import { getCallingCode } from "../actions/country";

export function useCallingCode(callingId: string) {
  return useQuery({
    queryKey: ["calling-code", callingId],
    queryFn: () => getCallingCode(callingId),
    enabled: !!callingId,
    retry: false,
  });
}
