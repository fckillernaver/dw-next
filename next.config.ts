import path from "path";

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["www.daejeon.go.kr"], // 외부 이미지 호스트 도메인 추가
  },
};

module.exports = withVanillaExtract(nextConfig);
