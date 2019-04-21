(function(){
  let alarmDict = {}
  const periodInMinutes = 1;
  const alarmNamePrefix = "auto_tab_close";

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
      const alarmName = alarmNamePrefix + tabId;
      const isTargetUrl = tab.url.includes("https://twitter.com/");
      if(isTargetUrl){
        if(!alarmDict[alarmName]){
          chrome.alarms.create(alarmName, { "periodInMinutes": periodInMinutes });
          alarmDict[alarmName] = { url: tab.url, tabId: tabId };
        }
      }else{
        chrome.alarms.clear(alarmName);
        delete alarmDict[alarmName];
      }

  });

  chrome.tabs.onRemoved.addListener(function(tabId, changeInfo) {
      const alarmName = alarmNamePrefix + tabId;
      chrome.alarms.clear(alarmName);
      delete alarmDict[alarmName];
  });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    const targetTabId = alarmDict[alarm.name].tabId;
    chrome.tabs.remove(targetTabId)
    chrome.alarms.clear(alarm.name);
    delete alarmDict[alarm.name];
  });
})();

