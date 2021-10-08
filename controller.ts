let btnShare = document.getElementById('BtnShare');

btnShare.addEventListener('click', shareFile);

function shareFile () {
    console.log('Begin share');
    // let vcardBlob = new Blob(["test card text plain"], {type: "text/plain;charset=utf-16"});
    // let shareFile = [new File([vcardBlob], "card.txt", { type: "text/plain;charset=utf-16" })];

    if (navigator.share ) {
        navigator.share( {
            text: "Contact",
            url: window.location.href
            // files: shareFile
        })
        .catch(console.error);

        console.log('END share');

    } 
    else{
        console.log('No support share');
    }
}