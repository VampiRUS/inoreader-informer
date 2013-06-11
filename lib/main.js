const data = require("sdk/self").data;
var widgets = require("sdk/widget");
var Request = require("sdk/request").Request;
var tabs = require("sdk/tabs");

exports.main = function() {
    var informer = widgets.Widget({
      id: "inoreader",
      width: 20,
      label: "InoReader informer",
      contentURL: data.url("content.html"),
      contentScriptFile: data.url("updater.js")
    });
    var counters = Request({
      url: "https://www.inoreader.com/api/browser_extensions.php?counters",
      onComplete: function (response) {
        var result = response.json;
        if (typeof result.error!='undefined'){
            informer.width = 16+result.error.length*10;
            informer.port.emit('updateinfo',result.error);
        } else {
            informer.width = 16+10*result.unread_cnt.length;
            informer.port.emit('updateinfo',result.unread_cnt);
        }
        
      }
    
    });
    informer.port.on('updateCounter',function(){
        counters.get();
    });
    informer.port.on('gotoReader',function(){
        tabs.open("https://www.inoreader.com/");
    })

};



