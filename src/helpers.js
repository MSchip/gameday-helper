var http = require( 'http' );
var Promise = require( 'bluebird' );
var url = require( 'url' );

// Base URL Options
var makeUrl = function( extension ) {
  var created;
  extension = extension || '';

  created = url.parse(
    url.format({
      protocol: 'http',
      hostname: 'gd2.mlb.com',
      pathname: 'components/game/mlb/' + extension
    })
  );

  return created.href;
};

// Add zeros to dates for api path
var zeros = function( number, type ) {
  if( type === 'month' ) {
    number++;
  }

  return number < 10 ? '0' + number : number.toString();
};

// Make a date string
var makeDate = function( date ) {
  date = date ? date : new Date();

  var year = date.getFullYear();
  var month = zeros( date.getMonth(), 'month' );
  var day = zeros( date.getDate() );
  var dateString = 'year_' + year + '/month_' + month + '/day_' + day + '/';

  return dateString;
};


// Make a GET request and return a promise
var mlbGet = function( requestUrl ) {
  return new Promise( function( resolve, reject ) {
    http.get( requestUrl, function( response ) {
      
      var string = '';
      
      response.on( 'data', function( chunk ) {
        string += chunk;
       });

      response.on( 'end', function() {
        resolve( string );
      });

    }).on( 'error', function( err ) {
      console.log( 'Error in request to MLB Gameday api: ', err );
      reject( err );
    });
  });
};

module.exports = {
  makeUrl: makeUrl,
  zeros: zeros,
  makeDate: makeDate,
  mlbGet: mlbGet
}