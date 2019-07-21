// SQL VS NoSQL
// it is like mongodb store json files
Table | Collection;
Row | Document;
Column | Filed;

// most of the time, we choose CMD to connect to DB, we can also install app to manage database with UI
// Robo 3T for MangoDB

db.version(); // javascript

// CRUD create read update delete
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const connectionURL = "mongdb://127.0.0.1:27017";
const databaseName = "database-name";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("connection failed "); // shut down the connection with return
    }
    console.log("db connected!"); // keep the connection

    const db = client.db(databaseName); // create new database

    db.collection("users").insertOne(
      {
        // create new table
        name: "Lyu", // there will be a extra _id  for ObjectId, you can generate by yourself
        age: 22
      },
      (err, res) => {
        // check those callback API in mongodb website
        if (err) {
          return console.log("unable to insert user");
        }
        console.log(res.ops); // array contains all doc have been inserted
      }
    );

    db.collection(
      "users",
      insertMany([
        {
          name: "Jen",
          age: 28
        },
        {
          name: "Gun",
          age: 27
        }
      ]),
      (err, res) => {
        if (err) {
          return;
        }

        console.log(res.ops);
      }
    );

    // query
    // CREATE
    db.collection("users").findOne({ name: "Jen", age: 10 }, (err, res) => {
      // always return the first mathced one
      // search with _id: new ObjectID("that long string id")
      if (err) {
        return;
      }

      console.log(res); // return a document, the whole row, if not find, return null
    });

    db.collection("users")
      .find({ age: 27 })
      .toArray((err, res) => {
        console.log(res);
      });
    // find has no callback, return a curser
    // Curser, a pointer to the data
    // use .count() to get number

    // UPDATE
    const updatePromise = db.collection("user").updateOne(
      {
        // when no callback passed in, return a promise
        _id: new ObjectID("a very long id number")
      },
      {
        $set: {
          // chech other operation document
          name: "Mike"
        },
        $inc: {
          // increase one
          age: 1
        }
      }
    );

    updatePromise
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });

    db.collection("users")
      .updateMany(
        {
          completed: false
        },
        {
          $set: {
            completed: true
          }
        }
      )
      .then(res => {})
      .catch(err => {});

    // DELETE
    db.collection("users")
      .deleteMany({
        age: 27
      })
      .then(res => {})
      .catch(err => {});
  }
);

// ObjectId quiet like the hash value

const id = new ObjectID(); // generate id
console.log(id); // it is not just a string, but a object
console.log(id.getTimestamp());

// Promise vs Callback

// Callback version
const doWorkCallback = callback => {
  setTimeout(() => {
    callback("This is my error!", undefined); // there is a error and no res
    // callback(undefined, 'no error') // there is no error and a res
  }, 2000);
};

doWorkCallback((err, res) => {
  if (err) {
    return console.log(err);
  }
  console.log(res);
});

// Promise version
const doWorkPromise = new Promise((resolve, reject) => {
  // err: run reject, no err: run resolve
  setTimeout(() => {
    // resolve('no error!')
    reject("something wrong!");
  }, 2000);
});

doWorkPromise
  .then(res => {
    // this will run when resolve was called
    console.log("Success!", res);
  })
  .catch(err => {
    // this will run when reject was called
    console.log("Failed", err);
  });
