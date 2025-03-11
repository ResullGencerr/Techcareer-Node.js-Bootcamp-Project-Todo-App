import express from "express";
import fs from "fs";
import path from "path";


const router = express.Router();
const dbPath = path.join(__dirname, "../db.json");

router.get("/", (req, res) => {
    res.render("todo");
  });



  export default router;