chrome.contextMenus.create({
    "id":"copyAsPlainText",
    "title": "phoenix",
    "contexts": ["selection"]
  });
   
  chrome.contextMenus.onClicked.addListener(function(itemData){
    copyToClipboard(itemData.selectionText);
  });
   
   
  const copyToClipboard = str => {
    console.log("copyToClipboard");
    const el = document.createElement('textarea');
    el.value = str;    
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };
  
  // const getSelectedText = () => window.getSelection().toString();

  // document.addEventListener("click", () => {
  //   if (getSelectedText().length > 0) {
  //       copyToClipboard(itemData.selectionText());
  //   }
  // });
  
  // document.addEventListener("selectionchange", () => {
  //   if (getSelectedText().length === 0) {
  //       copyToClipboard({ display: "none" });
  //   }
  // });
  


  'use strict';


function getContentFromClipboard() {
    var result = '';
    var receiver = document.getElementById('paste_receiver');
    receiver.value = '';
    receiver.select();
    if (document.execCommand('paste')) {
        result = receiver.value;
    }
    receiver.value = '';
    return result;
}


function sendPasteToPopup(toBePasted) {
    var matchedURL = /^https?:\/\/(.*)/.exec(toBePasted);
    if (matchedURL)
        toBePasted = matchedURL[1].replace(new RegExp("/", 'g'),"/\n");
    var views = chrome.extension.getViews({
        type: "popup"
    });
    views[0].document.getElementById("show").innerText = toBePasted;
}

function paste() {
    sendPasteToPopup(getContentFromClipboard());
}