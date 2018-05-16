setInterval(function(){
    $.ajax({
        type: "GET",
        url: "test2/deviceData",
    }).done(function (deviceObj) {
        $('#device1 .RSSIValue').text(deviceObj.one.RSSIValue);
        $('#device2 .RSSIValue').text(deviceObj.two.RSSIValue);
        if(deviceObj.one.RSSIValue>deviceObj.two.RSSIValue&&deviceObj.one.RSSIValue>deviceObj.three.RSSIValue){
            $('#bus').css('left','110px');
        }else if(deviceObj.two.RSSIValue>deviceObj.one.RSSIValue&&deviceObj.two.RSSIValue>deviceObj.three.RSSIValue){
            $('#bus').css('left','440px');            
        }else{
            $('#bus').css('left','760px');                        
        }
        // $('#device3 .RSSIValue').text(deviceObj.three.RSSIValue);
    })
}, 3000)