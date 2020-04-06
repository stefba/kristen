'use strict';

const st = require("./funcs");
const cache = require("./resize");
const mv = require("./rename");
const rm = require("./remove");


/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {
    process: async id => {
        const f = await strapi.query("file", "upload").findOne({id: id});
        if (st.ext(f.url).toLowerCase() != "jpg") {
            return;
        }

        let path = st.folder + "/" + st.name(f.url);

        path = await mv.renameImage(path);
        await mv.autoOrient(path);
        await cache.resizeImage(path);
    },
    cleanUp: () => {
        setTimeout(async () => {
            rm.cleanUp();
        }, 5000);
    }
}
