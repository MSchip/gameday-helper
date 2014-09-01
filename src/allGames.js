var helpers = require( './helpers.js' );
var Promise = require( 'bluebird' );

var listGames = function( date ) {
  date = date ? date : new Date();
  var gameIds = [];
  var dateString = helpers.makeDate( date ) + 'miniscoreboard.json';

  var gamesUrl = helpers.makeUrl( dateString );
  return new Promise( function( resolve, reject ) {
    helpers.mlbGet( gamesUrl )
    .then( function( results ) {
      var gamesArray = JSON.parse( results ).data.games.game;

      resolve( gamesArray )
    })
    .catch( function( error ) {
      console.log( 'error in games gameday request: ', error );
      reject( error )
    })
  })
};

module.exports = {
  listGames: listGames,
}
