const DB_URL = 'mongodb+srv://adauto:adauto@cluster0-rven8.mongodb.net/test?retryWrites=true&w=majority';

const DB_SETTINGS = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    // user: '',
    // pass: '',
    dbName: 'ec021'
};

module.exports = {
    DB_URL,
    DB_SETTINGS
}