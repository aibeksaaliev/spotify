import express from "express";
import User from "../models/User";
import mongoose from "mongoose";
import {OAuth2Client} from "google-auth-library";
import config from "../config";
import * as crypto from "crypto";
import {avatarsUpload} from "../multer";
import axios from "axios";

const usersRouter = express.Router();
const client = new OAuth2Client(config.google.clientId);

usersRouter.post('/', avatarsUpload.single('avatar'), async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      displayName: req.body.displayName,
      avatar: req.file ? req.file.filename : null
    });

    user.generateToken();
    await user.save();
    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

usersRouter.post('/google', async (req, res, next) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: req.body.credential,
      audience: config.google.clientId
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(400).send({error: "Google login error!"});
    }

    const email = payload.email;
    const id = payload.sub;
    const displayName = payload.name;
    const avatar = payload.picture;

    if (!email) {
      return res.status(400).send({error: "Not enough user data to continue."});
    }

    let user = await User.findOne({googleId: id});

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        googleId: id,
        displayName,
        avatar
      })
    }

    user.generateToken();
    await user.save();

    return res.send({ message: "Login with Google successful!", user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/facebook', async (req, res, next) => {
  try {
    const { accessToken, userID } = req.body;

    if (!accessToken || !userID) {
      return res.status(400).send({error: "Not enough user data to continue."});
    }

    const response = await axios.get(`https://graph.facebook.com/v12.0/${userID}?fields=name,email,picture&access_token=${accessToken}`);

    const { name, email, picture } = response.data;

    if (!email) {
      return res.status(400).send({error: "Not enough user data to continue."});
    }

    let user = await User.findOne({facebookId: userID});

    if (!user) {
      user = new User({
        username: email,
        password: crypto.randomUUID(),
        displayName: name,
        avatar: picture?.data?.url,
        facebookId: userID,
      })
    }

    user.generateToken();
    await user.save();

    return res.send({ message: "Login with Facebook successful!", user });
  } catch (e) {
    return next(e);
  }
});

usersRouter.post('/sessions', async (req, res) => {
  const user = await User.findOne({username: req.body.username});

  if (!user) {
    return res.status(400).send({error: "Username not found"});
  }

  const isMatch = await user.checkPassword(req.body.password);

  if (!isMatch) {
    return res.status(400).send({error: 'Invalid password'});
  }

  user.generateToken();
  await user.save();

  return res.send({message: "Username and password are correct", user});
});

usersRouter.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const success = {message: "OK"};

    if (!token) {
      return res.send(success);
    }

    const user = await User.findOne({token});

    if (!user) {
      return res.send(success);
    }

    user.generateToken();
    await user.save();

    return res.send(success);
  } catch (e) {
    return next(e);
  }
});

export default usersRouter;