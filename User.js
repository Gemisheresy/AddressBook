var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost:27017/users');
    var db = mongoose.connection;
    var Schema = mongoose.Schema;

    var UserSchema = new Schema({
        userInfo: {
            username: 'String',
            userEmail: 'String',
            userFirstName: 'String',
            userLastName: 'String'
        },
        userDOB: {
            birthMonth: 'String',
            birthDay: 'Number',
            birthYear: 'Number'
        },
        userAddress: {
            addressNum: 'Number',
            addressName: 'String',
            addressCity: 'String',
            addressState: 'String',
            addressZip: 'Number'
        }
    });

    UserSchema.methods.findUsername = function (cb) {
        return this.model('User').find({username: this.username}, cb);
    };
    UserSchema.methods.findEmail = function (cb) {
        return this.model('User').find({userEmail: this.userEmail}, cb);
    };
    UserSchema.methods.findFirstName = function (cb) {
        return this.model('User').find({userFirstName: this.userFirstName}, cb);
    };
    UserSchema.methods.findLastName = function (cb) {
        return this.model('User').find({userLastName: this.userLastName}, cb);
    };
    UserSchema.methods.findZip = function (cb) {
        return this.model('User').find({addressZip: this.userAddress.addressZip}, cb);
    };


    var User = mongoose.model('User', UserSchema);

    function createUser(username, userEmail, userFirstName, userLastName, month, day, year, streetNum, streetName, cityName,
                        stateName, zip) {
        return new User({
            userInfo: {
                username: username,
                userEmail: userEmail,
                userFirstName: userFirstName,
                userLastName: userLastName
            },
            userDOB: {
                birthMonth: month,
                birthDay: day,
                birthYear: year
            },
            userAddress: {
                addressNum: streetNum,
                addressName: streetName,
                addressCity: cityName,
                addressState: stateName,
                addressZip: zip
            }
        })
    }

    var Josh = createUser("Gemis", "Gemisheresy@gmail.com", "Joshua", "Cataldi", "June", 14, 1989, 14, "Club Rd", "Glen Cove", "NY", 11542);
    var Rina = createUser("HarleyQueen", "rina.berka95@gamil.com", "Rina", "Berka", "January", 7, 1995, 14, "Club Rd", "Glen Cove", "NY", 11542);
    var Kelly = createUser("ChunkyMonkey", 'kellygrazioso@gmail.com', "kelly", "grazioso", "Febuary", 22, 1988, 15, "Clementine Rd", "Glen Cove", "NY", 11542);

    /*
     db.on('open',function(err){
     if(err){console.log(err)}
     Josh.save(function(error,Josh){
     if (error) {
     return console.log(error);
     }
     console.log("josh was saved");
     })
     Kelly.save(function(error,Kelly){
     if (error) {
     return console.log(error);
     }
     console.log("Kelly was saved");
     })
     Rina.save(function(error,Rina){
     if (error) {
     return console.log(error);
     }
     console.log("Rina was saved");
     })

     })
     */


    searchUsername = function (userName) {

       User.findOne({'userInfo.username': userName},function(err,user){
           console.log(user);
           return user
       })


    }
    searchUserFirstName = function (userFirstName) {
        User.findOne({'userInfo.userFistName': userFirstName}, function (err, user) {
            var user = user.userInfo;

        })

    }
    searchUserLastName = function (userLastName) {
        User.findOne({'userInfo.userLastName': userLastName}, function (err, user) {
            console.log(user.userInfo);
        })
    }
    searchUserEmail = function (userEmail) {
        User.findOne({'userInfo.userEmail': userEmail}, function (err, user) {
            console.log(user.userInfo);
        })
    }
module.exports.search = searchUsername;
module.exports.User = User;