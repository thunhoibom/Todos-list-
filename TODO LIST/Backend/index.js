import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'nguyens secret',
    saveUninitialized: false,
    cookie: { maxAge: 30000 },
    
}));


//Session
app.get('/set_session',(req,res) => {
    req.session.Nguyen = {
        fullName: "Doan Doan Nguyen",
        age:'19',
        nationality: "Vietnamese"
    }
    return res.status(200).json({status:"session set"});
});
app.get('/get_session',(req,res) => {
    if(req.session.Nguyen){
        return res.status(200).json({status:"success",session:req.session.Nguyen})
    }
    return res.status(204).json({status: "error", session:"no session"});
})
// app.post("/login", (req, res) => {
//     const {username,password} = req.body;
//     if(username&&password){
//         // if(req.sessionID === store.session)
//         store.all((err,sessions) =>{
//             console.log(sessions.find(session => session.id === req.sessionID));
//         });
//       if (req.session.authenticated){
//         return res.json(req.session);
//       }else{
//         if(password === "123"){
//             req.session.authenticated = true;
//             req.session.user = {username,password};
//            return res.json(req.session);
//         }else{
//            return res.status(403).json("msg: bad credentials");
//         }
//       }
//     }else{
//         return res.status(403).json("msg: bad credentials");
//     }
// })

app.post("/authorization",async (req,res) => {
    const {username,password} = req.body;

    
    const sessionID = req.sessionID;
    if(await prisma.sessions.findFirst({
        where:{sessionID},
    })){
        return res.json()
    }else{
        await prisma.sessions.create({
            data:{
                sessionID: sessionID,
                user: {
                    create:{
                        username: username,
                        password: password
                    }
                }
            }
        })
    }
    return res.send(200);
});




//GET
app.get('/home', (req, res) => {
    res.send('welcome home');
  });

app.get("/api/todolist", async (req,res) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
});

//POST
app.post("/api/todolist", async(req,res) => {
    var {id,title, is_completed} = req.body;
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
                    create:{
                        username:"chicken",
                        password:"123"
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
app.put("/api/todolist/:id", async (req,res) => {
    const {title, is_completed} = req.body;
    const id = req.params.id;

    if(!id){
        return res.status(400).send("id must be valid string");
    }

    try{
        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: {title, is_completed}
        })
        res.json(updatedTodo);
    }catch(error){
        res.status(500).send("Oops, something went wrong");
    }

})
//delete
app.delete("/api/todolist/:id",async (req,res) => {
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

const port = 5000;
app.listen(port,'192.168.2.8',() => {
    console.log("server is listening on: " + '192.168.2.8:' + + port );
});



