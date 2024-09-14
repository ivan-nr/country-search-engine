import { Country } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function searchCountries(query: string) {
  const url = `${BASE_URL}name/${query}`;
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Country not found");
    }

    throw new Error("Failed to fetch data");
  }

  const data: Country[] = await response.json();
  return data;
}
