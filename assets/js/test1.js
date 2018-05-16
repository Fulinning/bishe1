setInterval(function(){
    $.ajax({
        type: "GET",
        url: "test1/deviceData",
    }).done(function (deviceObj) {
        $('#deviceName').text(deviceObj.deviceName)
        $('#deviceMacAddr').text(deviceObj.deviceMacAddr)
        $('#RSSIValue').text(deviceObj.RSSIValue)
    })
}, 3000)