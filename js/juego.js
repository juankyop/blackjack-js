//C, D, H, S
let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

let puntosJugador = 0,
    puntosOrdenador = 0
//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasOrdenador = document.querySelector('#ordenador-cartas');
const puntosHTML = document.querySelectorAll('small');

const crearDeck = () => {
    for (let x=2; x<=10; x++) {
        for ( let tipo of tipos) {
            deck.push(x + tipo);
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push(esp + tipo);
        }
    }
    deck = _.shuffle(deck)
}

crearDeck()

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta= deck.pop();
    return carta;
}

const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length -1);
    return ( isNaN(valor) ) ? 
        ( valor === 'A') ? 11 : 10
        : valor*1
}

const turnoOrdenador = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosOrdenador += valorCarta(carta);
        puntosHTML[1].innerText = puntosOrdenador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');

        divCartasOrdenador.append( imgCarta );
    } while ( puntosOrdenador < puntosJugador )
}

//Evento 

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador += valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./assets/cartas/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append( imgCarta );

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste')
        btnPedir.disabled = true;
    } else if ( puntosJugador === 21 ) {
        console.warn("21, genial");
    }
})

btnDetener.addEventListener('click', () => {

    turnoOrdenador();

})

