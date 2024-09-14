export interface Country {
  name: {
    common: string;
    official: string;
  };
  altSpellings: string[];
  capital: string[];
  region: string;
  subregion: string;
  population: number;
  flags: {
    png: string;
    svg: string;
  };
  latlng: number[];
  idd: {
    root: string;
    suffixes: string[];
  };
  callingCode: string[];
}

export interface CallingCode {
  name: string;
  callingCodes: string[];
}
