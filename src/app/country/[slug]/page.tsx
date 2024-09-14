"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCallingCode } from "@/lib/hooks/useCallingCode";
import { useCountry } from "@/lib/hooks/useCountry";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CountryPage = ({ params }: { params: { slug: string } }) => {
  const { data: country } = useCountry(params.slug);
  const idd = {
    root: country?.idd.root,
    suffixes: country?.idd.suffixes,
  };
  const root = idd?.root?.replace("+", "") || "";
  const callingId =
    (idd?.suffixes?.length === 1 ? root + idd.suffixes[0] : root) || "";

  const currencies = country?.currencies;
  const currencyCode = Object.keys(currencies ?? {})[0] || "";

  const { data: callingCode } = useCallingCode(callingId);
  const { data: currency } = useCurrency(currencyCode);

  const router = useRouter();

  const handleBackToHomepage = () => {
    router.push("/");
  };

  return (
    <div className="h-screen w-full p-[90px] flex flex-col gap-4">
      <div>
        <Button
          className="bg-[#8362F2] hover:bg-[#8362F2]/90"
          onClick={handleBackToHomepage}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Homepage
        </Button>
      </div>

      <div className="flex flex-col space-y-2 mt-8">
        <div className="flex gap-2">
          <h2 className="text-5xl font-bold">{country?.name.common}</h2>
        </div>
        <div className="flex gap-1.5">
          {country?.altSpellings.map((altSpelling) => (
            <Badge key={altSpelling} className="bg-[#8DD4CC]">
              {altSpelling}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-6">
        <Card className="max-w-[540px] w-full h-[143px] overflow-hidden border-none drop-shadow-sm">
          <CardContent className="flex gap-2 py-6 px-0 justify-between">
            <div className="flex flex-col gap-2 px-6">
              <h3 className="text-lg font-medium">LatLong</h3>
              <p className="text-5xl font-bold text-[#8362F2]">
                {country?.latlng[0]}, {country?.latlng[1]}
              </p>
            </div>
            <Image
              src="/globe.svg"
              alt="globe"
              width={204}
              height={120}
              className="opacity-65 fixed right-0 -bottom-20"
              priority
            />
          </CardContent>
        </Card>

        <Card className="max-w-[540px] w-full h-[143px] overflow-hidden border-none drop-shadow-sm">
          <CardContent className="flex gap-2 py-6 px-0 justify-between">
            <div className="flex flex-col gap-2 px-6 text-lg">
              <p>
                Capital: <span className="font-medium">{country?.capital}</span>
              </p>
              <p>
                Region: <span className="font-medium">{country?.region}</span>
              </p>
              <p>
                Subregion:{" "}
                <span className="font-medium">{country?.subregion}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-6 mt-6">
        <div className="max-w-[540px] w-full flex flex-col gap-1.5">
          <p>Calling Code</p>
          <p className="text-5xl font-bold text-[#8362F2]">{callingId}</p>
          <p className="font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-[#8362F2] underline underline-offset-2">
                    {callingCode?.length} country
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {callingCode?.map((code) => (
                    <p key={code.callingCodes[0]}>{code.name}</p>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            with this calling code
          </p>
        </div>

        <div className="max-w-[540px] w-full flex flex-col gap-1.5">
          <p>Currency</p>
          <p className="text-5xl font-bold text-[#8362F2]">{currencyCode}</p>
          <p className="font-medium">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className="text-[#8362F2] underline underline-offset-2">
                    {currency?.length} country
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  {currency?.map((currency) => (
                    <p key={currency.symbol}>{currency.name}</p>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            with this currency
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
