const cron = require('node-cron');
const fs = require('fs');
cron.schedule('* * * * *',() => {
    console.log('after 1 min');
    const verses = fs.readFileSync('database.txt', 'utf-8').split('\n').map(line => line.trim());
    const randomIndex = Math.floor(Math.random() * verses.length);
    const randomVerse = verses[randomIndex];
    console.log(randomVerse);
    fs.writeFileSync('DailyVerse.txt', randomVerse, err = {
        if(err){
            console.log('error occurred');
        }
    })
},null, true, "America/Los_Angeles")