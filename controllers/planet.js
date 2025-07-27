const { Planet } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const planets = await Planet.findAll();
  const stars = await Promise.all(planets.map((planet) => planet.getStar()));
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    res.status(200).json({ planets, stars });
  } else {
    res.render("../views/planet/index.html.twig", {
      title: "All Planets",
      message: "Welcome to the Planets",
      planets: planets,
    });
  }
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const planet = await Planet.findByPk(req.params.id);
  const stars = await planet.getStar();
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.status(200).json({ planet, stars });
  } else {
    return res.render("../views/planet/show.html.twig", {
      title: planet.name,
      message: `Welcome to the ${planet.name} Detail page!`,
      planet: planet,
      stars: stars,
    });
  }
};
// get /planets/new
// get /planets/:id/edit
const form = async (req, res) => {
  // Render form for creating a new planet
  if (req.params.id) {
    const planet = await Planet.findByPk(req.params.id);
    const stars = await planet.getStar();
    if (!planet) {
      return res.status(404).send({ error: "Planet not found" });
    }
    return res.render("../views/planet/form.html.twig", {
      title: `Edit ${planet.name}`,
      message: `Edit details for ${planet.name}`,
      planet: planet,
      stars: stars,
    });
  } else {
    return res.render("../views/planet/form.html.twig", {
      title: "Create Planet",
      message: "Fill in the details to create a new planet",
    });
  }
};

// Create a new resource
const create = async (req, res) => {
  // Create a new planet
  const planet = await Planet.create(req.body);

  res.redirect(`/planets/${planet.id}`);
};

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const planet = await Planet.update(req.body, {
    where: { id: req.params.id },
  });
  res.redirect(`/planets/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const planet = await Planet.destroy({
    where: { id: req.params.id },
  });
  res.redirect(`/planets`);
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
