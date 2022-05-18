script      = document.createElement("script");
script.src  = chrome.runtime.getURL("init.js");

(async() => {
	while(!window.hasOwnProperty("gameSpace"))
		await new Promise(resolve => setTimeout(resolve, 1000));
	console.log("[GatherCreative] gather global variables were set");
})();

console.log("[GatherCreative] injecting GatherCreative");

(document.head || document.documentElement).appendChild(script)
