"use client";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearchCountries } from "@/lib/hooks/useSearchCountries";
import { Country } from "@/types";
import { useState } from "react";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter } from "next/navigation";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearchTerm = useDebounce(searchTerm, 700);
  const {
    data: countries,
    isLoading,
    isError,
  } = useSearchCountries(debouncedSearchTerm);

  const router = useRouter();

  const handleSelectCountry = (countryName: string) => {
    router.push(`/country/${countryName}`);
  };

  return (
    <main className="h-screen flex flex-col justify-center items-center space-y-4 p-8 [family-name:var(--font-geist-sans)]">
      <h1 className="text-3xl font-bold mb-4">Country</h1>
      <div className="md:max-w-[500px] w-full">
        <Command className="rounded-lg border shadow-sm">
          <CommandInput
            placeholder="Type any country name..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            {isLoading && <CommandItem>Searching...</CommandItem>}
            {isError && <CommandEmpty>Data not found</CommandEmpty>}
            {Array.isArray(countries) &&
              countries.slice(0, 5).map((country: Country) => (
                <CommandItem
                  key={country.name.common}
                  onSelect={() => handleSelectCountry(country.name.common)}
                >
                  {country.name.common}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </div>
    </main>
  );
}
