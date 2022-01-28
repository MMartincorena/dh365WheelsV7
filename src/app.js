const express = require('express');
const app = express();

const path = require("path");

const publicPath = path.resolve(__dirname, '../public');
const methodOverride = require ("method-override");

const session = require('express-session');

const cookieParser = require('cookie-parser');

const userLoggedMiddleware = require('../src/Middlewares/userLoggedMiddleware');



//external files
let rutasIndex = require('./routes/index');
let rutasProductos = require('./routes/product');
let rutasUsuarios = require('./routes/users');
let rutasAdmin = require('./routes/admin');

// Middlewares

app.use(session({
    secret : 'topSecret',
    resave: false,
    saveUninitialized: false,
}));

app.use(cookieParser());

app.use(userLoggedMiddleware);


// Formulario => Objeto Literal => JSON
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));


//Routes
app.use('/', rutasIndex);
app.use('/productos', rutasProductos);
app.use('/usuarios', rutasUsuarios);
app.use('/admin', rutasAdmin);

//setting. Buena práctica

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(publicPath));




// Cambiar bloque para Heroku
app.listen(process.env.PORT || 3000, () => console.log("server start"));

//not-found. End of route
app.use((req, res, next) => {
    res.status(404).render("main/not-found")
});




