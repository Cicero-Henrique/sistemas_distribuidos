const DB_URL = 'mongodb://127.0.0.1:27017/';

const DB_SETTINGS = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    // user: '',
    // pass: '',
    dbName: 'ec021-av2-core'
};

module.exports = {
    DB_URL,
    DB_SETTINGS
}