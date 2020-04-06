"use strict";

const st = require("./funcs");
const fs = require("fs");
const gm = require("gm");
const _ = require("lodash");

const resize = (path, size) => {
    return new Promise(function (resolve, reject) {
        try {
          gm(path)
            .autoOrient()
            .strip()
            .interlace("Line") 
            .resize(size, size)
            .quality(85)
            .sharpen(0, .5)
            .write(st.sizePath(path, size), err => {
              if(err) {
                  reject(err)
              } else {
                  strapi.log.info("Resized: " + st.name(path) + " (" + size + ")");
                  resolve();
              }
            });
        } catch (err) {
          reject(err);
        }
    });
}

const checkFolder = path => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
        strapi.log.info("Generated folder: " + st.name(path));
    }
}

const checkFolders = () => {
    return new Promise((resolve, reject) => {
        checkFolder(st.cacheFolder());
        for (const size of st.sizes) {
            checkFolder(st.sizeFolder(size))
        }
        resolve();
    })
}

const resizeImage = path => {
    return new Promise(async (resolve, reject) => {
        for (const size of st.sizes) {
            if (!fs.existsSync(st.sizePath(path, size))) {
                await resize(path, size);
                continue
            }
            const source = fs.statSync(path)
            const target = fs.statSync(st.sizePath(path, size))
            if (new Date(source.mtime) > new Date(target.mtime)) {
                strapi.log.info("New source file.")
                await resize(path, size);
                continue
            }
            // console.log("Checked: " + st.name(path) + " (" + size + ")")
        }
        resolve();
    });
}

module.exports = {
    resizeImages: async () => {
        await checkFolders();
        const files = await st.getFiles(st.folder);
        for (const file of files) {
            if (st.ext(file) == "jpg") {
                await resizeImage(file);
            }
        }
        return;
    },
    resizeImage: resizeImage,
}

/*
const main = async () => {
    resizeImages();
}

main();
*/

