require("dotenv").config();
require("colors");
const path = require("path");
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

// setting for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.status(500).send({
      message: "This app is not ready for production",
    });
  });
}

// override default error handler
app.use(errorHandler);
app.listen(port, () => console.log(`server started at ${port}`));
