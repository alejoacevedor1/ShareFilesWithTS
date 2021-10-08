let btnShare = document.getElementById('BtnShare');

btnShare.addEventListener('click', shareFile);

function shareFile () {
    let vcardBlob = new Blob(["test card text plain"], {type: "text/plain;charset=utf-16"});
    let shareFile = [new File([vcardBlob], "card.txt", { type: vcardBlob.type })];

    if (navigator.share ) {
        navigator.share( {
            text: "Contact",
            files: shareFile
        })
        .catch(console.error);
    } 
}