const express = require('express');
const router = express.Router();
const db = require('../config/database_conn')

router.get('/', (req, res)=>{
    res.render('citizen.ejs')
})

router.post('/register_fir', (req, res)=>{
    console.log(req.body)

    const suspect_name = req.body.suspect_name
    const contact_no = req.body.contact_no
    const gender = req.body.gender
    const address = req.body.address
    const place_of_incident = req.body.place_of_incident
    const date_and_time = req.body.date_and_time
    const brief = req.body.brief

    const email = req.body.citizen_id;

    db.query('SELECT * FROM citizen WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result){
            const user_id = result[0].user_id;

            db.query('INSERT INTO fir SET ?', {suspect_name : suspect_name, contact_no : contact_no, gender : gender, address : address, place_of_incident : place_of_incident, date_and_time : date_and_time, brief : brief, user_id : user_id}, (error, result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(result)
                    return res.redirect('/citizen')
                }
            })

        }
        
    })

})

router.post('/requestPermission', (req, res)=>{
    console.log(req.body)

    const subject = req.body.subject
    const no_of_person = req.body.no_of_person
    const date_and_time = req.body.date_and_time
    const location = req.body.location
    const brief = req.body.brief

    const email = req.body.citizen_id;

    db.query('SELECT * FROM citizen WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result){
            const user_id = result[0].user_id;

            db.query('INSERT INTO permission SET ?', {subject : subject, no_of_person : no_of_person, date_and_time : date_and_time, location : location, brief : brief, official_id : 1, user_id : user_id}, (error, result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(result)
                    return res.redirect('/citizen/')
                }
            })

        }
        
    })

})








module.exports = router;