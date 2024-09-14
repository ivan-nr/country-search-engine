import { useQuery } from "@tanstack/react-query";
import { searchCountries } from "../actions/search-countries";

export function useSearchCountries(searchTerm: string) {
  return useQuery({
    queryKey: ["countries", searchTerm],
    queryFn: () => searchCountries(searchTerm),
    enabled: !!searchTerm,
    retry: false,
  });
}
