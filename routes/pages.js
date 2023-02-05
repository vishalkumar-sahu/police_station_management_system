const express = require('express');
const router = express.Router();
const db = require('../config/database_conn')

router.get('/', (req, res) =>{
    res.render('index.ejs')
});

router.get('/logout', (req, res) =>{
    res.render('index.ejs')
});

router.get('/admin/', (req, res)=>{
    res.render('admin.ejs')
})

router.get('/citizen/', (req, res)=>{
    res.render('citizen.ejs')
})

router.get('/citizen/register_fir', (req, res)=>{
    res.render('register_fir.ejs')
})

router.get('/citizen/requestPermission', (req, res)=>{
    res.render('requestPermission.ejs')
})

router.get('/admin/registerAdmin', (req, res)=>{
    res.render('registerAdmin.ejs')
})

router.get('/admin/registerVehicle', (req, res)=>{
    res.render('registerVehicle.ejs')
})

router.get('/admin/registerWeapon', (req, res)=>{
    res.render('registerWeapon.ejs')
})

router.get('/admin/criminalRecord', (req, res)=>{
    res.render('criminalRecord.ejs')
})

router.get('/admin/registerChallan', (req, res)=>{
    res.render('e-challan.ejs')
})

router.get('/admin/viewFir', (req, res)=>{

    db.query('SELECT * FROM fir', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewInfo.ejs', {title : 'fir result', userData : result});
            
        }
    })
})

router.get('/admin/viewCitizen', (req, res)=>{

    db.query('SELECT * FROM citizen', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewCitizen.ejs', {title : 'fir result', userData : result});
            
        }
    })
})

router.get('/admin/viewCriminal', (req, res)=>{

    db.query('SELECT * FROM criminal_record', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewCriminal.ejs', {title : 'Criminal Record', userData : result});
            
        }
    })
})

router.get('/admin/viewWeapon', (req, res)=>{

    db.query('SELECT * FROM weapon', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewWeapon.ejs', {title : 'Weapon Inventory', userData : result});
            
        }
    })
})

router.get('/admin/viewVehicle', (req, res)=>{

    db.query('SELECT * FROM vehicle', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewVehicle.ejs', {title : 'Vehicle Record', userData : result});
            
        }
    })
})

router.get('/admin/viewPermission', (req, res)=>{

    db.query('SELECT * FROM permission', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewPermission.ejs', {title : 'Permission Record', userData : result});
            
        }
    })
})

router.get('/admin/viewChallan', (req, res)=>{

    db.query('SELECT * FROM challan', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('viewChallan.ejs', {title : 'Challan Record', userData : result});
            
        }
    })
})

router.get('/citizen/viewFir', (req, res)=>{

    // db.query('SELECT * FROM citizen WHERE email = ?', [localStorage.getItem('user')], async (error, result)=>{
    //     if(error){
    //         console.log(error)
    //     }

    //     if(result){
    //         console.log(result)
    //         const user_id = result[0].user_id;

    //         db.query('SELECT * FROM fir WHERE user_id = ?', [user_id], (error, result)=>{
    //             if(error){
    //                 console.log(error)
    //             }
    //             else{
    //                 res.render('citizenFir.ejs', {title : 'fir result', userData : result});
                    
    //             }
    //         })

    //     }
        
    // })
    db.query('SELECT * FROM fir WHERE user_id = ?', [1], (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('citizenFir.ejs', {title : 'fir result', userData : result});
            
        }
    })
})

router.get('/citizen/viewPermission', (req, res)=>{

    db.query('SELECT * FROM permission WHERE user_id = ?', [1], (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('citizenPermission.ejs', {title : 'Permission result', userData : result});
            
        }
    })
})

router.get('/citizen/viewChallan', (req, res)=>{

    db.query('SELECT * FROM challan WHERE aadhar_no IN (SELECT aadhar_no from citizen)', (error, result)=>{
        if(error){
            console.log(error)
        }
        else{
            res.render('citizen_challan.ejs', {title : 'Challan Record', userData : result});
            
        }
    })
})

module.exports = router;