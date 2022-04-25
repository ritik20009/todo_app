const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todo_list_db');

const db = mongoose.connection;

db.on('error', console.error.bind(console,'error occuring to db'));
db.once('open', function(){
    console.log("successfully connected to the database");
});