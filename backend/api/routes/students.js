const express = require("express");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

const {
  createStudents,
  getStudents,
  updateStudent,
  deleteStudents,
  paginationStudent,
} = require("../controllers/students");

router.get("/student", getStudents);
router.post("/student", upload.single("image"), createStudents);
router.patch("/student", updateStudent);
router.delete("/student", deleteStudents);
router.get(`/student/page`, paginationStudent);

module.exports = router;
