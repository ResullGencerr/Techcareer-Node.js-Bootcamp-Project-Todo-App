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
exports.default = router;
