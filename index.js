const express = require('express');
const mongoose = require('mongoose');
const Task = require('./task.model');

const app = express();

// Schritt 3: Stelle eine Verbindung zu einer MongoDB Atlas-Datenbank her. Stelle sicher, dass die Verbindung funktioniert.
mongoose.connect("mongodb+srv://christiangruender:8fBQzZdDlLX1kBE4@cluster0.xhnylat.mongodb.net/schrauben24?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

// Schritt 6: Erstelle eine einfache Middleware-Funktion, die alle Anfragen in der Console protokolliert (URL, HTTP-Methode, Datum und Uhrzeit der Anfrage).
app.use((req, res, next) => {
  const now = new Date().toISOString();
  console.log(`[${now}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static(__dirname));


// Schritt 5: Implementiere GET und POST Operationen für Aufgaben unter /tasks .
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.status(201).json(task);
});

// Schritt 2: Erstelle ein einfaches Express-Server-Setup, das auf Anfragen auf dem Port 3000 hört.
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
