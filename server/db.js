const mongoose = require('mongoose');

module.exports = () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        // mongodb+srv://' + process.env.NAME + ':' + process.env.PASSWORD + '@cluster0.1m4k88t.mongodb.net/test
        mongoose.connect(process.env.DB, connectionParams);
        console.log('Connected to Database Successfully');
    } catch (error) {
        console.log(error);
        console.log('Could not Connected to DB...');
    }
}