const cria = document.getElementById("b");
const btn = document.getElementById("btn");
const btnClima = document.getElementById("btn-clima");
const corpo = document.body;
const barraFome = document.getElementById("barra-fome");

// Novos elementos para a foto
const btnFoto = document.getElementById("novo-botao-foto");
const sobreposicaoFoto = document.getElementById("sobreposicao-foto");

const estados = {
    normal: "b_n.png",      
    puto: "b_p.png",        
    morto: "b_d.png",       
    comendo: "b_c.png",     
    alimentado: "b_a.png",  
};

let contador = 0; 
let tempoClima = 0;
let vivo = true;
let animando = false;

function alternarClima() {
    corpo.classList.toggle("noite");
}

// Nova função para alternar a exibição da foto
function alternarFoto() {
    corpo.classList.toggle("mostrando-foto");
}

function atualizarBarra() {
    let porcentagem = (contador / 60) * 100;
    barraFome.style.width = porcentagem + "%";
    
    if (contador < 30) {
        barraFome.style.background = "#00ffcc";
    } else if (contador < 50) {
        barraFome.style.background = "#ffcc00";
    } else {
        barraFome.style.background = "#ff3333";
    }
}

setInterval(() => {
    tempoClima++;
    if (tempoClima >= 15) {
        alternarClima();
        tempoClima = 0;
    }
}, 1000);

setInterval(() => {
    if (!vivo || animando) return;
    
    contador++;
    atualizarBarra();
     
    if (contador >= 60) {
        cria.src = estados.morto;
        vivo = false;
    } else if (contador >= 30) {
        cria.src = estados.puto;
    } else {
        cria.src = estados.normal;
    }
}, 1000);

btnClima.addEventListener("click", () => {
    alternarClima();
    tempoClima = 0;
});

// Novos ouvintes de evento para a foto
btnFoto.addEventListener("click", (e) => {
    e.stopPropagation(); // Impede que o clique feche imediatamente
    alternarFoto();
});

// Clica em qualquer lugar na sobreposição para fechar a foto
sobreposicaoFoto.addEventListener("click", () => {
    alternarFoto();
});

btn.addEventListener("click", () => {
    if (!vivo || animando) return;

    animando = true;
    contador = 0;
    atualizarBarra();
    cria.src = estados.comendo; 

    setTimeout(() => {
        if (!vivo) return;
        cria.src = estados.alimentado;
        
        setTimeout(() => {
            if (!vivo) return;
            cria.src = estados.normal;
            animando = false;
        }, 1000);
    }, 1000);
});