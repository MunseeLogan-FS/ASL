const { Galaxy } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const galaxies = await Galaxy.findAll();
  res.status(200).json({ galaxies, success: true });
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const galaxy = await Galaxy.findByPk(req.params.id);

  res.status(200).json(galaxy);
};

// Create a new resource
const create = async (req, res) => {
  // Create a new galaxy
  const galaxy = await Galaxy.create(req.body);
  res.status(201).json(galaxy);
};

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const galaxy = await Galaxy.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(galaxy);
};

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const galaxy = await Galaxy.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({ success: true });
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
