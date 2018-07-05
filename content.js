// Listen for messages
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    // If the received message has the expected format...
    console.log("message received")
    if (msg.text === 'report_listing_address') {
        // Call the specified callback, passing
        // an address parsed from the webpage as an argument
        // console.log(document.querySelector('[itemprop=address]'));
        var address = document.querySelector('[itemprop=address]').textContent;
        console.log(address);
        sendResponse(address);
        return true;
    }
});