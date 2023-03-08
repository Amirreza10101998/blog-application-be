import uniqid from "uniqid"
import { getAuthors, writeAuthors } from "../fs/tools.js"

export const saveNewAuthor = async newAuthorData => {
    const authors = await getAuthors()

    const newAuthor = {...newAuthorData, createdAt: new Date(), updatedAt: new Date(), id: uniqid()}

    authors.push(newAuthor);

    await writeAuthors(authors);

    return newAuthor.id
};

export const findAuthors = () => getAuthors()

export const findAuthorById = async authorId => {
    const authors = await getAuthors();

    const author = authors.find(author => author.id === authorId)

    return author
};

export const findAuthorsByIdAndUpdate = async (authorId, updates) => {
    const authors = await getAuthors();
    const index = authors.findIndex(author => author.id === authorId);

    if (index !== -1) {
        authors[index] = {...authors[index], ...updates, updatedAt: new Date()}
        await writeAuthors(authors)
        return authors[index];
    } else {
        return null;
    }
};

export const findAuthorsByIdAndDelete = async authorId => {
    const authors = await getAuthors();
  
    const remainingAuthor = authors.find(author => author.id === authorId);
  
    if (remainingAuthor) {
      const index = authors.indexOf(remainingAuthor);
      authors.splice(index, 1);
      await writeAuthors(authors);
      return remainingAuthor;
    } else {
      return null;
    }
};
  