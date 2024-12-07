import terser from "@rollup/plugin-terser"
import ts from "@rollup/plugin-typescript"
export default [{
    input: "src/entry.ts",
    output: [{
        file:"dist/module.js"
    }],
    plugins: [ts(),terser()]
},{
    input: "src/entry.ts",
    output: [{
        file:"dist/browser.js",
        format: "iife",
        name: "$"
    }],
    plugins: [ts(),terser()]
}]