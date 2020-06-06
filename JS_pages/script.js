//aici facem slider-ul pt price range

function creeazaLi(lista, val_text){
	let li=document.createElement("li")
	lista.appendChild(li);
	li.innerHTML=val_text;
}
creeazaLi(ul_rez, "Input range: "+document.getElementById("i_range").value);

//preluarea datelor din checkboxurile bifate
var checkboxes=document.getElementsByName("gr_chck");		
var sir="";
for(let ch of checkboxes){
    if(ch.checked)
        sir+=ch.value+" ";
}
creeazaLi(ul_rez, "Inputurile checkbox: "+sir);