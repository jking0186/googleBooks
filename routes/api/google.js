const router = require('express').Router();
const googleController = require('../../controllers/googleController');

router.route("/:title").get(googleController.findByTitle);

module.exports = router;