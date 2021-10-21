const router= require("express").Router()
const mongo =require("../shared/mongo")

router.get("/",async(req,res)=>
{
  let language=await mongo.repo.aggregate([
    {$group: { _id: "$language",count:{$sum: 1}}},
    {$project: {_id:0,language:"$_id",count:1}}]).toArray()

let topics=
    console.log(language)
    res.send(language)
})

module.exports=router