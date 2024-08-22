/*
function motion(event){
    $('h2').text("Accelerometer: "
      + event.accelerationIncludingGravity.x + ", "
      + event.accelerationIncludingGravity.y + ", "
      + event.accelerationIncludingGravity.z
    );
  }


if(window.DeviceMotionEvent){
    window.addEventListener("devicemotion", motion, false);
  }else{
    alert("DeviceMotionEvent is not supported");
  }
*/
function motion(event){
    $('h2').text("Accelerometer: "
      + event.alpha + ", "
      + event.beta + ", "
      + event.gamma
    );
  }


if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", motion, false);
  }else{
    alert("DeviceMotionEvent is not supported");
  }
