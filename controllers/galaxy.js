const { Galaxy } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const galaxies = await Galaxy.findAll();
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    res.status(200).json({ galaxies, success: true });
  } else {
    res.render("../views/galaxy/index.html.twig", {
      title: "All Galaxies",
      message: "Welcome to the Galaxies",
      galaxies: galaxies,
    });
  }
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id);
  if (req.headers.accept && req.headers.accept.includes("application/json")) {
    res.status(200).json(galaxy);
  } else {
    res.render("../views/galaxy/show.html.twig", {
      title: galaxy.name,
      message: `Welcome to the ${galaxy.name} Detail page!`,
      galaxy: galaxy,
    });
  }
};
// get /galaxies/new
// get /galaxies/:id/edit
const form = async (req, res) => {
  // Render form for creating a new galaxy
  console.log("This is the id", req.params.id);
  if (req.params.id) {
    const galaxy = await Galaxy.findByPk(req.params.id);
    if (!galaxy) {
      return res.status(404).render("../views/galaxy/form.html.twig", {
        message: "Galaxy not found",
      });
    }
    return res.render("../views/galaxy/form.html.twig", {
      title: `Edit ${galaxy.name}`,
      message: `Edit details for ${galaxy.name}`,
      galaxy: galaxy,
    });
  }
  return res.render("../views/galaxy/form.html.twig", {
    title: "Create Galaxy",
    message: "Fill in the details to create a new galaxy",
  });
};

// Create a new resource
const create = async (req, res) => {
  // Create a new galaxy
  const galaxy = await Galaxy.create(req.body);
  res.redirect(`/galaxies/${galaxy.id}`);
};

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const galaxy = await Galaxy.update(req.body, {
    where: { id: req.params.id },
  });
  res.redirect(`/galaxies/${req.params.id}`);
};

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const galaxy = await Galaxy.destroy({
    where: { id: req.params.id },
  });
  res.redirect(`/galaxies`);
};

// Export all controller actions
module.exports = { index, show, create, update, remove, form };
