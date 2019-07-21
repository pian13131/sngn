// timestamp
// in the User Schema
timestamps: true;

// createdAt: "a long updated time"
// updatedAt: "a long updated time"

// filter data
// GET /tasks?completed=true
// this will apprear as Key Value pairs in req.params

router.get("/tasks", auth, async (req, res) => {
  const match = {};
  if (req.query.completed) {
    // this is a string, you should not assign value directly
    match.completed = req.query.completed === "true";
  }
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":"); // you can choose the char
    sort[parts[0]] = parts[1] === "desc" ? 1 : -1;
  }

  try {
    await req.user.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit), // string -> int
        skip: parseInt(req.query.skip),
        // sort: {
        //     createdAt: 1 // asc, desc = -1
        // }
        sort
      }
    });
  } catch (e) {}
});

// pagination data
// fetch with page
// limit, skip

// GET /tasks?limit=10&skip=1    --> get the second 10 pages

// sort data
// GET /tasks?sortBy=createdAt:asc   :desc
