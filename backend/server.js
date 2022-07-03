require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT;

//routes
const userRouter = require("./routes/user");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const privateRouter = require("./routes/private");
const helpRequest = require("./routes/helpRequest")
const postRequest = require("./routes/postRequest")

app.use(cors());
app.use(express.json());

app.use("/", userRouter);
app.use("/api/signup", signupRouter);
app.use("/api/login", loginRouter);
app.use("/", privateRouter);
app.use("/", helpRequest);
app.use("/api/post", postRequest);

mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

app.listen(port, () => {
    console.log(`Animal Rescue is listening on port ${port}`)
})