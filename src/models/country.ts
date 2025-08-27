// Type Alias para as regiões.
export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | 'Antarctic';

// Interface ICountry, conforme a estrutura dos dados da API REST Countries.
export interface ICountry {
  name: {
    common: string;
    official: string;
  };
  region: Region;
  capital?: string[];
  population: number;
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
}
