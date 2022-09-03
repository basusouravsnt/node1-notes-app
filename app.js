const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

//Customise yargs version
yargs.version('1.1.0')

//add, remove, read, list

//create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Body for the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       notes.addNote(argv.title, argv.body)
    }
})

// create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder:{
        title:{
            describe: "Provide the title of the note to remove",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log("removing the note")
        notes.removeNote(argv.title)
    }
})

//create a list command
yargs.command({
    command: 'list',
    describe: 'Listing all notes',
    handler(){
        notes.listNotes()
    }
})

//create a read command
yargs.command({
    command: 'read',
    describe: 'read a note',
    builder: {
        title:{
            describe: 'Provide Title of the note to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        // console.log("reading a note")
        notes.readNote(argv.title)
    }
})

yargs.parse();
// console.log(yargs.argv)