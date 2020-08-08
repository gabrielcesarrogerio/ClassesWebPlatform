const express = require('express');
const server = express();
const { pagelanding, pagestudy, pagegiveclasses, saveclasses } = require ('./pages');
//importação e configuração do template engine Nunjucks
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
    express: server,
    noCache: true,

})

server
.use(express.urlencoded({ extended:true }))
.use(express.static("public"))
.get("/", pagelanding)
.get("/study", pagestudy)
.get("/give-classes", pagegiveclasses)
.post("/save-classes", saveclasses)
.listen(5500);

