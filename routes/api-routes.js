const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

// GET /api/notes - Should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', async(req, res) => {
    let dbdata = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(dbdata);
});

// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
router.post('/api/notes', async(req, res) => {
    let dbdata = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let newNote = req.body;
    newNote.id = uuidv4();
    dbdata.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(dbdata));
    res.json(newNote);
});

// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete.
router.delete('/api/notes/:id', async(req, res) => {
    let dbdata = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = req.params.id;
    let newDbData = dbdata.filter(note => note.id !== noteId);
    fs.writeFileSync('./db/db.json', JSON.stringify(newDbData));
    res.json(newDbData);
});

module.exports = router;