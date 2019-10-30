const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define path for express config
const publicDirectory = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and view locations
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//setupt static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name: "Mark" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Mark" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Mark",
    helpText: "This is the message"
  });
});

app.get("/help", (req, res) => {
  res.send([
    {
      name: "jake",
      age: 22
    },
    {
      name: "brie",
      age: 25
    }
  ]);
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Need to provide an address to get a forcast" });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(lat, long, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location,
        address: req.query.address,
        forcast: forecastData
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term"
    });
  }
  console.log(req.query);
  res.send({ products: [] });
});

//app.com show them stuff
//app.com/about
app.get("/help/*", (req, res) => {
  res.render("not_found", {
    title: "Help",
    name: "Mark",
    message: "Help Page Not Found"
  });
});

app.get("*", (req, res) => {
  res.render("not_found", {
    title: "Help",
    name: "Mark",
    message: "Page Not Found"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
