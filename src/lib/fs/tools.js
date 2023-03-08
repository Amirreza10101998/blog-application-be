import fs from "fs-extra"
import { dirname, join } from "path"
import { fileURLToPath } from "url"


const { readJSON, writeJSON } = fs;

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../../data/authors.json");

export const getAuthors = () => readJSON(authorsJSONPath);
export const writeAuthors = authorsArray => writeJSON(authorsJSONPath, authorsArray);