const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
    {
        id: {
            type: String,
            required: [true, 'Set password for user'],
        },
        name: { type: String, required: [true, 'Set password for user'] },
        surname: { type: String, required: [true, 'Set password for user'] },
        password: {
            type: String,
            required: [true, 'Set password for user'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
        },
        phoneNumber: {
            type: String,
            required: [true, 'Set phone number for user'],
        },
        token: String,
    },
    { versionKey: false }
);

userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

module.exports = User;
