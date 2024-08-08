let much_sots=15
grider()
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
var snake_lenght=4
let j=randomNumber(1,5)
let new_j=j
document.addEventListener('keydown',function(e){
switch(e.key){
    case 'ArrowUp':
        new_j=1
        break
    case 'ArrowDown':
        new_j=3
        break
    case 'ArrowRight':
        new_j=2
        break
    case 'ArrowLeft':
        new_j=4
        break
}
if((j-2)==new_j || new_j==(j+2)) new_j=j
})
let nh=randomNumber(0,225)
$(`.sota[data-counter=${nh}]`).removeClass('sota').addClass(`head${j}`)
function grider(){
    $('.grid').css(`grid-template-columns`,`repeat(${much_sots}, 1fr)`)
    .css(`grid-template-rows`,`repeat(${much_sots}, 1fr)`)
    .html(``)
    for (let i=0;i<(much_sots*much_sots);i++){
        $('.grid').append(`<div class="sota" data-counter=${i}></div>`
        )}
    }
document.addEventListener('contextmenu',function(e){
    if(!(e.target.dataset.counter)) {return}
    e.preventDefault() 
})
 function lose(){
    if($('.head1.body').length||$('.head2.body').length||$('.head3.body').length||$('.head4.body').length||$('.end.body').length) {
    clearInterval(main)
    clearInterval(help)
     $('.grid').append(`<div class="lose">Вы проиграли<br><input type="submit" value="Начать сначала"></div>`)
     $('.lose').fadeOut(0).slideDown(2000)
     $(`input[type=submit]`).on('click',function(){location.reload ()})}}

function win(){  
        if((225-snake_lenght-1)==0){
        clearInterval(main)
        clearInterval(help)
        $('.grid').append(`<div class="win">Вы выиграли!<br><input type="submit" value="Еще раз"></div>`)
        $('.win').fadeOut(0).slideDown(2000)
        $(`input[type=submit]`).on('click',function(){location.reload ()})}
 }
 function HeadMove(){
    var count_head=Number($(`.head${j}`).attr('data-counter'))
    switch(new_j){
        case 1:
            if((count_head-((count_head%15))==0)){var num=count_head+14*15}
            else{var num=count_head-15}
            $(`.head${j}`).removeClass(`head${j}`).addClass(`body`).attr('data-snake_lenght',0)
            $(`[data-counter=${num}]`).addClass(`head${new_j}`).removeClass(`sota`)
            break
        case 2:
            if((count_head+1)%15==0){var num1=count_head-14}
            else{var num1=count_head+1}
            $(`.head${j}`).removeClass(`head${j}`).addClass(`body`).attr('data-snake_lenght',0)
            $(`[data-counter=${num1}]`).addClass(`head${new_j}`).removeClass(`sota`)
            break
        case 3:
            if(count_head>=210){var num2=count_head-14*15}
            else{var num2=count_head+15}
            $(`.head${j}`).removeClass(`head${j}`).addClass(`body`).attr('data-snake_lenght',0)
            $(`[data-counter=${num2}]`).addClass(`head${new_j}`).removeClass(`sota`)
            break
        case 4:
            if((count_head)%15==0){var num3=count_head+14}
            else{var num3=count_head-1}
            $(`.head${j}`).removeClass(`head${j}`).addClass(`body`).attr('data-snake_lenght',0)
            $(`[data-counter=${num3}]`).addClass(`head${new_j}`).removeClass(`sota`)
            break
    }
    j=new_j
 }
  function SnakeLenght(){
     $.each($('[data-snake_lenght]'),function(){$(this).attr('data-snake_lenght',Number($(this).attr('data-snake_lenght'))+1)})
     if($(`[data-snake_lenght=${snake_lenght}]`)){$(`[data-snake_lenght=${snake_lenght}]`).removeClass('body').addClass('end').removeClass('apple')}
     if($($(`[data-snake_lenght=${snake_lenght+1}]`))){$(`[data-snake_lenght=${snake_lenght+1}]`).removeAttr('data-snake_lenght').removeClass('end').addClass('sota')}
  }
function Food(){
    var sots=$(".sota")
    var sn=randomNumber(0,(sots.length+1))
    $(sots[sn]).removeClass('sota').addClass('apple')
}
function EatFood(){
if($('.head1.apple').length||$('.head2.apple').length||$('.head3.apple').length||$('.head4.apple').length){snake_lenght++}

}
 function Move(){
    EatFood()
    HeadMove()
    SnakeLenght()
    lose()
    win()
 }
 var main=setInterval(Move, 500);
 var help=setInterval(Food, 1000)