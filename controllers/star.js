const { Star } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const stars = await Star.findAll();
  const galaxies = await Promise.all(stars.map((star) => star.getGalaxy()));
  res.status(200).json({ stars, galaxies });
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const star = await Star.findByPk(req.params.id);
  const galaxy = await star.getGalaxy();
  res.status(200).json({ star, galaxy });
};

// Create a new resource
const create = async (req, res) => {
  // Create a new star
  const star = await Star.create(req.body);
  res.status(201).json(star);
};

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const star = await Star.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(star);
};

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const star = await Star.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({ success: true });
};
// Export all controller actions
module.exports = { index, show, create, update, remove };
