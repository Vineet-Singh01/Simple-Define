document.addEventListener('DOMContentLoaded', () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
	  chrome.scripting.executeScript({
		target: { tabId: tabs[0].id },
		function: getSelectedText
	  }, (results) => {
		if (results[0].result) {
		  fetchDefinition(results[0].result);
		}
	  });
	});
  });
  
  function getSelectedText() {
	return window.getSelection().toString();
  }
  
  async function fetchDefinition(word) {
	const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
	const data = await response.json();
	const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
	document.getElementById('definition').textContent = definition;
  }
  