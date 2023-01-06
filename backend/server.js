const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PORT = process.env.PORT || 8888

const app = express()
app.use(express.json());
app.use(cors());

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connected to db!"))
    .catch(console.error);

const todo = require("./todo.js");


app.get("/todos", async(req, res) =>{
    const todos = await todo.find();

    res.json(todos);
})

app.post("/todos/new", async(req, res) =>{
    const Todo = new todo({
        text: req.body.text
    });

    Todo.save();

    res.json(Todo);
})

app.delete("/todos/delete/:id", async(req, res) =>{
    const delRes = await todo.findByIdAndDelete(req.params.id);

    res.json(delRes);
})

app.get("/todos/done/:id", async(req, res) =>{
    const Todo = await todo.findById(req.params.id);

    Todo.done = !Todo.done;

    Todo.save();

    res.json(Todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const Todo = await todo.findById(req.params.id);

	Todo.text = req.body.text;

	Todo.save();

	res.json(Todo);
});


app.listen(PORT, () =>{
    console.log("App listening on Port:"+PORT)
})