
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const massive = require("massive");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const socket = require('socket.io');
const isAuthenticated = require("./middleware/isAuthenticated");
const RequestController = require("./controllers/RequestController");
const ItemController = require("./controllers/ItemController");
const UserController = require("./controllers/UserController");
const UserReviewsController = require("./controllers/UserReviewsController");
const MessagesController = require("./controllers/MessagesController");


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
    //   console.log("Profile", profile)
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
          }).catch(e=>console.log(e));
        }
      }).catch(e=>console.log(e));
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
    //   console.log("authenticated")
    return res.send(req.user);
  } else {
    //   console.log("not authenticated")
    return res.status(404).send("user not authenticated");
  }
});

app.get('/api/logout', function(req,res){
    req.logout();
    console.log('logging out');    
    res.status(200).send();
})



app.get(`/api/userReviews/:id`, isAuthenticated, UserReviewsController.getReviews);
app.post(`/api/userReviews/addReview/:id` , isAuthenticated, UserReviewsController.addReview);

app.post("/api/giftRequest", isAuthenticated,RequestController.create);
app.post("/api/giftRequest/:id", isAuthenticated,RequestController.addDeliveryRequest);
app.get('/api/giftRequest/:id', isAuthenticated, RequestController.getStoreName);
app.get("/api/requests", isAuthenticated,RequestController.get);
app.get("/api/deliveryRequests/:id", /* isAuthenticated ,*/ RequestController.getDeliveries);
app.get('/api/myGiftRequests', isAuthenticated, RequestController.getMyRequests);
app.post('/api/deliveryRequests/accept/:id', isAuthenticated, RequestController.acceptDeliveryRequest);
app.post('/api/deliveryRequests/decline/:id', isAuthenticated, RequestController.declineDeliveryRequest);
app.post(`/api/giftRequests/fulfilled/:id`, isAuthenticated, RequestController.requestFulfilled);

app.post(`/api/notifications/clearDeliveryNotifications`, isAuthenticated, RequestController.clearDeliveryNotifications)
app.post(`/api/notifications/clearAcceptanceNotifications`, isAuthenticated, RequestController.clearAcceptanceNotifications)
app.get('/api/myDeliveries', isAuthenticated, RequestController.getMyDeliveries);

app.get(`/api/getUsername/:id`, isAuthenticated, UserReviewsController.getName);



app.post("/api/user/address", isAuthenticated, UserController.addAddress);

app.get('/api/messages/:id', isAuthenticated, MessagesController.getMessages);
app.get('/api/getThreadMessages/:id', isAuthenticated, MessagesController.getThreadMessages);
app.post('/api/messages/addMessage/:id', isAuthenticated, MessagesController.addMessage);
app.get('/api/getMessageThreads', isAuthenticated, MessagesController.getMessageThreads);
// payload: axios.get('/api/getMessageThreads')


// app.post("/api/:gift_request_id/item", isAuthenticated, ItemController.create);
// app.get('/api/items/:request_id', isAuthenticated, ItemController.get);

server = app.listen(port, () => {
  console.log("listening on port", port);
});

const io = socket(server);

io.on('connection', (socket)=>{
    // console.log(socket.id);

    socket.on('disconnect', ()=>{
        // console.log('user disconnected')
    });

    socket.on('room', function(data){
        // console.log("joining room", data.room)
        socket.join(data.room);
    });
    socket.on('make request', function(data){
        // console.log("request made socket");
        socket.broadcast.to(data.room).emit('receive request', data)
    });
    socket.on('accept delivery request', function(data){
        // console.log("accepted made socket")
        socket.broadcast.to(data.room).emit('delivery request accepted', data)
    });
    socket.on('new message thread', function(data){
        // console.log("new message thread", data);
        socket.broadcast.emit("new thread", data)
    });
    socket.on("send message", function(data){
        // console.log("sending message 1111111", data)
        socket.broadcast.to(data.room).emit("new message", data)
    })
})

