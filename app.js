import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import morgan from 'morgan';

// Config
const app = express();
const PORT = process.env.PORT || 3000;

const urlRoute = require("./routes/urlRoute");

app.use(cors());
app.use(helmet());
app.use(morgan("common"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(express.static("public"));

//Use routes
app.use("/", urlRoute);

// Set up 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "No ShortURL Found" });
});

// Connect to db and listen from port if connection was succussful.
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(result => {
      app.listen(PORT, () => {
          console.log('Server is listening on ', PORT);;
      });
  })
  .catch(err => console.log(err))