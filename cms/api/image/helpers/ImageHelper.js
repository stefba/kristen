
// Import some required dependencys
const path = require('path');
const gm = require('gm');
const fs = require('fs');

// Export our helper functions
module.exports = {
  getSizeImagePathes: getSizeImagePathes,
  getSizeImagePath: getSizeImagePath,
  generateSizesFromFolder: generateSizesFromFolder,
  generateSizes: generateSizes,
  resize: resize,
  rotate: rotate,
  rename: rename,
  removeThumbnails: removeThumbnails
};

// Define our thumbnail sizes
const imageSizes = {
  thumb: [320, 320],
  small: [640, 640],
  medium: [1280, 1280],
  large: [2560, 2560]
};

// Define the uploads path
const uploadsPath = path.join(__dirname, '../../../public');

// Async implementation of readdir
const readdir = (path, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.readdir(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })

// Generate thumbnails for each file in a folder
async function generateSizesFromFolder(folderName) {
  const files = await readdir(uploadsPath+folderName);
  for (let i = 0; i < files.length; i++) {
    await generateSizes(folderName+'/'+files[i]);
  }
}

// Creates different thumbnail versions from base file
async function generateSizes(filePath) {
  for(size in imageSizes) {
    if(imageSizes.hasOwnProperty(size)) {
      await resize(filePath, size);
    }
  }
}

// Take a file path and return the different pathes for the thumbnails
function getSizeImagePathes(filePath){
  var pathes = {};
  for(size in imageSizes) {
    if(imageSizes.hasOwnProperty(size)) {
      pathes[size] = getSizeImagePath(filePath, size);
    }
  }
  return pathes;
}

// Convert path to version with the requested size
function getSizeImagePath(filePath, size){
  return path.dirname(filePath)+'/sizes/'+size+'/'+path.basename(filePath);
}

// Resize image to size
function resize(filePath, size) {
  return new Promise(function (resolve, reject) {

    var targetFilePath = getSizeImagePath(filePath, size);

    if (!fs.existsSync(uploadsPath+path.dirname(filePath)+'/sizes/')){
      fs.mkdirSync(uploadsPath+path.dirname(filePath)+'/sizes/');
    }

    if (!fs.existsSync(uploadsPath+path.dirname(filePath)+'/sizes/'+size)){
      fs.mkdirSync(uploadsPath+path.dirname(filePath)+'/sizes/'+size);
    }

    try {
      gm(uploadsPath+filePath)
        .strip() // Removes any profiles or comments. Work with pure data
        .interlace('Line') // Line interlacing creates a progressive build up
        .resize(imageSizes[size][0], imageSizes[size][1])
        .gravity('Center')
        .crop(imageSizes[size][0], imageSizes[size][1])
        .quality(75)
        .write(uploadsPath+targetFilePath, function (err) {
          if(err) {
            console.error('Error resizing image!', err);
          }
          resolve();
        });
    } catch (err) {
      console.error('Error resizing image!', err);
      resolve();
    }
  });
}

// Rotate images
function rotate(filePath, deg){
  return new Promise(function (resolve, reject) {
    // console.log('Rotating image '+filePath);
    gm(uploadsPath+filePath)
    .rotate('green', deg)
    .write(uploadsPath+filePath, async function (err) {
      if (err){
        // console.error('Error rotating image!', err);
        reject();
      } else {
        resolve();
      }
    });
  });
}

// Async implementation of rename
function rename(sourcePath, targetPath){
  return new Promise(function (resolve, reject) {
    fs.rename(uploadsPath+sourcePath, uploadsPath+targetPath, function (err) {
      if (err){
        console.log(err);
        reject();
      } else {
        resolve();
      }
    });
  });
}

// Function to remove thumbnails for a given file
function removeThumbnails(filePath){

  var pathes = getSizeImagePathes(filePath);

  for(p in pathes){
    if(pathes.hasOwnProperty(p)){
      (function(path){

        fs.unlink(uploadsPath+path, function (err) {
          if (err) console.log(err);
        });

      })(pathes[p])
    }
  }

}
