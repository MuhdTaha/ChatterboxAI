import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { MongoClient } from "mongodb";
import Chat from "./models/chat.js";
import UserChats from "./models/userChat.js";
import { requireAuth } from "@clerk/express";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use(express.json());

const connect = async() => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
  });

app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.get("/api/test", requireAuth(), async (req, res) => {
    console.log("Success!");
    res.send("Success!");
});

app.post("/api/chats", requireAuth(), async (req, res) => {
    const {text} = req.body;

    try {
        const newChat = new Chat({
            userId: userId,
            history: [
                {
                    role: "user",
                    parts: [
                        {text}
                    ]
                }
            ]
        });

        const savedChat = await newChat.save();
        const userChats = await UserChats.find({userId});

        if (!userChats.length) {
            const newUserChats = new UserChats({
                userId,
                chats: [
                    {
                        _id: savedChat.id,
                        title: text.substring(0, 30)
                    }
                ]
            });

            await newUserChats.save();
        } else {
            await UserChats.updateOne({userId}, {
                $push: {
                    chats: {
                        _id: savedChat.id,
                        title: text.substring(0, 30)
                    }
                }
            });

            res.status(201).send(newChat._id);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
        
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send("Unauthenticated!");
  });

app.listen(port, () => {
    connect();
    console.log("Server running on port 3000");
});