var express = require('express');
var router = express.Router();

var tokens = [];
/* GET users listing. */
router.get('/', function(req, res, next) {
    var funct = req.query.function;
    if(funct == 'gen'){
        res.status(200).send(JSON.stringify(generateToken()));
    }else if(funct == 'del'){
        var tok = req.query.token;
        if(tok != undefined){
            var deleted =deleteToken(tok);
            var status = deleted ? 200:400;
            var body = deleted ? 'Deleted' : 'bad token';
            res.status(status).send(body);
        }else{
            res.status(400).send('Error: missing token');
        }
    }else if(funct == 'valid'){
        var tok = req.query.token;
        var valid = false;
        tokens.forEach(function(arrayTok){
            if(tok == arrayTok){
                valid = true;
                var response = {valid : valid};
                res.status(200).send(JSON.stringify(response));
            }
        });
        setTimeout(function(){
            if(!valid){
                res.status(400).send("no token");
            }
        }, 500);
    }else{
        console.log(funct);
        res.status(400).send('Error: bad or missing function');
    }
});

var generateToken = function(){
    var set = true;
    do{
        var num = ((Math.random().toFixed(5))*10e5).toFixed();
        tokens.forEach(function(token){
            if(token == num){
                set = false;
            }
        });
    }while(!set);
    tokens.push(num);
    console.log('token generated: %s', num);
    return {token:num};
};

var deleteToken= function(token){
    var del = false;
    var index = tokens.indexOf(token);
    if (index > -1) {
        tokens.splice(index, 1);
        console.log('token deleted: %s', token);
        del = true;
    }
    return del;
};
module.exports = router;
