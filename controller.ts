let btnShare = document.getElementById('BtnShare');
let message = document.getElementById('Message');
let canFile = document.getElementById('ShareFile');
let track = document.getElementById('Track');

btnShare.addEventListener('click', shareFile);

function shareFile () {
    track.textContent = 'Begin share';
    let vcardBlob = new Blob(["test card text plain"], {type: "text/plain;charset=utf-16"});
    let shareFile = [new File([vcardBlob], "card.txt", { type: "text/plain;charset=utf-16" })];
    let errorShare: boolean = false;

    let shareData: ShareData = {};
    shareData.text = "Text share";
    shareData.title = "Title share";
    shareData.files = shareFile;

    if (navigator.share) {
        navigator.share( shareData )
        .then(() => message.textContent = "Success")
        .catch( error => 
            {
                console.error(error.message);
                errorShare = true;
                canFile.textContent = "No support share files"
            }
        )

        if (errorShare)
        {
            delete shareData.files;
            shareData.url = window.location.href;
            navigator.share( shareData )
            .then(() => message.textContent = "Success")
            .catch(error => {
                console.log(error.message);
                message.textContent = "Can not share:" + error.message;
            } )
        }

        track.textContent = 'End share';
        

    } 
    else{
        alert('No support share');
    }
}