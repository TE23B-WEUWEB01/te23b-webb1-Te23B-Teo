// while(true){
//     let namn = prompt("Ange ditt namn:");
//     let pasword = prompt("Ange ditt lösenord:");

//     if(namn == "teo" && pasword == "12345"){
//         document.writeln("rätt här har du tillgång till alla hämlighter!")
//         break;
//     }
//     else{
//         document.writeln("fel!");
//         break;
//     }
// }
// let ålder = prompt("hur gammal är du?");
// document.writeln(`Hej ${namn} du är ${ålder}`);

let heltal = parseInt(prompt("skriv ett heltal mellan 5-10!"));
    for(let i=1; i <= heltal; i++){
        document.writeln(`rad ${i}<br>`);
    }