const typescript = require("@rollup/plugin-typescript");
const commonjs = require("@rollup/plugin-commonjs");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    exports: "default",
    interop: "esModule",
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
