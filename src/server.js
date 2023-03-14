import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import mongoose from "mongoose";
import authorsRouter from "./api/authors/index.js";
import blogPostsRouter from "./api/blogPosts/index.js";
import { badRequestHandler, notFoundHandler, genericHandler } from "./errorHandlers.js"
import createHttpError from "http-errors";

const server = express();
const port = 3002;

/*----------Middlewares----------*/
const whitelist = [process.env.FE_DEV_URL]
server.use(express.json());

server.use(cors({
    origin: (currentOrigin, corsNext) => {
        if (!currentOrigin || whitelist.indexOf(currentOrigin) !== -1) {
            corsNext(null, true)
        } else {
            corsNext(createHttpError(400, `Origin ${currentOrigin} is not in the whitelist!`))
        }
    }
}));

/*----------Endpoints----------*/
server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter)

/*----------Error Handlers----------*/
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericHandler);


mongoose.connect(process.env.MONGO_URL);

mongoose.connection.on("connected", () => {
    console.log("Successfully connected to Mongo!")
    server.listen(port, () => {
        console.table(listEndpoints(server))
        console.log(`Server is running on port ${port}`)
    })
});