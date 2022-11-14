const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        // mongodb+srv://waleedkhan:waleedkhan99@cluster0.1m4k88t.mongodb.net/test
        mongoose.connect("mongodb+srv://waleedkhan:waleedkhan99@cluster0.1m4k88t.mongodb.net/authInMern-app", connectionParams);
        console.log('Connected to Database Successfully');
    } catch (error) {
        console.log(error);
        console.log('Could not Connected to DB...');
    }
}