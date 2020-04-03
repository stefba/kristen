require("dotenv").config({  
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  siteMetadata: {
    title: `Kristen Mounsey`,
    description: `Website of Kristen Mounsey.`,
    author: `stef barsch`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        //path: `${__dirname}/src/images`,
        path: `${__dirname}/../cms/public/uploads`,
      },
    },
      {
          resolve: "gatsby-source-strapi",
          options: {
              apiURL: "http://localhost:1337",
              contentTypes: [
                  // List of the Content Types you want to be able to request from Gatsby.
                  "post",
                  "piece",
              ],
              singleTypes: [
                  "site-information",
                  "contact",
              ],
              queryLimit: 1000,
          },
      },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
     `gatsby-plugin-offline`,
  ],
}
