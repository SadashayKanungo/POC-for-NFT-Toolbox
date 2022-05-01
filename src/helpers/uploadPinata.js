const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const rfs = require('recursive-fs');

const {IPFS_API_KEY, IPFS_API_SECURITY, collection_name} = require('../../config');
const {updateImageCID, updateMetadataCID} = require('./updateCID');

const PINATA_API = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

const uploadFolderToPinata = async (folderPath) => {
    try {
        const { files } = await rfs.read(folderPath);
        if ((files && files.length) <= 0) {
          console.log(`No files were found in folder '${folderPath}'`);
          return;
        }
        console.log(`'${folderPath}' upload started`);
        
        const formData = new FormData();
        files.forEach((filePath) => {
          log(`Adding file: ${filePath}`);
          formData.append('file', fs.createReadStream(filePath), {
            filepath: fs.basePathConverter(FOLDER_PATH, filePath),
          });
        });

        const {
          data: { IpfsHash: cid },
        } = await axios.post(PINATA_API, formData, {
          maxBodyLength: 'Infinity',
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
            pinata_api_key: IPFS_API_KEY,
            pinata_secret_api_key: IPFS_API_SECURITY,
          },
        });
        console.log(`'${folderPath}' upload complete; CID: ${cid}`);
        return cid;
      } catch (err) {
        error(err);
        return false;
      }
}

const uploadPinata = async () => {
    const ImageFolderCID = await uploadFolderToPinata(`${collection_name} Images'`, path.join('/', '../../NFTs/Images'));
    updateImageCID(ImageFolderCID);
    const MetaFolderCID = await uploadFolderToPinata(`${collection_name} Metadata'`, path.join('/', '../../NFTs/Metadata'));
    updateMetadataCID(MetaFolderCID);
}

module.exports = uploadPinata;