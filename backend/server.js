const express = require('express')
const app = express()
const server = require("./app")

const db = require("./db.js")
const port = 4000

const listener = server.listen(port, function () {
    console.log(`Server running on port: ${port}`)
})

// a function to stop listening to the port
const close = () => {
    listener.close()
}

// export the close function
module.exports = {
    close: close,
}
