
var w = $(window).width();
var h = $(window).height();
var targetX = Math.floor(w / 2);
var targetY = Math.floor(h / 2);

var systemImgLocal = new Array(3);
var duckLeft = new Array(4);
var duckRight = new Array(4);
var duckShotImg = new Image();

for (var i = 0; i < 3; i++){
    systemImgLocal[i] = new Image();
    switch (i){
        case 0:
            systemImgLocal[i].src = "img/Background.png";
            break;
        case 1:
            systemImgLocal[i].src = "img/Foreground.png";
            break;
        case 2:
            systemImgLocal[i].src = "img/Target.png";
            break;
    }
}

for (var i = 0; i < 4; i++){
    duckLeft[i] = new Image();
    duckRight[i] = new Image();
    switch (i){
        case 0:
            duckLeft[i].src = "img/Duck_Flying_Left_0.png";
            duckRight[i].src = "img/Duck_Flying_Right_0.png";
            break;
        case 1:
            duckLeft[i].src = "img/Duck_Flying_Left_1.png";
            duckRight[i].src = "img/Duck_Flying_Right_1.png";
            break;
        case 2:
            duckLeft[i].src = "img/Duck_Flying_Left_2.png";
            duckRight[i].src = "img/Duck_Flying_Right_2.png";
            break;
        case 3:
            duckLeft[i].src = "img/Duck_Flying_Left_3.png";
            duckRight[i].src = "img/Duck_Flying_Right_3.png";
            break;
    }
}

duckShotImg.src = "img/Duck_Shot.png";
var bg = new Image();

var duckNb = 30;
var duckImg = new Array(duckNb);
var duckImgBuffer = new Array(duckNb);
var duckSize = new Array(duckNb);
var duckX = new Array(duckNb);
var duckY = new Array(duckNb);
var duckAlive = new Array(duckNb);
var duckShot = new Array(duckNb);
var duckShotCount = new Array(duckNb);
var duckDir = new Array(duckNb);
var duckFrame = new Array(duckNb);
var duckFrameCount = new Array(duckNb);
var duckNextFrame = new Array(duckNb);
var duckSpeed = new Array(duckNb);
var duckSlope = new Array(duckNb);
var spawnInterval = 3000;
var frameRefreshRate = 20;
var score = 0;
var nextDuck = 0;
var running = false;
var reset = false;

$(function() {
    $("#container").html('<canvas id="myCanvas" width="' + w + '" height="' + h + '" style="position:fixed; top:0; left:0;"></canvas>');
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    function init(){
        var duckNb = 30;
        var duckImg = new Array(duckNb);
        var duckImgBuffer = new Array(duckNb);
        var duckSize = new Array(duckNb);
        var duckX = new Array(duckNb);
        var duckY = new Array(duckNb);
        var duckAlive = new Array(duckNb);
        var duckShot = new Array(duckNb);
        var duckShotCount = new Array(duckNb);
        var duckDir = new Array(duckNb);
        var duckFrame = new Array(duckNb);
        var duckFrameCount = new Array(duckNb);
        var duckNextFrame = new Array(duckNb);
        var duckSpeed = new Array(duckNb);
        var duckSlope = new Array(duckNb);
        var spawnInterval = 3000;
        var frameRefreshRate = 20;
        var score = 0;
        var nextDuck = 0;
        var running = false;

        for (var i = 0; i < duckNb; i++) {
            duckImg[i] = new Image();
            duckImgBuffer[i] = new Image();
            duckSize[i] = 100;
            duckX[i] = 0;
            duckY[i] = h;
            duckAlive[i] = false;
            duckShot[i] = false;
            duckShotCount[i] = 0;
            var random = Math.floor((Math.random() * 2));
            if (random == 0) {
                duckDir[i] = "Left";
            } else {
                duckDir[i] = "Right";
            }
            random = Math.floor(Math.random() * (w / 5 * 3));
            if (duckDir[i] == "Left") {
                duckX[i] = Math.floor(random + w / 5 * 3);
            } else if (duckDir[i] = "Right") {
                duckX[i] = random;
            }
            duckFrame[i] = 0;
            duckFrameCount[i] = 0;
            duckNextFrame[i] = 1;
            var minSpeed = 2;
            var speedSpreading = 1;
            var random = Math.floor((Math.random() * speedSpreading) + minSpeed);
            duckSpeed[i] = random;
            var random = Math.floor(Math.random() * 5) + 5;
            duckSlope[i] = random / 10;
        }

        var targetSize = 100;
        // var targetX = Math.floor(w / 2);
        // var targetY = Math.floor(h / 2);
        var firstLoop = true;
    }

    for (var i = 0; i < duckNb; i++) {
        duckImg[i] = new Image();
        duckImgBuffer[i] = new Image();
        duckSize[i] = 100;
        duckX[i] = 0;
        duckY[i] = h;
        duckAlive[i] = false;
        duckShot[i] = false;
        duckShotCount[i] = 0;
        var random = Math.floor((Math.random() * 2));
        if (random == 0) {
            duckDir[i] = "Left";
        } else {
            duckDir[i] = "Right";
        }
        random = Math.floor(Math.random() * (w / 5 * 3));
        if (duckDir[i] == "Left") {
            duckX[i] = Math.floor(random + w / 5 * 3);
        } else if (duckDir[i] = "Right") {
            duckX[i] = random;
        }
        duckFrame[i] = 0;
        duckFrameCount[i] = 0;
        duckNextFrame[i] = 1;
        var minSpeed = 2;
        var speedSpreading = 1;
        var random = Math.floor((Math.random() * speedSpreading) + minSpeed);
        duckSpeed[i] = random;
        var random = Math.floor(Math.random() * 5) + 5;
        duckSlope[i] = random / 10;
    }

    var targetImg = new Image();
    targetImg = systemImgLocal[2];
    var fg = new Image();
    var targetSize = 100;
    // var targetX = Math.floor(w / 2);
    // var targetY = Math.floor(h / 2);
    var firstLoop = true;
    refreshFrame();
    refreshFrame();

    setInterval(run, frameRefreshRate);

    function run(){
        if(running){
            refreshFrame();
        }
    }

    setInterval(function () {
        if (nextDuck >= 0 && nextDuck < duckNb) {
            duckAlive[nextDuck] = true;
            nextDuck++;
        } else {
            nextDuck++;
        }
    }, spawnInterval);

    function refreshFrame() {
        if(reset){
            init();
            reset = false;
        }
        if (firstLoop) {
            bg.onload = function () {
                ctx.drawImage(bg, 0, 0, w, h);
                for (var i = 0; i < duckNb; i++) {
                    if (duckDir[i] == "Left"){
                        duckImgBuffer[i] = duckLeft[duckNextFrame[i]];
                    } else if (duckDir[i] == "Right"){
                        duckImgBuffer[i] = duckRight[duckNextFrame[i]];
                    }
                    if (duckFrameCount == 0){
                        duckImg[i] = duckImgBuffer;
                    } else {
                        if (duckDir[i] == "Left"){
                            duckImg[i] = duckLeft[duckNextFrame[i]];
                        } else if (duckDir[i] == "Right"){
                            duckImg[i] = duckRight[duckNextFrame[i]];
                        }
                    }
                }
            };

            for (var i = 0; i < duckNb; i++) {
                if (duckAlive[i]){
                    if (duckImg[i].complete) {
                        ctx.drawImage(duckImg[i], duckX[i] - duckSize[i] / 2, duckY[i] - duckSize[i] / 2, duckSize[i], duckSize[i]);
                    }
                } else {
                    duckImg[i] = duckShotImg;
                    ctx.drawImage(duckImg[i], duckX[i] - duckSize[i] / 2, duckY[i] - duckSize[i] / 2, duckSize[i], duckSize[i]);
                }
                if (i == 9){
                    fg = systemImgLocal[1];
                }
            }

            fg.onload = function () {
                ctx.drawImage(fg, 0, 0, w, h);
                if (nextDuck < duckNb + 3) {
                    ctx.font = "20px Georgia";
                    ctx.textAlign = "left";
                    ctx.fillStyle = 'black';
                    ctx.fillText("SCORE", 30, 30);
                    ctx.fillText(score + '/' + duckNb, 30, 60);
                }
            };

            targetImg.onload = function () {
                if (targetX < 0) {
                    targetX = 0;
                }

                if (targetX > w) {
                    targetX = w;
                }

                if (targetY < 0) {
                    targetY = 0;
                }

                if (targetY > h) {
                    targetY = h;
                }

                ctx.drawImage(targetImg, targetX - targetSize / 2, targetY - targetSize / 2, targetSize, targetSize);

            };

            bg = systemImgLocal[0];

        } else {
            ctx.drawImage(bg, 0, 0, w, h);
            for (var i = 0; i < duckNb; i++) {
                if (duckAlive[i]) {
                    if (duckDir[i] == "Left"){
                        duckImgBuffer[i] = duckLeft[duckNextFrame[i]];
                    } else if (duckDir[i] == "Right"){
                        duckImgBuffer[i] = duckRight[duckNextFrame[i]];
                    }
                    if (duckFrameCount == 0){
                        duckImg[i] = duckImgBuffer;
                    } else {
                        if (duckDir[i] == "Left"){
                            duckImg[i] = duckLeft[duckNextFrame[i]];
                        } else if (duckDir[i] == "Right"){
                            duckImg[i] = duckRight[duckNextFrame[i]];
                        }
                    }
                    ctx.drawImage(duckImg[i], duckX[i] - duckSize[i] / 2, duckY[i] - duckSize[i] / 2, duckSize[i], duckSize[i]);
                } else {
                    duckImg[i] = duckShotImg;
                    ctx.drawImage(duckImg[i], duckX[i] - duckSize[i] / 2, duckY[i] - duckSize[i] / 2, duckSize[i], duckSize[i]);
                }
            }

            if (targetX < 0) {
                targetX = 0;
            }

            if (targetX > w) {
                targetX = w;
            }

            if (targetY < 0) {
                targetY = 0;
            }

            if (targetY > h) {
                targetY = h;
            }

            ctx.drawImage(fg, 0, 0, w, h);
            ctx.drawImage(targetImg, targetX - targetSize / 2, targetY - targetSize / 2, targetSize, targetSize);

            if (nextDuck < duckNb + 3) {
                ctx.font = "20px Georgia";
                ctx.textAlign = "left";
                ctx.fillStyle = 'black';
                ctx.fillText("SCORE", 30, 40);
                ctx.fillText(score + "/" + duckNb, 30, 70);
            } else if (nextDuck >= duckNb + 7) {
                targetImg.src = "";
                ctx.font = "20px Georgia";
                ctx.textAlign = "center";
                ctx.fillStyle = 'black';
                ctx.fillText("GAME OVER!!", w / 2, h / 2);
                ctx.fillText("SCORE: " + score + '/' + duckNb, w / 2, h / 2 + 30);
                ctx.fillText("SHOOT TO RESET", w / 2, h / 2 + 60);
                running=false;
            }
        }

        for (var i = 0; i < duckNb; i++) {
            if (duckAlive[i] && duckDir[i] == "Left") {
                duckX[i] -= duckSpeed[i];
                duckY[i] -= duckSpeed[i] * duckSlope[i];
            } else if (duckAlive[i] && duckDir[i] == "Right") {
                duckX[i] += duckSpeed[i];
                duckY[i] -= duckSpeed[i] * duckSlope[i];
            } else if (!duckAlive[i] && duckShot[i]) {
                if (duckShotCount[i] < 15) {
                    duckShotCount[i]++;
                } else {
                    duckY[i] += 15;
                }
            }
            switch (duckFrame[i]) {
                case 0:
                    if (duckFrameCount[i] < 7) {
                        duckFrameCount[i]++;
                    } else {
                        duckFrame[i] = 1;
                        duckFrameCount[i] = 0;
                        duckNextFrame[i] = 2;
                    }
                    break;
                case 1:
                    if (duckFrameCount[i] < 7) {
                        duckFrameCount[i]++;
                    } else {
                        duckFrame[i] = 2;
                        duckFrameCount[i] = 0;
                        duckNextFrame[i] = 3;
                    }
                    break;
                case 2:
                    if (duckFrameCount[i] < 7) {
                        duckFrameCount[i]++;
                    } else {
                        duckFrame[i] = 3;
                        duckFrameCount[i] = 0;
                        duckNextFrame[i] = 0;
                    }
                    break;
                case 3:
                    if (duckFrameCount[i] < 7) {
                        duckFrameCount[i]++;
                    } else {
                        duckFrame[i] = 0;
                        duckFrameCount[i] = 0;
                        duckNextFrame[i] = 1;
                    }
                    break;
            }
        }


        if (firstLoop) {
            firstLoop = false;
        }

    }


//
//    document.onkeydown = checkKey;
//
//    function checkKey(e) {
//
//        e = e || window.event;
//
//        if (e.keyCode == '38') {
//            // up arrow
//            targetY -= 50;
//        }
//
//        if (e.keyCode == '40') {
//            // down arrow
//            targetY += 50;
//        }
//
//        if (e.keyCode == '37') {
//           // left arrow
//            targetX -= 50;
//        }
//
//        if (e.keyCode == '39') {
//           // right arrow
//            targetX += 50;
//        }
//
//        if (e.keyCode == '32') {
//            for (var i = 0; i < 10; i++){
//                if (duckAlive[i] && targetX >= duckX[i] - duckSize[i] / 2 && targetX <= duckX[i] + duckSize[i] / 2 && targetY >= duckY[i] - duckSize[i] / 2 && targetY <= duckY[i] + duckSize[i] / 2) {
//                    duckAlive[i] = false;
//                    duckShot[i] = true;
//                    score++;
//                }
//            }
//
//            if (nextDuck >= 13){
//                location.reload();
//            }
//        }
//
//    }
//
});
