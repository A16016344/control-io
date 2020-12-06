const formulario = document.getElementById("formulario");
const setNameButton = document.getElementById("setName");
var fecha = new Date();
var diaSemana = new Array("D","L","M","X","J","V","S");
diaSemana[-1] = "S";

window.onload = function(){
    name = localStorage.getItem("name");
    name != "null" ? formulario.name.value = name : "";
};

formulario.onsubmit = function(e){
    e.preventDefault();
    texto = "";
    getRadioButtonSelectedValue(formulario.turno) == "TN" ? dia = fecha.getDay()-1 : dia = fecha.getDay();
    texto += `*${getRadioButtonSelectedValue(formulario.turno)}${diaSemana[dia]}   ${name}*%0A`;
    texto += `*E:* $${formulario.entrada.value}   *S:* $${formulario.salida.value}%0A`;
    if (formulario.ticket != undefined) {
        texto += `*Consumo:* %0A`;
        if (formulario.ticket.length != undefined){
            for (i = 0; i < formulario.ticket.length; i++){
                texto += ` %23${formulario.ticket[i].value} --> $${formulario.monto_ticket[i].value}%0A`;
            }
        } else {
            texto += ` %23${formulario.ticket.value} --> $${formulario.monto_ticket.value}%0A`;
        }
    }
    texto += `*Gen:* ${formulario.gen.value}   *TAE:* ${formulario.tae.value}%0A`;
    if (formulario.conteo != undefined) {
        texto += `*Conteos:* %0A`;
        if (formulario.conteo.length != undefined){
            for (i = 0; i < formulario.conteo.length; i++){
                texto += ` · ${formulario.conteo[i].value}%0A`;
            }
        } else {
            texto += ` · ${formulario.conteo.value}%0A`;
        }
    }
    whastappURL = "https://api.whatsapp.com/send/?phone&text="+texto;
    window.open(whastappURL);
}

setNameButton.onclick = function(){
    name = prompt("Escribe tu nombre: ");
    if (name != "null") {
        formulario.name.value = name;
        localStorage.setItem("name", name);
    }

}

function getRadioButtonSelectedValue(ctrl)
{
    for(i=0;i<ctrl.length;i++)
        if(ctrl[i].checked) return ctrl[i].value;
}

function otroTicket(){
    consumoField.innerHTML +=
        `<div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Ticket #</span></div>
            <input type="number" class="form-control" name="ticket"></div>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">$</span></div>
            <input type="number" class="form-control" name="monto_ticket"></div>`;
}

function otroConteo(){
    conteoField.innerHTML +=
        `<div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text">Selectivo</span></div>
            <input type="text" class="form-control" name="conteo"></div>`;
}

(function() {
    // TODO add service worker code here
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
               .register('service-worker.js')
               .then(function() { console.log('Service Worker Registered'); });
    }
  })();