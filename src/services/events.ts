/*global chrome*/

const Events = () => {
    const sendRetrievePlayersEvent = () => {
        chrome.tabs.executeScript({
            code: "window.dispatchEvent(new CustomEvent('a'));"
        });

        // chrome.runtime.onMessage.addListener(function(myMessage, sender, sendResponse){
        //     console.log(myMessage || "123")
        //     return true;
        //  });
    }

    return {
        sendRetrievePlayersEvent,
    }
}


export default Events()