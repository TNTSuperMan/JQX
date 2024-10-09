import path from "node:path"
export default {
    mode: "production",
    entry: path.resolve(".", "src", "entries", "browser.ts"),
    output: {
        path: path.resolve(".", "dist"),
        filename: "browser.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader"
        }]
    }
}