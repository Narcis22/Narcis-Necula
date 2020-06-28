
let obJson;
window.onload=function(){
	var ajaxRequest = new XMLHttpRequest();
	ajaxRequest.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("afisJson").innerHTML=this.responseText;
			
			obJson = JSON.parse(this.responseText);
			afiseajaJsonTemplate(obJson);
			var deja_activ = localStorage.getItem("activ");
			if(deja_activ == "1")
				sortez_pret();
			else if(deja_activ == "2")
				afisare_reduceri();
			else if(deja_activ == "3")
				brand();
			else if(deja_activ == "4")
				reset();
			else if(deja_activ == "5")
				adidas_desc();
			else if(deja_activ == "6"){
				inversez_deja();
			}
		}
	};
		ajaxRequest.open("GET", "/json/depozit.json", true);
		ajaxRequest.send();
		function afiseajaJsonTemplate(obJson) { 
			let container=document.getElementById("afisTemplate");
			let textTemplate ="";
			for(let i=0;i<obJson.produse.length;i++){
				textTemplate+=ejs.render("<div class='templ_produs'>\
				<p>Id: <%= produs.id %></p>\
				<p>Denumire: <%= produs.denumire %></p>\
				<p>Pret: <%= produs.Pret %></p>\
				<p>Producator: <%= produs.firma %></p>\
				<p>Stoc: <%= produs.stoc %></p>\
				<p>Reducere: <%= produs.reducere %></p>\
				</div>",
				{produs: obJson.produse[i]});
			} 
			container.innerHTML=textTemplate;
			}
}

//sortare pret crescator    1
function sortez_pret(){

	localStorage.setItem("activ", "1");
	obJson.produse.sort(function(a,b){
		return parseInt(a.Pret.slice(0,a.Pret.length-1)) - parseInt(b.Pret.slice(0,b.Pret.length-1));
	});
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=0;i<obJson.produse.length;i++){
		textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});
	} 
	container.innerHTML=textTemplate;
}
//afisare reduceri   2

function afisare_reduceri(){

	localStorage.setItem("activ", "2");
let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=0;i<obJson.produse.length;i++){
		if(obJson.produse[i].reducere == "da")
		{textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});}
	} 
	container.innerHTML=textTemplate;
}
//Afisare dupa brand-ul introdus       3

function brand(){
	localStorage.setItem("activ", "3");
	var bran = document.getElementById("firma_dorita").value;
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=0;i<obJson.produse.length;i++){
		if(obJson.produse[i].firma == bran)
		{textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});}
	} 
	container.innerHTML=textTemplate;
}
//reset button       4
function reset(){
	localStorage.setItem("activ", "4");
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=0;i<obJson.produse.length;i++){
		textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});
	} 
	container.innerHTML=textTemplate;
}

//Adidas cu pret descrescator         5
function adidas_desc(){

	localStorage.setItem("activ", "5");
	obJson.produse.sort(function(a,b){
		return parseInt(b.Pret.slice(0,b.Pret.length-1)) - parseInt(a.Pret.slice(0,a.Pret.length-1));
	});
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=0;i<obJson.produse.length;i++){
		if(obJson.produse[i].firma == "Adidas")
		{textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});}
	} 
	container.innerHTML=textTemplate;
}

//checkbox           6
function inversez(){
	let checkBox = document.getElementById("myCheck");
	if(checkBox.checked ==true){
	localStorage.setItem("activ", "6");
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=obJson.produse.length - 1; i >= 0; i--){
		textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});
	} 
	container.innerHTML=textTemplate;
	} else {
		let container=document.getElementById("afisTemplate");
		let textTemplate ="";
		for(let i=0; i < obJson.produse.length; i++){
			textTemplate+=ejs.render("<div class='templ_produs'>\
			<p>Id: <%= produs.id %></p>\
			<p>Denumire: <%= produs.denumire %></p>\
			<p>Pret: <%= produs.Pret %></p>\
			<p>Producator: <%= produs.firma %></p>\
			<p>Stoc: <%= produs.stoc %></p>\
			<p>Reducere: <%= produs.reducere %></p>\
			</div>",
			{produs: obJson.produse[i]});
		} 
		container.innerHTML=textTemplate;
	}
}

function inversez_deja(){
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=obJson.produse.length - 1; i >= 0; i--){
		textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});
	} 
	container.innerHTML=textTemplate;
}

//calculez cate produse am
function calcul(){
	var nrr = 0;
	let container=document.getElementById("afisTemplate");
	let textTemplate ="";
	for(let i=0; i <obJson.produse.length; i++){
		nrr += parseInt(obJson.produse[i].stoc);
		textTemplate+=ejs.render("<div class='templ_produs'>\
		<p>Id: <%= produs.id %></p>\
		<p>Denumire: <%= produs.denumire %></p>\
		<p>Pret: <%= produs.Pret %></p>\
		<p>Producator: <%= produs.firma %></p>\
		<p>Stoc: <%= produs.stoc %></p>\
		<p>Reducere: <%= produs.reducere %></p>\
		</div>",
		{produs: obJson.produse[i]});
	} 
	container.innerHTML=textTemplate;
	alert("nr de produse din stock e: " + nrr);
}