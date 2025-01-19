const express = require("express");
require('express-async-errors');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const routes = require("./routes/v1/index");
const session = require("express-session");
const config = require("./config/config");
const compression = require("compression");
const { userService, workspaceService } = require("./services");
const path = require("path");
const { User } = require("./models");
const localStrategy = require("passport-local");
const { app } = require("./socket");
const ApiError = require("./utils/ApiError");
// const Redis = require('ioredis');

const { doubleCsrf } = require('csrf-csrf');

app.use(passport.initialize());
app.use(express.json());
app.use(compression());

// CORS configuration  (for development) 
const corsOptions = {
  origin: config.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};

// const allowedOrigins = ['http://localhost:3001', 'https://totask.app'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies to be sent
//   optionsSuccessStatus: 200,
// };

app.use(cors(corsOptions));

app.set("trust proxy", 1); // trust first proxy

app.use(
  session({
    name: "totask.sid",
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    unset: "destroy",
    cookie: {
      sameSite: config.env === 'production' ? 'none' : 'lax',
      secure: config.env === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 1000 * 24 * 30,
    },
    store: MongoStore.create({ mongoUrl: config.mongoose.url }),
  })
);

app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(cookieParser());

// CSRF Protection
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  getSecret: () => config.csrfSecret,
  cookieName: 'csrf-token',
  cookieOptions: {
    sameSite: 'lax',
    secure: config.env === "production",
    httpOnly: true,
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getTokenFromRequest: (req) => req.headers['x-csrf-token'],
});

//Apply doubleCsrfProtection middleware
// app.get('/v1/csrf-token', (req, res) => {
//   const csrfToken = generateToken(req, res);
//   res.status(200).json({ csrfToken });
// });
// app.use(doubleCsrfProtection);
// app.use("/", doubleCsrfProtection, routes);


app.get('/csrf-token', (req, res) => {
  const csrfToken = generateToken(req, res);
  console.log("Generated CSRF Token:", csrfToken);
  res.status(200).json({ csrfToken });
});

app.use((req, res, next) => {
  const excludedRoutes = ['/csrf-token', '/auth/verify-email'];
  if (excludedRoutes.includes(req.path)) {
    return next(); // Skip CSRF validation for these routes
  }
  doubleCsrfProtection(req, res, next); // Apply CSRF middleware for all other routes
});

app.use("/", routes);

const frontendPath = path.join(__dirname, "../client/dist/");
app.use(express.static(frontendPath));
app.get('/*', function (req, res) {
  res.sendFile(path.join(frontendPath));
});

// Error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Invalid CSRF token' });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'An unexpected error occurred!',
    });
  }
});



module.exports = app;


//------------------------------------------------------------------------


// const express = require("express");
// require('express-async-errors');
// const cors = require("cors");
// const cookieParser = require('cookie-parser');
// const MongoStore = require("connect-mongo");
// const session = require("express-session");
// const passport = require("passport");
// const { jwtStrategy } = require("./config/passport");
// const routes = require("./routes/v1/index");
// const config = require("./config/config");
// const compression = require("compression");
// const { User } = require("./models");
// const localStrategy = require("passport-local");
// const { app } = require("./socket");
// const path = require("path");
// const ApiError = require("./utils/ApiError");

// app.use(passport.initialize());
// app.use(express.json());
// app.use(compression());

// // CORS configuration
// const allowedOrigins = ['https://localhost:3001', 'https://totask.app', 'https://www.totask.app'];

// const corsOptions = {
//   origin: (origin, callback) => {
//     console.log('-----------Request Origin:', origin); // Debug log
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true); // Allow the origin
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true, // Allow cookies
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // Handle preflight requests


// app.set("trust proxy", 1); // trust first proxy

// app.use(
//   session({
//     name: "totask.sid",
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     unset: "destroy",
//     cookie: {
//       sameSite: config.env === 'production' ? 'none' : 'lax',
//       secure: config.env === 'production',
//       httpOnly: true,
//       maxAge: 60 * 60 * 1000 * 24 * 30, // 30 days
//     },
//     store: MongoStore.create({ mongoUrl: config.mongoose.url }),
//   })
// );

// app.use(passport.session());
// passport.use(new localStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.use(cookieParser());

// // Static CSRF token endpoint
// const STATIC_CSRF_TOKEN = 'sYJNZmz5RrRG5IJ0n12S7S1nl14a-TAn4O1XLVVkfjU';
// app.get('/v1/csrf-token', (req, res) => {
//   res.status(200).json({ csrfToken: STATIC_CSRF_TOKEN });
// });

// // API routes
// app.use("/v1", routes);

// const frontendPath = path.join(__dirname, "../client/dist/");
// app.use(express.static(frontendPath));
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(frontendPath));
// });

// // Error handling
// app.use((err, req, res, next) => {
//   if (res.headersSent) {
//     return next(err);
//   }
//   if (err instanceof ApiError) {
//     return res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   }
//   res.status(500).json({
//     status: 'error',
//     message: 'An unexpected error occurred!',
//   });
// });

// module.exports = app;
