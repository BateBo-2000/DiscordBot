/*
 *This model is for storing user voice sessions
 *Session starts when you join call and ends when you leave it 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const actionSchema = new Schema({
    timestamp: {
        type: String,
        required: true
    },
    channelId: {
        type: String,
        required: true
    },
    channelName: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    actionDescription: {
        type: String,
        required: true
    }
})

const sessionSchema = new Schema({
    userId: {
        type: String,
        required:true
    },
    username: {
        type: String,
        required: true
    },
    sessionStart:{
        type: Date,
        required: true
    },
    actions: {
        type: [actionSchema],
        required: true
    },
})

const SessionModel = mongoose.model('Session', sessionSchema);

module.exports = SessionModel;
