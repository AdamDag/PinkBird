const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({ "users": ["Alternative Data 1", "Alternative Data 1", "Alternative Data 1", "Alternative Data 1"] })
})

app.listen(5000, () => {console.log("Server started on port 5000")})