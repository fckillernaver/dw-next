"use client";
import React, { ChangeEvent, useCallback, useReducer, useRef } from "react";
import papa from "papaparse";

const TestPage = () => {
  const [name, setName] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const onChange = React.useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const data = files[0];
      // if (files[0].type !== "text/csv") {
      //   return alert("CSV only");
      // }
      setFile(data);
    }
  }, []);

  const ref = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const onSubmit = useCallback(() => {
    if (!file) {
      return confirm("Upload File First") ? ref.current?.click() : null;
    }
    if (!name || name.length === 0) {
      return confirm("Name data file") ? nameRef.current?.focus() : null;
    }
    if (file) {
      papa.parse(file, {
        header: true,
        complete: (res) => {
          let data = res.data;

          console.log(data);
          let year19: { return: 0; adopt: 0 }[] = [];
          let year20: { return: 0; adopt: 0 }[] = [];
          let year21: { return: 0; adopt: 0 }[] = [];
          let year22: { return: 0; adopt: 0 }[] = [];
          let year23: { return: 0; adopt: 0 }[] = [];
          res.data.map((d, i) => {
            if (i < 12) {
              year19.push({ return: d.return19, adopt: d.return19 });
              year20.push({ return: d.return20, adopt: d.return20 });
              year21.push({ return: d.return21, adopt: d.return21 });
              year22.push({ return: d.return22, adopt: d.return22 });
              year23.push({ return: d.return23, adopt: d.return23 });
            }
          });
          //   console.log(res);
          const finalData: any[] = [
            { year: 2019, data: year19 },
            { year: 2020, data: year20 },
            { year: 2021, data: year21 },
            { year: 2022, data: year22 },
            { year: 2023, data: year23 },
          ];
          const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(finalData)
          )}`;
          const a = document.createElement("a");
          a.href = jsonString;
          const fileName = `${name}.json`;
          a.download = fileName;

          if (confirm(`${fileName}을 다운로드하시겠습니까?`)) {
            a.click();
            setName("");
            setFile(null);
          }
        },
      });
    }
  }, [file, ref, name, nameRef]);
  return (
    <div>
      <h1>CSV to JSON</h1>
      <form
        style={{
          display: "flex",
          rowGap: 20,
          flexDirection: "column",
          width: "100%",
          maxWidth: 500,
          margin: "auto",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <input type="file" id="file" onChange={onChange} ref={ref} />
        <input
          type="text"
          id="filename"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            height: 50,
          }}
          ref={nameRef}
        />
        <input
          type="submit"
          value={`DOWNLOAD ${name}`}
          style={{
            height: 50,
          }}
        />
      </form>
    </div>
  );
};

export default TestPage;
