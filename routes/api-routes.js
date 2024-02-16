const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

// GET /api/notes should read the db.json file and return all saved notes as JSON.
router.get('/api/notes', async(req, res)=>{
    try{
        const dbdata = await fs.promises.readFile('db/db.json', 'utf8');
        res.json(JSON.parse(dbdata));
    }
    catch(err){
        console.error(err);
        res.json(err);
    }
});

router.post('/api/notes', async(req, res)=>{
    try{
        const dbdata = JSON.parse(await fs.promises.readFile('db/db.json', 'utf8'));
        const newNote ={
            title: req.body.title,
            text: req.body.text,
            id: uuidv4(),
        }
        
        
        dbdata.push(newNote);
        await fs.promises.writeFile('db/db.json', JSON.stringify(dbdata));
        res.json(newNote);
    }
    catch(err){
        console.error(err);
        res.json(err);
    }
});

router.delete('/api/notes/:id', async(req, res)=>{
    try{
        const data = await fs.promises.readFile('db/db.json', 'utf8');
        const notes = JSON.parse(data);
        const id = req.params.id;
        const newNotes = notes.filter(note => note.id !== id);
        await fs.promises.writeFile('db/db.json', JSON.stringify(newNotes));
        res.json({message: 'Note deleted'});
    }
    catch(err){
        console.error(err);
        res.json(err);
    }
});

module.exports = router;