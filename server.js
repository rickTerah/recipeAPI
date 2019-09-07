
//MONGO-PASSWORD: iXlgaOekqxgZE5zU
// Connection-String: mongodb+srv://patrick:<password>@cluster0-etffg.mongodb.net/test?retryWrites=true&w=majority
require('express-async-errors');
const mongoose = require('mongoose');
const app = require('./app');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb+srv://patrick:iXlgaOekqxgZE5zU@cluster0-etffg.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser:true})
    .then(() => console.log('Successfully connected to MongoDB Atlas... 🙂'))
    .catch( error => console.log('Could not connect to MongoDB atlas 😥', error));

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening to port number ${port}`));