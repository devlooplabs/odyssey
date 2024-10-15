const typescript = require("@rollup/plugin-typescript");

module.exports = {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
    exports: "default",
    interop: false,
  },
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
};
