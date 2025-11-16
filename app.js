const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const url = 'mongodb://db:27017/myapp';
let db;

async function connectDB() {
  for (let i = 0; i < 10; i++) {
    try {
      const client = new MongoClient(url);
      await client.connect();
      db = client.db('myapp');
      console.log('Verbonden met MongoDB!');
      return;
    } catch (err) {
      console.log(`Poging ${i + 1} mislukt, wacht 2s...`);
      await new Promise(res => setTimeout(res, 2000));
    }
  }
  console.log('Kon niet verbinden met MongoDB');
}

app.get('/', async (req, res) => {
  if (!db) return res.status(500).send('Database niet beschikbaar');
  try {
    await db.collection('messages').insertOne({ msg: 'Hallo van Jason!', time: new Date() });
    res.send('Bericht opgeslagen in MongoDB! 🚀');
  } catch (err) {
    res.status(500).send('Fout: ' + err.message);
  }
});

connectDB().then(() => {
  app.listen(3000, () => console.log('App listening on port 3000'));
});