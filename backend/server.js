require("dotenv").config();
require("colors");
const express = require("express");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

// connect to db
connectDB();

const port = process.env.PORT || 5000;

// express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// override default error handler
app.use(errorHandler);
app.listen(port, () => console.log(`server started at ${port}`));
