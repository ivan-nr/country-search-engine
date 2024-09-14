import { useQuery } from "@tanstack/react-query";
import { getCountry } from "../actions/country";

export const useCountry = (name: string) => {
  return useQuery({
    queryKey: ["country", name],
    queryFn: () => getCountry(name),
    enabled: !!name,
    retry: false,
  });
};
