const route = require('express').Router();
const { json, response } = require('express');
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

//Get route for note retrieval
route.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

route.get('/:noteId', (req, res) => {
    const noteID = req.params.noteId;
    readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const response = json.filter((note) => note.noteID === noteID);
        return response.length > 0
        ? res.json(response)
        : res.json('Error adding note');
    });
});

//post route for feedback
route.post('/notes', (req, res) => {
    //deconstruct items in req.body
    const { title, text } = req.body;

    if(req.body) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };

        res.json(response);
    } else {
        res.json('Post feedback error!');
    }
});

route.delete('/notes/:noteId', (req, res) => {
    const noteId = req.params.noteId;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        const data = json.filter((note) => note.noteId !== noteId);

        writeToFile('./db/db.json',data);

        res.json('Note ${noteID} has been deleted');
    });
});

module.exports = route;

