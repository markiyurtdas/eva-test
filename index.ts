import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import flash from 'express-flash';
import session from 'express-session';
import passportConfig from './configs/passport';
import sequelize from './services/database';
import authRouter from './router/auth.router';
import shareRouter from './router/share.router';
import transactionRouter from './router/transaction.router';


const app = express();
const PORT = 8000;

(async () => {
  await sequelize.sync({ force: false });

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.json());

  // Passport config
  passportConfig(passport);

  // Connect flash
  app.use(flash());

  // Express session
  app.use(session({
    secret: '132098fdsjlkrewoipu',
    resave: false,
    saveUninitialized: false,
  }));

  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', (req, res) => {
    res.send({
      message: 'API running!',
      user: req.user || null,
    });
  });

  // Router
  app.use('/api/v1', authRouter);
  app.use('/api/v1', shareRouter);
  app.use('/api/v1', transactionRouter);



  app.listen(PORT, () => {
    console.log(`[server]: Server is running at http://localhost:${PORT}`);
  });
})();
