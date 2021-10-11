var btnShare = document.getElementById('BtnShare');
var message = document.getElementById('Message');
var canFile = document.getElementById('ShareFile');
var track = document.getElementById('Track');
btnShare.addEventListener('click', shareFile);
function shareFile() {
    track.textContent = 'Begin share';
    var vcardBlob = new Blob(["test card text plain"], { type: "text/plain;charset=utf-16" });
    var shareFile = [new File([vcardBlob], "card.txt", { type: "text/plain;charset=utf-16" })];
    var shareData = {};
    shareData.text = "Text share";
    shareData.title = "Title share";
    shareData.url = window.location.href;
    var isIphone = /iPhone/i.test(navigator.userAgent);
    if (isIphone) {
        shareData.files = shareFile;
        delete shareData.url;
        canFile.textContent = "Can share files";
    }
    else {
        canFile.textContent = "No share files";
    }
    if (navigator.share) {
        navigator.share(shareData)
            .then(function () { return message.textContent = "Success"; })["catch"](function (error) { return message.textContent = error; });
        track.textContent = 'End share';
    }
    else {
        alert('No support share');
    }
}
