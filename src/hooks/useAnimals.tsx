"use client";

import axios from "axios";
import React, { useCallback, useState } from "react";

const url =
  "http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList";
const serviceKey =
  "MW5AXazYOfZoz46a1oVy/FPMg3H+A0o010oRwOwTSOVEyVdSSNAQ+ZEI6PATXgaXh7GX8YR87w93PK9KBB74jw==";
export default function useAnimals() {
  const [totalPage, setTotalPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [numOfRows, setNumOfRows] = useState(20);
  const [isLoaded, setIsLoaded] = useState(false);
  const fetch = useCallback(
    async (page?: number, quan?: number): Promise<DJAnimal[]> => {
      try {
        setIsLoaded(false);
        const params = {
          serviceKey,
          pageNo: page ?? pageNo,
          numOfRows: quan ?? numOfRows,
          // searchCondition: "1(개)",
          // searchCondition2: "1(동구)",
          // searchCondition3: "1(공고중)",
          // species: "진도",
          // memo: "콧물",
          // regId: "123-1",
          // gubun: "수,암",
          // searchKeyword: "개,콧물감기",
        };
        const res = await axios.get(url, {
          params,
        });
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(res.data, "text/xml");
        console.log(xmlDoc);
        const extract = (target: string, index?: number) => {
          const value = xmlDoc.getElementsByTagName(target);
          if (index) {
            return value[index].textContent;
          }
        };
        setTotalCount(Number(extract("totalCount")));
        setTotalPage(Number(extract("totalPage")!));
        setPageNo((prev) => page ?? prev);
        setNumOfRows((prev) => numOfRows ?? prev);
        const data = Array.from({ length: quan ?? numOfRows }).map((_, i) => ({
          adoptionStatusCd: extract("adoptionStatusCd", i),
          age: extract("age", i),
          animalSeq: extract("animalSeq", i),
          classification: extract("classification", i),
          fileNm: extract("fileNm", i),
          filePath: extract("filePath", i),
          foundPlace: extract("foundPlace", i),
          gender: extract("gender", i),
          gu: extract("gu", i),
          hitCnt: extract("hitCnt", i),
          hairColor: extract("hairColor", i),
          regDtTm: extract("regDtTm", i),
          regId: extract("regId", i),
          rescueDate: extract("rescueDate", i),
          species: extract("species", i),
          weight: extract("weight", i),
        }));
        const getGender = (gender: any): DJGender => {
          switch (gender) {
            case "1":
              return "암컷";
            case "2":
              return "수컷";
            default:
              return "미확인";
          }
        };
        const getLocation = (gu: any): DJAGu => {
          switch (gu) {
            case "1":
              return "동구";
            case "2":
              return "중구";
            case "3":
              return "서구";
            case "4":
              return "유성구";
            default:
              return "대덕구";
          }
        };
        const getSort = (species: any): DJASort => {
          switch (species) {
            case "1":
              return "개";
            case "2":
              return "고양이";
            default:
              return "기타동물";
          }
        };
        const getStatus = (status: any): DJAStatus => {
          switch (status) {
            case "1":
              return "공고중";
            case "2":
              return "입양가능";
            case "3":
              return "입양예정";
            case "4":
              return "입양완료";
            case "5":
              return "자연사";
            case "6":
              return "안락사";
            case "7":
              return "주인반환";
            case "8":
              return "임시보호";
            case "9":
              return "입양불가";
            case "10":
              return "방사";
            case "11":
              return "주민참여";
            default:
              return "입원중";
          }
        };
        const animals: DJAnimal[] = [
          ...data.map(
            (item) =>
              ({
                age: item.age,
                foundPlace: item.foundPlace,
                gender: getGender(item.gender),
                hairColor: item.hairColor,
                id: item.regId,
                imgUrl: `http://www.daejeon.go.kr/${item.filePath}`,
                location: getLocation(item.gu),
                regAt: item.regDtTm,
                rescuedAt: item.rescueDate,
                seq: item.animalSeq,
                sort: getSort(item.species),
                weight: item.weight,
                status: getStatus(item.adoptionStatusCd),
              } as DJAnimal)
          ),
        ];
        return animals;
      } catch (error: any) {
        console.log(error.message);
        return [];
      } finally {
        setIsLoaded(true);
        console.log("done fetching process");
      }
    },
    [numOfRows, pageNo]
  );

  return {
    fetch,
    isLoaded,
    totalCount,
    totalPage,
  };
}
