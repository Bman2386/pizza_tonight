import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from 'mongoose';
import path from 'path';

// import passport from 'passport';
// const mongoose = require('mongoose');
const users = require('../routes/api/users');
const reviews = require('../routes/api/reviews');
const pizzaPlaces = require('../routes/api/pizza-places');

class CodingChallenge {
  private port = process.env.PORT;
  public app: express.Application;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.dataBase();
  }

  public start(): void {
    this.app.listen(this.port, () =>
      console.log(`Example app listening on port ${this.port}!`)
    );
  }
  public routes(): void {
    this.app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
    this.app.use('/api/users', users);
    this.app.use('/api/pizzaPlaces', pizzaPlaces);
    this.app.use('/api/reviews', reviews);

  }

  public config() {
    this.app.set("port", this.port);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
  }

   private dataBase() {
    const db = require('../config/keys').mongoURI;
    mongoose
      .connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
      .then(() => console.log("Connected to MongoDB successfully"))
      .catch(err => console.log(err));
  }
}

const codingChallenge = new CodingChallenge();
codingChallenge.start();
