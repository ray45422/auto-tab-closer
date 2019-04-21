(function(){
  var alarmDict = {}
  let periodInMinutes = 1;
  let alarmNamePrefix = "auto_tab_close";

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      console.log(tab.url);

      let alarmName = alarmNamePrefix + tabId;
      let isTargetUrl = tab.url.includes("https://twitter.com/");
      if(isTargetUrl){
        // set
        chrome.alarms.create(alarmName, { "periodInMinutes": periodInMinutes });
        console.log("Set alarm on " + tab.url);
        alarmDict[alarmName] = {url: tab.url, tabId:tabId};
      }else{
        //remove
        console.log("Remove alarm on " + tab.url);
        chrome.alarms.clear(alarmName);
        delete alarmDict[alarmName];
      }

  });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    let targetTabId = alarmDict[alarm.name].tabId;
    chrome.tabs.remove(targetTabId)
    chrome.alarms.clear(alarm.name);
    delete alarmDict[alarm.name];
  });

})();

function wildcardToRegExp (s) {
  return new RegExp('^' + s.split(/\*+/).map(regExpEscape).join('.*') + '$');
}

function IsTargetUrl(s, r){
  var reg = wildcardToRegExp(r);
  return s.match(reg);
}
