"use client";

import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { pet } from "@/data/data.json";
import { Bar } from "react-chartjs-2";
import { ChartData } from "chart.js";

const page = () => {
  React.useEffect(() => {
    const get = async () => {
      const res = axios.get(
        "http://apis.data.go.kr/6300000/animalDaejeonService"
      );
      if (res) {
        console.log(res);
      }
    };
    return () => {
      get();
    };
  }, []);

  const onFetch = useCallback(async () => {
    const serviceKey = encodeURI(
      "MW5AXazYOfZoz46a1oVy%2FFPMg3H%2BA0o010oRwOwTSOVEyVdSSNAQ%2BZEI6PATXgaXh7GX8YR87w93PK9KBB74jw%3D%3D"
    );
    const url =
      "http://apis.data.go.kr/6300000/animalDaejeonService/animalDaejeonList";

    const params = {
      serviceKey: serviceKey,
      pageNo: 1,
      numOfRows: 10,
      searchCondition: "1(개)",
      searchCondition2: "1(동구)",
      searchCondition3: "1(공고중)",
      species: "진도",
      memo: "콧물",
      regId: "123-1",
      gubun: "수,암",
      searchKeyword: "개,콧물감기",
    };

    try {
      const response = await axios.get(url, { params });
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      console.log("Body:", response.data);
    } catch (error: any) {
      console.error("Error:", error.response || error.message);
    }
  }, []);

  const data = useMemo<ChartData[]>(() => [], []);
  return (
    <div>
      <button onClick={onFetch}>FETCH</button>
      <ul>
        {pet.map((item, i) => (
          <li key={i}>
            <h3>{item.year}</h3>
            <div>
              <ul>
                <h4>Returned</h4>
                <Bar
                  data={{ datasets: item.returned.map((r) => ({ data: r })) }}
                />
                {item.returned.map((r, ri) => (
                  <li key={ri}>{r}</li>
                ))}
              </ul>
              <ul>
                <h4>Kept</h4>
                {item.returned.map((k, ki) => (
                  <li key={ki}>{k}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
