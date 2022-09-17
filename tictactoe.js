var winners = new Array();
var player1Selections = new Array();
var player2Selections = new Array();
var timer;
var numberOfPlayers = 2;
var currentPlayer = 0;
var move = 0;
var points1 = 0;    // player 1 points
var points2 = 0;    // player 2 points
var size = 3;

function drawBoard() {
    var Parent = document.getElementById("game");
    var counter = 1;
    
    while (Parent.hasChildNodes()) {
        Parent.removeChild(Parent.firstChild);
    }

    for (s = 0; s < 3; s++) {
        var row = document.createElement("tr");
        
        for (r = 0; r < 3; r++) {
            var col = document.createElement("td");
            col.id = counter;

            var handler = function(e) {
                if (currentPlayer == 0) {
                    this.innerHTML = "X";
                    player1Selections.push(parseInt(this.id));
                    player1Selections.sort(function(a, b) { return a - b });
                    d('player1').classList.remove('selected');
                    d('player2').classList.add('selected');
                }

                else {
                    this.innerHTML = "O";
                    player2Selections.push(parseInt(this.id));
                    player2Selections.sort(function(a, b) { return a - b });
                    d('player1').classList.add('selected');
                    d('player2').classList.remove('selected');
                }

                if (checkWinner())
                {
                    if(currentPlayer == 0)
                        points1++;
                    else
                        points2++;

                    document.getElementById("player1").innerHTML = points1;
                    document.getElementById("player2").innerHTML = points2;

                    reset();
                    drawBoard();
                }

                else if (player2Selections.length + player1Selections.length == 9)
                {
                    reset();
                    drawBoard();
                }
                else
                {
                    if (currentPlayer == 0)
                        currentPlayer = 1;
                    else
                        currentPlayer = 0;
                    this.removeEventListener('click', arguments.callee);
                }
            };

            col.addEventListener('click', handler);

            row.appendChild(col);
            counter++;
        }

        Parent.appendChild(row);
    }

    loadAnswers();
}

function d(id)
{
    var el = document.getElementById(id);
    return el;
}
// function reset()
// {
//     currentPlayer = 0;
//     player1Selections = new Array();
//     player2Selections = new Array();
//     d('player1').classList.add('selected');
//     d('player2').classList.remove('selected');
// }

function loadAnswers()
{
    winners.push([1, 2, 3]);
    winners.push([4, 5, 6]);
    winners.push([7, 8, 9]);
    winners.push([1, 4, 7]);
    winners.push([2, 5, 8]);
    winners.push([3, 6, 9]);
    winners.push([1, 5, 9]);
    winners.push([3, 5, 7]);
}

function checkWinner() {
    // check if current player has a winning hand
    // only stsrt checking when player x has size number of selections
    var win = false;
    var playerSelections = new Array();

    if (currentPlayer == 0)
        playerSelections = player1Selections;
    else
	playerSelections = player2Selections;
    
    if (playerSelections.length >= size) {
        // check if any 'winners' are also in your selections
        
        for (i = 0; i < winners.length; i++) {
            var sets = winners[i];  // winning hand
            var setFound = true;
            
            for (r = 0; r < sets.length; r++) {
                // check if number is in current players hand
                // if not, break, not winner
                var found = false;
                
                // players hand
                for (s = 0; s < playerSelections.length; s++) {
                    if (sets[r] == playerSelections[s]) {
                        found = true;
                        break;
                    }
                }

                // value not found in players hand
                // not a valid set, move on
                if (found == false) {
                    setFound = false;
                    break;
                }
            }

            if (setFound == true) {
                win = true;
                break;
            }
        }
    }

    return win;
} 
window.addEventListener('load', drawBoard);
function reset()
{
    currentPlayer = 0;
    player1Selections = new Array();
    player2Selections = new Array();
    d('player1').classList.add('selected');
    d('player2').classList.remove('selected');
}


var flag=true;
var t=0;
function game(){
    if(flag==true){
        document.activeElement.innerHTML="X";
        document.activeElement.removeAttribute("onclick");
        document.activeElement.style.backgroundColor="#2a74f0";
        t++;
        flag=false;
        var final=checkresult();
        if(final=="stop"){
            document.getElementById("result").innerHTML=P1+" WINS !!";
            document.getElementById("result").style.fontSize="45px";
            document.getElementById("result").style.color="antiquewhite";
            document.getElementById("result").style.paddingTop="30px";
            removeATT();
        }

        else if(t==9){
            document.getElementById("result").innerHTML="MATCH DRAW !!";
        }
    }
    else{
        document.activeElement.innerHTML="O";
        document.activeElement.style.backgroundColor="hotpink";
        document.activeElement.removeAttribute("onclick");
        t++;
        flag=true;
        var final=checkresult();
        if(final=="stop"){
            document.getElementById("result").innerHTML=P2+" WINS !!";
            document.getElementById("result").style.fontSize="45px";
            document.getElementById("result").style.color="antiquewhite";
            document.getElementById("result").style.paddingTop="30px";
            removeATT();
        }

        else if(t==9){
            document.getElementById("result").innerHTML="MATCH DRAW !!";
        }
    }

    }

function checkresult(){
    var str;
    if((document.getElementById("b1").innerHTML==document.getElementById("b2").innerHTML && document.getElementById("b1").innerHTML==document.getElementById("b3").innerHTML) && ((document.getElementById("b1").innerHTML=="X") || (document.getElementById("b1").innerHTML=="O"))){
        

        str="stop";
        return str;
    }

    else if((document.getElementById("b1").innerHTML==document.getElementById("b4").innerHTML && document.getElementById("b1").innerHTML==document.getElementById("b7").innerHTML) && ((document.getElementById("b1").innerHTML=="X") || (document.getElementById("b1").innerHTML=="O"))){
        

        str="stop";
        return str;
    }

    else if((document.getElementById("b1").innerHTML==document.getElementById("b5").innerHTML && document.getElementById("b1").innerHTML==document.getElementById("b9").innerHTML) && ((document.getElementById("b1").innerHTML=="X") || (document.getElementById("b1").innerHTML=="O"))){
        

        str="stop";
        return str;
    }

    else if((document.getElementById("b3").innerHTML==document.getElementById("b6").innerHTML && document.getElementById("b9").innerHTML==document.getElementById("b3").innerHTML) && ((document.getElementById("b3").innerHTML=="X") || (document.getElementById("b3").innerHTML=="O"))){
        

        str="stop";
        return str;
    }

    else if((document.getElementById("b3").innerHTML==document.getElementById("b5").innerHTML && document.getElementById("b3").innerHTML==document.getElementById("b7").innerHTML) && ((document.getElementById("b3").innerHTML=="X") || (document.getElementById("b3").innerHTML=="O"))){
        

        str="stop";
        return str;
    }

    else if((document.getElementById("b7").innerHTML==document.getElementById("b8").innerHTML && document.getElementById("b7").innerHTML==document.getElementById("b9").innerHTML) && ((document.getElementById("b7").innerHTML=="X") || (document.getElementById("b7").innerHTML=="O"))){
        

        str="stop";
        return str;
    }
   else if((document.getElementById("b4").innerHTML==document.getElementById("b6").innerHTML && document.getElementById("b4").innerHTML==document.getElementById("b5").innerHTML) && ((document.getElementById("b4").innerHTML=="X") || (document.getElementById("b4").innerHTML=="O"))){
        

        str="stop";
        return str;
    }
    else if((document.getElementById("b2").innerHTML==document.getElementById("b5").innerHTML && document.getElementById("b2").innerHTML==document.getElementById("b8").innerHTML) && ((document.getElementById("b2").innerHTML=="X") || (document.getElementById("b2").innerHTML=="O"))){
        

        str="stop";
        return str;
    }
}
//Remove attribute

function  removeATT(){
    document.getElementById("b1").removeAttribute("onclick");
    document.getElementById("b2").removeAttribute("onclick");
    document.getElementById("b3").removeAttribute("onclick");
    document.getElementById("b4").removeAttribute("onclick");
    document.getElementById("b5").removeAttribute("onclick");
    document.getElementById("b6").removeAttribute("onclick");
    document.getElementById("b7").removeAttribute("onclick");
    document.getElementById("b8").removeAttribute("onclick");
    document.getElementById("b9").removeAttribute("onclick");
}


//replay game

function replay(){
    window.location.reload();
}

