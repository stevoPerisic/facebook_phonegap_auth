/*var ChildBrowser=function(a){function h(a){if(b(c.onError)){c.onError(a)}}function g(a){switch(a.type){case d:if(b(c.onClose)){c.onClose()}break;case e:if(b(c.onLocationChange)){c.onLocationChange(a.location)}break;case f:if(b(c.onOpenExternal)){c.onOpenExternal()}break}}function c(){}function b(a){return typeof a==="function"}var d=0,e=1,f=2;c.install=function(){console.log("ChildBrowser.install is deprecated")};c.showWebPage=function(b,c){if(!c){c={showLocationBar:true}}a.exec(g,h,"ChildBrowser","showWebPage",[b,c])};c.close=function(){a.exec(null,null,"ChildBrowser","close",[])};c.openExternal=function(b,c){if(c){navigator.app.loadUrl(b)}else{a.exec(null,null,"ChildBrowser","openExternal",[b,c])}};a.addConstructor(function(){if(a.addPlugin){a.addPlugin("childBrowser",c)}else{if(!window.plugins){window.plugins={}}window.plugins.childBrowser=c}});return c}(PhoneGap)*/

var ChildBrowser = function (a) {
    function h(a) {
        if (b(c.onError)) {
            c.onError(a)
        }
    }
    function g(a) {
        switch (a.type) {
        case d:
            if (b(c.onClose)) {
                c.onClose()
            }
            break;
        case e:
            if (b(c.onLocationChange)) {
                c.onLocationChange(a.location)
            }
            break;
        case f:
            if (b(c.onOpenExternal)) {
                c.onOpenExternal()
            }
            break
        }
    }
    function c() {}
    function b(a) {
        return typeof a === "function"
    }
    var d = 0,
        e = 1,
        f = 2;
    c.install = function () {
        console.log("ChildBrowser.install is deprecated")
    };
    c.showWebPage = function (b, c) {
        if (!c) {
            c = {
                showLocationBar: true
            }
        }
        a.exec(g, h, "ChildBrowser", "showWebPage", [b, c])
    };
    c.close = function () {
        a.exec(null, null, "ChildBrowser", "close", [])
    };
    c.openExternal = function (b, c) {
        if (c) {
            navigator.app.loadUrl(b)
        } else {
            a.exec(null, null, "ChildBrowser", "openExternal", [b, c])
        }
    };
    a.addConstructor(function () {
        if (a.addPlugin) {
            a.addPlugin("childBrowser", c)
        } else {
            if (!window.plugins) {
                window.plugins = {}
            }
            window.plugins.childBrowser = c
        }
    });
    return c
}(PhoneGap)