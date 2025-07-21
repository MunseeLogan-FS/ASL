const { Planet } = require("../models/index.js");

// Show all resources
const index = async (req, res) => {
  // Respond with an array and 2xx status code
  const planets = await Planet.findAll();
  const stars = await Promise.all(planets.map((planet) => planet.getStar()));
  res.status(200).json({ planets, stars });
};

// Show resource
const show = async (req, res) => {
  // Respond with a single object and 2xx code
  const planet = await Planet.findByPk(req.params.id);
  const star = await planet.getStar();
  res.status(200).json({ planet, star });
};

// Create a new resource
const create = async (req, res) => {
  // Create a new planet
  const planet = await Planet.create(req.body);

  res.status(201).json(planet);
};

// Update an existing resource
const update = async (req, res) => {
  // Respond with a single resource and 2xx code
  const planet = await Planet.update(req.body, {
    where: { id: req.params.id },
  });
  res.status(200).json(planet);
};

// Remove a single resource
const remove = async (req, res) => {
  // Respond with a 2xx status code and bool
  const planet = await Planet.destroy({
    where: { id: req.params.id },
  });
  res.status(200).json({ success: true });
};

// Export all controller actions
module.exports = { index, show, create, update, remove };
