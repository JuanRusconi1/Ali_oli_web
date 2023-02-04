// Requires
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const mainRouter = require("./src/routes/mainRouter")
const productRouter= require("./src/routes/productRouter")
//Configuración 
app.set("view engine", "ejs");
app.use(express.static(path.resolve(__dirname, "public")));
//configuramos la carpeta "public" para contenido estatico
app.use(express.urlencoded({extended: false}));
app.use(methodOverride("_mehod"));
//seteamos nuestro template engine "ejs"
app.set("views", path.resolve(__dirname,"./src/views"));

//RUTAS
app.use("/", mainRouter);
app.use("/product", productRouter)


//SERVIDOR 
app.listen(process.env.PORT || 3500,
    () => {
        console.log("Servidor corriendo en el puerto 3500");
    });