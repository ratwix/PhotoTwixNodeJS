//Start the copy process

function init_first_usb_copy_screen() {
	$("#copy_txt")[0].innerHTML = "Inserez votre clé et appuyez à nouveau sur le bouton";
	
	$("#copy_progress_value")[0].style.width = "0%";
	$("#copy_progress_value_txt")[0].innerHTML = "Copie non commancée";
	show_usb();
}

function init_copy_socket() {
	g_socket.on('copyUsbProgress', function (data) {
	   console.log("TOTAL : " + data.total + " CURRENT : " + data.current);
	   var p = data.current * 100 / data.total;
	   $("#copy_progress_value")[0].style.width = p.toString() + "%";
	});
}

function usb_copy_start() {
	$("#copy_txt")[0].innerHTML = "Copy en cour";
	$.post( "copyUsb")
	.done(function() {
		$("#copy_txt")[0].innerHTML = "Copy terminée";
	})
	.fail(function(data) {
		$("#copy_txt")[0].innerHTML = "Echec lors de la copie";
	});
}