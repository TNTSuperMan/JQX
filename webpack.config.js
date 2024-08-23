const path = require("path")
module.exports = {
    mode: "production",
    entry: path.resolve(__dirname, "src", "entry.ts"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
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