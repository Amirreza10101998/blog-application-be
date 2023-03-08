import express from "express";
import { findBlogPostById, findBlogPosts, findBlogPostsByIdAndIupdate, saveNewBlogPost, findBlogPostsByIdAndDelete  } from "../../lib/db/tools.js";

const blogPostsRouter = express.Router()

//returns the list of blogposts
blogPostsRouter.get("/", async (req, res, next) => {
    try {
        const blogPosts = await findBlogPosts()
        res.send(blogPosts)
    } catch (error) {
        next(error)
    }
});

//returns a single blogpost
blogPostsRouter.get("/:blogPostid", async (req, res, next) => {
    try {
        const blogPost = await findBlogPostById(req.params.blogPostid);
        if (blogPost) {
            res.send(blogPost)
        } else {
            next(createHttpError);
        }
    } catch (error) {
        next(error)
    }
});

//create a new blogpost
blogPostsRouter.post("/", async (req, res, next) => {
    try {
        const id = await saveNewBlogPost(req.body)
        res.status(201).send({id})
    } catch (error) {
        next(error)
    }
});

//edit the blogpost with the given id
blogPostsRouter.put("/:blogPostid", async (req, res, next) => {
    try {
        const updatedBlogPost = await findBlogPostsByIdAndIupdate(req.params.blogPostid, req.body);
        if (updatedBlogPost) {
            res.send(updatedBlogPost)
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
});

//delete the blogpost with the given id
blogPostsRouter.delete("/:blogPostid", async (req, res, next) => {
    try {
        const updatedBlogPost = await findBlogPostsByIdAndDelete(req.params.blogPostid);
        if (updatedBlogPost !== null) {
            res.status(204).send()
        } else {
            next()
        };
    } catch (error) {
        next(error);
    };
})


export default blogPostsRouter;