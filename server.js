// Requires modules and libraries
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;

//Initialize app
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/budget', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


// routes
app.use(require("./routes/api.js"));

mongoose.set('debug', true);
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));