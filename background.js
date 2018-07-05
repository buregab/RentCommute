// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?zillow\.com/;

// Callback function to handle returned addresses.
function addressToDistance(address) {
  console.log("addressToDistance called");
  var origins = address.split(' ').join("+");
  var desinations = "140+New+Montgomery+St+San+Francisco+CA+94105";
  $.get("https://maps.googleapis.com/maps/api/distancematrix/json?mode=transit?origins="+origins+"desinations="+desinations, 
    {}, 
    function(data) {
      console.log(data);
    });
}

// When navigating to a new tab, decide if page action is available.
chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (urlRegex.test(tabs[0].url)) {
      chrome.pageAction.show(tabs[0].id);
    }
  });
});

// When changing the url on the same tab, decide if page action is available.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (urlRegex.test(tabs[0].url)) {
      chrome.pageAction.show(tabs[0].id);
    }
  });
});

// On install, decide if page action is available.
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  if (urlRegex.test(tabs[0].url)) {
    chrome.pageAction.show(tabs[0].id);
  }
});


chrome.pageAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
    if (urlRegex.test(tab.url)) {
        console.log("message sent");
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'report_listing_address'}, function(response) {
          addressToDistance(response);
        });
    }
});