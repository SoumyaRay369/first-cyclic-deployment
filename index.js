const express = require('express')
const mongoose = require('mongoose')
const Book = require('./models/books')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// mongoose.connect('strictQuery', false); //to make the different errors in the console go away
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send({title: 'BookTitle in KebabCase'})
})

app.get('/add-book', async(req, res) => {
    try {
        await Book.insertMany([
            {
                title: 'Game of Thrones',
                body: "This is the most sexy book of the century"
            },
            {
                title: 'Fifty Shades of Grey',
                body: 'Read it yourself'
            }

        ])
        res.send('Books added succesfully')
    } catch (error) {
        console.log("err" + err);
    }
})

app.get('/books', async(req, res) => {
    const book = await Book.find();
    if(book){
        res.json(book)
    }
    else{
        res.send('Something went wrong');
    }
})


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})