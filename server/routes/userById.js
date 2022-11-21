const router = require('express').Router();
const { User } = require('../models/user');

//Get by ID Method
router.get('/getone/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await User.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;