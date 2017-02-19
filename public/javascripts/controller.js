var localAdress = '10.212.97.195:3000';
$(function(){
    // Get references to elements on the page.

    var shooting = false;
    var x = 0;
    var y = 0;
    var pause = true;
    var socketStatus = document.getElementById('status');
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/gunshot.mp3');

    gyro.frequency = 50;
    gyro.calibrate();
    gyro.startTracking(function(o){
        var offset = 50;
        var alpha = 2 * Math.PI * o.alpha / 360;
        var beta = 2 * Math.PI * o.beta / 360;
        var gamma = 2 * Math.PI * o.gamma / 360;
        var txt = 'orientation: ' + alpha + ' gamma ' + gamma + ' beta ' + beta + ' ' + o.x + ' ' + o.y + ' ' + o.z;
        $("#GyAx").text(txt);
        var y1 = Math.sin(beta);
        var x1 = - Math.cos(beta)*Math.sin(alpha);
        var x1simple = x1.toFixed(3) * 100 + offset;
        var y1simple = y1.toFixed(3) * 100 + offset;
        $("#xY").text('x: ' + x1simple + ' y: ' + y1simple);

        //screen is in a little part of the angle, avoid large movement to reach borders
        x = (x1simple>2*offset)?2*offset:x1simple;
        x = (x1simple<0)?0:x1simple;

        y = (y1simple>2*offset)?2*offsetp:y1simple;
        y = (y1simple<0)?0:y1simple;

    });

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

    //needed for connection to the socket
    var token = QueryString.token;
    var device = QueryString.device;

// Create a new WebSocket.
    var socket = new WebSocket('ws://'+localAdress+'?access_token=' +token + '&device_id='+ device);

// Show a connected message when the WebSocket is opened.
    socket.onopen = function(event) {
        socketStatus.innerHTML = 'Connected';
        socketStatus.className = 'connected';
    };
    // Handle any errors that occur.
    socket.onerror = function(error) {
        console.log('WebSocket Error: ' + error);
    };

    function vibrate(){
        if(shooting){
            navigator.vibrate(100);
        }
    }

    setInterval(vibrate, 500);

    var sendState = function(){
        if(!pause) {
            var state = {
                action: "updateState",
                shooting: shooting,
                posX: x,
                posY: y
            };
            socket.send(JSON.stringify(state));
        }
    };
    var playsound = function(){
        if(shooting){
            audioElement.currentTime = 0.100;
            audioElement.play();
        }else{
            audioElement.currentTime = 0;
            audioElement.pause();
        }
    };

    setInterval(sendState, 50);
    audioElement.addEventListener("canplay",function(){
       setInterval(playsound, 600);
    });

    // Handle messages sent by the server.
    socket.onmessage = function(event) {
        var message = event.data;
        var received = JSON.parse(event.data);
        if(received.action == 'updateScore'){
            $("#score").text("Score: " + received.score);
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

    function shoot(){
        shooting = true;
        audioElement.currentTime
    }

    $("#trigger").on('touchstart', function(e) {
        e.preventDefault();
        shooting=true;
        playsound();
    });
    $("#trigger").on('touchend', function(e) {
        e.preventDefault();
        shooting=false;
    });
    $("#pause").on('touchstart', function(e){
        e.preventDefault();
        pause = !pause;
        var pText = pause?'Resume':'Pause';
        $("#pause").text(pText);
        var sText = pause?'pause':'resume';
        var request = {action: sText};
        socket.send(JSON.stringify(request));
    })

});
