const express = require("express");
const exp = require("constants");
const path = require("path");
const cors = require("cors");
const createError = require("http-errors");
const mongoose = require("mongoose");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const catalogRouter = require("./routes/catalogRouter");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");

const app = express();
const PORT = process.env.PORT;

const Book = require("./models/Book");

const MONGO_URL = process.env.MONGO_URL;

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB...");
}

const deleteAllData = async () => {
  try {
    await Book.deleteMany();
    console.log("All Data successfully deleted");
  } catch (err) {
    console.log(err);
  }
};

//deleteAllData();

app.use(compression());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded());

app.use(
  cors({
    origin: "*",
  })
);

// route
app.use("/auth", authRouter);
app.use("/catalog", catalogRouter);
app.use("/user", userRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(function (err, req, res, next) {
  console.log(`ERROR: ${err.message}`);
  res.status(err.status || 500).json(err.message);
});

module.exports = app;
