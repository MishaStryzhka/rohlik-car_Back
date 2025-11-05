const { HttpError } = require('../../helpers');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
    });

    const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
    await User.findByIdAndUpdate(newUser._id, { token });

    res.status(201).json({
        user: {
            id: newUser.id,
            name: newUser.name,
            surname: newUser.surname,
            email: newUser.email,
        },
    });
};

module.exports = register;
