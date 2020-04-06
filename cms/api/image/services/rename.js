"use strict";

const st = require("./funcs");
const fs = require("fs");
const gm = require("gm");
const _ = require("lodash");

const lowerCaseFile = path => {
    return st.dirPath(path) + "/" + st.name(path).toLowerCase();
}

const rename = (source, target) => {
    return new Promise((resolve, reject) => {
        fs.rename(source, target, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

module.exports = {
    autoOrient: path  => {
        return new Promise((resolve, reject) => {
            try {
                gm(path)
                    .autoOrient()
                    .interlace("Line") 
                    .write(path, err => {
                        if(err) {
                            reject(err)
                        } else {
                            strapi.log.info("ORIENTED: " + st.name(path));
                            resolve();
                        }
                    });
            } catch (err) {
                reject(err);
            }
        });
    },
    renameImage: source => {
        return new Promise(async (resolve, reject) => {
            const ext = _.last(source.split("."));
            if (ext != "JPG") {
                resolve(source);
                return;
            }

            const target = lowerCaseFile(source)

            await rename(source, target);
            strapi.log.info("RENAMED:\n" + st.name(source) + " ->\n" + st.name(target));
            await strapi.query("file", "upload").update(
                {
                    hash: st.hash(source)
                },
                {
                    url: "/" + st.folderName + "/" + st.name(target),
                    ext: ".jpg",
                }
            );
            strapi.log.info("UPDATED: " + st.name(target))
            resolve(target);
        });
    }
}

/*
const renameImages = (contentType, id) => {
    return new Promise(async (resolve, reject) => {
        const file = await strapi.query(contentType).findOne({id: id});
        for (const image of piece.Images) {
            await renameImage(st.folder + "/" + st.name(image.url));
        };
        resolve();
    });
}
*/

