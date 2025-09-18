const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary data storage (array)
let users = [];
let items = [];

// Test route
app.get("/", (req, res) => {
  res.send("🎉 Server is working without MongoDB!");
});

// User registration
app.post("/api/auth/register", (req, res) => {
  try {
    const { name, email, password, studentId } = req.body;

    // Check if user already exists
    const existingUser = users.find(
      (user) => user.email === email || user.studentId === studentId
    );
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Add new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password, // Note: In real app, we hash passwords
      studentId,
      createdAt: new Date(),
    };

    users.push(newUser);
    res
      .status(201)
      .json({
        message: "User registered successfully",
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// User login
app.post("/api/auth/login", (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all items
app.get("/api/items", (req, res) => {
  res.json(items);
});

// Report new item
app.post("/api/items", (req, res) => {
  try {
    const { itemName, description, category, location, itemType, contact } =
      req.body;

    const newItem = {
      id: items.length + 1,
      itemName,
      description,
      category,
      location,
      itemType,
      contact,
      date: new Date(),
      claimed: false,
    };

    items.push(newItem);
    res
      .status(201)
      .json({ message: "Item reported successfully", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Claim item - NEW API
app.put("/api/items/claim/:id", (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const item = items.find((item) => item.id === itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.claimed) {
      return res.status(400).json({ message: "Item already claimed" });
    }

    item.claimed = true;
    res.json({ message: "Item claimed successfully", item });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("📝 Note: Using temporary memory storage (no MongoDB)");
});
