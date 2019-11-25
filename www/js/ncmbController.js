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
      alert("スコア送信完了！");
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