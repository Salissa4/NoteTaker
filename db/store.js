const util = require('util');
const fs = require('fs');
const uuid = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    }

    write(note) {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((note) => {
          let parsedNotes = [];
          return parsedNotes.concat(JSON.parse(note));
        });
    }

    addNote(note) {
        const { title, text } = note;
            if(!title || !text) {
                throw new Error ('Please enter text')
            }
        
    const newNote = {title, text, id: uuid.v4()};

        return this.getNotes()
        .then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);
    }

    removeNote(id) {
        return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filterNotes) => this.write(filterNotes));
    }
}

module.exports = new Store();