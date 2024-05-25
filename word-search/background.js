let baseURL = "http://en.wikipedia.org/wiki/";

let baseURLs = { "Wikipedia": "http://en.wikipedia.org/wiki/",
                    "Bing": "https://www.bing.com/search?q=",
                    "Google": "https://www.google.com/search?q="};


chrome.runtime.onInstalled.addListener( () => {
    for(let key of Object.keys(baseURLs)){
        chrome.contextMenus.create({
            id: key,
            title: key,
            type: 'normal',
            contexts: ['selection']
        });
    }
});


chrome.contextMenus.onClicked.addListener((info) => {
    baseURL = baseURLs[info.menuItemId];
    var newURL = baseURL + info.selectionText;

    chrome.tabs.create({ url: newURL });
});


// recieving a message from the content script
// it takes a function
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ? "from content.js: " + sender.tab.url : "from the extension");

    if(request.message === "HEY"){
        sendResponse({farewell : "B!"});
    }
});


// To receive the message, set up a runtime.onMessage event listener. These use the same code in both extensions and content scripts:
// content-script.js or service-worker.js:
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.greeting === "hello")
            sendResponse({farewell: "goodbye"});
    }
);
