leftWristx = 0
rightWristx = 0
leftWristy = 0
rightWristx = 0
song = "";
scoreleftwrist = 0
scorerightwrist = 0
function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose',gotPoses)
    function modelLoaded() {
        console.log("Model loaded")
    
    }
}
function draw() {
 image(video, 0, 0, 600, 500)
 fill("#FF0000")
 stroke("#FF000")

 if (scorerightwrist > 0.2) {
     circle(rightWristx, rightWristy, 20)
     if (rightWristy > 0 && rightWristy <= 100 ) {
         document.getElementById("speed_h3").innerHTML = "0.5"
        song.rate(0.5)
     } else if (rightWristy > 100 && rightWristy <= 200) {
        document.getElementById("speed_h3").innerHTML = "1"
        song.rate(1)
     } else if (rightWristy > 200 && rightWristy <= 300) {
        document.getElementById("speed_h3").innerHTML = "1.5"
        song.rate(1.5)
     } else if (rightWristy > 300 && rightWristy <= 400) {
        document.getElementById("speed_h3").innerHTML = "2"
        song.rate(2)
     } else if (rightWristy > 400 ) {
        document.getElementById("speed_h3").innerHTML = "2.5"
        song.rate(2.5)
     }
 } 
 
if (scoreleftwrist > 0.2) {
     circle(leftWristx, leftWristy, 20)
     Innumberleftwristy = Number(leftWristy)
     remove_decimal = floor(Innumberleftwristy)
     volume = remove_decimal/500
     document.getElementById("volume_h3").innerHTML = "Volume = " + volume
     song.setVolume(volume)
}
}


function gotPoses(result) {
    if (result.length > 0) {
        console.log(result)
        leftWristx = result[0].pose.leftWrist.x
        leftWristy = result[0].pose.leftWrist.y
        rightWristx = result[0].pose.rightWrist.x
        rightWristy = result[0].pose.rightWrist.y
        console.log("Left Wrist X = " + leftWristx + " Right Wrist X = " + rightWristx + " Left Wrist Y = " + leftWristy + " Right Wrist Y" + rightWristy )
        scoreleftwrist = result[0].pose.keypoints[9].score
        scorerighttwrist = result[0].pose.keypoints[10].score
        console.log("Left wrist score = " + scoreleftwrist + " Right Wrist score = " + scorerighttwrist)

    }
} 
function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)
}