const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let db
exports.mongoConnect=(callback)=>{
    MongoClient.connect('mongodb+srv://adnanfayazwani07:00000000@shoppinapp07.mea8bcg.mongodb.net/shop?retryWrites=true&w=majority').then(client => {
     db = client.db();
    callback()
  }).catch(err => {
    console.log('Error in connecting to the database', err);
    throw err
  });

}
exports. getDb=()=>{
    if(db){
        return db
    }
    throw 'No database found'
}