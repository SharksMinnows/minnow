const express = require('express');
const app = express();
const path = require('path')
const authRoutes = require('./routes/auth-routes.js');
// const passportSetup = require('./passport-config.js')
const PORT = 3333;


app.use('/auth', authRoutes)

app.use(express.static(path.join(__dirname, '../build')))

app.get('/', (req, res) => {
    res.status(200)
    res.sendFile(path.join(__dirname, '../build/index.html'));  
}); 


app.listen(PORT, console.log(`Listening on port ${PORT}`));