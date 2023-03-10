import express from "express";
import multer from "multer";
import { extname } from "path"
import { saveNewAuthor, findAuthors, findAuthorById, findAuthorsByIdAndUpdate, findAuthorsByIdAndDelete } from "../../lib/db/tools.js";
import { saveAuthorsImages } from "../../lib/fs/tools.js";
import { pipeline } from "stream";
import { Transform } from "json2csv";

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
            next();
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

//upload an avatar
authorsRouter.post("/:authorid/uploadAvatar", multer().single("avatar"), async (req, res, next) => {
    try {
        const filename = req.params.authorid + extname(req.file.originalname);

        const author = await findAuthorsByIdAndUpdate(req.params.authorid, 
            {avatarUrl: `/img/avatars/${filename}`})

        if (author) {
            await saveAuthorsImages(req.file.buffer, filename)
            res.send(author)
        } else {
            next()
        }

    } catch (error) {
        next(error)
    }
})

authorsRouter.get("/exportCSV", async (req, res, next) => {
    try {
      const source = getAuthorsJSONReadableStream();
      const transform = new Transform({ fields: ["name", "email", "nationality"] });
      const destination = res;
      res.setHeader("Content-Disposition", "attachment; filename=authors.csv");
      pipeline(source, transform, destination, err => {
        if (err) console.log(err);
      });
    } catch (error) {
      next(error);
    }
  });


export default authorsRouter;