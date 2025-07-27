// Load in Express framework
const express = require(`express`);

// Load in our controller/action instances
const starCtlr = require(`../controllers/star.js`);

// Create a new Router instance and call it "router"
const router = new express.Router();

// RESTful resource mappings
router.get(`/`, starCtlr.index);
router.get("/new", starCtlr.form);
router.get(`/:id/delete`, starCtlr.remove);
router.get("/:id/edit", starCtlr.form);
router.post(`/`, starCtlr.create);
router.get(`/:id`, starCtlr.show);
router.post(`/:id`, starCtlr.update);
router.put(`/:id`, starCtlr.update);
router.delete(`/:id`, starCtlr.remove);

// export "router"
module.exports = router;
