var _ = require( 'underscore' );
var expect = require( 'chai' ).expect;
var nock = require( 'nock' );
var allGames = require( '../src/allGames.js' );
var helpers = require( '../src/helpers.js' );
var miniData = require( '../stubs/miniscoreboard.js' );
var daysGamesData = require( '../stubs/daysGamesData.js' );

describe( "listGameIds Function", function() {
  var testDate = helpers.makeDate();
  var path = testDate + 'miniscoreboard.json';

  afterEach( function() {
    nock.cleanAll();
  });

  it( "Should respond with gidList", function() {
    var mlbApi = nock( 'http://gd2.mlb.com' )
      .get( '/components/game/mlb/' +
        path )
      .reply( 200, miniData.results );

    allGames.listGameIds().then( function( list ) {
      list.forEach( function( gid, index ) {
        expect( gid ).to.equal( miniData.gidList[ index ] );
      })
    })
  });

});

describe( "daysGames Function", function() {
  var testDate = helpers.makeDate();
  var path;
  var test;
  var options = {
    masterScoreboard: 'master_scoreboard.json',
    miniScoreboard: 'miniscoreboard.json'
  }

  afterEach( function() {
    nock.cleanAll();
  });

  it( "Should respond with requested data", function() {
    _.each( options, function( ext, func ) {
      path = testDate + ext;
      var mlbApi = nock( 'http://gd2.mlb.com' )
        .get( '/components/game/mlb/' +
          path )
        .reply( 200, daysGamesData[ func ] );
      allGames[ func ]().then( function( data ) {
        test = data;
        expect( test ).to.deep.equal( daysGamesData[ func ].data.games );
      });
    })
  });

});