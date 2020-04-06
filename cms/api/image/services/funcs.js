"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const folderName = "uploads";
const folder = path.join(__dirname, "../../../public/" + folderName);

const ext = path => {
    return _.last(path.split("."));
}
const name = path => {
    return _.last(path.split("/"));
}

const dirName = path => {
    let ar = path.split("/")
    ar.pop()
    return _.last(ar)
}

const dirPath = path => {
    let ar = path.split("/");
    ar.pop();
    return(ar.join("/"));
}

const hash = path => {
    return name(path).split(".")[0]
}

const sizes = [320, 640, 1280, 2560];

const cacheFolder = () => {
    return folder + "/cache";
}

const sizeFolder = size => {
    return cacheFolder() + "/" + size;
}

const sizePath = (path, size) => {
    return sizeFolder(size) + "/" + name(path)
}

const readdir = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

const getFiles = async path => {
    const files = [];
    const l = await readdir(path);
    for (const file of l) {
        files.push(path + "/" + file);
    }
    return files
}


module.exports = {
    ext: ext,
    folder: folder,
    folderName: folderName,
    name: name,
    hash: hash,
    dirName: dirName,
    dirPath: dirPath,
    sizes: sizes,
    sizePath: sizePath,
    sizeFolder: sizeFolder,
    cacheFolder: cacheFolder,
    readdir: readdir,
    getFiles: getFiles,
}
