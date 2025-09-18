const express = require("express");
const router = express.Router();

// Test route for auth
router.get("/test", (req, res) => {
  res.json({
    message: "Auth API is working!",
    endpoint: "/api/auth",
  });
});

module.exports = router;
