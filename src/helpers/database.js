const { MongoClient, ServerApiVersion } = require('mongodb');
const { dbUser, dbPass } = require('../config.json');
const uri = `mongodb+srv://${dbUser}:${dbPass}@dataseat.vaagmmc.mongodb.net/?retryWrites=true&w=majority`;

const dbclient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

function readDB(cgroup,row,query){
    dbclient.connect(err => {
        const collection = dbclient.db("FeralV2").collection(cgroup);
        // perform actions on the collection object
        dbclient.close();
      });
}

function writeDB(cgroup,row,value){
    dbclient.connect(err => {
        const collection = dbclient.db("FeralV2").collection(cgroup);
        // perform actions on the collection object
        dbclient.close();
      }); 
}

function updateDB(cgroup,row,newvalue){
    dbclient.connect(err => {
        const collection = dbclient.db("FeralV2").collection(cgroup);
        // perform actions on the collection object
        dbclient.close();
      }); 
}

module.exports = {readDB,writeDB,updateDB}