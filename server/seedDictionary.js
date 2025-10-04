const fs = require("fs")
const mongoose = require('mongoose')
const Entry = require('../server/models/DictionaryEntry')
require('dotenv').config()

async function loadDictionary() {
    try {
        const uri = process.env.MONGO_URI

        await mongoose.connect(uri)
            .then(() => {console.log("connected to db!")})
    


        // load json file
        const raw = fs.readFileSync("D:/es_en_dict/es_en_dict.json", "utf8");
        const dict = JSON.parse(raw);

        await Entry.deleteMany({}); // wipe collection

        const bulkOps = Object.entries(dict).map(([sp_word, translations]) => ({
            sp_word,
            translations: translations.map(([en_word, data]) => ({
                en_word,
                sp_count: data[0],
                en_count: data[1],
                probability: data[2],
                POS: data[3],
                gender: data[4],
                article: data[5],
            })),
        }))

        await Entry.insertMany(bulkOps);

        console.log("Dictionary seeded successfully!");

    } catch (e) {
        console.error("Error seeding dictionary:", e)
    } finally {
        mongoose.connection.close();
    }

}

loadDictionary()