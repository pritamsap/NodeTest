

require('dotenv').config()

const mongoose = require('mongoose')
const {mongo} = require("mongoose");
//
// if(process.argv.length < 3) {
//     console.log("give password as an argument")
//     process.exit()
// }
// const password = process.argv[2];


const url = process.env.MONGODB_URL

mongoose.set('strictQuery', false)
mongoose.connect(url, {family: 4})
    .then(result => {
        console.log("Connected to MongoDB");
    })
    .catch(error => {
        console.log('error connecting to MongoDb', error.message)
    })


const noteSchema = new mongoose.Schema({
    content: String, 
    important: Boolean,
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Note = mongoose.model('Note', noteSchema)


// const note = new Note({
//     content: 'HTML is easy',
//     important: true,
// })

// Note.find({}).then(result => {
//     result.forEach(note => {
//         console.log(note)
//     })
//     mongoose.connection.close()
// })


// note.save().then(result => {
//     console.log('note saved!')
//     mongoose.connection.close()
// })
module.exports = Note;
