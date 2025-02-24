import { kor1 } from "../assets/kor1";
import { kor2 } from "../assets/kor2";

type Kor1Type = {
  id: number;
  name: string;
  height: number;
  address: string;
  reason: string;
  fileLength: number;
};

type Kor2Type = {
  frtrlId: string;
  frtrlNm: string;
  mtnCd: string;
  ctpvNm: string;
  addrNm: string;
  lat: string;
  lot: string;
  aslAltide: string;
  crtrDt: string;
};

type MergedType = Kor1Type & Kor2Type;

export const mountains = (): MergedType[] => {
  return kor1
    .map((mountain) => {
      const matching = kor2.find((m) => m.frtrlNm === mountain.name);
      if (matching) {
        return { ...mountain, ...matching };
      }
      return null;
    })
    .filter((m): m is MergedType => m !== null);
};

export function createNumberList(n: number): number[] {
  return Array.from({ length: n }, (_, i) => i + 1);
}
