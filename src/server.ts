import express from "express";
import fs  from"fs";
import path from "path";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import todoApiRoutes from "./routes/todo_api_routes";

dotenv.config(); 

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));

const PORT = process.env.LOCALHOST_PORT || 1111;


app.use("/",todoApiRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} dinleniliyor`);
});

