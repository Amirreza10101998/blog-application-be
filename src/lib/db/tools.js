import uniqid from "uniqid"
import { getAuthors, writeAuthors } from "../fs/tools.js"

export const saveNewAuthor = async newAutherData => {
    const authors = await getAuthors()

    const newAuther = {...newAutherData, createdAt: new Date(), id: uniqid()}

    authors.push(newAuther);

    await writeAuthors(authors);

    return newAuther.id
}

export const findAuthors = () => getAuthors()

export const findAuthorById = async authorId => {
    const authors = await getAuthors();

    const author = authors.find(author => author.id === authorId)

    return author
}

export const findAuthorsByIdAndUpdate = async (authorId, updates) => {
    const authors = await getAuthors();
    const index = authors.find(author => author.id === authorId);

    if (index !== -1) {
        authors[index] = {...authors[index], ...updates, updatedAt: new Date()}
        await writeAuthors(authors)
    } else {
        return null
    }
}

export const findAuthorsByIdAndDelete = async authorId => {
    const authors = await getAuthors();

    const auther = await findAuthorById(authorId)
}