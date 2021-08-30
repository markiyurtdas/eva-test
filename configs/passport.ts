import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';
import argon2 from 'argon2';
import User from '../models/User.model';

const LocalStrategy = passportLocal.Strategy;

export default function (passport: PassportStatic) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          let user = await User.scope('withPassword').findOne({ where: { email } });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }

          const validPassword = await argon2.verify(user.password, password);
          if (!validPassword) {
            return done(null, false, { message: 'Wrong password' });
          }

          user = await User.findOne({ where: { email } });
          return done(null, user);
        } catch (error) {
          return done(null, false, { message: 'Server error' });
        }
      }
    )
  );

  passport.serializeUser((user: any, done) => {
    return done(null, user.id);
  });
  
  passport.deserializeUser((id: string, done) => {
    User.findByPk(id)
      .then(user => done(null, user))
      .catch(err => done(err));
  });
}
