/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

function parseStepData(data){
    var steps = [];

    console.log(data)

    for(var key in data){
        var step = {
            title: data[key]
        }
        steps.push(step);
    }
    console.log('test', steps)
    return steps; 
}

var main = new UI.Card({
    title: 'BBC Food',
    //subtitle: 'Random Recipe',
    body: 'Hit up to grab a random recipe!'
});

main.show();

main.on('click', 'up', function(e) {
    ajax({
        url: 'http://blog.jacob.uk.com:9111',
        type: 'json'
    },
    function(data) {
        var menu = new UI.Menu({
            sections: [{
                title: data[0].summary.title,
                items: [
                    {
                        title: 'About this dish',
                    }, {
                        title: 'Preperation',
                    }
                ]
            }]
        });

        menu.on('select', function(e) {
            if(e.itemIndex == 0){
                var card = new UI.Card();
                card.title(data[0].summary.title);
                card.subtitle('About this dish');
                card.body('More dish information will come here...');
                card.show();
            }else if(e.itemIndex == 1){
                console.log('steps', parseStepData(data[1]));
                 var prep = new UI.Menu({
                    sections: [{
                        title: data[0].summary.title,
                        items: [  ]
                    }]
                });

                 prep.show();
            }
        });

        menu.show();
    },
    function(error) {
        var card = new UI.Card();
        card.title('Oops...');
        card.body('There was an issue, restart the app.');
        card.show();
    });
});


