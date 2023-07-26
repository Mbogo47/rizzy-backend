import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import config from "./src/model/config.js";
import authRoutes from "./src/routes/authRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import ordersRoutes from "./src/routes/orderRoutes.js";
import productsRoutes from "./src/routes/productsRoutes.js";
import stripe from "./src/routes/stripeRoute.js";
import tokenRoutes from "./src/routes/tokenRoutes.js";

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setting up cors
app.use(cors());

// jwt setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        console.log(req.user);
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], `${process.env.JWT_SECRET}`, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});



// ROUTES 
authRoutes(app)
productsRoutes(app)
ordersRoutes(app)
cartRoutes(app)
stripe(app)
tokenRoutes(app)

app.get("/", (req, res) => {
    res.send("Welcome to My ecommerce");
});

app.listen(config.port, () => {
    console.log(`Server running at ${config.url}`);
});