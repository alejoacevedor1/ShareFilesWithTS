let btnShare = document.getElementById('BtnShare');
let message = document.getElementById('Message');
let canFile = document.getElementById('ShareFile');

btnShare.addEventListener('click', shareFile);

function shareFile () {
    console.log('Begin share');
    let vcardBlob = new Blob(["test card text plain"], {type: "text/plain;charset=utf-16"});
    let shareFile = [new File([vcardBlob], "card.txt", { type: "text/plain;charset=utf-16" })];

    let shareData: ShareData = {};
    shareData.text = "Text share";
    shareData.title = "Title share";
    shareData.files = shareFile;

    if (navigator.share) {
        navigator.share( shareData )
        .then(() => message.textContent = "Success")
        .catch( () => 
            {
                delete shareData.files;
                shareData.url = window.location.href;
                navigator.share( shareData )
                .then(() => message.textContent = "Success")
                .catch(error => console.log(error.message))
            }
        )

        console.log('END share');

    } 
    else{
        alert('No support share');
    }
}