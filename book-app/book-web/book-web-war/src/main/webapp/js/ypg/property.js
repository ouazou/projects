var jYP = {
    author: "Mickael Dubois",
    addEventListener: function(o, typeEvent, callback) {
        if (o.addEventListener) {
            o.addEventListener(typeEvent, callback, false);
        }
        else if (o.attachEvent) {
            o.attachEvent("on" + typeEvent, callback);
        }
    }
};

(function() {
    var f = function() {
        if (typeof jYP === "undefined") {
            console.log("The namespace jYP was deleted.");
            return false;
        }
        else if (typeof jYP.author === "undefined" || jYP.author !== "Mickael Dubois") {
            console.log("The namespace jYP was altered.");
            return false;
        }

        return true;
    };

    if (window.addEventListener) { // non-IE browser
        window.addEventListener("load", f, false);
    }
    else if (window.attachEvent) { // IE browser
        window.attachEvent("onload", f);
    }

    if (!f())
        return;

    // extends jYP

    jYP.content = {
        author: "Mickael Dubois"
    };

})(); // run the anonymous function

(function() {
    var f = function() {
        if (typeof jYP === "undefined") {
            console.log("The namespace jYP was deleted.");
            return false;
        }
        else if (typeof jYP.author === "undefined" || jYP.author !== "Mickael Dubois") {
            console.log("The namespace jYP was altered.");
            return false;
        }
        else if (typeof jYP.content === "undefined") {
            console.log("The namespace jYP.content was deleted.");
            return false;
        }

        return true;
    };

    if (window.addEventListener) { // non-IE browser
        window.addEventListener("load", f, false);
    }
    else if (window.attachEvent) { // IE browser
        window.attachEvent("onload", f);
    }
    if (!f())
        return;


    function getPropertyValue(config, key) {
        for (var i = 0; i < config.property.length; i++) {
            var property = config.property[i];
            if (property.name === key) {
                return property.value === "true";
            }
        }
    }
    // extends jYP.content
    jYP.content.Service = function(config) {
        this.eventNotification = getPropertyValue(config, "event");
        this.webSocket = getPropertyValue(config, "websocket");
        this.trackingMechanism = new jYP.content.TrackingMechanism(config);
    };

    // extends jYP.content
    jYP.content.TrackingMechanism = function(config) {
        this.trackingFilter = getPropertyValue(config, "trackingFilter");
        this.clientInfo = getPropertyValue(config, "clientInfo");
        this.header = getPropertyValue(config, "header");
        this.payload = getPropertyValue(config, "payload");
        this.queryString = getPropertyValue(config, "queryString");
    };


})(); // run the anonymous function