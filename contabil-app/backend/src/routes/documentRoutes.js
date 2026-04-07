const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const path = require("path");

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Nu exista fisier" });
  }

  res.json({
    message: "Fisier incarcat",
    file: req.file.filename,
  });
});

router.get("/", (req, res) => {
  const uploadsDir = path.join(__dirname, "..", "uploads");

  if (!fs.existsSync(uploadsDir)) {
    return res.json([]);
  }

  const files = fs.readdirSync(uploadsDir);

  const documents = files.map((fileName, index) => {
    return {
      id: index + 1,
      fileName: fileName,
      url: `http://localhost:5000/uploads/${fileName}`,
    };
  });

  res.json(documents);
});

module.exports = router;