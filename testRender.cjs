const React = require('react');
const { renderToString } = require('react-dom/server');
const { blogPosts } = require('./dist/assets/index-*.js'); // Not going to work easily due to module bundling
