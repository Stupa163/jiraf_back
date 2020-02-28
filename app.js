const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const RouteNotFoundError = require('./error/Request/RouteNotFoundError');
const HttpManager = require('./manager/HttpManager');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const registerController = require('./routes/register');
const projectRouter = require('./routes/project');
const sprintRouter = require('./routes/sprint');
const taskRouter = require('./routes/task');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerController);

app.use('/project', projectRouter);
app.use('/sprint', sprintRouter);
app.use('/task', taskRouter);

// catch 404 and forward to error handler
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
