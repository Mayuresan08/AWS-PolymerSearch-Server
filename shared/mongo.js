const {MongoClient} = require("mongodb")

const client= new MongoClient(process.env.MONGODB_URL)

module.exports={
    db:null,

    repo:null,
 
   async connect()
   {
       await client.connect()
       console.log("Connected to Db",process.env.MONGODB_URL)
       this.db=client.db(process.env.MONGODB_NAME)
       console.log("Database Selected",process.env.MONGODB_NAME)
       this.repo=this.db.collection("repo")
   }
    
}