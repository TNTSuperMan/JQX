import terser from "@rollup/plugin-terser"
import ts from "@rollup/plugin-typescript"
export default {
    input: "src/entries/module.ts",
    output: [{
        file:"dist/module.js",
        plugins: [ terser() ]
    }],
    plugins: [
        ts()
    ]
}