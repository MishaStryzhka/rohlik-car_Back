const { HttpError } = require('../../helpers');
const { User } = require('../../models');

const getCurrentUser = async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        next(HttpError(401, 'Not authorized'));
    }
    res.status(200).json({
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        subscription: user.subscription,
    });
};

module.exports = getCurrentUser;
