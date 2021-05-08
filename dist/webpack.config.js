var path = require("path");
module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/tetris.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "./build")
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    }
};
//# sourceMappingURL=webpack.config.js.map