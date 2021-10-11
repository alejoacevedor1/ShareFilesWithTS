var btnShare = document.getElementById('BtnShare');
var message = document.getElementById('Message');
var canFile = document.getElementById('ShareFile');
var track = document.getElementById('Track');
btnShare.addEventListener('click', shareFile);
function shareFile() {
    track.textContent = 'Begin share';
    var vcardBlob = new Blob(["test card text plain"], { type: "text/plain;charset=utf-16" });
    var shareFile = [new File([vcardBlob], "card.txt", { type: "text/plain;charset=utf-16" })];
    var errorShare = false;
    var shareData = {};
    shareData.text = "Text share";
    shareData.title = "Title share";
    shareData.files = shareFile;
    if (navigator.share) {
        navigator.share(shareData)
            .then(function () { return message.textContent = "Success"; })["catch"](function (error) {
            console.error(error.message);
            errorShare = true;
            canFile.textContent = "No support share files";
        });
        if (errorShare) {
            delete shareData.files;
            shareData.url = window.location.href;
            navigator.share(shareData)
                .then(function () { return message.textContent = "Success"; })["catch"](function (error) {
                console.log(error.message);
                message.textContent = "Can not share:" + error.message;
            });
        }
        track.textContent = 'End share';
    }
    else {
        alert('No support share');
    }
}
