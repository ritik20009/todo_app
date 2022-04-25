const express = require('express');
const path = require('path');
const port = 5000;

const db = require('./config/mongoose');
const Todo = require('./models/lists');
const app = express();
// this is our view engine to render the webpage on the browser
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// for encoding the form data

app.use(express.urlencoded());

// for displaying the css ,js and images of the website

app.use(express.static('assets'));

// get the homepage request

app.get('/', function (req, res) {

    Todo.find({}, function (err, tasks) {
        if (err) {
            console.log("error in fetching tasks");
            return;
        }
        return res.render('home', {
            todo_list: tasks
        });
    });
});
// for posting the collected form data to the database
app.post('/create-task', function (req, res) {

    Todo.create({

        task: req.body.description,
        category: req.body.category,
        date: req.body.date
    }, function (err, newTodo) {
        if (err) {
            console.log("error in creating a task");
            return;
        }
        return res.redirect('back');
    });
});

// for deleting the added task after completion

app.get('/delete-task/', function (req, res) {

    let id = req.query.id;

    Todo.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in finding task");
            return;
        }

        return res.redirect('back');
    });
});

// to make server listen out request

app.listen(port, function (err) {
    if (err) {
        console.log("failed to load the server", err);
        return;
    }
    console.log("the server is loaded on port :", port);
});