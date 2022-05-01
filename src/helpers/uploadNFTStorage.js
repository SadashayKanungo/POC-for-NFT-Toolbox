const path = require('path');
import { NFTStorage } from 'nft.storage'
import { getFilesFromPath } from 'files-from-path'

const {IPFS_API_KEY, collection_name} = require('../../config');
const {updateImageCID, updateMetadataCID} = require('./updateCID');


const uploadFolderToPinata = async (folderName, folderPath) => {
    try {
        const files = await getFilesFromPath(path, {
          pathPrefix: path.resolve(folderPath), // see the note about pathPrefix below
        })
          
        const storage = new NFTStorage({ IPFS_API_KEY })

        console.log(`uploading ${files.length} file(s) from ${path}`)
        const cid = await storage.storeDirectory(files)
      
        const status = await storage.status(cid)
        console.log(status)
        console.log(`'${folderPath}' upload complete; CID: ${cid}`);
        return cid;
      } catch (err) {
        error(err);
        return false;
      }
}

const uploadPinata = async () => {
    const ImageFolderCID = await uploadFolderToPinata(`${config.collection_name} Images'`, path.join('/', '../../NFTs/Images'));
    updateImageCID(ImageFolderCID);
    const MetaFolderCID = await uploadFolderToPinata(`${config.collection_name} Metadata'`, path.join('/', '../../NFTs/Metadata'));
    updateMetadataCID(MetaFolderCID);
}

module.exports = uploadPinata;