import express from "express"
import prisma from "./prisma.js";
const router = express.Router();

//GET

router.get("/api/todolist", async (req,res) => {
    if(!req.session.authenticated){
        console.log(req.session.authenticated)
        return res.json(false);
    }
    try{
        const todos = await prisma.todo.findMany({
            orderBy: [
                {index: 'asc'}
            ],
        });
        return res.json(todos);
    }catch(err){
        console.log(err)
    }
});

//POST
router.post("/api/todolist", async(req,res) => {
    var {id,title, is_completed} = req.body;
    const username = req.session.user.username;
    console.log(username);
    if(!title || is_completed == null){
        return res.status(400).send("title and is_completed required");
    }
    try{
        const todo = await prisma.todo.create({
            data: {
                id, 
                title, 
                is_completed,
                user:{
                    connect:{
                        username:username
                    }
                }
             },
        });
        res.json(todo);
    }catch(error){
        console.error(error);
        res.status(500).send("Oops, something went wrong");
    }
})


//PUT
router.put("/api/todolist/:id", async (req,res) => {
    const {title} = req.body;
    const id = req.params.id;

    if(!id){
        return res.status(400).send("id must be valid string");
    }

    try{
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: {
                title : title
            }
        })
        res.json(updatedTodo);
    }catch(error){
        res.status(500).send("Oops, something went wrong");
    }

})
router.put("/api/todolist/iscompleted/:id", async (req,res) => {
    const id = req.params.id;
    const is_completed = req.body.is_completed;

    try{
        const updatedTodo = await prisma.todo.update(
            {
                where: {id},
                data: {
                    is_completed: is_completed
                }
            }
        );
        return res.send(updatedTodo);
    }catch(err){
        return res.send(500);
    }
})
//delete
router.delete("/api/todolist/:id",async (req,res) => {
    const id = req.params.id;
    if(!id){
        return res.send("Id is not valid or undefined");
    }
    try{
        await prisma.todo.delete({
            where: {id},
        })
        res.status(204).send();
    }catch(error){
        res.status(500).send("Oops, something went wrong");
    }
})

export default router;