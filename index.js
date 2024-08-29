var img_sz=50;    //length and height of bee to set offset in top and left positioning
var hive_sz=75;    //length and height of hive to set offset in top and left positioning for obstacles
var head_sz=50;    //Nav bar heading height, to adjust available space on screen for game
var h=window.innerHeight-head_sz;    //Total window height available for game board(removing nav bar height)
var w=window.innerWidth;    //Total window width available forgame board
var tp='top';    //css attribute for vertical offsetting of bee positioning
var lft='left';    //css attribute for horizontal offsetting of bee positioning
var hive_x=35;    //hive entering horizontal threshold for bee
var hive_y=35;    //hive entering vertical threshold for bee
var hole_x=37;
var hole_y=70;
var lvl=1;    //initialise level
var strt=0;    //game started or not variable, 0=> not started,1=>started
var doing_something=0;    //variable to temporarily halt movement registration of bee when performing other operations

var obstacles=[];    //array to store all possible obstacles
var lvl_obstacles=[];    //selected  obstacles based on level
var r=h-hive_sz-img_sz-10; //total row space or height available (10 is initial bee offset)
var c=w;    //total column space or width available
var no_of_rows=1;    //total rows of obstacles
var no_of_cols=1;    //total columns of obstacles
var obs_height=r/no_of_rows;    //height of obstacle=total height available/number of rows
var obs_width=c/no_of_cols;    //width of obstacle=total width available/number of columns
var offset_top=hive_sz;    //offset to add to vertical position of obstacles
var offset_left=0;    //offset to add to horizontal position of bee
var stagger_percent=0.25;    //staggering percentage of obstacles in alternate rows

var audi_lost='assets/audi_lost.mp3';    //audio file for game over
var audi_win='assets/audi_win.mp3';    //audio file for level complete

//------------------------------- UI improvement functions-----------------------------------------------------

function flasher(txt)
{
  $(txt).fadeOut(40).fadeIn(40).fadeOut(40).fadeIn(40).fadeOut(40).fadeIn(40);
}

//--------------------------Generate/Pick/Display Obstacles and Check collision---------------------------------

//generate obstacles list based on complexity of level
async function obstacle_gen()
{
  obstacles=[];    //initialise obstacle list when new generation is called
  lvl_obstacles=[];    //empty out level array too

  for(i=0;i<no_of_rows;i++)
    {    //iterate through each row
    for(j=0;j<no_of_cols;j++)
      {    //iterate through each column
      r1=i*r/no_of_rows;    //row of current obstacle 
      if(i%2==0)    //column of current obstacle(staggered columns in alternate rows rathar than 100% aligned columns)
        {c1=(j*c/no_of_cols)-(stagger_percent*c/no_of_cols);}
      else
        {c1=(j*c/no_of_cols)+(stagger_percent*c/no_of_cols);}
      obstacles.push([r1+offset_top,c1+offset_left]);    //push row and column of obstacle after adding offsets
      }
    }
}

//Select obstacles to show for the current level
async function obstacle_selector()
{
  while(lvl_obstacles.length<lvl)    //pick obstacles to match current level
  {
    let rand_no=obstacles.length==1?0:Math.floor(Math.random()*obstacles.length);    //get random obstacle from available obstacles in list
    lvl_obstacles.push(obstacles.splice(rand_no,1));   //pull random obstacle out of available list and push into display list for the level 
  }
}

//Remove old obstacles, display new ones
async function obstacle_display()
{
  $('img.obs').remove();    //remove old obstacles
  for(k=0;k<lvl_obstacles.length;k++)
    {    //iterate through current level obstacle list
      let s="<img src='assets/hole.png' class='obs' "+
      "style='position: absolute;z-index: -1;margin-left:"+String(lvl_obstacles[k][0][1])+
      "px;margin-top: "+String(lvl_obstacles[k][0][0])+
      "px; height:"+String(obs_height)+
      "px;width:"+String(obs_width)+"px;'>";    //string of html code to add obstacle
      $('div#obstacle-arena').append(s);    //add the obstacle image tag to our game div tag
    }
}

//check for collision of bee with an obstacle
function obstacle_collision(bee_tp,bee_lf)
{
  detection_margin=0.4;    //detection margin percentage from top right of bee to top right of obstacle
  for(i=0;i<lvl_obstacles.length;i++)    //iterate through each obstacle to check if collided
    {
      if(bee_tp+img_sz>=(lvl_obstacles[i][0][0]+detection_margin*obs_height) && 
        bee_tp<=(lvl_obstacles[i][0][0]+obs_height-detection_margin*obs_height )&& 
        bee_lf+img_sz>=(lvl_obstacles[i][0][1]+detection_margin*obs_width )&& 
        bee_lf<=(lvl_obstacles[i][0][1]+obs_width-detection_margin*obs_width))
          {return true;}    //return true if in collision range
    }
  return false;    //assume no collision by default
}

//----------------------------Bee motion based on Gyroscope-----------------------------------------------------
function beex(){
  return(parseInt($('#bee').css(lft)));
}
function beey(){
  return(parseInt($('#bee').css(tp)));
}

//move bee along x and y axis based on gyro inputs
function motion(event)
{

  if(strt==1 && doing_something==0)    //move bee only of game has started and no ongoing computation
    {
      if(beey()>0 && beey()<(h-img_sz))    //move bee up/down based on beta gyro angle if bee hasnt hit top/bottom yet
        {$('#bee').css(tp,String(beey()+event.beta/10)+'px')}

      if(beex()>0 && beex()<(w-img_sz))    //move bee left/right based on gamma gyro angle if bee hasnt hit right edge/left edge yet
        {$('#bee').css(lft,String(beex()+event.gamma/10)+'px')}

      if(beex()<hive_x && beey()<hive_y)    //check if bee has reached hive to initiate level up
        {return(level_up());}
      else if(beey()<=0 ||
      beey()>=(h-img_sz)||
      beex()<=0 ||
      beex()>=(w-img_sz) || 
      obstacle_collision(beey(),beex()))    //check if be has hit top/bottom/right/left edge or collided with obstacle to initiate game over
        {
          if('vibrate'in navigator)
            {
              navigator.vibrate(100);
            }
          flasher('#bee');
          return(game_over());
        }
      else
        {}    //else proceed as usual
    }
}

//------------------------------------------Game over and restart----------------------------------------------

//game over sequence
function game_over()
{
  new Audio(audi_lost).play();
  $('#lvl-h').text('game');$('#lvl-b').text('over');    //set text to game over
  strt=0;    //game started variable set to 0
  return(1);    //return
}

//Restart sequence
async function restart()
{
  doing_something=1;    //set doing_something to 1 till all tasks are completed
  $('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
  $('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
  lvl=1;    //initialise level to 1
  $('#lvl-h').text("LEVEL");    //set text to show current level(1)
  $('#lvl-b').text(String(lvl));
  strt=1;    //game started variable set to 1
  
  no_of_rows=1;    //initialise total rows of obstacles to 1
  no_of_cols=1;    //initialise total columns of obstacles to 1
  obs_height=r/no_of_rows;    //set lvl 1 obstacle height
  obs_width=c/no_of_cols;    //set lvl 1 obstacle width
  const p1= await obstacle_gen();    //await generation of obstacles
  const p2=await obstacle_selector();    //await selection of obstacles
  const p3=await obstacle_display();    //await display of obstacles
  doing_something=0;    //allow motion again by resetting doing_something back to 0
}

//level up sequence
async function level_up()
{
  doing_something=1;    //set doing_something to 1 till all tasks are completed
  new Audio(audi_win).play();
  $('#bee').css(tp,String(parseInt(h-60))+'px')    //initialise bee position Y axis
  $('#bee').css(lft,String(parseInt(w-60))+'px')    //initialise bee position X axis
  $('#bee').fadeIn(500);    //fade in bee
  lvl+=1;    //increment level by 1
  $('#lvl-b').text(String(lvl));    //set text to show current level
  //if regular level up, just select obstacles from generated list and display
  if(lvl>no_of_cols*no_of_rows)    //if current number of obstacles exhausted, generate more for higher levels
    {
      no_of_cols+=1;    //1 additional column
      no_of_rows+=1;    //1 additional row
      obs_height=r/no_of_rows;    //recalculate image height
      obs_width=c/no_of_cols;    //recalculate image width
      const p4=await obstacle_gen();    //await generation of obstacles
    }
  const p5=await obstacle_selector();    //await selection of obstacles
  const p6=await obstacle_display();    //await display of obstacles
  doing_something=0;    //allow motion again by resetting doing_something back to 0
}

$('#restart-button').click(function(){restart();});    //event listener for restart button

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
