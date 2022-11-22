const router = require('express').Router();
const { User } = require('../models/user');

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id)
        const name = data.firstName + " " + data.lastName;
        res.send(`Document with ${name} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;