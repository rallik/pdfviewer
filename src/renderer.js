const { dialog } = require('electron').remote;
const path = require('path');

function addtowindow(filePath) {
    const viewerEle = document.getElementById('viewer');
    viewerEle.innerHTML = ''; // destroy the old instance of PDF.js (if it exists)

    // Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
    const iframe = document.createElement('iframe');
    iframe.src = path.resolve(__dirname, `../public/pdfjs/web/viewer.html?file=${filePath}`);
    console.log(iframe.src)
    // Add the iframe to our UI.
    viewerEle.appendChild(iframe);
}


// Add an event listener to our button.
document.getElementById('pickFile').addEventListener('click', () => {
    console.log('click')
    // When the button is clicked, open the native file picker to select a PDF.
    dialog.showOpenDialog({
        properties: ['openFile'], // set to use openFileDialog
        filters: [ {name:'PDF', extensions: ['pdf'] } ] // limit the picker to just pdfs
        }).then(result => {

        console.log(result)
        // Since we only allow one file, just use the first one
        const filePath = result.filePaths[0];
        console.log(filePath)
        addtowindow(filePath)
        
        }).catch(err => {
        console.log(err)
  })
})