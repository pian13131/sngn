// multer js
const multer = require("multer");
const upload = multer({
  // set property
  dest: "images"
});
//                    middleware
app.post("/upload", upload.single("upload"), (req, res) => {
  res.send(); //                     ^
}); //                               |
//                                   |
// POST                              |
// form-data                         |
// key <----> file                   |
// the key should be same with       |

// validation

// size

const upload = multer({
  // set property
  dest: "images",
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.endsWith(".pdf")) {
      return cb(new Error("File must be a PDF")); // terminate
    }
    cb(undefined, true); // no error and receive the file
    // cb(undefined, false); // no error but reject the file
  }
});

// regex101.com   easy test regular expression
file.originalname.match(/\.(doc|docx)$/); // add many endsWith

const errorMiddleware = (req, res, next) => {
  throw new Error("From my middleware");
};

app.post(
  "/upload",
  // errorMiddleware,
  upload.single("upload"), // now you can throw error in middleware,and cb will catch it
  (req, res) => {
    res.send(); //                     ^
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

// add file to User's Profile
// you can add many middleware
app.post("/upload", auth, upload.single("upload"), async (req, res) => {
  res.send(); //
}); //

// add new field in User model

avatar: {
  type: Buffer;
}

// remove dest: in the multer setting
// so the multer will path file into cb
req.user.avatar = req.file.buffer;
await req.user.save();
// file will be saved as binary

// jsbin.com to see binary file
// <img src="data:image/jpg;base64, aVeryLongBinaryImageCode">

// serve up avatar

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await user.findById(req.params.id);
    if (!user || !user.avatar) {
      throw new Error(); // goto catch
    }

    res.set("Content-Type", "image/jpg"); // send back image
    res.send(user.avatar); // the binary will be converted to jpg automatically
  } catch (e) {
    res.status(404).send();
  }
});

// crop the image
// sharp js

const buffer = await sharp(req.file.buffer)
  .resize({ width: 250, height: 250 })
  .png()
  .toBuffer();
req.user.avatar = buffer;
await req.user.save();
