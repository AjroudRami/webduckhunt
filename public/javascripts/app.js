var localAdress = '10.212.97.195:3000';
$(function(){
    // Get references to elements on the page.
    // var form = document.getElementById('message-form');
    // var messageField = document.getElementById('message');
    // var messagesList = document.getElementById('messages');
    var socketStatus = document.getElementById('status');
    // var closeBtn = document.getElementById('close');
    // var devBtn = document.getElementById('dev');
    //var devId = document.getElementById('devId');
    //var connectBtn = document.getElementById('connectBtn');

    var QueryString = function () {
        // This function is anonymous, is executed immediately and
        // the return value is assigned to QueryString!
        var query_string = {};
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            // If first entry with this name
            if (typeof query_string[pair[0]] === "undefined") {
                query_string[pair[0]] = decodeURIComponent(pair[1]);
                // If second entry with this name
            } else if (typeof query_string[pair[0]] === "string") {
                var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
                query_string[pair[0]] = arr;
                // If third or later entry with this name
            } else {
                query_string[pair[0]].push(decodeURIComponent(pair[1]));
            }
        }
        return query_string;
    }();

    var token = QueryString.token;
    var device = QueryString.device;
    $('#token').text(token).css('top', h/2 - 50).css('left', w/2 - 100);

// Create a new WebSocket.
    var socket = new WebSocket('ws://'+localAdress+'?access_token=' +token + '&device_id='+ device);
// Show a connected message when the WebSocket is opened.
    socket.onopen = function(event) {
        socketStatus.innerHTML = '• Connected';
        socketStatus.className = 'connected';
    };
    // Handle any errors that occur.
    socket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };


    // Send a message when the form is submitted.
    // form.onsubmit = function(e) {
    //     e.preventDefault();
    //
    //     // Retrieve the message from the textarea.
    //     var message = messageField.value;
    //
    //     // Send the message through the WebSocket.
    //     socket.send(message);
    //
    //     // Add the message to the messages list.
    //     messagesList.innerHTML += '<li class="sent"><span>Sent:</span>' + message +
    //         '</li>';
    //
    //     // Clear out the message field.
    //     messageField.value = '';
    //
    //     return false;
    // };

    // Handle messages sent by the server.
    socket.onmessage = function(event) {
        $("#token").hide();
        var message = event.data;
        var received = JSON.parse(event.data);
        switch(received.action){
            case 'updateState':targetX = received.posX * w / 100;
                                targetY = h - (received.posY * h / 100);
                                if(received.shooting){
                                    for (var i = 0; i < duckNb; i++){
                                        if (duckAlive[i] && targetX >= duckX[i] - duckSize[i] / 2 && targetX <= duckX[i] + duckSize[i] / 2 && targetY >= duckY[i] - duckSize[i] / 2 && targetY <= duckY[i] + duckSize[i] / 2) {
                                            duckAlive[i] = false;
                                            duckShot[i] = true;
                                            score++;
                                            console.log('died');
                                            socket.send(JSON.stringify({action: 'updateScore', score: score}));
                                        }
                                    }
                                    if (nextDuck >= duckNb + 3){
                                        reset = true;
                                    }
                                } break;
            case 'pause': running = false; console.log('game paused');break;
            case 'resume': running = true; console.log('game resumed'); break;
        }
    };
    // Show a disconnected message when the WebSocket is closed.
    socket.onclose = function(event) {
        socketStatus.innerHTML = 'Disconnected from WebSocket.';
        socketStatus.className = 'no-connexion';
    };
    // // Close the WebSocket connection when the close button is clicked.
    // closeBtn.onclick = function(e) {
    //     e.preventDefault();
    //
    //     // Close the WebSocket.
    //     socket.close();
    //
    //     return false;
    // };
});