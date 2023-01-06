const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Todos = new Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    timestap: {
        type: String,
        default: Date.now()
    }
})

const todo = mongoose.model("todo", Todos);

module.exports = todo;