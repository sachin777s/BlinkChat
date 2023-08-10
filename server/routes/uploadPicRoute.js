import multer from "multer";
import express from "express";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, req.body.filename);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("profileImg"), (req, res) => {
  res.json("DP Changed Successfully");
});

export default router;
