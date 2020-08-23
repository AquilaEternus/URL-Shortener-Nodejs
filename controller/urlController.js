const shortid = require("shortid");
const ShortURL = require("../models/shorturl");

/* Renders index.ejs to the user at route "/" */
const url_get = async (req, res) => {
  res.render("index", { title: "URL-Shortener", result: {} });
};

/* Posts to the database a new short url for a specified url and passes the 
'result' to the index template */
const url_post = async (req, res) => {
  const newShortURL = new ShortURL({
    url: req.body.inputURL,
    shortenedURL: shortid.generate(),
  });
  newShortURL.save().then((result) => {
    res.render("index", { title: "URL-Shortener", result });
  });
};

/* Finds a short url in the database matching the param :shortURL in 
the GET route "/:shortURL" and redirects to the original url it references.*/
const url_shorturl_get = async (req, res) => {
  ShortURL.find({ shortenedURL: req.params.shortURL })
    .then((result) => {
      console.log(result[0].url);
      res.status(301).redirect(result[0].url);
    })
    .catch((err) => {
      res.status(404).render("404", { title: "No ShortURL Found" });
    });
};

module.exports = {
  url_get,
  url_post,
  url_shorturl_get,
};
