window.onload=function(){
var ajaxRequest = new XMLHttpRequest();
ajaxRequest.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		document.getElementById("afisJson").innerHTML=this.responseText;
		var obJson = JSON.parse(this.responseText);
		afiseajaJsonTemplate(obJson);
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