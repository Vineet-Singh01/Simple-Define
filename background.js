chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	  id: "define",
	  title: "Define",
	  contexts: ["selection"]
	});
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
	if (info.menuItemId === "define") {
	  chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: getDefinition,
		args: [info.selectionText]
	  });
	}
  });
  
  async function getDefinition(word) {
	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
	const data = await response.json();
	const definition = data[0]?.meanings[0]?.definitions[0]?.definition;
	alert(definition || "No definition found.");
  }
  