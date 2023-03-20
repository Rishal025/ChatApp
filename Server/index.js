const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require("cors");
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const conversationRoute = require('./routes/conversation')
const messageRoute = require('./routes/messages')

require("dotenv").config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error));

app.use(express.json());
app.use(helmet());
app.use(morgan("short"));

app.use(
  cors({
      origin: ["http://localhost:5173"],
      methods:["GET","POST","DELETE", "PUT"],
      credentials: true
  })
)

// ["http://localhost:5173"]

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/conversation', conversationRoute);
app.use('/api/messages', messageRoute);

app.listen(8800, () => {
    console.log('server starts running!');
});