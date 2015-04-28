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
    var i = 0;

    while(i < Object.keys(data[1].steps).length){
        var step = {
            title: 'Step ' + (i+1) + ' - ' + data[1].steps[i.toString()]
        }
    
        steps.push(step);

        i++;
    
    };

    return steps; 
}

function getStep(data, step){
    return data[1].steps[step.toString()]
}

var main = new UI.Card({
    title: 'BBC Food',
    subtitle: 'v0.1',
    body: 'Hit any button to grab a random recipe!'
});

main.show();

main.on('click', 'up', function(e) {
    console.warn('Initialising application, grabbing data...');

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
                card.title('About this dish');
                card.body(data[0].summary.title);
                card.scrollable(true);
                card.style('large');
                card.show();
            }else if(e.itemIndex == 1){
                 var prep = new UI.Menu({
                    sections: [{
                        title: data[0].summary.title,
                        items: parseStepData(data)
                    }]
                });

                prep.on('select', function(e) {
                    console.log('selecting!')
                    var card = new UI.Card();
                    card.title('Step ' + (e.itemIndex + 1));
                    card.body(getStep(data, e.itemIndex));
                    card.scrollable(true);
                    card.style('large')
                    card.show();
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


