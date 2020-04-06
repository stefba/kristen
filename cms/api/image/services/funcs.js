"use strict";

const fs = require("fs");
const path = require("path");
const _ = require("lodash");

const folderName = "uploads";
const folder = path.join(__dirname, "../../../public/" + folderName);

const name = path => {
    return _.last(path.split("/"));
}

const cacheFolder = () => {
    return folder + "/cache";
}

const sizeFolder = size => {
    return cacheFolder() + "/" + size;
}

const readdir = path => {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}



module.exports = {
    folder: folder,
    folderName: folderName,
    name: name,
    sizeFolder: sizeFolder,
    cacheFolder: cacheFolder,
    sizes: [320, 640, 1280, 2560],
    hash: path => {
        return name(path).split(".")[0]
    },
    ext: path => {
        return _.last(path.split("."));
    },
    dirPath: path => {
        let ar = path.split("/");
        ar.pop();
        return(ar.join("/"));
    },
    dirName: path => {
        let ar = path.split("/")
        ar.pop()
        return _.last(ar)
    },
    sizePath: (path, size) => {
        return sizeFolder(size) + "/" + name(path)
    },
    getFiles: async path => {
        const files = [];
        const l = await readdir(path);
        for (const file of l) {
            files.push(path + "/" + file);
        }
        return files
    }
}
