    var num1, num2, num3, num4, openQuestion;
    var playing = true;
    var dealerTurn = false;
    var playerStuck = false;
    var playerBust = false;
    var playerTotal = 0;
    var dealerTotal = 0;
    var playerMoney = 5000;
    var dealerStuck = false;
    var dealerBust = false;
    var finished = false;
    var playerAcesLength, dealerAcesLegth = 0;
    var firstBet, currentBet = 0;
    var bonus, payout = null;
    var playerBlackjack = false;
    var dealerBlackjack = false;
    var dealerMoneyMade = 0;
    var currentRound = 1;
    var yourBetDivContent = document.getElementById('yourBetDivContent');
    var playerCard1, playerCard2, playerValue1, playerValue2 = null;
    var dealerCard1, dealerCard2 = null;
    var cards = [{"Num":"A", "Value":11},
    			 {"Num":"2", "Value":2},
    			 {"Num":"3", "Value":3},
    			 {"Num":"4", "Value":4},
    			 {"Num":"5", "Value":5},
    			 {"Num":"6", "Value":6},
    		 	 {"Num":"7", "Value":7},
    		 	 {"Num":"8", "Value":8},
    		 	 {"Num":"9", "Value":9},
    		 	 {"Num":"10", "Value":10},
    		  	 {"Num":"K", "Value":10},
    		 	 {"Num":"Q", "Value":10},
    		 	 {"Num":"J", "Value":10}];
    var playerAces = [];
    var dealerAces = [];

    firstBets = function() {
        var firstBetStepper = document.getElementById("enterFirstBetStepper");
        firstBetStepper.max = playerMoney;
        firstBetStepper.value = playerMoney;

        var initialBettingDiv = document.getElementById('initialBettingDiv');
        initialBettingDiv.style.opacity = .75;
        initialBettingDiv.style.left = "250px";

        document.addEventListener('keydown', function(event) {                                          //this detects if the player presses WASD and moves the player
            var key_press = String.fromCharCode(event.keyCode);
            var key_code = event.keycode;
            if(key_press == 13) {
                submitFirstBet();
            }

            if(key_press == "E") {
                submitFirstBet();
            }
        });
    }

    function submitFirstBet() {
        var firstBetStepper = document.getElementById("enterFirstBetStepper");
        firstBet = firstBetStepper.value;
        currentBet = firstBet;
        playerMoney = playerMoney - firstBet;

        var initialBettingDiv = document.getElementById('initialBettingDiv');
        initialBettingDiv.style.opacity = 0;
        initialBettingDiv.style.left = "-450px";

        yourBetDivContent.innerHTML = "Your Current Bet: "+firstBet+"<br/>You Have Left: "+playerMoney+"<br/>Current Round: "+currentRound;

        newCards();
    }

    newCards = function() {
    	function setPlayerCards(num1, num2) {
    		num1 = Math.floor(Math.random()*13);
    		num2 = Math.floor(Math.random()*13);

    		var playerCard1 = cards[num1].Num;
    		var playerCard2 = cards[num2].Num;

    		var playerValue1 = cards[num1].Value;
    		var playerValue2 = cards[num2].Value;

    		if(playerCard1 == "A") {
    			playerAcesLength = playerAces.push("Ace");
    		}
    		if(playerCard2 == "A") {
                playerAcesLength = playerAces.push("Ace")
    		}
            if(playerValue1+playerValue2 == 21) {
                playerBlackjack = true;
            }

    		var playerCard1Div = document.getElementById('playerCard1Div');
    		playerCard1Div.innerHTML = playerCard1;

    		var playerCard2Div = document.getElementById('playerCard2Div');
    		playerCard2Div.innerHTML = playerCard2;

    		playerTotal += playerValue1;
    		playerTotal += playerValue2;
    	}

    	function setDealerCards() {
    		num3 = Math.floor(Math.random()*13);
    		num4 = Math.floor(Math.random()*13);

    		var dealerCard1 = cards[num3].Num;
    		var dealerCard2 = cards[num4].Num;

            var dealerValue1 = cards[num3].Value;
            var dealerValue2 = cards[num4].Value;

            if(dealerCard1 == "A") {
                dealerAcesLength = dealerAces.push("Ace");
            }
            if(dealerCard2 == "A") {
                dealerAcesLength = dealerAces.push("Ace")
            }
            if(dealerValue1+dealerValue2 == 21) {
                dealerBlackjack = true;
            }

    		var dealerCard1Div = document.getElementById("dealerCard1Div");
    		dealerCard1Div.innerHTML = dealerCard1;

    		var dealerCard2Div = document.getElementById("dealerCard2Div");
    		dealerCard2Div.innerHTML = dealerCard2;

    		dealerTotal = dealerTotal+dealerValue1+dealerValue2;
    	}
    	setPlayerCards();
    	setDealerCards();
    	openQuestion = true;
    };


    checkPlayer = function() {
    	function checkIfPlayerBust() {
    		if((playing == true) && (playerTotal >= 22)) {
                checkPlayerAces();
                if(playerTotal >= 22) {
    			    playing = false;
    			    playerBust = true;
    			    openQuestion = false;
                }
                else {
                    console.log("Player saved by ace");
                }
    		}
    	}

    	function checkIfPlayerSticking() {
    		if((openQuestion == false) && (playerTotal <= 21)) {
    			console.log("Player is not bust and sticking");
    			dealerTurn = true;
    			playerStuck = true;
    		}
    	}
        function checkPlayerAces() {
            for (var i = 0; i < playerAcesLength; i++) {
                if((playerAces[0] == "Ace") && (playerTotal > 21)) {
                    playerTotal = playerTotal - 10;
                    playerAces.pop();
                }
            };
        }
        checkIfPlayerBust();
        checkIfPlayerSticking();
    }
    var checkPlayerInterval = setInterval(checkPlayer, 100);

    checkDealer = function() {
    	function checkIfDealerPlaying() {
    		if(dealerTurn == true) {
    			hitDealer();
    			console.log("Dealer has been hit");
                setTimeout(1000)
    		}
    	}
    	checkIfDealerPlaying();
    }
    var checkDealerInterval = setInterval(checkDealer, 100);

    checkWinner = function() {
    	if((playerStuck == true) && (dealerStuck == true)) {
    		if(playerTotal > dealerTotal) {
                console.log("Player: "+playerTotal);
                console.log("Dealer: "+dealerTotal);
    			alert("Player wins");
    			clearInterval(checkWinnerInterval);
                clearInterval(checkPlayerInterval);
                clearInterval(checkDealerInterval);

                //pay the player
                if(playerBlackjack == true) {
                    bonus = parseInt(currentBet)*1.5;
                    payout = parseInt(currentBet)+parseInt(bonus);
                    playerMoney = parseInt(playerMoney)+parseInt(payout)+parseInt(currentBet);
                    currentBet = 0;
                }
                else {
                    payout = parseInt(currentBet);
                    playerMoney = parseInt(playerMoney)+parseInt(payout)+parseInt(currentBet);
                    currentBet = 0;
                }

                //reset stats
                resetGame();
    		}
    		else if(playerTotal < dealerTotal) {
                console.log("Player: "+playerTotal);
                console.log("Dealer: "+dealerTotal);
    			alert("Dealer wins");
    			clearInterval(checkWinnerInterval);
    			clearInterval(checkPlayerInterval);
                clearInterval(checkDealerInterval);

                //take money from player
                dealerMoneyMade = parseInt(dealerMoneyMade)+parseInt(currentBet);
                currentBet = 0;

                //reset stats
                resetGame();
    		}
    		else if(playerTotal = dealerTotal) {
                console.log("Player: "+playerTotal);
                console.log("Dealer: "+dealerTotal);
    			alert("Draw");
    			clearInterval(checkWinnerInterval);
    			clearInterval(checkPlayerInterval);
                clearInterval(checkDealerInterval);

                //return bet to player
                playerMoney = parseInt(playerMoney)+parseInt(currentBet);
                currentBet = 0;

                //reset stats
                resetGame();
    		}
    	}
    	else if(playerBust == true) {
            console.log("Player: "+playerTotal);
            console.log("Dealer: "+dealerTotal);
    		alert("Dealer wins as player is bust");
    		clearInterval(checkWinnerInterval);
    		clearInterval(checkPlayerInterval);
            clearInterval(checkDealerInterval);

            //take bet from player
            dealerMoneyMade = parseInt(dealerMoneyMade)+parseInt(currentBet);
            currentBet = 0;

            //reset stats
            resetGame();
    	}
    	else if(dealerBust == true) {
            console.log("Player: "+playerTotal);
            console.log("Dealer: "+dealerTotal);
    		alert("Player wins as dealer is bust");
    		clearInterval(checkWinnerInterval);
    		clearInterval(checkPlayerInterval);
            clearInterval(checkDealerInterval);

            //give player money
            if(playerBlackjack == true) {
                bonus = parseInt(currentBet)*1.5;
                payout = parseInt(currentBet)+parseInt(bonus);
                playerMoney = parseInt(playerMoney)+parseInt(payout)+parseInt(currentBet);
                currentBet = 0;
            }
            else {
                payout = currentBet;
                playerMoney = parseInt(playerMoney)+parseInt(payout)+parseInt(currentBet);
                currentBet = 0;
            }

            //reset stats
            resetGame();
    	}
    }
    var checkWinnerInterval = setInterval(checkWinner);


    hitDealer = function() {
    	if(dealerTotal <= 16) {
    		console.log("Dealer has been hit")
    		var num = Math.floor(Math.random()*13);
    		var dealerNewCardValue = cards[num].Value;
    		var card = cards[num].Num;
    		if(card == "A") {
    			dealerAcesLength = dealerAces.push("Ace");
    		}
    		dealerTotal += dealerNewCardValue;

    		var para = document.createElement("div");
            para.className = "dealerNewCardDiv"
    		var node = document.createTextNode(card);
    		para.appendChild(node);

    		var element = document.getElementById("dealerCardsDiv");
    		element.appendChild(para);
    	}
    	else if((dealerTotal >= 17) && (dealerTotal <= 21)) {
    		dealerTurn = false;
    		dealerStuck = true;
    	}
    	else if(dealerTotal > 21) {
            for(var i = 0; i < dealerAcesLength; i++) {
                if(dealerAces[0] == "Ace") {
                    dealerTotal = dealerTotal - 10;
                    dealerAces.pop()
                }
            }
            if(dealerTotal > 21) {
    		  dealerTurn = false;
    		  dealerBust = true;
            }
    	}
    }

    hitMe = function() {
    	console.log("Player has been hit")
    	var num = Math.floor(Math.random()*13);
    	var playerNewCardValue = cards[num].Value;
        var card = cards[num].Num;
        if(card == "A") {
    	   playerAcesLength = playerAces.push("Ace")
    	}

        playerTotal += playerNewCardValue;

    	var para = document.createElement("div");
    	para.className = "playerNewCardDiv";
        var node = document.createTextNode(card);
        para.appendChild(node);

        var element = document.getElementById("playerCardsDiv");
        element.appendChild(para);
    };

    function resetGame() {
        //checks if all money is gone
        if(playerMoney <= 0) {
            var ans = confirm("You have lost all your money.\nWould you like to try again?");
            if(ans == true) {
                location.reload(true);
            }
            else {
                alert("Sorry to see you go")
            }
        }

        //reset all variables
        num1, num2, num3, num4, openQuestion = null;
        dealerCard1, dealerCard2 = null;
        playing = true;
        dealerTurn = false;
        playerStuck = false;
        playerBust = false;
        playerTotal = 0;
        dealerTotal = 0;
        dealerStuck = false;
        dealerBust = false;
        finished = false;
        currentRound = parseInt(currentRound)+1;
        playerCard1, playerCard2, playerValue1, playerValue2 = null;

        //restart the intervals
        var checkWinnerInterval = setInterval(checkWinner, 100);
        var checkPlayerInterval = setInterval(checkPlayer, 100);
        var checkDealerInterval = setInterval(checkDealer, 100);

        //removes any extra cards
        $(".playerNewCardDiv, .dealerNewCardDiv").remove();

        //resets the stats
        yourBetDivContent.innerHTML = "Your Current Bet: "+currentBet;
        yourBetDivContent.innerHTML += "<br/>You Have Left: "+playerMoney;
        yourBetDivContent.innerHTML += "<br/>Current Round: "+currentRound;
        console.clear()

        //start the new round
        firstBets();
    }

    document.addEventListener('keydown', function(event) {
    	var key_press = String.fromCharCode(event.keyCode);
    	var keyCode = event.keyCode;
    	if(key_press == "S" && openQuestion == true ) {
    	   openQuestion = false;
    	};
    	if(key_press == "H" && openQuestion == true) {
    		hitMe();
    	};
    	if(key_press == "W" && openQuestion == true) {
    		hitMe()
    	}
    });
    firstBets();