import express from "express";

const blogPostsRouter = express.Router()

//returns the list of blogposts
blogPostsRouter.get("/", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
});

//returns a single blogpost
blogPostsRouter.get("/:blogPostid", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
});

//create a new blogpost
blogPostsRouter.post("/", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
});

//edit the blogpost with the given id
blogPostsRouter.put("/:blogPostid", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
});

//delete the blogpost with the given id
blogPostsRouter.delete("/:blogPostid", async (req, res, next) => {
    try {
    } catch (error) {
        next(error)
    }
})

export default blogPostsRouter;