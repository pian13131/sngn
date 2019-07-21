// Mongoose
// validation the input value

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/database-name-api", {
  useNewUrlParser: true,
  useCreateIndex: true // create index so we can access data quickly
});

const User = mongoose.model("User", {
  // set validation
  name: {
    type: String,
    required: true
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
  }
});

const me = new User({
  name: "Lyu",
  age: 22
});
// save to database, return a promise
me.save()
  .then(res => {})
  .catch(err => {});
// with mongoose, there will be a extra col: __v, it reprecent the version
// at this point, the validation of mongoose come out

// validator js
// to add more validation
const validator = require("validator");
// then you can add this validator into the validate
validator.isEmail(value);

// REST API
// REpresentational State Transfer
// Application Programming Interface
// allow client use POST and GET to operate the database

/**

Create : POST /tasks
Read : GET /tasks
Read: GET /tasks/:id
Update: PATCH /tasks/:id
Delete: DELETE /tasks/:id

 */

/** HTTP request

POST /tasks HTTP/1.1 
Accept: application/json
Connection: Keep-Alive
Authorization: Bearer eyJhbGci0iJIUZI1NilsInRScCIéIkpXVvCI9.eyJfawQiOil...
{"description": “Order new drill bits"}

 */

/** HTTP response

HTTP/1.1 201 Created
Date: Sun, 28 Jul 2019 15:37:37 GMT
Server: Express
Content-Type: application/json
{"_id": "5c13ec6400d614654ed7e5b5", “description”: "Order new drill bits",
“completed": false}

 */

/**
 * Set up the key value pairs in HTTP request
 * https://aLongUrl.com/api?name=Lyu
 *
 */

// Endpoint with express.js
// Create endpoint

const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.post("/users", (req, res) => {
  res.send("Hello world!");
  res.status(400); // check other codes in httpstatuses.com
});
app.use(express.json); // auto parse json in the body
app.listen(port, () => {
  console.log("Server is up on port", port);
});
/**
 * To make structure clear, we need put the models into
 * seperate files. One model, one js file. In it, you can
 * do those validation stuff and rules
 * Then you just export them and you can require it from
 * another js file
 */

module.exports = User;

const User = require("./modules/user");

// Read endpoint

app.get("/users", (req, res) => {
  User.find({})
    .then(res => {
      res.send(res);
    })
    .catch(e => {
      res.status(500).send();
    }); // return all stuff
});

app.get("/users/:id", (req, res) => {
  // GET 'aLongUrl.com/users/aLongIDnumber'
  const _id = req.params.id;
  User.findById(_id)
    .then(user => {
      // if db find nothing matched, it also return in then
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    })
    .catch(e => {
      return res.status(404).send();
    });
  console.log(req.params); // params data is in the url, body is not
});

// Promise Chaining

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

add(1, 2)
  .then(sum => {
    console.log(sum);
    add(sum, 5)
      .then(sum2 => {
        console.log(sum2);
      })
      .catch(e => {});
  })
  .catch(e => {});

// this too nestied and messy
// let's see the promise chain
add(1, 1)
  .then(sum => {
    console.log(sum);
    return add(sum, 4); // return a promise
  })
  .then(sum2 => {
    console.log(sum2);
  })
  .catch(e => {}); // only need one catch

// application
// update and count
User.findByIdAndUpdate("aLongIDnumber", { age: 1 })
  .then(user => {
    console.log(user);
    return User.countDocuments({ age: 1 }); // you have to return the next promise
  })
  .then(res => {
    console.log(res);
  })
  .catch(e => {});

// Async and Await

const doWork = () => {};

console.log(doWork()); // if nothing return, undefined will return

const doWork = async () => {
  return "Lyu";
};

console.log(doWork()); // this will return a promise('Lyu')
// async always return a promise

doWork()
  .then(res => {
    console.log("result: ", res); // "result: Lyu"
  })
  .catch(e => {
    console.log(e);
  });

const doWork = async () => {
  const sum = await add(1, 99); // in this way, it just like it is sync function
  const sum2 = await add(sum, 50); // you can even access to all value in different promise
  return sum2; // async + await => sync
}; // if there is one error in above promise, catch will run

// promise => promise chain => async&await

// application

const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return count;
};

updateAgeAndCount("aLongIDnumber", 2)
  .then(count => {
    console.log(count);
  })
  .catch(e => {
    console.log(e);
  });

// apply async&await into src

app.get("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    // to cathch each err
    await user.save(); // only run next line if this line finished, .save() return a promise
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Update endpoint

app.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body); // return all keys
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every(update => {
    // bool
    return allowedUpdates.includes(update);
  });

  if (isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!"
    });
  }

  try {
    //                                            id       update info
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //   return new value
      runValidators: true // validation
    });

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Delete endpoint

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

// seperate route file

// in /router/user.js
const router = new express.Router();
router.get("/test", (req, res) => {
  res.send("From other router");
});
module.exports = router
// in index.js
const userRouter = require('./routers/user')
app.use(userRouter);
// so we just need put all those router into a seperate file to make all more clear