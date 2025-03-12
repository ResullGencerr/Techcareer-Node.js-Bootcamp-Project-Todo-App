import express from "express";
import {db} from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Request, Response } from "express";

const router = express.Router();

const todoCollection = collection(db,"Todo");

router.get("/",async (req: Request, res: Response) => {
  try{
    const snapshot = await getDocs(todoCollection);
    const todos : any[] = [];
    snapshot.forEach((doc) => {
      todos.push({id: doc.id, ...doc.data()});
    });
    res.render("todo",{todos});
  }
  catch(err){
    res.status(500).send(err);
  }
  });



  export default router;