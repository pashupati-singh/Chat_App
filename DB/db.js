

const mongoose = require('mongoose');
const dotenv = require("dotenv");

dotenv.config();

exports.connections = mongoose.connect(process.env.URL);

