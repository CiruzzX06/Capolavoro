let campo = document.getElementById("campo")
let homeBase = document.getElementById("casa")
let coordinateCasa = homeBase.getBoundingClientRect()
let numAlberi = 25
let numeroPattume = 30
let denari = 0

class Tree  {
    constructor (imgLink, i) {
        this.imgLink = imgLink
        do {
            this.x = Math.floor(Math.random() * (screen.width - 100))
            this.y = Math.floor(Math.random() * (screen.height - 200))
        } while((this.x > (coordinateCasa.left) && this.x < (coordinateCasa.right)) || (this.y > (coordinateCasa.top) && this.y < (coordinateCasa.bottom)));
        
         this.toHTML = function() {
             return `<img src = '${this.imgLink}' id= 'albero${i}' class = 'albero' style = 'z-index: ${screen.height - this.y}'>`
         }
     }
}

class Pattume {
    constructor (imgLink, i) {
        this.imgLink = imgLink
        let alberi = false
        do {
            alberi = false
            this.x = Math.floor(Math.random() * (screen.width - 100))
            this.y = Math.floor(Math.random() * (screen.height - 200))
        } while((this.x > (coordinateCasa.left) && this.x < (coordinateCasa.right)) || (this.y > (coordinateCasa.top) && this.y < (coordinateCasa.bottom)) || alberi);
        this.toHTML = function() {
            return `<img src = '${this.imgLink}' id= 'pattume${i}' class ="pattume">`
        }
    }
}
let alberi = []
for(let i=0;i<numAlberi;i++){
     let albero = new Tree("img/Tree 2.png", i)
     campo.innerHTML += albero.toHTML()
     alberi.push(albero)
     console.log(albero.x, albero.y)
     document.getElementById(`albero${i}`).style.position = "fixed"
     document.getElementById(`albero${i}`).style.bottom = albero.y + "px"
     document.getElementById(`albero${i}`).style.left = albero.x + "px"
}

let coordinateAlberi = []
for (let i = 0; i < numAlberi; i++) {
    coordinateAlberi.push(document.getElementById(`albero${i}`).getBoundingClientRect())
}

let pattumi = []
for(let i=0;i<numeroPattume;i++){
    let pattume = new Pattume("img/pattume.png", i)
    campo.innerHTML += pattume.toHTML()
    pattumi.push(pattume)
    console.log(pattume.x, pattume.y)
    document.getElementById(`pattume${i}`).style.position = "fixed"
    document.getElementById(`pattume${i}`).style.top = pattume.y + "px"
    document.getElementById(`pattume${i}`).style.left = pattume.x + "px"
}


let pgContainer = document.getElementById("pallina")
let img = document.createElement("img")
img.id = "giocatore"
img.src = "img/ANDI frames/Stand_Front.png"
img.style.position = "fixed"
pgContainer.appendChild(img)
let pg = document.getElementById("giocatore")

let coordinates = pg.getBoundingClientRect()

pg.style.top = coordinates.y  + "px"
pg.style.left = coordinates.x  + "px"

window.addEventListener("keydown", muovi)
window.addEventListener("keyup", resetSprite)

function muovi(ev) {
    if (ev.key == "w") {
        coordinates.y -= 10
        pg.style.top = coordinates.y  + "px"
        img.src = "img/ANDI frames/Walk_Up1.png"
    } else if (ev.key == "s") {
        coordinates.y += 10
        pg.style.top = coordinates.y  + "px"
        img.src = "img/ANDI frames/Walk_Down1.png"
    } else if (ev.key == "d") {
        coordinates.x += 10
        pg.style.left = coordinates.x  + "px"
        img.src = "img/ANDI frames/Walk_Right1.png"
    } else if (ev.key == "a") {
        coordinates.x -= 10
        pg.style.left = coordinates.x  + "px"
        img.src = "img/ANDI frames/Walk_Left1.png"
    }
    coordinates = pg.getBoundingClientRect()
    img.style.zIndex = coordinates.y
    controlloPattume()
}


function controlloPattume() {
    for (let i = pattumi.length - 1; i >= 0; i--) {
        if (pattumi[i] = "") {
            continue
        }
        if (controlliCollisioni (i)) {
            document.getElementById(`pattume${i}`).style.display = "none"
            denari += 10
            pattumi[i] = ""
            numeroPattume--
            document.getElementById("pattumeRimasto").innerHTML = "<p>Pattume rimasto: " + numeroPattume + "</p>"
        }
    }
}

function resetSprite() {
    setTimeout(function() {
        img.src = "img/ANDI frames/Stand_Front.png"
    })
}

function controlliCollisioni(i) {
    let pattumeRect = document.getElementById(`pattume${i}`).getBoundingClientRect()

    if (
        coordinates.right > pattumeRect.left &&
        coordinates.left < pattumeRect.right &&
        coordinates.bottom > pattumeRect.top &&
        coordinates.top < pattumeRect.bottom
    ) {
        return true
    }
    return false
}

let timerss

function Timer() {
    this.minuti = 0;
    this.secondi = 0;

    this.aggiungiSecondi = function () {
        this.secondi++;
        if (this.secondi === 60) {
            this.secondi = 0;
            aggiungiMinuti();
        }
    }

    function aggiungiMinuti() {
        this.minuti++;
    }

    this.aggiorna = function() {
        document.getElementById("timer").innerHTML = this.minuti + ":" + this.secondi;
    }

}


let timer = new Timer();

timerss = setInterval( function() {
    timer.aggiungiSecondi()
}, 1000);  
setInterval( function() {
    timer.aggiorna()
}, 1000); 


setTimeout(TerminaGioco, 30000)


function TerminaGioco(){
    let pattume = true
    for(let i = 0; i < pattumi.length; i++) {
        if (pattumi[i] != "") {
            pattume = false
        }
    }
    if (numeroPattume == 0)  {
        document.getElementById("dati").style.display = "none"
        document.getElementById("gioco").style.display = "none"
        document.getElementById("vittoria").style.display = "inline"
        document.getElementById("tempo").innerHTML += timer.minuti + " minuti e " + timer.secondi + " secondi"
        clearInterval(timerss)
    } else  if ((numeroPattume == 1 && pattume)){
        document.getElementById("dati").style.display = "none"
        document.getElementById("gioco").style.display = "none"
        document.getElementById("vittoria").style.display = "inline"
        document.getElementById("tempo").innerHTML += timer.minuti + " minuti e " + timer.secondi + " secondi"
        clearInterval(timerss)
    } else {
        location.replace("sconfitta.html")
    }
}

let timer2 = setInterval(function(){
    let pattume = true
    for(let i = 0; i < pattumi.length; i++) {
        if (pattumi[i] != "") {
            pattume = false
        }
    }
    if( numeroPattume == 0 || (pattume && numeroPattume == 1)){
        TerminaGioco()
        clearInterval(timer2)
    }
}, 10)

document.getElementById("rigioca").addEventListener("click", function() {
    location.reload()
})