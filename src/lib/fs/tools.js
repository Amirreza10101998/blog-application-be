import fs from "fs-extra"
import { dirname, join } from "path"
import { fileURLToPath } from "url"


const { readJSON, writeJSON, writeFile, unlink } = fs;

/*----------Authors----------*/
const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../../data/authors.json");

const publicFolderPath = join(process.cwd(), "./public/img/avatars")

export const getAuthors = () => readJSON(authorsJSONPath);

export const writeAuthors = authorsArray => writeJSON(authorsJSONPath, authorsArray);

export const saveAuthorsImages = async (fileContentAsABuffer, filename) => { 
 writeFile(join(publicFolderPath, filename), fileContentAsABuffer)
}  

/*----------Blog Posts----------*/
const blogPostsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../../data/blogPosts.json");

export const getBlogPosts = () => readJSON(blogPostsJSONPath);
export const writeBlogPosts = blogPostsArray => writeJSON(blogPostsJSONPath, blogPostsArray);

