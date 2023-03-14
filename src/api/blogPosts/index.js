import express from "express";
import createHttpError from "http-errors";
import { findBlogPostById, findBlogPosts, findBlogPostsByIdAndIupdate, saveNewBlogPost, findBlogPostsByIdAndDelete } from "../../lib/db/tools.js";

import blogPostsModel from "./model.js"

const blogPostsRouter = express.Router()

//returns the list of blogposts
blogPostsRouter.get("/", async (req, res, next) => {
    try {
        const blogPosts = await blogPostsModel.find()
        res.send(blogPosts)
    } catch (error) {
        next(error)
    }
});

//returns a single blogpost
blogPostsRouter.get("/:blogPostid", async (req, res, next) => {
    try {
        const blogPost = await blogPostsModel.findById(req.params.blogPostid);
        if (blogPost) {
            res.send(blogPost)
        } else {
            next(createHttpError(404, `Blog Post with id ${req.params.userId} not found!`));
        }
    } catch (error) {
        next(error)
    }
});

//create a new blogpost
blogPostsRouter.post("/", async (req, res, next) => {
    try {
        const newBlogPost = new blogPostsModel(req.body)
        const { _id } = await newBlogPost.save()

        res.status(201).send({ _id })
    } catch (error) {
        next(error)
    }
});

//edit the blogpost with the given id
blogPostsRouter.put("/:blogPostid", async (req, res, next) => {
    try {
        const updatedBlogPost = await blogPostsModel.findByIdAndUpdate(
            req.params.blogPostid,
            req.body,
            { new: true, runValidators: true })

        if (updatedBlogPost) {
            res.send(updatedBlogPost)
        } else {
            next(createHttpError(404, `Blog Post with id ${req.params.userId} not found!`))
        }
    } catch (error) {
        next(error)
    }
});

//delete the blogpost with the given id
blogPostsRouter.delete("/:blogPostid", async (req, res, next) => {
    try {
        const updatedBlogPost = await blogPostsModel.findByIdAndDelete(req.params.blogPostid);

        if (updatedBlogPost !== null) {
            res.status(204).send()
        } else {
            next(createHttpError(404, `Blog Post with id ${req.params.userId} not found!`))
        };
    } catch (error) {
        next(error);
    };
})


export default blogPostsRouter;