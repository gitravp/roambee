//h=window.innerHeight;
//w=window.innerWidth;
//h=$(window).height();
//w=$(window).width();
//w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
w=screen.width;
h=screen.height;
function motion(event){

    if(parseInt($('#bee').css('top'))>=0 && parseInt($('#bee').css('top'))<h)
    {$('#bee').css('top',String(parseInt($('#bee').css('top'))+event.beta/10)+'px')}
    else{$('lvl-h').text('game');$('lvl-b').text('over');}
    //else{$('#bee').css('top',String(parseInt($('#bee').css('top'))%h)+'px')}

    if(parseInt($('#bee').css('left'))>=0 && parseInt($('#bee').css('left'))<w)
        {$('#bee').css('left',String(parseInt($('#bee').css('left'))+event.gamma/10)+'px')}
    else{$('lvl-h').text('game');$('lvl-b').text('over');}
    //else{$('#bee').css('left',String(parseInt($('#bee').css('left'))%w)+'px')}

  } 


if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", motion, false);
  }else{
    alert("DeviceMotionEvent is not supported");
  }

  $('#bee').css('top',String(parseFloat(h)*0.7)+'px')
  $('#bee').css('left',String(parseFloat(w)*0.5)+'px')


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
/*
    //$('h2').text("Accelerometer: "
    //    + event.alpha + ", "
    //    + event.beta + ", "
    //    + event.gamma
    // );
    
    if(parseInt($('img').css('top'))>0 && parseInt($('img').css('top'))<(window.innerHeight-60))
    {$('img').css('top',String(parseInt($('img').css('top'))+event.beta/10)+'px')}
    else{$('img').css('top','1px')}

    if(parseInt($('img').css('left'))>0 && parseInt($('img').css('left'))<(window.innerWidth-60))
        {$('img').css('left',String(parseInt($('img').css('left'))+event.gamma/10)+'px')}
    else{$('img').css('left','1px')}
    */





