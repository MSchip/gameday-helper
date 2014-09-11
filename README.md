gameday-helper
==============
[![NPM](https://nodei.co/npm/gameday-helper.png?compact=true)](https://nodei.co/npm/gameday-helper/)

A node.js wrapper around the MLB Gameday API.

This is meant only for personal use.  As it is not affiliated with MLB, please do not use it for commercial purposes and keep it in line with this MLB copyright statement:

>*The accounts, descriptions, data and presentation in the referring page (the "Materials") are proprietary content of MLB Advanced Media, L.P ("MLBAM"). Only individual, non-commercial, non-bulk use of the Materials is permitted and any other use of the Materials is prohibited without prior written authorization from MLBAM. Authorized users of the Materials are prohibited from using the Materials in any commercial manner other than as expressly authorized by MLBAM.*

This library provides easy access to MLB provided JSON data for individual games or all games on a given date.

All methods return promises and use Bluebird under the hood.

##Using the module

Simply require the node module.

```js
var gamedayHelper = require( 'gameday-helper' );
```

##Data for all games on a given date

To return an array of all Game Ids for a given date do the following:

```js
gamedayHelper.listGameIds( new Date('2014-7-20') )
.then( function( list ){
  // Array of gid's
})
.catch( function( error ) {
  console.log( error );
});
```
As with all methods in the library, if no dates are supplied, it will default to the current date.

To return data from the MLB master scoreboard:

```js
gamedayHelper.masterScoreboard( new Date('2014-7-20') )
.then( function( data ){
  // Array of objects with data related to a single game
})
.catch( function( error ) {
  console.log( error );
});
```

Swap 'masterScoreboard' with 'miniScoreboard' for data from MLB mini scoreboard.

##Data for a single game

All single game methods require the game ID or 'gid' for the requested game.  The gid can be found using the listGameIds method, or from the game objects in both scoreboard methods.

The date is not required as it is a part of the gid itself.

There are 5 methods related to single games:
- boxscore - Returns the boxscore for the given gid.
- events - Returns data for every event in the game ( very large ).
- feed - Returns game feed data.  Lots of MLB media stuff, but some interesting hot/cold zone stuff as well.
- linescore  - Returns the linescore data for the given gid
- plays - Returns the plays data for the current half inning of the given gid.

Use example:

```js
gamedayHelper.boxscore( 'gid_2014_09_04_detmlb_clemlb_1' )
.then( function( data ){
  // Object as returned from MLB
})
.catch( function( error ) {
  console.log( error );
});
```

