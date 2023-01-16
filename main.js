function novoElemento(tagName, className) {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
}

function barreira (reversa = false) {
    this.elemento = novoElemento('div', 'barreira')

    const borda = novoElemento('div', 'borda');
    const corpo = novoElemento('div', 'corpo');
    this.elemento.appendChild(reversa ? corpo : borda);
    this.elemento.appendChild(reversa ? borda : corpo);
    
    this.setAltura = altura => corpo.style.height = `${altura}px`;

}

function parDeBarreiras(altura, abertura, x) {
    this.elemento = novoElemento('div', 'par-de-barreiras');

    this.superior = new barreira(true);
    this.inferior = new barreira(false);

    this.elemento.appendChild(this.superior.elemento);
    this.elemento.appendChild(this.inferior.elemento);

    this.sortearAbertura = () => {
        const alturaSuperior = Math.random() * (altura - abertura);
        const alturaInferior = altura - abertura - alturaSuperior;
        this.superior.setAltura(alturaSuperior);
        this.inferior.setAltura(alturaInferior);
    }

    this.getX = () => parseInt(this.elemento.style.left.split('px')[0]);
    this.setX = x => this.elemento.style.left = `${x}px`;
    this.getLargura = () => this.elemento.clientWidth;

    this.sortearAbertura();
    this.setX(x);
}

function barreira(altura, largura, abertura, espaco, notificarPonto) {
    this.pares = [
        new parDeBarreiras(altura, abertura, largura),
        new parDeBarreiras(altura, abertura, largura + espaco),
        new parDeBarreiras(altura, abertura, largura + espaco * 2),
        new parDeBarreiras(altura, abertura, largura + espaco * 3)
    ]

    const deslocamento = 3;
    this.animar = () => {
        this.pares.forEach(par => {
            par.setX(par.getX() - deslocamento);

            // quando o elemento sair da area do jogo

            if (par.getX() < -par.getLargura()) {
                par.setX(par.getX() + espaco * this.pares.length)
                par.sortearAbertura();
            }

            const meio = largura / 2;
            const cruzouMeio = par.getX() + deslocamento >= meio && par.getX() < meio;
            
            if(cruzouMeio) notificarPonto();
        })
    }
}

// const barreira = new barreira(700, 1200, 200, 400)
// const areaDoJogo = document.querySelector('[gl,flappy]');
// barreira.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
// setInterval(() => {
//     barreira.animar()
// }, 20)