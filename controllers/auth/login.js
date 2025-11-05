const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { id, password } = req.body;
    const user = await User.findOne({ id });
    if (!user) {
        throw HttpError(401, 'Email or password is wrong');
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, 'Email or password is wrong');
    }

    // if (!user.verify) {
    //     throw HttpError(401, 'Email is not verified');
    // }

    const payload = {
        id: user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    req.user = user;

    console.log('user', user);

    res.status(201).json({
        token: token,
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            subscription: user.subscription,
        },
    });
};

module.exports = login;
