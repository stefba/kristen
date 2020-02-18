'use strict';

/**
 * Product.js controller
 *
 * @description: A set of functions called "actions" for managing `Product`.
 */

const ImageHelper = require('../helpers/ImageHelper');

module.exports = {

  generate: async (ctx) => {

    var returnData = {};

    ImageHelper.generateSizesFromFolder('/uploads');

    ctx.send(JSON.stringify(returnData, null, 4));
  },

};
