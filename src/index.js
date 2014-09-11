var single = require( './singleGame.js' );
var all = require( './allGames.js' );

module.exports = {
  boxscore: single.boxscore,
  events: single.events,
  feed: single.feed,
  linescore: single.linescore,
  plays: single.plays,
  masterScoreboard: all.masterScoreboard,
  miniScoreboard: all.miniScoreboard,
  listGameIds: all.listGameIds
}