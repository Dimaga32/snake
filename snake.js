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
    if($('[data-head][data-body]').length||$('[data-head][data-end]').length) {
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
            switch(j){
                case 1:$(`.head${j}`).removeClass(`head${j}`).addClass(`body1`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 2:$(`.head${j}`).removeClass(`head${j}`).addClass(`body4`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 4:$(`.head${j}`).removeClass(`head${j}`).addClass(`body3`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
            }
            break
        case 2:
            if((count_head+1)%15==0){var num=count_head-14}
            else{var num=count_head+1}
            switch(j){
                case 1:$(`.head${j}`).removeClass(`head${j}`).addClass(`body5`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 2:$(`.head${j}`).removeClass(`head${j}`).addClass(`body2`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 3:$(`.head${j}`).removeClass(`head${j}`).addClass(`body3`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
            }
            break
        case 3:
            if(count_head>=210){var num=count_head-14*15}
            else{var num=count_head+15}
            switch(j){
                case 2:$(`.head${j}`).removeClass(`head${j}`).addClass(`body6`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 3:$(`.head${j}`).removeClass(`head${j}`).addClass(`body1`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 4:$(`.head${j}`).removeClass(`head${j}`).addClass(`body5`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
            }
            break
        case 4:
            if((count_head)%15==0){var num=count_head+14}
            else{var num=count_head-1}
            switch(j){
                case 1:$(`.head${j}`).removeClass(`head${j}`).addClass(`body6`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 3:$(`.head${j}`).removeClass(`head${j}`).addClass(`body4`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
                case 4:$(`.head${j}`).removeClass(`head${j}`).addClass(`body2`).attr('data-snake_lenght',0).attr(`data-pos`,j).removeAttr(`data-head`).attr(`data-body`,1); break
            }
            break
    }
    
    $(`[data-counter=${num}]`).addClass(`head${new_j}`).removeClass(`sota`).attr(`data-head`,1)
    
    j=new_j
 }
  function SnakeLenght(){
     $.each($('[data-snake_lenght]'),function(){$(this).attr('data-snake_lenght',Number($(this).attr('data-snake_lenght'))+1)})
     if($(`[data-snake_lenght=${snake_lenght}]`)){$(`[data-snake_lenght=${snake_lenght}]`).removeClass('body').removeAttr(`data-body`).attr(`data-end`,1).removeClass('body1').removeClass('body2').removeClass('body3').removeClass('body4').removeClass('body5').removeClass('body6').addClass(`end${$(`[data-snake_lenght=${(snake_lenght-1)}]`).attr('data-pos')}`).removeClass('apple')}
     if($($(`[data-snake_lenght=${snake_lenght+1}]`))){$(`[data-snake_lenght=${snake_lenght+1}]`).removeAttr('data-snake_lenght').removeAttr(`data-end`).removeAttr('data-pos').removeClass('end2').removeClass('end1').removeClass('end3').removeClass('end4').addClass('sota')}
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