const express = require('express');
require('dotenv').config()
const Cors = require('cors')
const courseRoute = require('./routes/courseRouter')
const mongoose = require('mongoose');
const route = require('./routes/authRoute');
const App = express()
App.use(express.json())
App.use(Cors({ origin: true, credentials: true }))
// App.use('/course', courseRoute)
App.use('/auth', route)
App.use('/task' , courseRoute)
App.get("/", (req, res) => {
    res.send("Server Started");
});
mongoose.connect(process.env.MONGOS_URL)
    .then(res => {
        App.listen(process.env.PORT, () => {
            console.log(`Database is Connected and Server Start http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })

