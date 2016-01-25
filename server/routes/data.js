var express = require('express');
var pg = require('pg');
var router = express.Router();
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sqlsolo';

router.get('/users', function(request, response){
    var results = [];

    pg.connect(connectionString, function(err, client){
        if(err) {
            console.log(err);
        }
        var query = client.query("SELECT name FROM users ORDER BY id ASC");

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(results);
        })
    })
});

router.get('/location/:id', function(request, response){
    var results = [];

    pg.connect(connectionString, function(err, client){
        if(err) {
            console.log(err);
        }
        var query = client.query("SELECT name, address_type, address_street, address_city, address_state FROM addresses JOIN users ON users.id = addresses.user_id WHERE user_id = " + id);

        query.on('row', function(row){
            results.push(row);
        });

        query.on('end', function(){
            client.end();
            return response.json(results);
        })
    })
});

router.get('/orders/:id', function(request, response){
    var returnData = [];

    var id = request.params.id;


    pg.connect(connectionString, function(err, client){

        var query = client.query("SELECT * FROM addresses LEFT OUTER JOIN orders ON addresses.address_id = orders.ship_address_id WHERE orders.user_id = " + id);

        query.on('row', function(row) {
            returnData.push(row);
        });


        query.on('end', function(){
            client.end();
            return response.json(returnData);

        });

    });
});





module.exports = router;