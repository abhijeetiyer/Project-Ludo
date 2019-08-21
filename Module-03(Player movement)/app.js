//variables
let p1;
let p2;
$btnp1 = $('.btnp1');                                                       //button (dice) for player 1
$btnp2 = $('.btnp2'); 
$btnp3 = $('.btnp3');
$btnp4 = $('.btnp4');                                                      //button (dice) for player 2
$btnp2.attr('disabled', 'disabled');                                         //disable player 2 first     
$btnp3.attr('disabled', 'disabled');
$btnp4.attr('disabled', 'disabled');


//click event for dice of player 1
$btnp1.off('click').on('click', function()
{
   diceRandom = Math.floor(Math.random() * 6) + 1;                          //random number generation                            
   $p1Score = $('.p1-score');                                               //scoreboard of p1    
   $btnp1.text(diceRandom);                                                 //overwrite the the random number on the button
   //variables 
   let $team = $('.red-team');
   let start = 'red-start';
   let $firstPos = $('[red = 0]');
   let diceNumber = diceRandom;
   $dice1 = $btnp1;   
   let color = 'red';
   team = 'red-team';
   teamActive = 'active-red';
   $dice1 = $btnp1;
   $dice2 = $btnp3;
   movementFunction($dice1, $dice2, start , $team, $firstPos, diceNumber, color, team);
   
});

// dice player2
$btnp2.off('click').on('click',function()
{   
   diceRandom = Math.floor(Math.random() * 6) + 1;                    //generate random numbers
   $btnp2.text(diceRandom);                                           //overwrite the button text with the dice number(diceRandom)
   //variables
   $team = $('.green-team');                                          //assigning the color of the team
   start = 'green-start';                                             //assigning the start position of the team
   $firstPos = $('[green = 0]');                                      //assigning the first active position of the marker
   diceNumber = diceRandom;                                           //variable for storing diceNumber
   color = 'green';                                                   //string color for movement using attribute 
   team = 'green-team';
   $dice1 = $btnp2;
   $dice2 = $btnp4; 
   movementFunction($dice1, $dice2, start , $team, $firstPos, diceNumber, color, team)  
});

$btnp3.off('click').on('click',function()
{   
   diceRandom = Math.floor(Math.random() * 6) + 1;                    //generate random numbers
   $btnp3.text(diceRandom);                                           //overwrite the button text with the dice number(diceRandom)
   //variables
   $team = $('.yellow-team');                                          //assigning the color of the team
   start = 'yellow-start';                                             //assigning the start position of the team
   $firstPos = $('[yellow = 0]');                                      //assigning the first active position of the marker
   diceNumber = diceRandom;                                           //variable for storing diceNumber
   color = 'yellow';                                                   //string color for movement using attribute 
   team = 'yellow-team';
   $dice1 = $btnp3;
   $dice2 = $btnp2; 
   movementFunction($dice1, $dice2, start , $team, $firstPos, diceNumber, color, team)  
});

$btnp4.off('click').on('click',function()
{   
   diceRandom = Math.floor(Math.random() * 6) + 1;                    //generate random numbers
   $btnp4.text(diceRandom);                                           //overwrite the button text with the dice number(diceRandom)
   //variables
   $team = $('.violet-team');                                          //assigning the color of the team
   start = 'violet-start';                                             //assigning the start position of the team
   $firstPos = $('[violet = 0]');                                      //assigning the first active position of the marker
   diceNumber = diceRandom;                                           //variable for storing diceNumber
   color = 'violet';                                                   //string color for movement using attribute 
   team = 'violet-team';
   $dice1 = $btnp4;
   $dice2 = $btnp1; 
   movementFunction($dice1, $dice2, start , $team, $firstPos, diceNumber, color, team)  
});

//movement main function
function movementFunction($dice1, $dice2, start , $team, $firstPos, diceNumber, color, team)
{
   
   //check the value of dice if 6
   if(diceNumber === 6)
   {  
      $team.addClass('highlight');                                           //highlighting all the marker that can move on diceNUmber = 6
      $dice1.attr('disabled','disabled');                                    //disable the button for the marker's move

      //click event on the team markers
      $team.off('click').on('click', function()
      {
         if($(this).parent().hasClass(start))
         {
            $firstPos.append($(this));                                       //append the clicked marker to the first position                         
            $(this).addClass('active');                                  //add class active to the clicked marker after it gets to the first position
            $dice1.removeAttr('disabled');                                   //enable the player button as for 6 the player gets second chance to roll the dice          
            $team.removeClass('highlight');                                  //remove the hightlights of all the marker except the active marker
            $team.off('click');                                              //disable the marker click event             
         }
         else if($(this).hasClass('active'))
         {
            activeMovement($(this),$dice1, $dice2, $team, diceNumber, color, team);
         }
      });
   }
   else if(diceNumber != 6)
   {  
      $(`.${team}.active`).addClass('highlight');                                 //highlight all the markers that are active
      $dice1.attr('disabled','disabled');                                     //if dice is not 6 then disbale the number  
      //click event for the active marker 
      $('.highlight').off('click').on('click', function()
      {  
         activeMovement($(this), $dice1, $dice2, $team, diceNumber, color, team);
      });
      if($team.hasClass('highlight') === false)                         //check if the team markers are highlited
      {
         $dice2.removeAttr('disabled');                                 //if the markers are not highlighted then enable the button of the next player(no one in the active zone)
      }   
   }
}





//movement for active markers
function activeMovement($currentMarker, $dice1, $dice2, $team, diceNumber, color, team)
{  
   if($currentMarker.siblings().length === 1)
   {
      $currentMarker.siblings().removeClass('fa-lg small');
      $currentMarker.siblings().addClass('fa-3x');
   }
   playerPos = Number($currentMarker.parent().attr(color));                    //get the player position position        
   $(`[${color} = ${playerPos + diceNumber}]`).append($currentMarker);         //add the current position of the player with the dice number
   $team.removeClass('highlight');                                      //remove all highlights of markers except the active ones 
   if(diceNumber === 6)
   {
      $dice1.removeAttr('disabled');                                     //enable the button for the same player
   }
   else
   {
      $dice2.removeAttr('disabled');                                     //enable the button for the next player
   }                                                                    
   $team.off('click');                                                  //disable the click event after marker movement   
   if($currentMarker.parent().not('.safe-zone').children().length > 1)
   { 
      collision(team, $currentMarker); 
   }
   else
   {
      $currentMarker.siblings().removeClass('fa-lg small');
      $currentMarker.removeClass('fa-lg small');
      $currentMarker.addClass('fa-3x');
      $currentMarker.siblings().addClass('fa-3x');
   }
   if($currentMarker.parent().hasClass('result'))
   {
      $currentMarker.removeClass(teamActive);
      $currentMarker.removeClass('highlight');
      $currentMarker.removeClass(team);
   }

}

//function to reset the marker when colided module 4(a)
function collision(team,$currentMarker)
{
   if($currentMarker.siblings().hasClass(team) === false)                             //check if the sibling is of the same color
   {
      initial = $currentMarker.siblings().attr('originated');                          //a variable the holds the initial position of the individual marker
      $currentMarker.siblings().removeClass('active');                                 //converting as not active
      $(`#${initial}`).append($currentMarker.siblings());                              //append to the initial position
   }
   else
   { 
      concurrent($currentMarker);
   }
}

//collision module 4(b)
   function concurrent($currentMarker)
   {
      $currentMarker.removeClass('fa-3x');
      $currentMarker.siblings().removeClass('fa-3x');
      $currentMarker.addClass('fa-lg small');
      $currentMarker.css('right','2px');
      $currentMarker.siblings().addClass('fa-lg small');
   }

   