const Entry = require('../models/DictionaryEntry')

exports.getHello = async (req, res) => {
    try {
        return res.status(200).json({"text": "hello from the server!"})
    } catch (e) {
        return res.status(400).send()
    }
}

exports.getWords = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery
        console.log("searchQuery:", searchQuery)

        // fetch spanish words matching user query
        const entries = await Entry.find({
            sp_word: { $regex: '^' + searchQuery, $options: 'i'}
        }).limit(10)

        return res.status(200).json({entries})

    } catch (e) {
        return res.status(400).send()
    }
}