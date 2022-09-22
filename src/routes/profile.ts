const Router = require("express")
const db = require("../../models/index")

const router = Router()

router.get("/", async (req:any,res:any)=>{
    try {
    const {id} = req.body
    const user = await db.User.findByPk(id)
    res.status(200).send(user)  
    } catch (error) {
        res.status(404).send(error)
    }
})