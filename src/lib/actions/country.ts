import { CallingCode, Country, Currency } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const BASE_URL_V2 = process.env.NEXT_PUBLIC_BASE_URL_V2;

export async function getCountry(name: string) {
  const url = `${BASE_URL}name/${name}?fullText=true`;
  const response = await fetch(url);

  const data: Country[] = await response.json();

  return data[0];
}

export async function getCallingCode(callingId: string) {
  const url = `${BASE_URL_V2}callingcode/${callingId}`;
  const response = await fetch(url);
  if (response.ok) {
    const data: CallingCode[] = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
}

export async function getCountryCurrency(currency: string) {
  const url = `${BASE_URL_V2}currency/${currency}`;
  const response = await fetch(url);
  if (response.ok) {
    const data: Currency[] = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch data");
  }
}
