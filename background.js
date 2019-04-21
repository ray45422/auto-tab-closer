(function(){
  var alarmDict = {}
  let periodInMinutes = 1;
  let alarmNamePrefix = "auto_tab_close";

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      let alarmName = alarmNamePrefix + tabId;
      let isTargetUrl = tab.url.includes("https://twitter.com/");
      if(isTargetUrl){
        if(alarmDict[alarmName]){
          if(tab.url != alarmDict[alarmName].url){
            chrome.alarms.create(alarmName, { "periodInMinutes": periodInMinutes });
            alarmDict[alarmName] = { url: tab.url, tabId: tabId };
          }
        }else{
          chrome.alarms.create(alarmName, { "periodInMinutes": periodInMinutes });
          alarmDict[alarmName] = { url: tab.url, tabId: tabId };
        }
      }else{
        chrome.alarms.clear(alarmName);
        delete alarmDict[alarmName];
      }
  });

  chrome.tabs.onRemoved.addListener(function(tabId, changeInfo) {
      let alarmName = alarmNamePrefix + tabId;
      chrome.alarms.clear(alarmName);
      delete alarmDict[alarmName];
  });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    let targetTabId = alarmDict[alarm.name].tabId;
    chrome.tabs.remove(targetTabId)
    chrome.alarms.clear(alarm.name);
    delete alarmDict[alarm.name];
  });
})();

