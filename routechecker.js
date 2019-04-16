var EVEoj = require("EVEoj"),
    SDD = EVEoj.SDD.Create("json", {
        path: "/opt/freighter-service/freighter-service/eve-json/"
    }),
    map;

SDD.LoadMeta()
.then(function() {
    map = EVEoj.map.Create(SDD, "K");
    return map.Load();
})
.then(function() {
    var startDest = map.GetSystem({name: "Maspah"});
    var endDest = map.GetSystem({name: "jita"});
    var route = map.Route(startDest.ID, endDest.ID, [], false, false);
    console.log("Maspah to jita route length: " + route.length);

    var i;
    var j;
    var intialCost = 2500000;
    var jumpPrice = intialCost + (route.length * 750000);
    var insurance = .15;
    var serviceFee = .05;
    var finalPrice = (jumpPrice * (serviceFee + insurance)) + jumpPrice;

    for (i = 0; i < route.length; i++){
        j = map.GetSystem({id: route[i]});
        console.log(j.name + " - Security status: " + (Math.round(j.security * 10) / 10));
    }

    console.log("Price for this service: " + (Math.round(finalPrice * 10000) / 10000) + " ISK");

})
.caught(function(err) {
    console.error(err);
});