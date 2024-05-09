import Book from "../model/book.model.js";

export const getBook = async (req,resp) => {
    try {
        // to find the data into our model
        const book = await Book.find()
        resp.status(200).json(book)
    } catch (error) {
        console.log("Error", error);
        resp.status(500).json(error)
    }
}
