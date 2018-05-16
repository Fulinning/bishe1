const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const valueObj = require('../index')

const router = express.Router();
let deviceObj = null;

setInterval(function(){
    var random = Math.random();
    superagent
    .get(`http://192.168.10.1/cgi-bin/luci/;stok=${valueObj.stokValue}?status=1&_=${random}`)
    .send({
        username: 'root',
        password: 'root'
    })
    .set('Cookie',`sysauth=${valueObj.cookieValue}`)
    .end(function(err, res) {
        if (err) {
            console.log(err);
        } else {
            deviceObj ={
                deviceName: res.body.leases[0]['hostname'],
                deviceMacAddr: res.body.leases[0]['macaddr'],
                RSSIValue: res.body.wifinets[0]['networks'][0]['signal']
            }
        }
    })
},3000)

router.get("/", function(req, res){
    res.render("test1",deviceObj);
})
router.get("/deviceData", function(req, res){
    res.send(deviceObj);
})

module.exports = router;