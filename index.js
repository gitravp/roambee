var img_sz=50;    //length and height of bee to set offset in top and left positioning
var hive_sz=75;    //length and height of hive to set offset in top and left positioning for obstacles
var head_sz=50;    //Nav bar heading height, to adjust available space on screen for game
var h=window.innerHeight-head_sz;
var w=window.innerWidth;
var tp='top';
var lft='left';
var hive_x=35;
var hive_y=35;
var lvl=1;
var strt=0;
var doing_something=0;

var obstacles=[];    //array to store all possible obstacles
var lvl_obstacles=[];    //selected  obstacles based on level
var r=h-hive_sz-img_sz-10; //total row space or height available (10 is initial bee offset)
var c=w;    //total column space or width available
var no_of_rows=1;    //total rows of obstacles
var no_of_cols=1;    //total columns of obstacles
var obs_height=r/no_of_rows;
var obs_width=c/no_of_cols;
var offset_top=hive_sz;
var offset_left=0;

//----------------------------Generate,Display Obstacles and Check collision------------------------------------
//generate obstacles list based on level
async function obstacle_gen(){
  obstacles=[];
  lvl_obstacles=[];

  for(i=0;i<no_of_rows;i++){
    for(j=0;j<no_of_cols;j++){
      r1=i*r/no_of_rows;
      if(i%2==0)    //staggered columns in alternate rows rathar than 100% aligned columns
      {c1=j*c/no_of_cols;}
      else
      {c1=(j*c/no_of_cols)+c/(no_of_cols*2);}
      obstacles.push([r1+offset_top,c1+offset_left]);
    }
  }

}

//Select an additional object each level up
async function obstacle_selector(){
  while(lvl_obstacles.length<lvl)
  {
  let rand_no=obstacles.length==1?0:Math.floor(Math.random()*obstacles.length);
  //let temp=obstacles[rand_no];
  //delete obstacles[rand_no];
  let temp=obstacles.splice(rand_no,1);
  alert(rand_no+"-"+temp+typeof(temp);
  lvl_obstacles.push(temp);
  }
  //return(obstacle_display());
}

//Remove old obstacles, display new ones
async function obstacle_display(){
  $('img.obs').remove();
  for(k=0;k<lvl_obstacles.length;k++){
    alert(String(lvl_obstacles[k][0])+",abc,"+String(lvl_obstacles[k][1]));
    let s="<img src='assets/hole.png' class='obs' "+
    "style='position: absolute;z-index: -1;margin-left:"+String(lvl_obstacles[k][1])+
    "px;margin-top: "+String(lvl_obstacles[k][0])+
    "px; height:"+String(obs_height)+
    "px;width:"+String(obs_width)+"px;'>";
    $('div#obstacle-arena').append(s); 
  }
}

//check for collision of bee with an obstacle
function obstacle_collision(bee_tp,bee_lf){
  detection_margin=0.4;
  for(i=0;i<lvl_obstacles.length;i++){
    if(bee_tp+img_sz>=(lvl_obstacles[i][0]+detection_margin*obs_height) && 
       bee_tp<=(lvl_obstacles[i][0]+obs_height-detection_margin*obs_height )&& 
       bee_lf+img_sz>=(lvl_obstacles[i][1]+detection_margin*obs_width )&& 
       bee_lf<=(lvl_obstacles[i][1]+obs_width-detection_margin*obs_width)){
      return true;
    }
  }
  return false;
}

//----------------------------Bee motion based on Gyroscope-----------------------------------------------------

//x and y axis value adjuster
function motion(event){
  if(strt==1 && doing_something==0)
    {
      if(parseInt($('#bee').css(tp))>0 && parseInt($('#bee').css(tp))<(h-img_sz))
      {$('#bee').css(tp,String(parseInt($('#bee').css(tp))+event.beta/10)+'px')}

      if(parseInt($('#bee').css(lft))>0 && parseInt($('#bee').css(lft))<(w-img_sz))
        {$('#bee').css(lft,String(parseInt($('#bee').css(lft))+event.gamma/10)+'px')}

      if(parseInt($('#bee').css(tp))<hive_x && parseInt($('#bee').css(lft))<hive_y){return(level_up());}
      else if(parseInt($('#bee').css(tp))<=0 ||
      parseInt($('#bee').css(tp))>=(h-img_sz)||
      parseInt($('#bee').css(lft))<=0 ||
      parseInt($('#bee').css(lft))>=(w-img_sz) || 
      obstacle_collision(parseInt($('#bee').css(tp)),parseInt($('#bee').css(lft)))){
      return(game_over());
      }
      else{}
    }
    
  }

//------------------------------------------Game over and restart----------------------------------------------
function game_over(){
  $('#lvl-h').text('game');$('#lvl-b').text('over');
  strt=0;
  return(1);
}

async function restart(){
doing_something=1;
$('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
$('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
lvl=1;
$('#lvl-h').text("LEVEL");
$('#lvl-b').text(String(lvl));
strt=1;
//If restarted, generate obstacles b4 selection and display
no_of_rows=1;    //total rows of obstacles
no_of_cols=1;    //total columns of obstacles
obs_height=r/no_of_rows;
obs_width=c/no_of_cols;
const p1= await obstacle_gen();
const p2=await obstacle_selector();
const p3=await obstacle_display();
doing_something=0;
}

async function level_up(){
doing_something=1;
$('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
$('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
lvl+=1;
$('#lvl-b').text(String(lvl));
//if regular level up, just select obstacles from generated list and display
if(lvl>no_of_cols*no_of_rows){
  no_of_cols+=1;
  no_of_rows+=1;
  obs_height=r/no_of_rows;
  obs_width=c/no_of_cols;
  const p4=await obstacle_gen();
}
const p5=await obstacle_selector();
alert("sel_sucess"+lvl_obstacles+"\n"+obstacles);
const p6=await obstacle_display();
alert("disp_sucess");
doing_something=0;
}

$('#restart-button').click(function(){restart();});

//-------------------------------------------------------------------------------------------------------------

//Gyroscope event listener and support check
//setInterval(() => {document.dispatchEvent("deviceorientation");}, 50);

if(window.DeviceMotionEvent){
    window.addEventListener("deviceorientation", motion, false);
  }
else{
    alert("DeviceMotionEvent is not supported");
  }

//-------------------------------------------------------------------------------------------------------------




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
