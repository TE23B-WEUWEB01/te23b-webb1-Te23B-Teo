// var dag = "freadag";
// alert(dag);
// console.log("Idag är det " + dag);

// var är du född?
// var stad = prompt("var är du född?");
// console.log("Du är född i " + stad);

// vi gär en enkel captcha
// var gissning = prompt("Är det ok att fuska på prov?");
// if(gissning.toLowerCase() == "nej"){
//     alert("Du är en människa");
// }
// else{
//     alert("Du är en robot");
// }

// spamcheck med två slumpade tal
// var slumtal1 = Math.round(Math.random() * 100);
// var slumtal2 = Math.round(Math.random() * 100);

// var svar = prompt("Vad är " + slumtal1 + " + " + slumtal2 + " ?");
// var summa = slumtal1 + slumtal2;
// if(svar == summa){
//     document.writeln("<h1> rätt! 👍</h1>")
// }
// else{
//     document.writeln("<h1> Fel! 🧏‍♂️🧏</h1>")
// }


// var tal1 = prompt("skriv in ett tal");
// var tal2 = prompt("skriv in ett annat tal");
// var summa = number(tal1) + number(tal2);
// document.writeln("Summan är " + summa);


var lön = 35000;
var skatt = 35000*0.29
var efterskatt = Number(lön) - Number(skatt)
var brutto = prompt("vad är din lön innan skatt");var skatt = prompt("hur mycket % skatt betalar du");var inkomst = Number(brutto) *(100-Number(skatt))/100;document.writeln("Din inkomst efter skatt är " + inkomst + " med " + skatt + "% i skatt.");