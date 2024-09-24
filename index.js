import express from "express"
import cors from "cors"
import {updateNewPassword,updateVerification} from "./controllers/auth_controllers.js"

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static("public"))

// server home
app.get("/", (req, res) => {
    res.render("index")
})

// email veriifcation endpoint
app.get("/verify",async(req,res)=>{
    const {userId,secret}=req.query;
    console.log("userId",userId);
    console.log("secret",secret);

    try {
        await updateVerification(userId, secret);
    
        res.render("template", {title: "✅ Verificação Completa", message: "Seu endereço de e-mail foi verificado com sucesso."});
    } catch (e) {
        res.render("template", {title: "❌ Falha na Verificação", message: `⚠️ Motivo: ${e.message}`});
    }    
})

// password reset endpoint
app.get("/recovery", (req, res) => {
    const {userId,secret}=req.query;

    res.render("reset_password",{userId,secret,message:""});
});

// complete password reset post endpoint
app.post("/reset_password", async (req, res) => {
    const { userId, secret, password, password_confirm } = req.body;

    if (password !== password_confirm) {
        res.render("reset_password", {userId, secret, message: "As senhas não correspondem."});
    }
    
    if (password.length < 8) {
        res.render("reset_password", {userId, secret, message: "A senha deve ter pelo menos 8 caracteres."});
    }

    try {
        await updateNewPassword(userId,secret,password,password_confirm);
        
        res.render("template",{title:"✅ Senha alterada", message:"Sua senha foi alterada com sucesso.",});
    } catch (err) {
        res.render("template",{title:"❌ Falha na redefinição de senha", message:`⚠️ Reason : ${err.message}`,});
    }
});

// 404 error page
app.get("*", (req, res) => {
    res.render("template",{title:"❌ Error", message:"⚠️ Page not found",});
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})