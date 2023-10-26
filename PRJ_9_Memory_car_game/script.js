const cards = document.querySelectorAll(".card")
const board = document.querySelector(".board")
const gameover = document.querySelector('.endgame')
const cardBack = document.querySelectorAll(".card-back")
const restart = document.getElementById('restart')

let preCard = board
let flip = 0

start()

function start() {
    let cardsArray = [...cards].sort(() => Math.random() - 0.5);
    board.innerHTML =""
for (let card of cardsArray) {
    board.appendChild(card)
}
}

cardBack.forEach(card => {
    card.addEventListener('click', handelClick)
})

function handelClick(e) {
    const card = e.target.parentElement.parentElement
    if (!isFlipped(card)) {
        flip+=1
    }
    card.classList.add('flip')
    if (card.id != preCard.id && card!=preCard) {
        preCard.classList.remove('flip')
        preCard = card
    } else if (card.id == preCard.id && card != preCard) {
        card.classList.add('flipped')
        preCard.classList.add('flipped')
        preCard = board
    }
    console.log(endgame())

    if (endgame()) {
        gameover.style.display = 'flex'
    }
}

function isFlipped(card) {
    return card.classList.contains('flipped') || card.classList.contains('flip')
}

function endgame() {
    return [...cards].every(card => {
        return card.classList.contains('flip')
    })
}

restart.addEventListener('click', ()=> {
    cards.forEach(card => {
        card.classList.remove('flip')
        card.classList.remove('flipped')
    })
    gameover.style.display = 'none'
    start()

})
