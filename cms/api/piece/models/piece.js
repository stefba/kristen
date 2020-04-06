'use strict';

/**
 * Lifecycle callbacks for the `piece` model.
 */

module.exports = {
  // Before saving a value.
  // Fired before an `insert` or `update` query.
  // beforeSave: async (model, attrs, options) => {},

  // After saving a value.
  // Fired after an `insert` or `update` query.
  // afterSave: async (model, response, options) => {},

  // Before fetching a value.
  // Fired before a `fetch` operation.
  // beforeFetch: async (model, columns, options) => {},

  // After fetching a value.
  // Fired after a `fetch` operation.
  // afterFetch: async (model, response, options) => {},

  // Before fetching all values.
  // Fired before a `fetchAll` operation.
  // beforeFetchAll: async (model, columns, options) => {},

  // After fetching all values.
  // Fired after a `fetchAll` operation.
  // afterFetchAll: async (model, response, options) => {},

  // Before creating a value.
  // Fired before an `insert` query.
  // beforeCreate: async (model, attrs, options) => {},

  // After creating a value.
  // Fired after an `insert` query.
  // afterCreate: async (model, attrs, options) => {},

  // Before updating a value.
  // Fired before an `update` query.
  // beforeUpdate: async (model, attrs, options) => {},

  // After updating a value.
  // Fired after an `update` query.
  // afterUpdate: async (model, attrs, options) => {},
  afterUpdate: async (model, attrs, options) => {
        //strapi.services.image.cleanUp();
  },

  // Before destroying a value.
  // Fired before a `delete` query.
  // beforeDestroy: async (model, attrs, options) => {},

  // After destroying a value.
  // Fired after a `delete` query.
  // afterDestroy: async (model, attrs, options) => {}

  afterSave: async (model, attrs, options) => {

      /*
      nm.renameImages("piece", model.id);
      rm.removeUnusedFiles();
      */

  },
};

      /*
      strapi.services.image.rename();
      const dummy = "1559";
      const hash = "4e13708f1c704b4e9c2bf8cbdc07210b";
      console.log(strapi.plugins.upload.models.file);
      const entry = strapi.query("file", "upload").update(
          {hash: dummy},
          {hash: hash }
      );
      console.log(entry);
      */
      /*
        .then(function(file) {
            //const newUrl -
            //rename(url, url.strings.toLowerCase());
            strapi.plugins.upload.models.file.update({_id: file._id}, {
              hash: hash,
              //url: '/uploads/'+hash+product.image.ext
            });
            console.log(file);
        });
        */

