const mongoose = require('mongoose');
const Password = require('../utils/password');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['standard', 'admin']
        },
        channel: {
            type: String,
            enum: ['local', 'google']
        },
        level: {
            type: Number,
            enum: [0, 1, 2, 3, 4, 5]
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.password;
                delete ret.__v;
            }
        }
    }
);

userSchema.pre('save', async function (done) {
    if (this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
});

userSchema.statics.build = (attrs) => {
    return new User(attrs);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
