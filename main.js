let inputGiocatore = document.querySelector("#inputGiocatore");
let btnAggiungiGiocatore = document.querySelector("#btnAggiungiGiocatore");
let btnAggiungiGiocata = document.querySelector("#btnAggiungiGiocata");
let tbody = document.querySelector("#tbody");
let modalTitle = document.querySelector("#modalTitle");
let modalDiv = document.querySelector("#modalDiv");
let btnReset = document.querySelector("#btnReset");
let nomeGiocatore = "";

let gioco = {
    "giocatori": [
        {"nome": "Fabrizio", "tiri": [], "punteggioTot": 0 },
        {"nome": "Margherita", "tiri": [], "punteggioTot": 0},
        {"nome": "Christian", "tiri": [], "punteggioTot": 0},
    ],

    "aggiungiGiocatore": function () {
        this.giocatori.push ( {"nome": nomeGiocatore, "tiri": [], "punteggioTot": 0 } );
    },

    "nuovaGiocata": function () {
        if (this.giocatori[0].tiri.length < 10){
            this.giocatori.forEach((el) => {
                let tiro = Math.round(Math.random() * (10 - 0) + 0);
                el.tiri.push(tiro);
            })
        } else {
            btnClassifica.classList.remove("d-none");
        }
    },

    "punteggioTotale": function() {
        this.giocatori.forEach ((el)=>{
            let totale = el.tiri.reduce((acc, cur) => acc + cur);
            el.punteggioTot = totale;
        })
    },

    "creaListaGiocatori": function() {
        tbody.innerHTML = "";
        this.giocatori.forEach((el, i)=>{
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <th scope="row">${i + 1}</th>
            <td>${el.nome}</td>
            <td>${el.tiri[0] ? el.tiri[0] : 0}</td>
            <td>${el.tiri[1] ? el.tiri[1] : 0}</td>
            <td>${el.tiri[2] ? el.tiri[2] : 0}</td>
            <td>${el.tiri[3] ? el.tiri[3] : 0}</td>
            <td>${el.tiri[4] ? el.tiri[4] : 0}</td>
            <td>${el.tiri[5] ? el.tiri[5] : 0}</td>
            <td>${el.tiri[6] ? el.tiri[6] : 0}</td>
            <td>${el.tiri[7] ? el.tiri[7] : 0}</td>
            <td>${el.tiri[8] ? el.tiri[8] : 0}</td>
            <td>${el.tiri[9] ? el.tiri[9] : 0}</td>
            <td>${el.punteggioTot}</td>
            `;
            tbody.appendChild(tr);
        })
    },

}
gioco.creaListaGiocatori();


btnAggiungiGiocatore.addEventListener("click", ()=> {
    nomeGiocatore = inputGiocatore.value;
    gioco.aggiungiGiocatore();
    gioco.creaListaGiocatori();
    console.log(gioco.giocatori);
    inputGiocatore.value = "";
});

btnAggiungiGiocata.addEventListener("click", ()=>{
    btnAggiungiGiocatore.classList.add("d-none");
    gioco.nuovaGiocata();
    gioco.punteggioTotale();
    console.log(gioco.giocatori);
    gioco.creaListaGiocatori();
})

btnClassifica.addEventListener("click", ()=>{
    let classifica = gioco.giocatori.map ((el) => (el));
    classifica.sort((a,b) => b.punteggioTot - a.punteggioTot);
    let modalP = document.createElement("p");
    modalP.innerHTML = `${classifica[0].nome} ha vinto la partita con ${classifica[0].punteggioTot} punti`;
    modalDiv.appendChild(modalP);
    modalTitle.innerHTML = `Vincitore: ${classifica[0].nome}`;
    btnReset.classList.remove("d-none");
})
