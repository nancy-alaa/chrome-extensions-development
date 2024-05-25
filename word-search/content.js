

// send message
// it takes the message {object} and a function
chrome.runtime.sendMessage({message: "HEY"}, (response) => {
    console.log(response);
    console.log(response.farewell);
});


(async () => {
    const response = await chrome.runtime.sendMessage({greeting: "hello"});
    // do something with response here, not outside the function
    console.log(response);
})();



// To send a request from an extension to a content script, specify which tab the request applies to, as in the following example:
// service-worker.js
(async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});
    // do something with response here, not outside the function
    console.log(response);
})();
// In the above example, sendResponse() was called synchronously. To use sendResponse() asynchronously, add return true; to the onMessage event handler.


