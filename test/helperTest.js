var helper = require( '../src/helpers.js' );
var expect = require( 'chai' ).expect;

describe( "Make Url Helper Function", function() {

  it( "Should respond with the root when no arguments are given", function() {
    var url = helper.makeUrl();

    expect( url ).to.equal( 'http://gd2.mlb.com/components/game/mlb/' );
  });

  it( "Should add arguments to the end of the url", function() {
    var url = helper.makeUrl( 'boxscore.json' );

    expect( url ).to.equal( 'http://gd2.mlb.com/components/game/mlb/boxscore.json' );
  });

});

describe( "Zeros helper Function", function() {

  it( "Should add a 0 to single digit dates", function() {
    var date = helper.zeros( 8 );

    expect( date ).to.equal( '08' );
  });

  it( "Should not add a 0 to double digit dates", function() {
    var date = helper.zeros( 18 );

    expect( date ).to.equal( '18' );
  });

  it( "Should add 1 without a zero for months after 8", function() {
    var month = helper.zeros( 9, 'month' );

    expect( month ).to.equal( '10' );
  });

  it( "Should add 1 with a zero for months before 9", function() {
    var month = helper.zeros( 8, 'month' );

    expect( month ).to.equal( '09' );
  });

});

describe( "makeDate Helper Function", function() {

  it( "Should correctly format the current date when no arguments are given", function() {
    var date = helper.makeDate();
    var dateCurrent = helper.makeDate( new Date() );

    expect( date ).to.equal( dateCurrent );
  });

  it( "Should format a date for API use", function() {
    var date = helper.makeDate( new Date( '2013-7-20' ) );

    expect( date ).to.equal( 'year_2013/month_07/day_20/') 
  });

});
