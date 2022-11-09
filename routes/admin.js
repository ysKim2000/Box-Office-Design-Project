const express = require('express');
const path = require('path');

const router = express.Router();
const admin = {"kys":{"pw":"1234"}};
const PUBLIC = path.join(__dirname, '../public');


router.post('/adminLogin', (req, res) => {
    console.log('test1')
    const { id, pw } = req.body;
    console.log(id)
    console.log(pw)
    if (id in admin){
        if (pw == admin[id].pw){
            res.sendFile(path.join(PUBLIC, 'adminPage.html'));
        }
    }
});


module.exports = router;
