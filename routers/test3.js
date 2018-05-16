const express = require('express');
const ejs = require('ejs');
const superagent = require('superagent');
const valueObj = require('../index');
var fs = require("fs");


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
                one: {
                    deviceName: res.body.leases[0]['hostname'],
                    deviceMacAddr: res.body.leases[0]['macaddr'],
                    place: '巢穴（睡觉处）'
                    // RSSIValue: res.body.wifinets[0]['networks'][0]['assoclist'][arr[0]]['signal']
                },
                two: {
                    deviceName: res.body.leases[1]['hostname'],
                    deviceMacAddr: res.body.leases[1]['macaddr'],
                    place: '河边（喝水处）'
                    // RSSIValue: res.body.wifinets[0]['networks'][0]['assoclist'][arr[1]]['signal']
                },
                three: {
                    deviceName: res.body.leases[2]['hostname'],
                    deviceMacAddr: res.body.leases[2]['macaddr'],
                    place: '草原（吃饭处）'
                    // RSSIValue: res.body.wifinets[0]['networks'][0]['assoclist'][res.body.leases[2]['macaddr']]['signal']
                }
            }
            for (var macAddr in res.body.wifinets[0]['networks'][0]['assoclist']){
                for (var device in deviceObj){
                    if(macAddr.toUpperCase() == deviceObj[device]['deviceMacAddr'].toUpperCase()){
                        deviceObj[device]['RSSIValue'] =  res.body.wifinets[0]['networks'][0]['assoclist'][macAddr]['signal']
                    }
                }
            }
        }
    })
    if(deviceObj.one.RSSIValue<75||deviceObj.two.RSSIValue<75||deviceObj.three.RSSIValue<75){
        var nowPlace = '';
        var time = new Date();
        if(deviceObj.one.RSSIValue<75){
            var nowPlace = deviceObj.one.place;
        }else if(deviceObj.two.RSSIValue<75){
            var nowPlace = deviceObj.two.place;            
        }else{
            var nowPlace = deviceObj.three.place;            
        }
        var text = `监测的动物当前在${nowPlace},当前时间为${time}`;
        fs.writeFile('../input.txt', text,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
         });     
    }
},3000)

router.get("/", function(req, res){
    res.render("test3",deviceObj);
})
router.get("/deviceData", function(req, res){
    res.send(deviceObj);
})

module.exports = router;