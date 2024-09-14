import { useQuery } from "@tanstack/react-query";
import { getCountryCurrency } from "../actions/country";

export const useCurrency = (currency: string) => {
  return useQuery({
    queryKey: ["currency", currency],
    queryFn: () => getCountryCurrency(currency),
    enabled: !!currency,
    retry: false,
  });
};
