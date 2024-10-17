import terser from "@rollup/plugin-terser"
import ts from "@rollup/plugin-typescript"
export default {
    input: "src/entries/esmodule.ts",
    output: [{
        file:"dist/esmodule.js",
        plugins: [ terser() ]
    }],
    plugins: [
        ts()
    ]
}