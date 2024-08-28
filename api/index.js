const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'ajwn123wj1ejkqn1w4qw1';

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
}));

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  });

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}

app.get('/test', (req, res) => {
  res.json('test.ok');
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json({ userDoc });
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passwordOk = bcrypt.compareSync(password, userDoc.password);
    if (passwordOk) {
      jwt.sign({
        email: userDoc.email,
        id: userDoc._id,
        name: userDoc.name
      }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      });
    } else {
      res.status(422).json('password not matched');
    }
  } else {
    res.status(404).json('not found');
  }
});

app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        console.error('JWT verification error:', err);
        return res.status(500).json('Token verification failed');
      }
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.status(401).json('No token provided');
  }
});

app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});

app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  try {
    await imageDownloader.image({
      url: link,
      dest: path.join('/tmp/', newName),
    });
    const url = await uploadToS3('/tmp/' + newName, newName, mime.lookup('/tmp/' + newName));
    res.json(url);
  } catch (error) {
    console.error('Error downloading image:', error);
    res.status(500).json('Failed to download image');
  }
});

const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
    const uploadedFiles = [];
    try {
        for (let i = 0; i < req.files.length; i++) {
            const { path: tempPath, originalname } = req.files[i];
            const ext = path.extname(originalname);
            const newPath = tempPath + ext;

            fs.renameSync(tempPath, newPath);
            uploadedFiles.push(path.basename(newPath));
        }
        res.json(uploadedFiles);
    } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json('Failed to upload files');
    }
});

app.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title, location, addedPicture, description,
    features, extraInfo, moveIn, lease, maxStudents, rent
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      location,
      pictures: addedPicture,
      description,
      features,
      extraInfo,
      moveIn,
      lease,
      maxStudents,
      rent
    });
    res.json(placeDoc);
  });
});

app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json('No token provided');
  }
  jwt.verify(token, jwtSecret, async (err, userData) => {
    if (err) {
      console.error('JWT verification error:', err);
      return res.status(403).json('Token verification failed');
    }
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  });
});

app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

app.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id, title, location, addedPicture, description,
    features, extraInfo, moveIn, lease, maxStudents, rent
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        location,
        pictures: addedPicture,
        description,
        features,
        extraInfo,
        moveIn,
        lease,
        maxStudents,
        rent
      });
      await placeDoc.save();
      res.json('ok');
    }
  });
});

app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

app.post('/viewings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, viewing, name, email, phone } = req.body;
  Booking.create({
    user: userData.id,
    place,
    viewing,
    name,
    email,
    phone
  }).then((doc) => {
    res.json(doc);
  }).catch((err) => {
    throw err;
  });
});

app.get('/viewings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});