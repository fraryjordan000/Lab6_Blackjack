

let deck = { cards: [] };
let p1hand = [];
let p2hand = [];

let playerMode = 1;

let p1handElement;
let p2handElement;


function initialize(mode) {
    playerMode = mode;

    let promise1 = new Promise((resolve, reject) => {
        let httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {

            if (httpRequest.readyState == XMLHttpRequest.DONE) {
                let response = JSON.parse(httpRequest.response);

                if (response.success) {
                    resolve("Working1");
                    deck.id = response.deck_id;
                } else {
                    reject("Error1");
                }

                p1handElement = document.getElementById('playerone');
                if (playerMode == 1) {
                    p2handElement = undefined;
                } else {
                    p2handElement = document.getElementById('playertwo');
                }

                initDeck();
            }

        };

        httpRequest.open('GET', 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');

        httpRequest.send();
    });

}


function initDeck() {
    deck.cards = [];
    p1hand = [];
    p2hand = [];

    let promise2 = new Promise((resolve, reject) => {
        let cardHttpRequest = new XMLHttpRequest();

        cardHttpRequest.onreadystatechange = () => {
            if (cardHttpRequest.readyState == XMLHttpRequest.DONE) {
                let response = JSON.parse(cardHttpRequest.response);

                if (response.success) {

                    resolve("Working2");

                    for (let i in response.cards) {
                        deck.cards[i] = response.cards[i].image;
                    }

                    p1handElement = document.getElementById('playerone');

                    addCard(1);
                    addCard(1);

                    if (playerMode == 2) {
                        addCard(2);
                        addCard(2);
                    }
                } else {
                    reject("Error2");
                }
            }
        };

        cardHttpRequest.open('GET', `https://deckofcardsapi.com/api/deck/${deck.id}/draw/?count=10`);
        cardHttpRequest.send();
    });

}


function addCard(player) {
    if (deck.cards.length > 0) {
        if (player == 1) {
            p1hand.push(deck.cards[0]);
            deck.cards.splice(0, 1);
        } else {
            p2hand.push(deck.cards[0]);
            deck.cards.splice(0, 1);
        }
    }
    refreshHands(player);
}


function refreshHands(player) {
    if (player == 1) {
        p1handElement.innerHTML = "";
        for (let i in p1hand) {
            p1handElement.innerHTML += `<img src="${p1hand[i]}">`;
        }
    } else {
        p2handElement.innerHTML = "";
        for (let i in p2hand) {
            p2handElement.innerHTML += `<img src="${p2hand[i]}">`;
        }
    }
}