var express = require('express');
var database = require('./User.js');
var bodyParser = require('body-parser');
var Q = require('q');
var JsonParser = bodyParser.json()
var app =  express();
var query = [];
var query2;
var data;


app.use('/public', express.static(__dirname + '/public'));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/views/index.html');

})
app.use('/search/validation',JsonParser,function(req,res,next){
    console.log(req.body.search);
    data = req.body.search.toString();

    //console.log(data);
    next();
})
app.post('/search/validation',function(req,res){
    res.send('success');
})
app.use('/search/results',function(req,res,next){

    var userNamePromises = [];
    var userNames = data.split(',');

    for(var i=0;i<userNames.length;i++){
        userNamePromises.push(database.User.findOne({'userInfo.username': userNames[i] }));
    }

    Q.all(userNamePromises).then(function(results){
        for(var j=0;j<results.length;j++) {
            query.push(results[j].userInfo);
        }
        console.log('this is coming from the promise', results);

    }).then(function(){
        next();
    });

   //database.User.findOne({'userInfo.username': data })
   //     .then(function(user){
   //         query= user.userInfo;
   //     })
   //     .then(function(){
   //
   //         console.log("this is coming from the promise " + query);
   //     })
   //     .then(function(){
   //         next()
   //
   //     })
    /*

    var promise = userSearch({'userInfo.username': data} );
    promise.then(console.log,console.error)
    next();

  database.User.findOne({'userInfo.username': data },function(err,user){
        query = user.userInfo;
        next()
    })
*/
})

app.get('/search/results',function(req,res){
   // res.send('')
    console.log(query)
    res.send(query);

})
var server = app.listen(8080,function(){
    var host= server.address().address;
    var port = server.address().port;
    console.log('App listening at http://%s:%s',host,port);
});