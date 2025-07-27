// Load in our Express framework
const express = require(`express`);
// Create a new Express instance called "app"
const app = express();
const bodyParser = require(`body-parser`);
const twig = require(`twig`);
const path = require(`path`);

app.set("view engine", "twig");

app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.urlencoded());

// Load in our RESTful routers
const routers = require("./routers/index.js");

// Home page welcome middleware
app.get("/", (req, res) => {
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.status(200).json({ message: "Welcome to Star Tracker Library" });
  } else {
    return res.render("index.twig", {
      title: "Welcome to Star Tracker Library",
      message: "traverse the universe!",
    });
  }
  res.status(200).send("Welcome to Star Tracker Library");
});

// Register our RESTful routers with our "app"
app.use(`/planets`, routers.planet);
app.use(`/stars`, routers.star);
app.use(`/galaxies`, routers.galaxy);

// Set our app to listen on port 3000
app.listen(3000);
