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
      console.log( 'error in all games gameday request: ', error );
      reject( error );
    })
  });

};

var listGameIds = function( date ) {

  return new Promise ( function( resolve, reject ) {
    daysGames( 'miniscoreboard.json', date )
    .then( function( results ) {
      var gidList = [];
      // handle a list of games or a single game
      if(Array.isArray(results.game)) {
        results.game.forEach( function( game ) {
          gidList.push( 'gid_' + game.gameday_link );
        });
      } else {
        gidList.push( 'gid_' + results.game.gameday_link );
      }
      resolve( gidList );
    })
    .catch( function( error ) {
      console.log( 'error in list games gameday request: ', error );
      reject( error );
    })
  });

};

module.exports = {
  masterScoreboard: daysGames.bind( null, 'master_scoreboard.json' ),
  miniScoreboard: daysGames.bind( null, 'miniscoreboard.json' ),
  listGameIds: listGameIds
};
