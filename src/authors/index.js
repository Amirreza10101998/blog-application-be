import express from "express";

const authorsRouter = express.Router();

//returns the list of authors
authorsRouter.get("/", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    };
});

//returns a single author
authorsRouter.get("/:id", async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    };
});

//create a new author
authorsRouter.post("/", async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    };
});

//edit the author with the given id
authorsRouter.put("/:id", async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    };
});

//delete the author with the given id
authorsRouter.delete("/:id", async (req, res, next) => {
    try {
    } catch (error) {
        next(error);
    };
});


export default authorsRouter;