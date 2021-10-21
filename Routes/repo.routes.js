const router= require("express").Router()
const mongo =require("../shared/mongo")
router.get("/",async(req,res)=>{

    console.log(req.query)
    if(Object.keys(req.query).length === 0)
    {
        console.log("in")
    let repos= await mongo.repo.find().toArray()
    res.status(200).send(repos)
    }
    else{
    var query={}
    query['$and']=[];

    for(let key in req.query)
    {
        console.log(key,req.query[key])

        if(key === "stargazers_count" || key ==="forks_count" || key ==="watchers_count" ||  key ==="open_issues_count" )
        {
            // console.log("stars")
            values= req.query[key].split("-")
            // console.log(values)
            values=values.map(a=>  parseInt(a))
            // console.log(values,values[0],values[1])
            query['$and'].push({[key]:{$lt:values[1],$gte:values[0]}})
        }
        else if(key === "license")
        {
            query['$and'].push({"license.key":{$in:req.query[key].split("-")}})
        }
        else if(key === "has_wiki")
        {
           if( req.query[key] === 'true') query['$and'].push({[key]:true})
           else query['$and'].push({[key]:false})
           
        }
        else {
        query['$and'].push({[key]:{$in:req.query[key].split(",")}})
        }
    }
    console.log(query)

    let repos= await mongo.repo.find(query).toArray()
    console.log(repos)
    res.status(200).send(repos)
}
})

module.exports=router