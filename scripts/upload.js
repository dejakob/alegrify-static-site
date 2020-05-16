const path = require("path");

const { uploadFolderToBucket } = require("../common/gcloud");

function upload() {
  const distFolder = path.join(process.env.PWD, "./dist");

  uploadFolderToBucket(distFolder);
}

module.exports = upload;
