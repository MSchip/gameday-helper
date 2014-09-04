var _ = require( 'underscore' );
var expect = require( 'chai' ).expect;
var nock = require( 'nock' );
var helpers = require( '../src/helpers.js' );
var singleGame = require( '../src/singleGame.js' );
var singleGameData = require( '../stubs/singleGameData.js' );

describe( "daysGames Function", function() {
  var testDate = helpers.makeDate();
  var gid = 'gid_2014_09_03_detmlb_clemlb_1';
  var path;
  var test;
  var options = {
    boxscore: '/boxscore.json',
    events: '/game_events.json',
    feed: '/game_feed.json',
    linescore: '/linescore.json',
    plays: '/plays.json'
  };

  afterEach( function() {
    nock.cleanAll();
  });

  it( "Should respond with requested data", function() {
    _.each( options, function( ext, func ) {
      path = testDate + gid + ext;
      var mlbApi = nock( 'http://gd2.mlb.com' )
        .get( '/components/game/mlb/' +
          path )
        .reply( 200, singleGameData[ func ] );
      singleGame[ func ]( gid ).then( function( data ) {
        test = JSON.parse( data );
        expect( test ).to.deep.equal( singleGameData[ func ] );
      });
    })
  });
});
