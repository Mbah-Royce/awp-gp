const express = require('express');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const bibleVerses = fs.readFileSync('database.txt', 'utf8').split('\n').map(line => line.trim());

// endpoint 
app.get('/api/random-verse', (req, res) => {
    const randomIndex = Math.floor(Math.random() * bibleVerses.length);
    const randomVerse = bibleVerses[randomIndex];
    res.json({ verse: randomVerse });
});

app.post('/api/add-verse', (req, res) => {
    const content =req.body.verse;
    console.log(req.body)

    fs.appendFileSync('database.txt', content+"\n", err => {
    if (err) {
        console.log("An error occurred");
    }
    });
    let bibleVerses = fs.readFileSync('database.txt', 'utf8').split('\n').map(line => line.trim());
    res.json({ verse: bibleVerses });
});

app.get('/api/daily-verse', (req, res) => {
    const verse = fs.readFileSync('DailyVerse.txt', 'utf8').split('\n').map(line => line.trim());
    res.json({verse});
})

app.get('/', (req,res) => {
	res.json({message: "Home"});
});

app.get('/api/all-verses', (req, res) => {
    const allBibleVerses = fs.readFileSync('database.txt', 'utf8').split('\n').map(line => line.trim());
    res.json({verses: allBibleVerses});
})

app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
});