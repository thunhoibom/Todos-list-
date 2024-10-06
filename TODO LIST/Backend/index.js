import prisma from './routes/prisma.js'
import express from "express";
import cors from "cors";
import session from "express-session";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import router from './routes/CRUD.js'


const app = express();



app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://192.168.2.8:5173',
}));
app.use(session({
    secret: 'nguyens secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        secure: false,
    },
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 24 * 60 * 60 * 1000,
        },
    )
}));


app.post("/register", async (req, res) => {
    const {username,password,password_repeat} = req.body;
    try{


    }catch(error){
        console.error(error);
    }
})

app.post("/authorization", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json("title and is_completed required");
        }
        const checkingAccount = prisma.user.findUnique({
            where: {
                username: username,
                password: password
            }
        })
        if (req.session.authenticated) {
            req.session.save();
            return res.json(req.sessionID);
        } else {
            if (await checkingAccount) {
                req.session.authenticated = true;
                req.session.user = { username, password };
                req.session.save();
                return res.json(req.sessionID)
            } else {
                return res.send(404);
            }
        }
    } catch (err) {
        console.error(err);
    }

});

app.get("/authorization", async (req, res) => {
    if (!req.session.authenticated) {
        return res.json(false);
    } else {
        return res.json(true);
    }
});
app.get("/logout",async (req, res) =>{
    req.session.destroy(err =>{
        if(err){
            next(err);
        }else{
            res.clearCookie('connect.sid');
        }
    })
})
app.use("/", router);



const port = 5000;
app.listen(port, '192.168.2.8', () => {
    console.log("server is listening on: " + '192.168.2.8:' + port);
});



