const express = require('express');
const mongoose = require('mongoose');
require('express-async-errors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');

dotenv.config();

const currentUserRouter = require('./routes/current-user');
const signinRouter = require('./routes/signin');
const signupRouter = require('./routes/signup');
const signoutRouter = require('./routes/signout');
const userUpgradeRouter = require('./routes/user-upgrade');
const levelUpradeRouter = require('./routes/level-upgrade');
const protectedRouter1 = require('./routes/protected-route1');
const protectedRouter2 = require('./routes/protected-route2');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require('./errors/not-found-error');

const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(userUpgradeRouter);
app.use(levelUpradeRouter);
app.use(protectedRouter1);
app.use(protectedRouter2);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_DB_URL}/${process.env.DATABASE}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
    } catch (err) {
        console.error(err);
    }

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => console.log(`Server is running on the port ${PORT}`));
};

start();

module.exports = app;
