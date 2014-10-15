$(function () {
  var game = new Hanoi.Game();
  var view = new Hanoi.View(game, $(".peg"), $(".messages"));
  view.render();
});