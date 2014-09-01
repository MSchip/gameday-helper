var helpers = require( './helpers.js' );
var Promise = require( 'bluebird' );

var daysGames = function( type, date ) {
  var dateString = helpers.makeDate( date ) + type;
  var gamesUrl = helpers.makeUrl( dateString );

  return new Promise( function( resolve, reject ) {
    helpers.mlbGet( gamesUrl )
    .then( function( results ) {
      resolve( JSON.parse( results ).data.games );
    })
    .catch( function( error ) {
      console.log( 'error in games gameday request: ', error );
      reject( error )
    })
  });

};

module.exports = {
  masterScoreboard: daysGames.bind( null, 'master_scoreboard.json' ),
  miniScoreboard: daysGames.bind( null, 'miniscoreboard.json' )
};
