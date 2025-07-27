const { Star } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const stars = await Star.findAll();
  const galaxies = await Promise.all(stars.map((star) => star.getGalaxy()));
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    res.status(200).json({ stars, galaxies });
  } else {
    res.render("../views/star/index.html.twig", {
      title: "All Stars",
      message: "Welcome to the Stars",
      stars: stars,
    });
  }
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const star = await Star.findByPk(req.params.id);
  const galaxy = await star.getGalaxy();
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.status(200).json({ star, galaxy });
  } else {
    return res.render("../views/star/show.html.twig", {
      title: star.name,
      message: `Welcome to the ${star.name} Detail page!`,
      star: star,
      galaxy: galaxy,
    });
  }
};

const form = async (req, res) => {
  // Render form for creating or editing a star
  if (req.params.id) {
    const star = await Star.findByPk(req.params.id);
    if (!star) {
      return res.status(404).send({ error: "Star not found" });
    }
    return res.render("../views/star/form.html.twig", {
      title: `Edit ${star.name}`,
      message: `Edit details for ${star.name}`,
      star: star,
    });
  } else {
    return res.render("../views/star/form.html.twig", {
      title: "Create Star",
      message: "Fill in the details to create a new star",
    });
  }
};

// Create a new resource
const create = async (req, res) => {
  // Create a new star
  const star = await Star.create(req.body);
  res.redirect(`/stars/${star.id}`);
};

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const star = await Star.update(req.body, {
    where: { id: req.params.id },
  });
  res.redirect(`/stars/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const star = await Star.destroy({
    where: { id: req.params.id },
  });
  res.redirect(`/stars`);
};
// Export all controller actions
module.exports = { index, show, create, update, remove, form };
