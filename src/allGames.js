var helpers = require( './helpers.js' );
var Promise = require( 'bluebird' );

var miniScoreboard = function( date ) {
  date = date ? date : new Date();
  var dateString = helpers.makeDate( date ) + 'miniscoreboard.json';
  var gamesUrl = helpers.makeUrl( dateString );

  return new Promise( function( resolve, reject ) {
    helpers.mlbGet( gamesUrl )
    .then( function( results ) {
      resolve( JSON.parse( results ).data.games.game );
    })
    .catch( function( error ) {
      console.log( 'error in games gameday mini scoreboard request: ', error );
      reject( error )
    })
  });

};

module.exports = {
  miniScoreboard: miniScoreboard,
}
