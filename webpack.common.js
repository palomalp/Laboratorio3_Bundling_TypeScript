//importo los plugin como en ES5:
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const basePath = __dirname;

module.exports =
{
    context: path.join(basePath, 'src'),
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
      },
    entry: {
        app: './index.tsx',
        appStyles: ['./mystyles.scss'],
        vendorStyles: ['../node_modules/bootstrap/dist/css/bootstrap.css'],
     },
     output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(process.cwd(), "dist"),
        publicPath: "/",
    },
    //para transpilar:
    module: {
        rules: [
            //aquí va la configuración de loaders
            {
            test: /\.tsx?$/, //para que mire los ficheros con extensión js o jsx
            exclude: /node_modules/, //le digo que no mire aquí porque no es necesario.
            loader: "babel-loader", //le digo que utilice babel-loader, que ya hemos instalado previamente.
            },
            {
                test: /\.(png|jpg)$/,
                type: "asset/resource",
            },
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
                //tengo un fichero que pasa por css loader y el resultado, alimenta a styleloader
            },
            {
                test: /\.scss$/,
                use: [
                      MiniCssExtractPlugin.loader,
                    {
                    loader: "css-loader",
                    options: {
                        import: false,
                        modules: {
                            exportLocalsConvention: "camelCase",
                            localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            localIdentContext: path.resolve(__dirname, "src"),
                            localIdentHashPrefix: "my-custom-hash",
                        },
                    },
                    },
                   {
                       loader: "sass-loader",
                        options: {
                            implementation: require("sass"),
                        },
                    },
                ],
            }, 
        ],
    },
    //escribo los plugins que voy a usar:
    plugins: [ 
        new HtmlWebpackPlugin({ 
            filename: "index.html", // nombre en dist //lo llevo aquí
            template: "index.html", // nombre en el src //parto de aquí
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].[chunkhash].css",
            chunkFilename: "[id].css",
        }),
    ], 
  };
