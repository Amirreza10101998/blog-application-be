import express from "express";
import { saveNewAuthor, findAuthors, findAuthorById, findAuthorsByIdAndUpdate, findAuthorsByIdAndDelete } from "../../lib/db/tools.js";

const authorsRouter = express.Router();

//returns the list of authors
authorsRouter.get("/", async (req, res, next) => {
    try {
        const authors = await findAuthors()
        res.send(authors)
    } catch (error) {
        next(error)
    };
});

//returns a single author
authorsRouter.get("/:authorid", async (req, res, next) => {
    try {
        const author = await findAuthorById(req.params.authorid);
        if (author) {
            res.send(author)
        } else {
            next(createHttpError);
        }
    } catch (error) {
        next(error);
    };
});

//create a new author
authorsRouter.post("/", async (req, res, next) => {
    try {
        const id = await saveNewAuthor(req.body)
        res.status(201).send({id})
    } catch (error) {
        next(error);
    };
});

//edit the author with the given id
authorsRouter.put("/:authorid", async (req, res, next) => {
    try {
        const updatedAuthor = await findAuthorsByIdAndUpdate(req.params.authorid, req.body);
        if (updatedAuthor) {
            res.send(updatedAuthor)
        } else {
            next()
        };
    } catch (error) {
        next(error);
    };
});

//delete the author with the given id
authorsRouter.delete("/:authorid", async (req, res, next) => {
    try {
        const updatedAuthor = await findAuthorsByIdAndDelete(req.params.authorid);
        if (updatedAuthor !== null) {
            res.status(204).send()
        } else {
            next()
        };
    } catch (error) {
        next(error);
    };
});

export default authorsRouter;