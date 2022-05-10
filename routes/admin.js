const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const db = require('../config/database_conn')

router.post('/login', (req, res) =>{
    const { email, password } = req.body;

    db.query("SELECT password FROM official WHERE post = 'Comissioner' AND email = ?", [email], async (error, result)=>{
        if(error){
            console.log(error)
        }

        console.log(result)
        if(result.length == 1){
            
            if(password == result[0]['password']){
                return res.redirect('/admin/')
            }
            else{
                return res.redirect('/')
            }

        }
        else{

            db.query('SELECT password FROM official WHERE email = ?', [email], async (error, result)=>{
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
                            return res.redirect('/admin/')
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

        }
    })

})

router.post('/registerAdmin', (req, res) =>{
    console.log(req.body)

    const official_name = req.body.official_name
    const password = req.body.password
    const confirm_password = req.body.confirm_password
    const email = req.body.email
    const contact_no = req.body.contact_no
    const post = req.body.post

    const email_adder = req.body.official_id;

    if(password == confirm_password){
        db.query('SELECT email FROM official WHERE email = ?', [email], async (error, result)=>{
            if(error){
                console.log(error)
            }

            if(result.length > 0){
                return res.render('registerAdmin', {
                    message: 'This email already in use !!'
                })
            }
            
            let hashedPassword = await bcrypt.hash(password, 8);
            console.log(hashedPassword)

            db.query('SELECT * FROM official WHERE email = ?', [email_adder], async (error, result)=>{
                if(error){
                    console.log(error)
                }
        
                if(result){
                    const official_id = result[0].official_id;
        
                    db.query('INSERT INTO official SET ?', {password : hashedPassword, official_name : official_name, email:email, contact_no:contact_no, post : post, adder_officer : official_id}, (error, result)=>{
                        if(error){
                            console.log(error)
                        }
                        else{
                            console.log(result)
                            return res.redirect('/admin/')
                        }
                    })
        
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

router.post('/registerVehicle', (req, res) =>{
    console.log(req.body)

    const email = req.body.official_id;
    const vehicle_no = req.body.vehicle_no
    const vehicle_type = req.body.vehicle_type
    const description = req.body.description

    db.query('SELECT vehicle_no FROM vehicle WHERE vehicle_no = ?', [vehicle_no], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result.length > 0){
            return res.redirect('/admin/')
        }
        
        db.query('SELECT * FROM official WHERE email = ?', [email], async (error, result)=>{
            if(error){
                console.log(error)
            }

            if(result){
                const official_id = result[0].official_id;

                db.query('INSERT INTO vehicle SET ?', {vehicle_no : vehicle_no, vehicle_type : vehicle_type, description : description, official_id : official_id}, (error, result)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log(result)
                        return res.redirect('/admin/')
                    }
                })

            }
            
        })

    })

})

router.post('/registerWeapon', (req, res) =>{
    console.log(req.body)

    const weapon_type = req.body.weapon_type
    const quantity = req.body.quantity
    const no_of_bullets = req.body.no_of_bullets
    const description = req.body.description

    const email = req.body.official_id;

    db.query('SELECT * FROM official WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result){
            const official_id = result[0].official_id;

            db.query('INSERT INTO weapon SET ?', {weapon_type : weapon_type, quantity : quantity, description : description, no_of_bullets : no_of_bullets, official_id : official_id}, (error, result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(result)
                    return res.redirect('/admin/')
                }
            })

        }
        
    })

})

router.post('/registerCriminal', (req, res) =>{
    console.log(req.body)

    const first_name = req.body.first_name
    const middle_name = req.body.middle_name
    const last_name = req.body.last_name
    const criminal_contact_no = req.body.criminal_contact_no
    const fir_no = req.body.fir_no
    const aadhar_no = req.body.aadhar_no
    const description = req.body.description

    const email = req.body.official_id;

    db.query('SELECT aadhar_no FROM criminal_record WHERE aadhar_no = ?', [aadhar_no], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result.length > 0){
            return res.redirect('/admin/')
        }
        
        db.query('SELECT * FROM official WHERE email = ?', [email], async (error, result)=>{
            if(error){
                console.log(error)
            }
    
            if(result){
                const official_id = result[0].official_id;
    
                db.query('INSERT INTO criminal_record SET ?', {first_name : first_name, middle_name : middle_name, last_name : last_name, criminal_contact_no : criminal_contact_no, description : description, aadhar_no : aadhar_no, fir_no : fir_no, official_id : official_id}, (error, result)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log(result)
                        return res.redirect('/admin/')
                    }
                })
    
            }
            
        })


    })

})

router.post('/registerChallan', (req, res) =>{
    console.log(req.body)

    const dl_number = req.body.dl_number
    const vehicle_type = req.body.vehicle_type
    const vehicle_no = req.body.vehicle_no
    const date_and_time = req.body.date_and_time
    const voilation = req.body.voilation
    const fine_amount = req.body.fine_amount
    const payment_status = req.body.payment_status
    const aadhar_no = req.body.aadhar_no

    const email = req.body.official_id;

    db.query('SELECT * FROM official WHERE email = ?', [email], async (error, result)=>{
        if(error){
            console.log(error)
        }

        if(result){
            const official_id = result[0].official_id;

            db.query('INSERT INTO challan SET ?', {dl_number : dl_number, vehicle_type : vehicle_type, vehicle_no : vehicle_no, date_and_time : date_and_time, aadhar_no : aadhar_no, voilation : voilation, fine_amount : fine_amount, payment_status : payment_status, official_id  : official_id }, (error, result)=>{
                if(error){
                    console.log(error)
                }
                else{
                    console.log(result)
                    return res.redirect('/admin/')
                }
            })

        }
        
    })


})


module.exports = router;