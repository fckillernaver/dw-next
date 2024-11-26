type YN = "Y" | "N";
type FM = "female" | "male";
type S = string;
type N = number;

interface RawDJAnimal {
  adoptionStatusCd: N;
  age: S;
  animalSeq: N;
  classification: N;
  fileNm: S;
  filePath: S;
  foundPlace: S;
  gender: N; // femail/male
  gu: N;
  hairColor: S;
  hitCnt: N;
  memo: S;
  modDtTm: S;
  noticeDate: S;
  regDtTm: S;
  regId: S;
  rescueDate: S;
  species: S;
  weight: S;
  totalPage: N;
  numOfRows: N;
  totalCount: N;
  returnCode: S;
  returnMessage: S;
  successYN: YN;
}

interface DJAnimal {
  status: DJAStatus;
  age: S;
  seq: S;
  sort: DJASort;
  imgUrl: S;
  foundPlace: S;
  gender: DJGender;
  location: DJAGu;
  hairColor: S;
  regAt: S;
  id: S;
  rescuedAt: S;
  weight: any;
}

type DJAStatus =
  | "공고중"
  | "입양가능"
  | "입양예정"
  | "입양완료"
  | "자연사"
  | "안락사"
  | "주인반환"
  | "임시보호"
  | "입양불가"
  | "방사"
  | "주민참여"
  | "입원중";
type DJGender = "암컷" | "수컷" | "중성화 암컷" | "중성화 수컷" | "미확인";
type DJASort = "개" | "고양이" | "기타동물";
type DJAGu = "동구" | "중구" | "서구" | "유성구" | "대덕구";
