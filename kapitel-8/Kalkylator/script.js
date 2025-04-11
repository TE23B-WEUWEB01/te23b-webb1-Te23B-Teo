    // välj textrutorna
let rutaTal1 = document.querySelector("#tal1");
let rutaTal2 = document.querySelector("#tal2");
let rutaSvar = document.querySelector("#svar");
function plus() {
    // Beräkningen
    rutaSvar.value = Number(rutaTal1.value) + Number(rutaTal2.value)

    // Easter egg
    if(rutaSvar.value == "2"){
        document.body.style = " background: rgb(179, 76, 76); visibility: hidden; ";
    }
}
function minus() {
    // Beräkningen
    rutaSvar.value = rutaTal1.value - rutaTal2.value
}
function dela() {
    // Beräkningen
    rutaSvar.value = rutaTal1.value / rutaTal2.value
}
function gånger() {
    // Beräkningen
    rutaSvar.value = rutaTal1.value * rutaTal2.value
}
function upphöjtMed() {
    // Beräkningen
    rutaSvar.value = Math.pow(rutaTal1.value, rutaTal2.value)
}