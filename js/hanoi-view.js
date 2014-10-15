(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $pegs, $messages) {
    this.game =game;
    this.$pegs = $pegs;
    this.$messages = $messages;

    var view = this;
    this.$pegs.each(function () {
      var $peg = $(this);
      $peg.on("click", view.clickTower.bind(view));
    });
  }

  View.prototype.clickTower = function (event) {
    var peg = $(event.currentTarget).index();
    if (typeof this.sourcePeg !== "undefined") {
      if (this.game.move(this.sourcePeg, peg)){
        $("h1.messages").text(this.game.isWon() ? "You Won" : "");
      } else {
        $("h1.messages").text("Cannot move there");
      }
      $(this.$pegs[this.sourcePeg]).toggleClass("selected");
      delete this.sourcePeg;
      this.render();
    } else {
      this.sourcePeg = peg;
      $(this.$pegs[peg]).toggleClass("selected");
    }
  };

  View.prototype.render = function () {
    var view = this;
    view.$pegs.each(function (index) {
      var $discs = $(this).children("li");
      $discs.each(function () {
        $(this).removeClass();
        $(this).addClass("disc");
      });
      view.game.towers[index].forEach(function (discSize, i) {
        var $disc = $($discs[2 - i]);
        $disc.addClass("disc" + discSize);
      });
    });
  };
})();