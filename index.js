var img_sz=50;    //length and height of bee to set offset in top and left positioning
var hive_sz=75;    //length and height of hive to set offset in top and left positioning for obstacles
var head_sz=50;    //Nav bar heading height, to adjust available space on screen for game
var h=window.innerHeight-head_sz;
var w=window.innerWidth;
var tp='top';
var lft='left';
var hive_x=25;
var hive_y=25;
var lvl=1;
strt=0;

var obstacles=[];    //array to store obstacles
var r=h-hive_sz-img_sz-10; //total row space or height available (10 is initial bee offset)
var c=w;    //total column sspace or width available
var no_of_rows=5;    //total rows of obstacles
var no_of_cols=3;    //total columns of obstacles

//--------------------------------Generate Obstacles-----------------------------------------------------------
function obstacle_gen(){
  
  for(i=0;i<no_of_rows;i++){
    for(j=0;j<no_of_cols;j++){
      r1=i*r/no_of_rows;
      c1=j*c/no_of_cols;
      obstacles.push([r1,c1]);
    }
  }
//alert(obstacles);
}

function obstacle_display(){
  offset_top=hive_sz;
  offset_left=0;
  for(i=0;i<obstacles.length;i++){
    s="<img src='assets/hole.png' class='obs' "+"style='position: absolute;z-index: -1;margin-left:"
    +String(obstacles[i][1]+offset_left)+"px;margin-top: "+String(obstacles[i][0]+offset_top)+"px;"+
    "height:"+String(r/5)+"px;width:"+String(c/5)+"px;'>";
    $('div#obstacle-arena').append(s); 

  }
}

//----------------------------Bee motion based on Gyroscope-----------------------------------------------------

//x and y axis value adjuster
function motion(event){
  if(strt==1)
    {
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
  }

//------------------------------------------Game over and restart----------------------------------------------
function game_over(){
  $('#lvl-h').text('game');$('#lvl-b').text('over');
  strt=0;
  return(1);
}

function restart(){
$('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
$('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
lvl=1;
$('#lvl-h').text("LEVEL");
$('#lvl-b').text(String(lvl));
strt=1;
}

function level_up(){
$('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
$('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
lvl+=1;
$('#lvl-b').text(String(lvl));
}
$('#restart-button').click(function(){restart();});

//-------------------------------------------------------------------------------------------------------------

//Gyroscope event listener and support check

if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", motion, false);
  }
else{
    alert("DeviceMotionEvent is not supported");
  }

//-------------------------------------------------------------------------------------------------------------
obstacle_gen();
obstacle_display();


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
