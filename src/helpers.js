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
  )

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
  var year = date.getFullYear();
  var month = zeros( date.getMonth(), 'month' );
  var day = zeros( date.getDate() );
  var dateString = 'year_' + year + '/month_' + month + '/day_' + day + '/';

  return dateString;
};
