const { nanoid } = require('nanoid');
const { HttpError, sendEmail } = require('../../helpers');
const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
require('dotenv').config();

const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    console.log('req.body', req.body);

    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = await gravatar.url(email);

    const verificationCode = nanoid();
    const newUser = await User.create({
        ...req.body,
        avatarURL,
        password: hashPassword,
        verificationToken: verificationCode,
    });

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationCode}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: newUser.email,
            subscription: 'starter',
        },
    });
};

module.exports = register;
