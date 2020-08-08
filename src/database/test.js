const Database = require('./db')
const createproffy = require('./createproffy')
Database.then(async (db) => {
    proffyvalue = {
        name: "Gabriel César Rogério", 
        avatar:"https://avatars1.githubusercontent.com/u/65733524?s=460&u=798663e3882b7befbb3f43002b21bea100510743&v=4", 
        whatsapp:"19999039657", 
        bio:"Entusiasta das melhores tecnologias de Física quântica.<br><br>Apaixonado por explodir uma onda sonora e por mudar a vida das pessoas através da fórmula do cálculo de massa. Mais de 200.000.000.000 pessoas já passaram por uma das minhas equações.", 
    }

    classvalue = {
        subject: 1, 
        cost:"758", 
    }

    classschedulevalues = [
        {
            weekday: 1, 
            time_from: 720, 
            time_to: 1220
        },
        {
            weekday: 0, 
            time_from: 520, 
            time_to: 1220
        }
    ]

    // await createproffy(db, {proffyvalue, classvalue, classschedulevalues});
    const selectedproffys = await db.all("SELECT * FROM proffys");
    // console.log(selectedproffys);

    const selectproffyclass = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectproffyclass)

    const selectclassesschedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)
    console.log(selectclassesschedule);
});