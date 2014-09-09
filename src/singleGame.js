var helpers = require( './helpers.js' );
var Promise = require( 'bluebird' );

var gameData = function( type, gid ) {
  var year = parseInt( gid.slice( 4, 8 ) );
  var month = parseInt( gid.slice( 9, 11 ) ) - 1;
  var day = parseInt( gid.slice( 12, 14 ) );
  var date = new Date( year, month, day );
  var findUrl = helpers.makeUrl( helpers.makeDate( date ) + gid + type );
  
  return new Promise( function( resolve, reject ) {
    helpers.mlbGet( findUrl )
    .then( function( results ) {
      resolve( results );
    })
    .catch( function( error ) {
      console.log( 'error in gameday request: ', error );
      reject( error );
    })
  });

};

module.exports = {
  boxscore: gameData.bind( null, '/boxscore.json' ),
  events: gameData.bind( null, '/game_events.json' ),
  feed: gameData.bind( null, '/game_feed.json' ),
  linescore: gameData.bind( null, '/linescore.json' ),
  plays: gameData.bind( null, '/plays.json' )
};