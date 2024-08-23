var img_sz=50;    //length and height of bee to set offset in top and left positioning
var head_sz=50;    //Nav bar heading height, to adjust available space on screen for game
var h=window.innerHeight-head_sz;
var w=window.innerWidth;
var tp='top';
var lft='left';
var hive_x=25;
var hive_y=25;

var lvl=1;

//----------------------------Bee motion based on Gyroscope-----------------------------------------------------

//x and y axis value adjuster
function motion(event){
    if(parseInt($('#bee').css(tp))>0 && parseInt($('#bee').css(tp))<(h-img_sz))
    {$('#bee').css(tp,String(parseInt($('#bee').css(tp))+event.beta/10)+'px')}

    if(parseInt($('#bee').css(lft))>0 && parseInt($('#bee').css(lft))<(w-img_sz))
      {$('#bee').css(lft,String(parseInt($('#bee').css(lft))+event.gamma/10)+'px')}

    if(parseInt($('#bee').css(tp))<=0 ||
     parseInt($('#bee').css(tp))>=(h-img_sz)||
     parseInt($('#bee').css(lft))<=0 ||
     parseInt($('#bee').css(lft))>=(w-img_sz)){
      game_over();
     }

    if(parseInt($('#bee').css(tp))<hive_x && parseInt($('#bee').css(lft))<hive_y){level_up();}

  }

//Gyroscope event listener and support check
if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", motion, false);
  }
else{
    alert("DeviceMotionEvent is not supported");
  }

//-------------------------------------------------------------------------------------------------------------

function game_over(){
    $('#lvl-h').text('game');$('#lvl-b').text('over');
    return(1);
}

function restart(){
  $('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
  $('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
  lvl=1;
  $('#lvl-h').text("LEVEL");
  $('#lvl-b').text(String(lvl));
}

function level_up(){
  $('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
  $('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
  lvl+=1;
  $('#lvl-b').text(String(lvl));
}



//-------------------------------------------------------------------------------------------------------------
$('#restart-button').click(function(){restart();});

/*
  function button_control(n){
    if(n==38||n==87){
        //up
        if(parseInt($('#bee').css('top'))>0)
            {$('#bee').css('top',String(parseInt($('img').css('top'))-10)+'px')}
        else{$('#lvl-h').text('game');$('#lvl-b').text('over');}
    }
    else if(n==40||n==83){
        //down
        if(parseInt($('#bee').css('top'))<(h-50))
            {$('#bee').css('top',String(parseInt($('img').css('top'))+10)+'px')}
        else{$('#lvl-h').text('game');$('#lvl-b').text('over');}
    }
    else if(n==37||n==65){
        //left
        if(parseInt($('#bee').css('left'))>0)
            {$('#bee').css('left',String(parseInt($('img').css('left'))-10)+'px')}
        else{$('#lvl-h').text('game');$('#lvl-b').text('over');}
        
    }
    else if(n==39||n==68){
        //right
        if(parseInt($('#bee').css('left'))<(w-50))
            {$('#bee').css('left',String(parseInt($('img').css('left'))+10)+'px')}
        else{$('#lvl-h').text('game');$('#lvl-b').text('over');}
    }
    else{}
}
$('document').keydown(function(event) {button_control(event.keyCode)});
*/

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

//h=$(window).height();
//w=$(window).width();
//w=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
//w=screen.width;
//h=screen.height;
