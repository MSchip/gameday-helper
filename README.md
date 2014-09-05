gameday-helper
==============
A node.js wrapper around the MLB Gameday api.

This is meant only for personal use.  As it is not affiliated with MLB, please do not use it for commercial purposes and keep it in line with this MLB copyright statement:
```
The accounts, descriptions, data and presentation in the referring page (the "Materials") are proprietary content of MLB Advanced Media, L.P ("MLBAM").  
Only individual, non-commercial, non-bulk use of the Materials is permitted and any other use of the Materials is prohibited without prior written authorization from MLBAM.  
Authorized users of the Materials are prohibited from using the Materials in any commercial manner other than as expressly authorized by MLBAM.
```

This library provides easy access to MLB provided JSON data for individual games or all games on a given date.

All methods return promises and use Bluebird under the hood.

#Using the mudule

Simply require the node module.

```js
var gamedayHelper = require( 'gameday-helper' );
```

#Data for all games on a given date

To return an array of all Game Ids for a given date do the following:
```js
gamedayHelper.listGameIds( new Date('2014-7-20') ).then( funciton( list ){
  // Array of gid's
})
```
As with all methods in the library, if no dates are supplied, it will default to the current date.

To return data from the MLB master scoreboard:
```js
gamedayHelper.masterScoreboard( new Date('2014-7-20') ).then( funciton( data ){
  // Array of objects with data related to a single game
})
```

Swap 'masterScoreboard' with 'miniScoreboard' for data from MLB mini scoreboard.

#Data for a single game

All single game methods require the game ID or 'gid' for the requested game.  The gid can be found using the listGameIds method, or from the game objects in both scoreboard methods.

Once again, if no data is supplied, it will default to the current date.

