const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

// Config
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/shortened-urls";

const urlRoute = require("./routes/urlRoute");

// Connect to db and listen from port if connection was succussful.
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));

//Set view engine and static folder
app.set("view engine", "ejs");
app.use(express.static("public"));

//Set up middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(morgan("common"));

//Use routes
app.use("/", urlRoute);

// Set up 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "No ShortURL Found" });
});
