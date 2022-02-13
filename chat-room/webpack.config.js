const path = require('path')

module.exports = {

// The entry point file described above

entry: {
    login: "./js/login.js",
    register: "./js/register.js",
    userChatRoom: "./js/user-chat-room.js",
    chatRoom: "./js/chat-room.js",
    chatRoomList: "./js/chat-room-list"
 },

// The location of the build folder described above

output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
 },

// Optional and for development only. This provides the ability to

// map the built code back to the original source format when debugging.

devtool: 'eval-source-map'
}