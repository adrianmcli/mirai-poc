const functions = require("firebase-functions");
const firebase = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

const MetaAuth = require("meta-auth");

const metaAuth = new MetaAuth({
  banner: "Mirai Marketplace"
});

const firebaseApp = firebase.initializeApp(functions.config().firebase);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/timestamp", (req, res) => {
  res.send(`${Date.now()}`);
});

// firebase.database().ref().remove();

app.get("/timestamp-cached", (req, res) => {
  res.set("Cache-Control", "public, max-age=300, s-maxage=600");
  res.send(`${Date.now()}`);
});

app.get("/books", (req, res) => {
  const { bookId } = req.query;
  const ref = firebaseApp.database().ref("books");

  ref
    .orderByChild("bookId")
    .equalTo(bookId)
    .once("value")
    .then(snap => snap.val())
    .then(x => {
      let id;
      for (const i in x) {
        id = i;
      }
      if (x) {
        res.status(200).json(x[id].bookTitle);
      } else {
        res.sendStatus(404);
      }
    });
});

app.post("/books", (req, res) => {
  const { bookId, bookTitle, secret } = req.body;
  const ref = firebaseApp.database().ref("books");
  checkIfBookExists(bookId, ref).then(x => {
    if (x) return res.sendStatus(401);
    const book = {
      bookId: bookId,
      bookTitle: bookTitle,
      secret: secret
    };
    ref.push(book);
    return res.sendStatus(200);
  });
});

app.get("/auth/:MetaAddress", metaAuth, (req, res) => {
  // Request a message from the server
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge);
  }
});

app.get("/auth/:MetaMessage/:MetaSignature", metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.recovered) {
    // Signature matches the cache address/challenge
    // Authentication is valid, assign JWT, etc.
    const { bookId } = req.query;
    if (books[bookId]) {
      return res.status(200).json({ secret: books[bookId].secret });
    }
  } else {
    // Sig did not match, invalid authentication
    res.status(400).send();
  }
});

function checkIfBookExists(bookId, ref) {
  const promise = new Promise((resolve, reject) => {
    ref
      .orderByChild("bookId")
      .equalTo(bookId)
      .once("value")
      .then(snap => snap.val())
      .then(x => {
        console.log(x);
        resolve(x !== null);
      });
  });
  return promise;
}

// module.exports = app;
exports.app = functions.https.onRequest(app);
