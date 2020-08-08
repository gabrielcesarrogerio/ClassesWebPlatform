module.exports = async function(db, { proffyvalue, classvalue, classschedulevalues }){
    const insertedproffy = await db.run(`
        INSERT INTO proffys (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyvalue.name}",
            "${proffyvalue.avatar}",
            "${proffyvalue.whatsapp}",
            "${proffyvalue.bio}"
        );
    `)
    const proffy_id = insertedproffy.lastID;

    const insertedclass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classvalue.subject}",
                "${classvalue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedclass.lastID;

    const insertedallclassschedulevalues = classschedulevalues.map((value) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${value.weekday}",
                "${value.time_from}",
                "${value.time_to}"
            ); 
        `)
    })

    await Promise.all(insertedallclassschedulevalues)

}