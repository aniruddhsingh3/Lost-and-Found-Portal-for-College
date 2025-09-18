const express = require("express");
const router = express.Router();

// Test route for items
router.get("/test", (req, res) => {
  res.json({
    message: "Items API is working!",
    endpoint: "/api/items",
  });
});

module.exports = router;
