/*
This Model is for Storing user data! (:
   add history and detecting changes of names and pfps
*/
const { mongoose } = require('../DatabaseClient');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    globalName: {
        type: String,
        required: false,
    },
    discriminator: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    bot: {
        type: Boolean,
        required: false,
    },
    system: {
        type: Boolean,
        required: false,
    },
    mfaEnabled: {
        type: Boolean,
        required: false,
    },
    banner: {
        type: String,
        required: false,
    },
    accentColor: {
        type: Number,
        required: false,
    },
    locale: {
        type: String,
        required: false,
    },
    verified: {
        type: Boolean,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    flags: {
        type: Number,
        required: false,
    },
    premium: {
        type: Number,
        required: false,
    },
    publicFlags: {
        type: Number,
        required: false,
    },
    avatarDecoration: {
        type: String,
        required: false,
    },
    experience: {
        type: Number,
        default: 0
    },
    serverId: {
        type: String,
        required:true,
        default:"820441979971960863"
    },
    serverName: {
        type: String,
        required:true,
        default:"Килера"
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
