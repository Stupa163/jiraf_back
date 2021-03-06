const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const RouteNotFoundError = require('./error/Request/RouteNotFoundError');
const HttpManager = require('./manager/HttpManager');
const { allowConnectedUsersOnly, allowUserWhoPaidOnly } = require('./middleware/AuthorizationMiddleware');
const BruteForceMiddleware = require('./middleware/BruteForceMiddleware');

const loginRouter = require('./routes/login');
const registerController = require('./routes/register');
const tokenRouter = require('./routes/token');

const projectRouter = require('./routes/project');
const sprintRouter = require('./routes/sprint');
const taskRouter = require('./routes/task');
const clientRouter = require('./routes/client');
const issueRouter = require('./routes/issues');
const paymentRouter = require('./routes/payment');
const userRouter = require('./routes/user');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.disable('etag');

// app.use(BruteForceMiddleware.permit());

app.use('/login', loginRouter);
app.use('/register', registerController);
app.use('/token', tokenRouter);

app.use(allowConnectedUsersOnly());

app.use('/payment', paymentRouter);

// app.use(allowUserWhoPaidOnly());

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/sprint', sprintRouter);
app.use('/task', taskRouter);
app.use('/client', clientRouter);
app.use('/issue', issueRouter);

app.use((req, res) => {
    HttpManager.renderError(res, new RouteNotFoundError(), 404);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
