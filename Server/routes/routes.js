const express = require("express");
const {
  createUser,
  removeUser,
  updateUser,
  getusers,
  getuserByID,
} = require("../controllers/contoller");

const router = express.Router();

router.get("/users", getusers);
router.get("/users/:id", getuserByID);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", removeUser);

module.exports = router;
