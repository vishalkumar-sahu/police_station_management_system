const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const db = require('../config/database_conn')

// import M from 'materialize-css'
router.get('/register', (req, res) =>{
    res.render('register.ejs')
});

router.post('/register', (req, res) =>{
    console.log(req.body)

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    const aadhar_no = req.body.aadhar_no
    const email = req.body.email
    const contact_no = req.body.contact_no
    const house_no = req.body.house_no
    const locality = req.body.locality
    const city = req.body.city
    const district = req.body.district
    const state = req.body.state
    const postal_code = req.body.postal_code

    if(password == confirm_password){
        db.query('SELECT email FROM citizen WHERE email = ?', [email], async (error, result)=>{
            if(error){
                console.log(error)
            }

            if(result.length > 0){
                return res.render('register', {
                    message: 'This email already in use !!'
                })
            }
            
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword)

            db.query('INSERT INTO citizen SET ?', {password : hashedPassword, aadhar_no : aadhar_no, first_name : first_name, last_name : last_name, email:email, contact_no:contact_no, house_no:house_no, locality:locality, city:city, district:district, state:state, postal_code:postal_code}, (error, result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(result)
                    return res.redirect('/citizen/')
                }
            })


        })
    }
    else{
        return res.render('register', {
            message: "Passwords doesn't match !!!"
        })
    }




})

router.post('/login', (req, res) =>{
    const { email, password } = req.body;

    db.query('SELECT password FROM citizen WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result.length == 1){

            console.log(result[0]['password'])
            
            await bcrypt.compare(password, result[0]['password'], (err, result)=>{
                if(err){
                    console.log(err);
                }

                if(result){
                    return res.redirect('/citizen/')
                }
                else{
                    return res.redirect('/')
                }

            })

        }
        else{
            return res.render('register', {
                message: 'Please register !!!'
            })
            // return window.alert("Please register !!!")
        }
    })

})


module.exports = router;