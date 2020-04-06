'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const cache = require("../services/resize");

module.exports = {
  makeSizes: async (ctx) => {

    cache.resizeImages();

    var returnData = {};
    ctx.send(JSON.stringify(returnData, null, 4));
  },
};
