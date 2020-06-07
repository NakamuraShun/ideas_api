const
port = 3000,
express = require("express"),
app = express(),
router = express.Router(),
methodOverride = require("method-override"),
connectFlash = require('connect-flash'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session'),
ideasController = require("./controllers/ideasController"),
categoriesController = require("./controllers/categoriesController"),
errorController = require("./controllers/errorController")
;




//db
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ideas_db", { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.once("open", () => { console.log("DB接続完了") });


//express.json,expressurlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ejs
app.set("view engine", "ejs");


app.use("/", router);
//methodOverride
router.use(methodOverride("_method", { methods: ["POST", "GET"] }));

//cookie,Session,flash
router.use(cookieParser("secret_passcode"));
router.use(expressSession({
    secret: "secret_passcode",
    resave: false,
    saveUninitialized: false
}));
router.use(connectFlash());
router.use((req, res, next) =>
{
    res.locals.flashMsg = req.flash();
    next();
});


//route
router.get("/", (req, res) => { res.render("index") });
router.post("/create", categoriesController.createCategory, ideasController.createIdea, ideasController.redirectView);
router.get("/lists", ideasController.getCatedories);
//ajax
router.get("/lists/:category_name", ideasController.getIdeas);
router.get("/lists/json/:category_name", ideasController.getIdeas);
router.delete("/lists/idea/:id/delete", ideasController.delete, ideasController.redirectView);
router.delete("/lists/category/:id/delete", categoriesController.delete, categoriesController.redirectView);
//err
router.use(errorController.respond404);
router.use(errorController.respond500);


//server
app.listen(port, () => { console.log(`${port}で接続中…`); });