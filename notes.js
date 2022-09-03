const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes();
    console.log(notes)

    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note)=> note.title === title)
    debugger
    
    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse("New Note Added"))
    } else {
        console.log(chalk.red.inverse("Note title taken!"))
    }
    
}

const removeNote = (title) => {
    const notes = loadNotes();
    // console.log(notes);

    const notesToKeep = notes.filter((note) => note.title !== title)

    if( notes.length > notesToKeep.length){
       
        console.log(chalk.bgGreen('Note was removed'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.bgRed(`No Note was removed.`))
    }
}

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.bold.yellow.inverse("Your Notes-->"))
    notes.forEach(note => {
        console.log("Title: ", note.title)
        console.log("Body: ", note.body)
        console.log("----------------")
    });
}

const readNote = (title)=>{
    const notes = loadNotes();
    const note = notes.find((n)=> n.title === title)
    if(note){
        console.log(chalk.green("Reading Note"))
        console.log(chalk.yellow.bold("Title: ", note.title));
        console.log("Body: ", note.body);
    }else{
        console.log(chalk.red.inverse("No Note Found!"))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = ()=>{
    try {

        const dataJSON = fs.readFileSync('notes.json','utf-8')
        return JSON.parse(dataJSON)

    } catch (err){
        return []
    }   
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}