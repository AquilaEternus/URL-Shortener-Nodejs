function mainHandler() {
  document.querySelector("#copyUrlBtn").addEventListener("click", copyShortUrl);
}
mainHandler();

/* Handles the click event of the button, #copyUrlBtn. If browser doesn't 
support navigator.clipboard, then create temporary a input element that holds
the short url and copy that to the clipboard. Else, write the short url
text directly to the clipboard using navigator.clipboard.writeText. */
function copyShortUrl(e) {
  const shortUrl = document.querySelector("#shortUrl").textContent;
  if (!navigator.clipboard) {
    const tmpInput = document.createElement("input");
    tmpInput.value = shortUrl;
    tmpInput.id = "tmpInput";
    document.querySelector("#generatedUrl").appendChild(tmpInput);
    tmpInput.select();
    document.execCommand("copy");
    tmpInput.remove();
    return;
  }
  navigator.clipboard.writeText(shortUrl).then(
    function () {
      //Copy Success
      notifyTextCopied("Copied to Clipboard.");
    },
    function () {
      // Copy failed.
      notifyTextCopied("Copy failed. Unsupported browser.");
    }
  );
}

/* Generates a P element when the button, #copyUrlBtn, is clicked that
notifies the user if the short url was copied to the clipboard. */
function notifyTextCopied(message) {
  if (!document.querySelector("#textCopiedNote")) {
    const textCopiedNote = document.createElement("p");
    textCopiedNote.id = "textCopiedNote";
    textCopiedNote.textContent = "Copied to Clipboard";
    document.querySelector("#generatedUrl").appendChild(textCopiedNote);
  }
}
