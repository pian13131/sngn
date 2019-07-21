// password
// plain => hashed

// bcrypt.js

const bcrypt = require("bcrypt");
const myFunction = async anInputPassword => {
  const password = "Red12345!";
  const hashedPassword = await bcrypt.hash(password, 8); // rounds

  const isMatch = await bcrypt.compare(anInputPassword, hashedPassword); // bool
};

myFunction(anInputPassword);

// encrption: reversable
// hashing: non-reversable

// middleware in mongoose
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true // most of time email should be unique
  },
  age: {
    type: Number,
    lowercase: true,
    trim: true, // no space
    validate(value) {
      // custom the validator
      if (value < 0) {
        throw new Error("Age must be a postive number");
      }
    }
  },
  tokens: [
    {
      token: {
        type: String,
        require: true
      }
    }
  ]
});
// hash before save
userSchema.pre("save", async function(next) {
  // do not use =>
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next(); // keep going
});
// customize function in schema
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return user; // this will return a promise
};
const User = mongoose.model("User", userSchema); // put in a schema

// if you want to use the middleware, you may have to use the classical way mongoose
// if you just use findByIdAndUpdate, it will not run the middleware
// so you may have to find and update by yourself and run save()

// Login & Logout

userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, "aRandomString");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};
const router = require("router");
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// JSON token
// jsonwebtoken js
const jwt = require("jsonwebtoken");

const myFunction = async () => {
  const token = jwt.sign({ _id: "userID" }, "aRandomString", {
    expiresIn: "7 days"
  }); // base64 encoded
  const data = jwt.verify(token, "aRandomString");
};

// express middleware
// new request -> middleware -> run router handler

app.use((req, res, next) => {
  if (req.method === "GET") {
  } else {
  }
  next(); // you have to run next, so it can keep going on
});

// just like the routers, the customized middleware should also be put in another seperate files

// auth.js
const jwt = require("jsonwebtoken");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer", "");
    const decoded = jwt.verify(token, "aRandomString");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token
    });

    if (!user) {
      throw new Error(); // this will triger the catch below
    }
    req.user = user; // when get back to the router, the req.user will be accessable
    req.token = token; // to exit the perticular token
    next();
  } catch (e) {
    res.status(401).send();
  }
};
module.exports = auth;
//router.js
router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

// logout

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token != req.token; // req.token will be removed
    });
    await req.user.save();
    res.send();
  } catch (e) {}
});

// avoid send back too much info
userSchema.methods.getPublicProfile = function() {
  const user = this; // if not => , copy this in first line
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

userSchema.methods.toJSON = function() {
  // this will be called autoly when res.send() was called
  const user = this; // if not => , copy this in first line
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;
  return userObject;
};

// delete user itself

// use the token to search in the database
app.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// connect two models

const Task = mongoose.model("Task", {
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    // one task has to belong to a user
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User" // can access to the user model
  }
});

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id // this is set in the auth
  });

  try {
    await task.save();
    res.status(201).send();
  } catch (e) {}
});

// find the user from the task

const findUserFromTask = async () => {
  const task = await Task.findById("aVeryLongId");
  await task.populate("owner").execPopulate(); // convert the _id of that user to the user object
  console.log(task.owner); // this will return a user object not only the _id
};

// virtual property

userSchema.virtual("tasks", {
  // connect tasks to the user
  ref: "Task",
  localField: "_id",
  foreignField: "owner"
});

const findTaskFromUser = async () => {
  const user = await User.findById("aVeryLongId");
  await user.populate("task").execPopulate();
  console.log(user.tasks);
};

// delete tasks when delete user

userSchema.pre("remove", async function(next) {
  const user = this;
  Task.deleteMany({ owner: user._id });
  next();
});
