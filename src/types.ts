export interface RegionData {
  grobljeid: string;
  grobljename: string;
  opstinaid: string;
  opstinaname: string;
  okrugid: string;
  okrugname: string;
}

export interface SearchResult {
  id: string;
  ime: string;
  prezime: string;
  rodjenje: string;
  smrt: string;
  groblje: {
    id: string;
    name: string;
    opstina: {
      id: string;
      name: string;
      okrug: {
        id: string;
        name: string;
      };
    };
  };
}

export interface RegionData {
  grobljeid: string;
  grobljename: string;
  opstinaid: string;
  opstinaname: string;
  okrugid: string;
  okrugname: string;
}

export interface Person {
  id: string;
  ime: string;
  prezime: string;
  rodjenje: string;
  smrt: string;
  nadimak: string;
  pol: string;
  groblje: {
    name: string;
    opstina: {
      name: string;
      okrug: {
        name: string;
        region: {
          name: string;
        };
      };
    };
  };
}

export interface Groblje {
  id: number;
  name: string;
}

export interface Opstina {
  id: number;
  name: string;
  groblje: Groblje[];
}

export interface Okrug {
  id: number;
  name: string;
  opstina: Opstina[];
}

export interface LastnameStat extends Stat {
  lastname: string;
}

export interface Graveyards {
  id: number;
  name: string;
}

export interface IOkrug {
  path: string;
  name: string;
  id: number;
}

interface Stat {
  total: number;
  percent: number;
}

export interface Region {
  id: number;
  name: string;
  okrug: Okrug[];
}

export interface NameStat extends Stat {
  name: string;
}

export interface PersonsPerOkrugStat {
  count: number;
  okrug_id: number;
  name: string;
}

export interface IGenStats {
  male: number;
  female: number;
  na: number;
}

export interface IMapProps extends google.maps.MapOptions {
  locations: IGraveLocations[];
  children?: React.ReactNode;
}

export interface IGraveLocations {
  id: number;
  name: string;
  position: google.maps.LatLngLiteral;
}
