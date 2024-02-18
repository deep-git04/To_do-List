import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// mongoose.connect('mongodb://127.0.0.1:27017/todoListDB');

//   const itemSchema = new mongoose.Schema({
//     name: String,
// });

// const listSchema = new mongoose.Schema({ 
//     name: String,
//     items: [itemSchema],
// });

// const Item = mongoose.model('List', listSchema);
  
//   const item1 = new Item({
//     name: "Welcome to ToDo List"
//   });
  
//   const item2 = new Item({
//     name: "How are you doing?"
//   });


//  data storage
let lists = [];


// Home page route
app.get('/', (req, res) => {
    res.render('index', {
        lists:lists,
        

        });
    

});

// Add list route
app.get('/add-list', (req, res) => {
    res.render('addList');
});

// Handle adding a new list
app.post('/add-list', (req, res) => {
    const newList = {
        id: Date.now().toString(),
        name: req.body.name,
        items: []
    };
    lists.push(newList);
    res.redirect('/');
});

// List detail route
app.get('/list/:id', (req, res) => {
    const list = lists.find(list => list.id === req.params.id);
    if (!list) {
        res.status(404).send('List not found');
        return;
    }
    res.render('listDetail', { list: list });
});

// Add item route
app.post('/list/:id/add-item', (req, res) => {
    const list = lists.find(list => list.id === req.params.id);
    if (!list) {
        res.status(404).send('List not found');
        return;
    }
    const newItem = {
        name: req.body.name,
        completed: false
    };
    list.items.push(newItem);
    res.redirect(`/list/${list.id}`);
});

app.post('/delete', (req, res) => {
    // Handle delete operation here
    console.log(req.body);
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

