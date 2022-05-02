const fs = require('fs');
const rfs = require('recursive-fs');


const configFile = '../../config.json';
const MetadataFolder = '../../NFTs/Metadata';

const updateImageCID = (cid) => {

    const { files } = await rfs.read(MetadataFolder);
    if ((files && files.length) <= 0) {
        console.log(`No files were found in folder '${folderPath}'`);
        return;
    }

    files.foreach((filePath) => {
        var file_content = fs.readFileSync(filePath);
        var content = JSON.parse(file_content);
        var fileName = filePath.slice(filePath.lastIndexOf('/'));
        content.image = content.image + cid + fileName;
        fs.writeFileSync(filename, JSON.stringify(content, null, 2));
    })
}

const updateMetadataCID = (cid) => {
    var file_content = fs.readFileSync(configFile);
    var content = JSON.parse(file_content);
    content.metadata_url = content.metadata_url + cid + '/';
    fs.writeFileSync(filename, JSON.stringify(content, null, 2));
}

module.exports = {updateImageCID, updateMetadataCID};