"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const firebase_1 = require("../firebase");
const firestore_1 = require("firebase/firestore");
const router = express_1.default.Router();
const todoCollection = (0, firestore_1.collection)(firebase_1.db, "Todo");
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield (0, firestore_1.getDocs)(todoCollection);
        const todos = [];
        snapshot.forEach((doc) => {
            todos.push(Object.assign({ id: doc.id }, doc.data()));
        });
        res.render("todo", { todos });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.post("/add", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, isChecked, date } = req.body;
        const newTodo = {
            Name: name,
            IsChecked: isChecked,
            Date: date
        };
        yield (0, firestore_1.addDoc)(todoCollection, newTodo);
        res.redirect("/");
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, firestore_1.deleteDoc)((0, firestore_1.doc)(todoCollection, id));
        res.status(200).send({ message: "Görev başarıyla silindi!" });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
router.put("/edit/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, isChecked, date } = req.body;
        const newTodo = {
            Name: name,
            IsChecked: isChecked,
            Date: date
        };
        yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(todoCollection, id), newTodo);
        res.status(200).send({ message: "Görev başarıyla güncellendi!" });
    }
    catch (err) {
        res.status(500).send(err);
    }
}));
exports.default = router;
