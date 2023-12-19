const mongoose = require('mongoose')
const CourseScheema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    taskStatus: {
        type: String,
        enum: ['pending', 'completed'], 
        default: 'pending',

    }
},
    {
        timestamps: true
    })

const CourseModel = mongoose.model('/tasks', CourseScheema)

module.exports = CourseModel