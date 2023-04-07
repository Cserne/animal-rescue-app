const express = require("express");
require('express-async-errors');
const cors = require("cors");

const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const helpRequest = require("./routes/helpRequest")

const morgan = require('morgan');

const app = express();

app.use(
    cors({
        // origin: 'https://site.mankacs.site' || 'http://localhost:3000',
        origin: 'http://localhost:3000',
    })
);
app.use(express.json());

app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms')
);

app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/", helpRequest);

// app.use(auth); // ha az app.use-nál meghívom az authot, az már a middleware functiont adja vissza

// app.use(errorHandler); // Utolsónak kell lennie.

module.exports = app;