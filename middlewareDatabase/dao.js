const Meme = require('./database/models/Meme');

async function insert (meme) {
    let result = await Meme.create(meme);
    return result;
}

async function list (id) {
    let memes = [];

    if (id) {
        memes = await Meme.findById(id);
    } else {
        memes = await Meme.find();
    }

    return memes;
}

async function update (id, meme) {
    let result = await Meme.replaceOne({"_id": id}, meme);
    return result;
}

async function deleteCar (id) {
    let result = await Meme.findByIdAndDelete({"_id": id});
    return result;
}

module.exports = {
    insert,
    list,
    update,
    deleteCar
};

