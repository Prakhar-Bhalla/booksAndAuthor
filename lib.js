const express = require("express");

const mongoose = require("mongoose");

const app = express();

const connect = () => {
    return mongoose.connect("mongodb+srv://Prakhar2266:Bhalla2266@cluster0.pvv3v.mongodb.net/library");
}

app.use(express.json());

const sectionSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true},
}, {versionKey: false, timestamps: true});

const Section = mongoose.model("section", sectionSchema);

const bookSchema = new mongoose.Schema({
    name : {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    author_id : [{type: mongoose.Schema.Types.ObjectId, ref: "author", required:true}],
    section_id : {type: mongoose.Schema.Types.ObjectId, ref: "section", required: true},
    user_id : {type: mongoose.Schema.Types.ObjectId, ref: "user", required: false}
}, {versionKey: false, timestamps: true});

const Book = mongoose.model("book", bookSchema);

const authorSchema = new mongoose.Schema({
    first_name : {type: String, required: true},
    last_name : {type: String, required: false}
}, {versionKey: false, timestamps: true});

const Author = mongoose.model("author", authorSchema);

const userSchema = new mongoose.Schema({
    first_name : {type: String, required: true},
    last_name : {type: String, required: false},
    adhaar_id : {type: String, required: true, unique:true}
}, {versionKey: false, timestamps: true});

const User = mongoose.model("user", userSchema);

app.get("/sections", async(req, res) => {
    try{
        const sections = await Section.find().lean().exec();
        res.send(sections);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.post("/sections", async(req, res) => {
    try{
        const section = await Section.create(req.body);
        res.status(201).send(section);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/sections/:id", async(req, res) => {
    try{
        const section = await Section.findById(req.params.id).lean().exec();
        res.send(section);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.patch("/sections/:id", async(req, res) => {
    try{
        const section = await Section.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.status(201).send(section);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.delete("/sections/:id", async(req, res) => {
    try{
        const section = await Section.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(section);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/authors", async(req, res) => {
    try{
        const authors = await Author.find().lean().exec();
        res.send(authors);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.post("/authors", async(req, res) => {
    try{
        const user = await Author.create(req.body);
        res.status(201).send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/authors/:id", async(req, res) => {
    try{
        const user = await Author.findById(req.params.id).lean().exec();
        res.send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.patch("/authors/:id", async(req, res) => {
    try{
        const user = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.status(201).send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.delete("/authors/:id", async(req, res) => {
    try{
        const user = await Author.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/users", async(req, res) => {
    try{
        const users = await User.find().lean().exec();
        res.send(users);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.post("/users", async(req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/users/:id", async(req, res) => {
    try{
        const user = await User.findById(req.params.id).lean().exec();
        res.send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.patch("/users/:id", async(req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.status(201).send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.delete("/users/:id", async(req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(user);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/books", async(req, res) => {
    try{
        const books = await Book.find().populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        res.send(books);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.post("/books", async(req, res) => {
    try{
        const book = await Book.create(req.body);
        res.status(201).send(book);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/books/checkedout", async(req, res) => {
    try{
        const books = await Book.find().populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        const checkoutBooks = books.filter((book) => {
            return book.user_id;
        });
        res.status(200).send(checkoutBooks);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/books/:id", async(req, res) => {
    try{
        const book = await Book.findById(req.params.id).populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        res.send(book);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.patch("/books/:id", async(req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true}).lean().exec();
        res.status(201).send(book);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.delete("/books/:id", async(req, res) => {
    try{
        const book = await Book.findByIdAndDelete(req.params.id).lean().exec();
        res.status(200).send(book);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/authors/:id/books", async(req, res) => {
    try{
        const authorBooks = await Book.find({author_id : req.params.id}).populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        res.status(200).send(authorBooks);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/sections/:id/books", async(req, res) => {
    try{
        const sectionBooks = await Book.find({section_id : req.params.id}).populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        res.status(200).send(sectionBooks);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/sections/:id/books/notcheckedout", async(req, res) => {
    try{
        const sectionBooks = await Book.find({section_id : req.params.id}).populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        const notCheckedout = sectionBooks.filter((book) => {
            return (!book.user_id);
        })
        res.status(200).send(notCheckedout);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.get("/sections/:id1/authors/:id2/books", async(req, res) => {
    try{
        const sectionAuthorsBooks = await Book.find({$and: [{section_id: req.params.id1}, {author_id: req.params.id2}]}).populate({path: "section_id", select: "name"}).populate({path: "user_id", select: "first_name"}).populate({path: "author_id", select: "first_name"}).lean().exec();
        res.status(200).send(sectionAuthorsBooks);
    } catch(e) {
        res.status(500).send({message: e.message});
    }
});

app.listen(3000, async() => {
    console.log("listening on port 3000");
    connect();
})