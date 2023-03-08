import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import authorsRouter from "./api/authors/index.js";
import blogPostsRouter from "./api/blogPosts/index.js";

import { badRequestHandler, notFoundHandler, genericHandler } from "./errorHandlers.js"


const server = express();
const port = 3001;

/*----------Middlewares----------*/
server.use(cors());
server.use(express.json());

/*----------Endpoints----------*/
server.use("/authors", authorsRouter);
server.use("/blogPosts", blogPostsRouter)


/*----------Error Handlers----------*/
server.use(badRequestHandler); 
server.use(notFoundHandler); 
server.use(genericHandler);


server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
});