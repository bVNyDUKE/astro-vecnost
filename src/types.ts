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

export interface Region {
  id: number;
  name: string;
  okrug: Okrug[];
}
