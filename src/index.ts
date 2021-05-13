import cors from "cors";
import "dotenv/config";
import express from "express";
import mongoose from 'mongoose';
import path from 'path';
import { Router } from 'express';
// import * as usersRouter from '../routes/api/users';
import passport from 'passport';
// const mongoose = require('mongoose');
const users = require('../routes/api/users');
const reviews = require('../routes/api/reviews');
const pizzaPlaces = require('../routes/api/pizza-places');

//Type Script is new to me, I apologize that the way I wrote it may be odd. I just dove in feet 1st to finish this ASAP

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
    this.app.use(passport.initialize());
require('../config/passport')(passport);
  }
  public routes(): void {
    const routes = Router();
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
