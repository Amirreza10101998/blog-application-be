import uniqid from "uniqid"
import { getAuthors, getBlogPosts, writeAuthors, writeBlogPosts } from "../fs/tools.js"


/*----------Authors----------*/
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

/*----------Blog Posts----------*/
export const saveNewBlogPost = async newBlogPostData => {
    const blogPosts = await getBlogPosts()

    const newBlogPost = {...newBlogPostData, createdAt: new Date(), updatedAt: new Date(), id: uniqid()}
    
    blogPosts.push(newBlogPost);

    await writeBlogPosts(blogPosts);

    return newBlogPost.id
};

export const findBlogPosts = () => getBlogPosts();

export const findBlogPostById = async blogPostId => {
    const blogPosts = await getBlogPosts();

    const blogPost = blogPosts.find(blogPost => blogPost.id === blogPostId)

    return blogPost
};

export const findBlogPostsByIdAndIupdate = async (blogPostId, updates) => {
    const blogPosts = await getBlogPosts()
    const index = blogPosts.findIndex(blogPost => blogPost.id === blogPostId);

    if (index !== -1) {
        blogPosts[index] = {...blogPosts[index], ...updates, updatedAt: new Date()}
        await writeBlogPosts(blogPosts)
        return blogPosts[index];
    } else {
        return null
    }
}

export const findBlogPostsByIdAndDelete = async blogPostId => {
    const blogPosts = await getBlogPosts();
  
    const remainingBlogPost = blogPosts.find(blogPost => blogPost.id === blogPostId);
  
    if (remainingBlogPost) {
      const index = blogPosts.indexOf(remainingBlogPost);
      blogPosts.splice(index, 1);
      await writeBlogPosts(blogPosts);
      return remainingBlogPost;
    } else {
      return null;
    }
};