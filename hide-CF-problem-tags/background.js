chrome.runtime.onInstalled.addListener( () => {
    chrome.action.setBadgeText({
        text: "ON",
    });
});


const chodeforces = 'https://codeforces.com';

chrome.action.onClicked.addListener(async(tab) => {
    
    if(tab.url.startsWith(chodeforces)){
        // retreve the action badge to check if it is on or off
        const prevState = await chrome.action.getBadgeText({tabId: tab.id});


        // next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        // set the action badge to the next state
        chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState,
        });

        if (nextState === "OFF") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
            files: ["problem-tags.css"],
            target: { tabId: tab.id },
            });
        } else if (nextState === "ON") {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
            files: ["problem-tags.css"],
            target: { tabId: tab.id },
            });
        }
    }
});