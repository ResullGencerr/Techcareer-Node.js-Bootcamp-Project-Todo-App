import express from "express";
import {db} from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, writeBatch } from "firebase/firestore";
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

  router.put("/toggle/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { isChecked } = req.body;
        await updateDoc(doc(todoCollection, id), { IsChecked: isChecked });
        res.status(200).send({ message: "Görev durumu güncellendi!" });
    } catch (err) {
        res.status(500).send(err);
    }
});
router.delete("/delete-all", async (req: Request, res: Response) => {
    try {
        const querySnapshot = await getDocs(todoCollection);

        const batch = writeBatch(db)
        querySnapshot.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();
        res.status(200).json({ message: "Tüm görevler başarıyla silindi!" });
    } catch (err) {
        res.status(500).json({ error: "Sunucu hatası!", details: err });
    }
});

  

  export default router;