chrome.contextMenus.create({
  id: '1',
  title: 'Open (Ctrl+Shift+O)',
  contexts: ['all']
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.tabs.create({url: chrome.runtime.getURL('index.html')});
});

chrome.commands.onCommand.addListener((command) => {
  if (command === 'open-askme') {
    chrome.tabs.create({url: chrome.runtime.getURL('index.html')});
  }
});

chrome.runtime.onInstalled.addListener((details) => {
  if (['install', 'update'].includes(details.reason)) {
    chrome.tabs.create({url: chrome.runtime.getURL('index.html')});
  }
});
