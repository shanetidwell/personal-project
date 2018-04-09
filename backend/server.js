
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const isAuthenticated = require("./middleware/isAuthenticated");
const RequestController = require("./controllers/RequestController");
const ItemController = require("./controllers/ItemController");


require("dotenv").config();

const app = express();
const port = 4000;

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH_DOMAIN,
      clientID: process.env.AUTH_CLIENT_ID,
      clientSecret: process.env.AUTH_CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALLBACK,
      scope: "openid profile email"
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
      const db = app.get("db");
      console.log("Profile", profile)
    //   profile.id = profile.id.split("|").pop();
    //   console.log(1111, profile.id)
      db.get_user_by_auth_id({ auth_id: profile.id }).then(results => {
        let user = results[0];

        if (user) {
          return done(null, user);
        } else {
          let userObj = {
            name: profile.displayName,
            auth_id: profile.id,
            email: profile.emails[0].value,
            profile_pic: profile.picture
          };

          db.create_user(userObj).then(results => {
            let user = results[0];
            return done(null, user);
          });
        }
      });
    }
  )
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const db = app.get("db");

  db.get_user_by_id({ id }).then(results => {
    let user = results[0];
    return done(null, user);
  });
});

app.get("/auth", passport.authenticate("auth0"));
app.get(
  "/auth/callback",
  passport.authenticate("auth0", {
    successRedirect: "http://localhost:3000/#/home",
    failureRedirect: "http://localhost:3000/#/"
  })
);

app.get("/auth/me", (req, res) => {
    console.log("auth/me")
  if (req.isAuthenticated()) {
      console.log("authenticated")
    return res.send(req.user);
  } else {
      console.log("not authenticated")
    return res.status(404).send("user not authenticated");
  }
});

app.post("/api/storeRequest", isAuthenticated,RequestController.create);

app.post("/api/:store_request_id/item", isAuthenticated, ItemController.create);

app.listen(port, () => {
  console.log("listening on port", port);
});

