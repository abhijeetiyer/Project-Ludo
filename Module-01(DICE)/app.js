//module -01
let p1;
let p2;
console.log('starting with player 1');
$btnp1 = $('.btnp1');
$btnp2 = $('.btnp2');
$btnp2.attr('disabled','disabled');
$btnp1.off('click').on('click', function(){
    $p1Score = $('.p1-score')
    diceRandom = Math.floor(Math.random() * 6) + 1; 
    p1 = diceRandom;
    console.log('p1 = '+p1);
    if(p1 === 6){
       console.log(`p1's turn`);
       $p1Score.append(`${p1},`);

    }
    else{
       $btnp1.attr('disabled','disabled');
       $p1Score.append(`${p1},`);

       $btnp2.removeAttr('disabled');
    }

});
$btnp2.off('click').on('click',function(){
    $p2Score = $('.p2-score')
    diceRandom = Math.floor(Math.random() * 6) + 1;
    p2 = diceRandom;
    if(p2 === 6){
       console.log(`p2's turn`);
       $p2Score.append(`${p2},`);
    }
    else{
       $btnp2.attr('disabled','disabled');
       $p2Score.append(`${p2},`);
       $btnp1.removeAttr('disabled');

    }

});



