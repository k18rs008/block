// This is a JavaScript file

var ncmbController = {
  APPLICATION_KEY: appKey,
  CLIENT_KEY: clientKey,

  ncmb: null,
  currentUser: null,
  screenSize: null,

  sendScore: function(score) {
    var self = this;

    var Score = self.ncmb.DataStore("ScoreClass");
    
    var scoreData = new Score({score: score});

    scoreData.save()
    .then(function (saved) {
      Score.greaterThan("score", score)
      .count()
      .fetchAll()
      .then(function(scores){
        var rank = (scores.count !== undefined) ? parseInt(scores.count) + 1 : 1;
        if(typeof navigator.notification !== 'undefined'){
          navigator.notification.alert(
            "今回の順位は #" + rank + " でした！",
            function(){},
            "スコア送信完了！"
          );
        } else {
          alert("スコア送信完了！\n今回の順位は #" + rank + " でした！");
        }
      })
    })
    .catch(function(err){
      console.log(err);
    });
},

  init: function(screenSize) {
    var self = this;
    self.ncmb = new NCMB(self.APPLICATION_KEY, self.CLIENT_KEY);
    self.screenSize = screenSize;
    }
}