import { User } from "../components/users/userModel";

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;

export const googleStrategy = (passport: any) => {
  console.log("google strategy");
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        const { name, id, provider, emails } = profile;
        //        done(null, profile);
        const newUser = {
          firstname: name.familyName,
          lastname: name.givenName,
          email: emails[0].value,
          provider: provider,
          socialID: id,
          password: " ",
        };

        try {
          let user = await User.findOne({ socialID: id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          done(null, error);
        }
      }
    )
  );
  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    done(null, id);
  });
};

export const gitHubStrategy = (passport: any) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback",
      },
      async function (
        accessToken: any,
        refreshToken: any,
        profile: any,
        done: any
      ) {
        const { displayName, id, provider, emails } = profile;

        const newUser = {
          firstname: displayName.split(" ")[0],
          lastname: displayName.split(" ")[1],
          email: emails[0].value,
          provider: provider,
          socialID: id,
          password: " ",
        };

        try {
          let user = await User.findOne({ socialID: id });

          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (error) {
          done(null, error);
        }
        passport.serializeUser((user: any, done: any) => {
          console.log(user);

          done(null, user.id);
        });

        passport.deserializeUser((id: string, done: any) => {
          done(null, id);
        });
      }
    )
  );
};
