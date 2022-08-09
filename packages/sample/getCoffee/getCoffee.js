// The function's dependencies.
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv')

dotenv.config({path: './.env'})
// Function starts here.
async function main() {

    // MongoDB client configuration.
    const DATABASE_URL = process.env['DATABASE_URL'];
    console.log('----logging----')
    console.log(DATABASE_URL)
    console.log('----logging----')
    let client = new MongoClient(DATABASE_URL);
    // Instantiates a connection to the database and retrieves data from the `available-coffee` collection
    try {
        console.log("------inside try-------")
        await client.connect();
        console.log("------2-------")
        const inventory = await client.db("do-coffee").collection("available-coffees").find().toArray();
        console.log(inventory);
        return {
            "body": inventory
        };
    } catch (err) {
        console.log("----------error------------")
        console.error(err);
        return {
            "body": { "error": "There was a problem retrieving data." },
            "statusCode": 400
        };
    } finally {
        await client.close();
    }
}
main()
// IMPORTANT: Makes the function available as a module in the project.
// This is required for any functions that require external dependencies.
module.exports.main = main;