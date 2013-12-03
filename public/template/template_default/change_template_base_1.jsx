function getTextLayer(target, layerName) {
    if (target == null) return false;
    var layers      = target.layers,
        layerLen    = layers.length;
    for (var i = 0; i < layerLen; i++) {
        var layer       = layers[i],
            isValid     = layer.kind == LayerKind.TEXT,
			isName		= layer.name == layerName;
            // we're allowing spaces around the text just in case
        if (isName && isValid) 
			return layer;
        
    }
    return false;
}


function changeText(text1, max_size_text1, 
					text2, max_size_test2, 
					text3, max_size_test3) {
	var text1Layer = getTextLayer(doc, "Text1"); //get Text 1 layer
	if (text1Layer) {
		resize_change_txt(text1Layer, text1, max_size_text1);
	}

	var text2Layer = getTextLayer(doc, "Text2"); //get Text 2 layer
	if (text2Layer) {
		resize_change_txt(text2Layer, text2, max_size_test2);
	}

	var text3Layer = getTextLayer(doc, "Text3"); //get Text 3 layer
	if (text3Layer) {
		resize_change_txt(text3Layer, text3, max_size_test3);
	}
}

//Save result as png
function savePng() {
	var name = app.activeDocument.name.replace(/\.[^\.]+$/, ''); 
	var ext = decodeURI(app.activeDocument.name).replace(/^.*\./,''); 
	if(ext.toLowerCase() != 'psd') return; 
	
	var path = app.activeDocument.path; 
	var saveFile = File(path + "/" + name +".png");
	if(saveFile.exists) saveFile.remove();
	pngSaveOptions = new  PNGSaveOptions();
	pngSaveOptions.compression = 4;  // (level of compression 0 .. 9       0 - without compression)
	pngSaveOptions.interlaced = false;
	activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
}

function resize_change_txt(layer, new_text, max_w) {
	var current_txt = layer.textItem.contents;
	layer.textItem.contents = new_text; //put new text to measure size
	
	var x1 = layer.bounds[0];
	var x2 = layer.bounds[2];
	
	while (x2 - x1 > max_w) { //Text is too big ! Reduce the police
		layer.textItem.size = layer.textItem.size - 1;
		var x1 = layer.bounds[0];
		var x2 = layer.bounds[2];
	}
}

var doc;
try {
    doc = app.activeDocument;
    // the front document
} catch(e) {}

changeText("@TEXT1@", 45, "@TEXT2@", 45, "@TEXT3@", 45);
savePng();


if (doc) {
    doc.close(SaveOptions.DONOTSAVECHANGES);
    // close the original layered document without saving
}
doc = null;
