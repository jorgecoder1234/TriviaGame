
//Object defininion for the QUESTIONS

var TheQuestions=[{
        questions:"What country wons the first soccer world cup?",
        option:["Mexico"," Brasil","Alemania","Uruguay"],
        answer:3
},{
        questions:"What year was the first world cup In Mexico? ",
        option:["1970", "1938", "1986", "2014" ],
        answer:0

},{
        questions:"Who was the first Mexican in assist to five world cups?",
        option:["Marquez", "Carvajal", "Hernandez" ,"Suarez"],
        answer:1
},{
        questions:"Who is  the mexican soccer player called the Brody? ",
        option:["Ruiz", "Castrejon", "Cardenas", "Campos"],
        answer:3

},{
        questions:"What Country wons the soccer world cup BRASIL 2014? ",
        option:["Argentina", "Alemania"," Brasil", "Holanda"    ],
        answer:1
},{
        questions:"What year Maradona wons his first Worl Cup? ",
        option:["1990", "1986", "1970"," 2018"],
        answer:1
},{
        questions:"Who is the player who score more than 1000 Goals?",
        option:["Pele","Chicharito", " Blanco"," Ronaldo"],
        answer:0
},{
        questions:"When the soccer world cup was dispute for first time in Africa?",
        option:["2014", "2000", "2010", "2004"],
        answer:2
},{
        questions:"When was the last time Argentina plays in the world cup final?",
        option:["2014", "2018"," 2004"," 2000"],
        answer:0
},{
        questions:"Who is the second mexican player who plays in 5 soccer world cups?",
        option:["Chicharito", "Cuauhtemoc", "Carbajal", "Marquez"],
        answer:3
}];


//Here the array of all the pictures
var Picarray=["picture1","picture2","picture3","picture4", "picture5", "picture6", "picture7", "picture8","picture9","picture10"];

//The Variables

var actualquestion; //To track what is the current question
var answerright;   //To to track how many answer are correct
var answerwrong;   //To track how many answer are wrong 
var noanswer;      //To track how many questions were unanswer
var answered;      //To validate if the question was answered in the period of time
var seconds;        //Hold the counter of the time interval
var time;            //Hold the time interval
var userchoice;      //Hold the index of the 


var responsemessage={
    correct:" That was the right answer, congrats!",
    incorrect: "That is NOT the answer!",
    timefinished: "The time ends!",
    end: "Let see the results:"

}

//Press the Button to Start a new Game
$("#StartButton").on('click', function() {    
    $(this).hide();
     GameStart();
      
});

//Answer try again to Start a new game
$("#Tryagain").on('click', function() {   
    $(this).hide();
      GameStart();
});


 //Start the game, empty the divs and restart variables
 function GameStart(){
    $("#MessageResult").empty();
    $("#AnswerRight").empty();
    $("#dontanswer").empty();
    $("#AnswerWrong").empty();
    $("#messagefinal").empty();
    actualquestion=0;
    answerright=0;
    answerwrong=0;
    noanswer=0;
    EachQuestion(); //Here call to the questions
}

function EachQuestion()
{
        $("#MessageResult").empty();
        $("#AnswerRight").empty();
        $("#Pictures").empty();
        $("#TheAnswer").empty();
        answered=true;     //Answer will be true and least you dont answer

        $("#TheQuestion").html("The current question #" +  (actualquestion+1) + "/" + TheQuestions.length);  //The actualquestion increase by one
        $("#Question").html('<h2>' + TheQuestions[actualquestion].questions + '</h2>') ;

                for (var j=0; j<4; j++ ){
                var choices = $("<div>");         //New div for hold the possible options
                choices.text(TheQuestions[actualquestion].option[j]);
                choices.attr({'data-index': j });
                choices.addClass('thisChoice');
                $("#OptionList").append(choices);
                }

        countdown();   //Restart to run the counter on here you have 20 seconds to answer

                $(".thisChoice").on('click', function(){
                userchoice=$(this).data('index');   //Take the index of div clicked
                console.log(userchoice);
                clearInterval(time);
                answerDisplayPage();  //We display if the result of the answer
                });     
    }   

//To start the interval

function countdown(){
                seconds=20;
                $("#TimeRemaining").html('<h3>Time remaining:'+seconds+'</h3>');
                answered=true;
               time = setInterval(showCountdown,1000);
}

//To clear interval if is near of 0
function showCountdown(){
            seconds--;
            $("#TimeRemaining").html('<h3>Time remaining:'+seconds+"</h3>");
            if(seconds<1){
                    clearInterval(time);
                    answered=false;
                    answerDisplayPage();
            }
}


//Function to display if you answer or not
function answerDisplayPage(){
    $("#TheQuestion").empty();
    $(".thisChoice").empty();
    $("#Question").empty();

    var answertext = TheQuestions[actualquestion].option[TheQuestions[actualquestion].answer];
    var answerindex = TheQuestions[actualquestion].answer;
     $("#Pictures").html('<img src = "assets/images/'+Picarray[actualquestion]+'.gif" width="300px">' );
     
     if ((userchoice==answerindex)&&(answered==true)){
              answerright++;
              $("#MessageResult").html(responsemessage.correct);

     
     }else if ((userchoice != answerindex) && (answered==true)){
                answerwrong++;
                $("#MessageResult").html(responsemessage.incorrect);
                $("#TheAnswer").html('Wrong! The Right answer was:' + answertext);
     }else{
            noanswer++;
            $("#MessageResult").html(responsemessage.timefinished);
            $("#TheAnswer").html('You do not answer, the right was:' + answertext);
            answered = true;   

     }
     

     //Call to resut if all the questions were displayed
     if (actualquestion== (TheQuestions.length-1)){
            setTimeout(Results,4000)

     }else{
         actualquestion++;
         setTimeout(EachQuestion,4000);

     }
     

}

//Summary of the game
function Results(){
$("#TimeRemaining").empty();
$("#MessageResult").empty();
$("#TheAnswer").empty();
$("#AnswerRight").empty();
$("#Pictures").empty();
$("#messagefinal").html(responsemessage.end);

$("#AnswerRight").html("You got these answers right:"+ answerright );
$("#AnswerWrong").html("You got these answers wrong:"+ answerwrong );
$("#dontanswer").html("You do not answer :"+ noanswer );

$("#Tryagain").addClass("reset");
$("#Tryagain").show();
$("#Tryagain").html("Do you want another try?");

}