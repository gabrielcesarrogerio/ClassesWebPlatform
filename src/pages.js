const Database = require('./database/db');

const { subjects, weekdays, getsubject,converthrstomin } = require('./utils/format')

const pagelanding = (req, res) => {
    return res.render("index.html")
}

const pagestudy= async (req, res) => {
    const filters = req.query;
    if(!filters.subject || !filters.weekday || !filters.time){
        return res.render("study.html", {filters, subjects, weekdays})
    }
    const timetomin = converthrstomin(filters.time);
    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekday}
            AND class_schedule.time_from <= ${timetomin}
            AND class_schedule.time_to > ${timetomin}
        )
        AND classes.subject = '${filters.subject}'
    `
    try {
        const db = await Database
        const proffys = await db.all(query)
        proffys.map((proffy) => {
            proffy.subject = getsubject(proffy.subject)
        })
        return res.render('study.html', { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error);
    }
}

const pagegiveclasses = (req, res) => {
    
    return res.render("give-classes.html", {subjects, weekdays})
}

async function saveclasses(req, res){
    const createproffy = require('./database/createproffy')
    const proffyvalue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classvalue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classschedulevalues = req.body.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: converthrstomin(req.body.time_from[index]),
            time_to: converthrstomin(req.body.time_to[index])
        }
    })
    try {
        const db = await Database
        await createproffy(db, {proffyvalue, classvalue, classschedulevalues})
        let querystring="?subject=" + req.body.subject
        querystring += "&weekday=" + req.body.weekday[0]
        querystring += "&time=" + req.body.time_from[0] 
        return res.redirect("/study" + querystring)
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = {
    pagelanding,
    pagestudy,
    pagegiveclasses,
    saveclasses
}