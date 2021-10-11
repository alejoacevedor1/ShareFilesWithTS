let btnShare = document.getElementById('BtnShare');
let message = document.getElementById('Message');
let canFile = document.getElementById('ShareFile');
let track = document.getElementById('Track');

btnShare.addEventListener('click', shareFile);

function shareFile () {
    track.textContent = 'Begin share';
    let vcardBlob = new Blob(["test card text plain"], {type: "text/plain;charset=utf-16"});
    let shareFile = [new File([vcardBlob], "card.txt", { type: "text/plain;charset=utf-16" })];

    let shareData: ShareData = {};
    shareData.text = "Text share";
    shareData.title = "Title share";
    shareData.url = window.location.href;
    
    interface ExtendNavigator extends Navigator {
        canShare?: (data?: ShareData) => boolean;
    }

    let newNav: ExtendNavigator = window.navigator;

    if (newNav.canShare && newNav.canShare({ files: shareFile }))
    {
        shareData.files = shareFile;
        delete shareData.url;
        canFile.textContent = "Can share files";
    }
    else{
        canFile.textContent = "No share files";
    }


    if (newNav.share) {
        newNav.share( shareData )
        .then(() => message.textContent = "Success")
        .catch( error => message.textContent = error)

        track.textContent = 'End share';
    } 
    else{
        alert('No support share');
    }
}