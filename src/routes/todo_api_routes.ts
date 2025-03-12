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


  router.post("/add",async (req: Request, res: Response) => {
    try{
      const {name,isChecked,date} = req.body;
      const newTodo={
        Name: name,
        IsChecked: isChecked,
        Date: date
      }
      await addDoc(todoCollection,newTodo);
      res.redirect("/"); 
    }catch(err){
      res.status(500).send(err);
    }
  });

  router.delete("/delete/:id",async (req: Request, res: Response) => {
    try{
      const {id} = req.params;
      await deleteDoc(doc(todoCollection,id));
      res.status(200).send({ message: "Görev başarıyla silindi!" });
    }catch(err){
      res.status(500).send(err);
    }
  });

  router.put("/edit/:id",async (req: Request, res: Response) => {
    try{
      const {id} = req.params;
      const {name,isChecked,date} = req.body;
      const newTodo={
        Name: name,
        IsChecked: isChecked,
        Date: date
      }
      await updateDoc(doc(todoCollection,id),newTodo);
      res.status(200).send({ message: "Görev başarıyla güncellendi!" });
    }catch(err){
      res.status(500).send(err);
    }
  });


  export default router;