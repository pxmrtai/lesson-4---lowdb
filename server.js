const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)
 
// Set some defaults
db.defaults({ todos: [] })
  .write()

app.set('views', './views'); // Thư mục views nằm cng cấp với file app.js
app.set('view engine', 'pug'); // Sử dụng pug làm view engine


app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// var todos =[
//             {name: 'đi chợ'},
//             {name: 'nấu cơm'},
//             {name: 'rửa bát'},
//             {name: 'học coderX'}  
//         ]

        
app.get('/',function(req, res){
    res.render('todos/index',{
        todos: db.get('todos').value()
    })
})
app.get('/todos',function(req,res){
  var q = req.query.q;
  var matched = db.get('todos').filter(function(todo){
    return todo.name.indexOf(q) !== -1; 
  })
  res.render('todos/index',{
    todos : matched
  })
})
app.get('/todos/create',function(req,res){
    res.render('todos/create')
})
app.post('/todos/create',function(req,res){
    db.get('todos').push(req.body).write();
    res.redirect('back')
})


app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});