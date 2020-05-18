require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Shop the area',
    description: 'Shop here',
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-drupal',
      options: {
        baseUrl: `${process.env.GATSBY_DRUPAL_ROOT}`,
        apiBase: 'jsonapi',
      },
    },
  ],
};

