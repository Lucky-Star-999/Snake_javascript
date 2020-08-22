var inGame = true;

var score = 0;

var head_x = 20;
var head_y = 20;

var body_x = 0;
var body_y = 0;

var old_head_x = 0;
var old_head_y = 0;

var fruit_x = 240;
var fruit_y = 120;

//var body_arr_x = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
//var body_arr_y = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var body_arr_x = [-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,];
var body_arr_y = [-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,-40,];


var moveLeft = false;
var moveRight = true;
var moveUp = false;
var moveDown = false;

var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var head = new Image();
head.src = "Red.png";
var body = new Image();
body.src = "Blue.png";
var fruit = new Image();
fruit.src = "Fruit.png";


function clearScreen(){
    context.clearRect(0, 0, 500, 300);
}

head.onload = function(){
    context.drawImage(head, 20, 20);
}

fruit.onload = function(){
    context.drawImage(fruit, 240, 120);
}

function random_fruit(){
    fruit_x = 20 * Math.floor((Math.random() * 23) + 1);
    fruit_y = 20 * Math.floor((Math.random() * 13) + 1);
}

function check_eat(){
    if (head_x == fruit_x && head_y == fruit_y){
        random_fruit();
        score++;
    }
}

function checkTouchWall(){
    if (head_x == 0 || head_x == 480 || head_y == 0 || head_y == 280){
        inGame = false;
    }
}

function show_body(){
    for(var i=0; i<score; i++){
        context.drawImage(body, body_arr_x[i], body_arr_y[i]);
    }
}

function transmit_value_body(){
    old_head_x = head_x;
    old_head_y = head_y;

	for(var i=score-1; i>=0 ;i--){
        if (i==0){
            body_arr_x[0] = old_head_x;
            body_arr_y[0] = old_head_y;
        }
        else{
            body_arr_x[i] = body_arr_x[i-1];
            body_arr_y[i] = body_arr_y[i-1];
        }
    }
}

function move(){
    if (moveLeft){
        head_x -= 20;
    }
    if (moveRight){
        head_x += 20;
    }
    if (moveUp){
        head_y -= 20;
    }
    if (moveDown){
        head_y += 20;
    }
}

function cycle(){
    if (inGame){
        context.drawImage(head, head_x, head_y);
        context.drawImage(fruit, fruit_x, fruit_y);
        show_body();
        setTimeout("checkTouchWall()", 100);
        setTimeout("check_eat()", 100);
        setTimeout("clearScreen()", 100);
        setTimeout("move()", 100);
        transmit_value_body();
        setTimeout("cycle()", 100);
    }
    else{
        alert("Game over!");
    }
}

cycle() ;


document.addEventListener('keydown', function(event) {
    if ((event.code == 'ArrowLeft'|| event.code == 'KeyA') && (!moveRight)) {
        moveLeft = true;
        moveRight = false;
        moveUp = false;
        moveDown = false;
    }
    
    if (event.code == 'ArrowRight' || event.code == 'KeyD') {
        moveLeft = false;
        moveRight = true;
        moveUp = false;
        moveDown = false;
    }
    
    if (event.code == 'ArrowUp' || event.code == 'KeyW') {
        moveLeft = false;
        moveRight = false;
        moveUp = true;
        moveDown = false;
    }
    
    if (event.code == 'ArrowDown' || event.code == 'KeyS') {
        moveLeft = false;
        moveRight = false;
        moveUp = false;
        moveDown = true;
    }
    if (event.code == 'Escape') {
        moveLeft = false;
        moveRight = false;
        moveUp = false;
        moveDown = false;
        inGame = false;
    }
});