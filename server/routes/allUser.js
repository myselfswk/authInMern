const router = require('express').Router();
const { User } = require('../models/user');

//Import Middleware
const { paginatedResults } = require('../middlewares/paginatedResults');

router.get('/', paginatedResults(User), (req, res) => {
    try {
        // const data = await User.find();
        res.json(res.paginatedResults)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;