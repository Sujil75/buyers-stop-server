const express = require('express');
const cors = require('cors');
const errMiddleware = require('./middlewares/errMiddleware');
const userRoutes = require("./modules/routes/user.routes");
const productRoutes = require("./modules/routes/product.routes");
const addressRoutes = require("./modules/routes/address.routes");

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.send("Hello, Buyers stop backend starts here!");
// });

app.use("/api", userRoutes);

app.use("/api/product", productRoutes);
app.use("/api/user/address", addressRoutes);

app.use(errMiddleware);

module.exports = app;