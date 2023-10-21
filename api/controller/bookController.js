// bookController.js
const { response } = require("express");
const { default: App } = require("../../App");
const Books = require("../models/library");

// Define your book-related controller actions here (add book, fetch books, etc.)

// Export these controller actions
module.exports = {
  addBook: async (req, res) => {
    try {
      const { userId, bookname, url, author } = req.body;
      console.log(req.body);

      //check if book Exist
      const existingBookbyName = await Books.find({ bookname });
      const existingBookbyUrl = await Books.find({ url });
      if (existingBookbyName.length > 0 || existingBookbyUrl.length > 0) {
        console.log(`Book with name ${bookname} and url Already Exist`);
        return res.status(400).json({ message: "Book Already Exist" });
      }

      //create new book

      const newBook = new Books({
        userId,
        bookname,
        url,
        author,
      });
      // Books.userId = User.userId
      await newBook.save();

      console.log("New Added Book ", newBook);
      //create new books Library

      //save the updated array in DB and send response back with status 200 OK

      return res
        .status(200)
        .send({ message: "book details filled succesfully" });
    } catch (error) {
       console.log(error);
      
    }
  },
  getBooks: async (req, res) => {
    try {
      const books = await Books.find({});
      
      res.json(books); // Send the books as a JSON response
    } catch (error) {
      console.error("Error while fetching books:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  // Add other book-related actions here
  seachBook: async (req, res) => {
    try {
      const { bookname } = req.body;
      const book = await Books.findOne({ bookname });
      if (!book) {
        res.status(404).json({ message: `Book ${bookname} Not Found` });
      } else {
        return res.status(200).send({ bookUrl: book.url });
      }
    } catch (error) {
      console.log("error while searching book", error);
    }
  },
  deleteBook: async (req, res) => {
    try {
      const { bookname } = req.body;
      const book = await Books.findOne({ bookname });
      if (!book) {
        return res.status(404).json({ message: `Book ${bookname} Not Found` });
      }
      await Books.deleteOne({ bookname });
      return res.status(201).json({ message: "Book Deleted Successfully" });
    } catch (error) {
      console.log("error while deleting book", error);
    }
  },
  updateBook: async (req, res) => {
    try {
      const { bookname, updateBookName, updateImgUrl, updateAuthor } = req.body;
  
      console.log(bookname, updateBookName, updateImgUrl, updateAuthor);
  
      const book = await Books.findOne({ bookname });
      if (!book) {
        return res.status(404).json({ message: `${bookname} is not found to update` });
      }
  
      if (!updateBookName) {
        // Only update the author and image URL if updateBookName is not provided
        book.url = updateImgUrl;
        book.author = updateAuthor;
        await book.save();
      } else {
        // Update all fields if updateBookName is provided
        book.bookname = updateBookName;
        book.url = updateImgUrl;
        book.author = updateAuthor;
        await book.save();
      }
  
      res.status(200).json({ message: "Book Updated Successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred during book update" });
    }
  }
};
