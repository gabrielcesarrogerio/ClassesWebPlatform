const proffys = [
    {name: "Diego Fernandes", 
    avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", 
    whatsapp:"899876545", 
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.", 
    subject:"Química", 
    cost:"20", 
    weekday: [0], 
    time_from: [720], 
    time_to:[1220]
},
{name: "Gabriel César Rogério", 
    avatar:"https://avatars1.githubusercontent.com/u/65733524?s=460&u=798663e3882b7befbb3f43002b21bea100510743&v=4", 
    whatsapp:"19999039657", 
    bio:"Entusiasta das melhores tecnologias de Física quântica.<br><br>Apaixonado por explodir uma onda sonora e por mudar a vida das pessoas através da fórmula do cálculo de massa. Mais de 200.000.000.000 pessoas já passaram por uma das minhas equações.", 
    subject:"Física", 
    cost:"758", 
    weekday: [1], 
    time_from: [720], 
    time_to:[1220]
}
]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação Física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química"
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

const getsubject = (subjectnumber) => {
    const arrpos = +subjectnumber - 1
    return subjects[arrpos]
}

const pagelanding = (req, res) => {
    return res.render("index.html")
}

const pagestudy= (req, res) => {
    const filters = req.query;
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

const pagegiveclasses = (req, res) => {
    const dados = req.query;
    const empty = Object.keys(dados).length > 0;
    if(empty)  {
        dados.subject = getsubject(dados.subject)  
        proffys.push(dados)
        return res.redirect("/study")
    }
    return res.render("give-classes.html", {subjects, weekdays})
}
const express = require('express');
const server = express();
//importação e configuração do template engine Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,

})

server.use(express.static("public"))
.get("/", pagelanding)
.get("/study", pagestudy)
.get("/give-classes", pagegiveclasses)
.listen(5500);

