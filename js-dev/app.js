var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactApp = require('./components/app.jsx');


/*
 * Start up the app
 */
ReactDOM.render(
    React.createElement(ReactApp),
    document.getElementById('app')
);
