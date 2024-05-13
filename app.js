let allboxes= document.querySelectorAll(".box");
let resetbutton= document.querySelector('#reset-button'); 
let startbutton= document.querySelector('#start-button'); 
let messageContainer= document.querySelector('.message-container'); 
let message= document.querySelector('#result-message'); 
let nameForm = document.querySelector('.nameForm'); 

let game= document.querySelector(".game-area");
let playero=true;
let iswinner= false;
let countclick=0;


const winning_pattern=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],

];

const showPlayer = (player) =>{
    
    messageContainer.classList.remove('hide');
    message.innerText=` ${player} is playing`;

}

//Start game//

startbutton.addEventListener("click",()=>{
   
    let player1 = document.querySelector('#player1').value; 
    var player2 = document.querySelector('#player2').value; 
  
   if(player1 !== "" && player2 !== ""){
    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);
     game.classList.remove('hide');
    
     document.getElementById("player1").value = "";
     document.getElementById("player2").value = "";
   
    
   
   }
   
});

//game//

allboxes.forEach((box)=>{

    box.addEventListener("click",()=>{
        
            if(playero === true){
                box.innerText='O';
                playero=false;
                box.style.color = "#FFEBB2";
                box.disabled=true;
              
                showPlayer(localStorage.getItem("player1"));
            }else{
                
                box.innerText='X';
                box.style.color = "#D6589F";
                playero=true;
                showPlayer(localStorage.getItem("player2"));
            }
            checkWinner(countclick);
    
    
    })

})


const enableboxes=()=>{
    for(let box of allboxes){
        box.disabled=false;
        box.innerText="";
    
    }
   
}

const disableboxes=()=>{
    for(let box of allboxes){
        box.disabled=true;

    }
}


const showWinner=(msg,gamestatus)=>{

    if(gamestatus){
      message.innerText=`winner is ${msg}`;
    }else{
        message.innerText=msg;
    }
    messageContainer.classList.remove('hide');
    nameForm.classList.add('hide');
    disableboxes();
}

const checkWinner=()=>{
    countclick++;
     for(let pattern of winning_pattern){
        let pos1 =allboxes[pattern[0]].innerText;
        let pos2 =allboxes[pattern[1]].innerText;
        let pos3 =allboxes[pattern[2]].innerText;
        if(pos1 !=="" && pos2 !== "" && pos3 !== ""){
            if(pos1 === pos2 && pos2 === pos3 ){
                iswinner=true;
                let winner =pos1 == 'O' ?localStorage.getItem("player1") :localStorage.getItem("player2")
                showWinner(winner,iswinner); 
            }
        }
    
     }

     if(countclick == 9){
        if(!iswinner){
            msg="Game dismissed!";
            showWinner(msg,iswinner);
        }
     }
    
}



// Define the click event handler
function resetHandler() {

    enableboxes();
    messageContainer.classList.add('hide');
    game.classList.add('hide');
    // Unbind the click event listener
    startbutton.removeEventListener("click", resetHandler);
}
// Add click event listener to the button
resetbutton.addEventListener("click", resetHandler);



