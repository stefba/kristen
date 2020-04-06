"use strict";

const fs = require("fs");
const st = require("./funcs");

const getCached = async () => {
    let files = [];
    for (const size of st.sizes) {
        const l = await st.getFiles(st.sizeFolder(size));
        files = files.concat(l);
    }
    return files
}

const exists = path => {
    return new Promise((resolve, reject) => {
        fs.access(path, err => {
            if (err) {
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}


const cleanCache = async () => {
    return new Promise(async (resolve, reject) => {
        strapi.log.info("Checking CACHE for orphaned files.")
        let files = await getCached();
        for (const f of files) {
            if (!await exists(st.folder + "/" + st.name(f))) {
                await removeFile(f);
                strapi.log.info("DELETED: " + st.name(f) + " (" + st.dirName(f) + ")");
            }
        }
        resolve();
    })
}

const cleanDisk = async () => {
    return new Promise(async (resolve, reject) => {
        strapi.log.info("Checking DISK for orphaned files.")
        const files = await st.getFiles(st.folder);
        for (const f of files) {
            const ext = st.ext(f).toLowerCase()
            if (ext != "jpg" && ext != "jpeg") {
                continue
            }
            const img = await strapi.query("file", "upload").findOne({hash: st.hash(f)})
            if (img == null) {
                await removeFile(f);
                strapi.log.info("DELETED: " + st.name(f)) + " (DISK SEARCH)";
                continue
            }
            //strapi.log.info("Exists: " + st.name(f));
        }
        resolve();
    });
}

const cleanStrapi = async () => {
    return new Promise(async (resolve, reject) => {
        strapi.log.info("Checking STRAPI for orphaned files.")
        const images = await strapi.query("file", "upload").find()
        for (const img of images) {
            const ext = st.ext(img.url).toLowerCase();
            if (ext != "jpg" && ext != "jpeg") {
                continue
            }
            if (img.related.length == 0) {
                strapi.log.info("Image " + img.id + " has no relations.")

                await strapi.query("file", "upload").delete({id: img.id})
                await removeFile(st.folder + "/" + st.name(img.url))

                strapi.log.info("DELETED: " + st.name(img.url) + " (STRAPI SEARCH)")
                continue
            } 
            // strapi.log.info("Image " + img.id + " has a purpose.")
        }
        resolve();
    });
}

const removeFile = path => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}


module.exports = {
    cleanUp: async () => {
        await cleanStrapi();
        await cleanDisk();
        await cleanCache();
        strapi.log.info("Cleaned UP!")
    }
}


