function motion(event){
    //$('h2').text("Accelerometer: "
    //    + event.alpha + ", "
    //    + event.beta + ", "
    //    + event.gamma
    // );
    /*
    if(parseInt($('#bee').css('top'))>0 && parseInt($('#bee').css('top'))<(window.innerHeight-60))
    {$('#bee').css('top',String(parseInt($('#bee').css('top'))+event.beta/10)+'px')}
    else{$('#bee').css('top','1px')}

    if(parseInt($('#bee').css('left'))>0 && parseInt($('#bee').css('left'))<(window.innerWidth-60))
        {$('#bee').css('left',String(parseInt($('#bee').css('left'))+event.gamma/10)+'px')}
    else{$('#bee').css('left','1px')}
    */
    if(parseInt($('#bee').css('top'))>=0 && parseInt($('#bee').css('top'))<(window.innerHeight))
    {$('#bee').css('top',String(parseInt($('#bee').css('top'))+event.beta/10)+'px')}
    else{$('#bee').css('top',String(parseInt($('#bee').css('top'))%(window.innerHeight))+'px')}

    if(parseInt($('img').css('left'))>=0 && parseInt($('img').css('left'))<(window.innerWidth))
        {$('img').css('left',String(parseInt($('img').css('left'))+event.gamma/10)+'px')}
    else{$('img').css('left',String(parseInt($('img').css('left'))%(window.innerWidth))+'px')}


  }


if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", motion, false);
  }else{
    alert("DeviceMotionEvent is not supported");
  }


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
