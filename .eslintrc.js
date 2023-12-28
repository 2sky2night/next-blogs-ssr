module.exports = {
  extends: "next/core-web-vitals",
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  rules: {
    "react-hooks/exhaustive-deps": 0,
    "import/no-anonymous-default-export": 0,
    "@next/next/no-img-element": 0,
  },
};
