const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt');

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        //Check Validation
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.details[0].message
            });
        }

        //Hashing Password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const id = req.params.id;
        // const updatedData = req.body;
        const updatedData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashPassword
        }
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;