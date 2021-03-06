var g_canvas;
var g_canvasScale = 1;

var g_canvas_text = '';
var g_base_blank_path = './template/template_default/img/blank/';

var g_current_edit_template = "";

var SCALE_FACTOR = 1.2;

function init_template_editor(template_path) {
	g_current_edit_template = template_path;

	var img = new Image();
	var imageSrc = g_base_blank_path + template_path;
	
	img.onload = function() {
		//Create the canvas from the picture
		if (g_canvas) {
			g_canvas.clear();
		} else {
			g_canvas = new fabric.Canvas('image_editor');
		}
		
		g_canvas.setHeight(img.height);
		g_canvas.setWidth(img.width);
		
		g_canvas.setBackgroundImage(g_base_blank_path + template_path, g_canvas.renderAll.bind(g_canvas));		
		
		//Get the canvas edition
		$.post("getTemplateJson", {template : JSON.stringify(template_path)})
		.done(function(data) {
			if (data != "") {
				g_canvas.loadFromJSON(data);	
			}
		})
	};

	img.src = imageSrc;
}

function picture_editor_add_text() {
	var text = 'www.phototwix.fr';
	var textSample = new fabric.Text(text, {
	  left: 30,
	  top: 30,
	  fontFamily: 'helvetica',
	  angle: 0,
	  fontWeight: '400',
	  originX: 'left',
	  hasRotatingPoint: true,
	  centerTransform: true
	});
	
	textSample.on('selected', function() {
		g_canvas_text = g_canvas.getActiveObject();
		update_text_control();
	});
	
	g_canvas.add(textSample);
}

function picture_editor_delete_selected() {
	var activeObject = g_canvas.getActiveObject(),
		activeGroup = g_canvas.getActiveGroup();

	if (activeGroup) {
	  var objectsInGroup = activeGroup.getObjects();
	  g_canvas.discardActiveGroup();
	  objectsInGroup.forEach(function(object) {
		g_canvas.remove(object);
	  });
	}
	else if (activeObject) {
	  g_canvas.remove(activeObject);
	}
}

function picture_editor_delete_all() {
	g_canvas.clear();
}		

function picture_editor_load_image(evt) {
	var files = evt.target.files;
	
	for (var i = 0, f; f = files[i]; i++) {
		// Only process image files.
		if (!f.type.match('image.*')) {
			continue;
		}
		
		var reader = new FileReader();
		
		reader.onload = function(e) {
			//Lecture du contenu du fichier
			var dataURL = reader.result;
			fabric.Image.fromURL(dataURL, function(image) {

			  image.set({
				left: 30,
				top: 30
			  }).setCoords();

			  g_canvas.add(image);
			});
		}
		
		reader.readAsDataURL(f);
	}
}

document.getElementById('uploadedFile').addEventListener('change', picture_editor_load_image, false);

function picture_editor_add_image(imageName) {
	fabric.Image.fromURL('./img/custom/' + imageName, function(image) {

	  image.set({
		left: 30,
		top: 30
	  }).setCoords();

	  g_canvas.add(image);
	});
};


function update_text_control() {
	$('#picture_editing_text_value').attr("value", g_canvas_text.text);
	$('#picture_editing_font_family').attr("value", g_canvas_text.fontFamily);
	$('#picture_editing_text_color').attr("value", 	g_canvas_text.getFill());
	$('#picture_editing_text_font_size').attr("value", g_canvas_text.fontSize);
	$('#picture_editing_opacity').attr("value", g_canvas_text.opacity);
}

function picture_editing_change_text() {
	if (g_canvas_text) {
		g_canvas_text.setText($('#picture_editing_text_value').attr("value"));
		g_canvas.renderAll();
	}
}

function picture_editing_change_font_family() {
	if (g_canvas_text) {
		g_canvas_text.setFontFamily($('#picture_editing_font_family').attr("value"));
		g_canvas.renderAll();
	}
}

function picture_editing_change_font_color() {
	if (g_canvas_text) {
		g_canvas_text.setColor($('#picture_editing_text_color').attr("value"));
		g_canvas.renderAll();
	}
}

function picture_editing_change_font_size() {
	if (g_canvas_text) {
		g_canvas_text.setFontSize($('#picture_editing_text_font_size').attr("value"));
		g_canvas.renderAll();
	}
}

function picture_editing_change_opacity() {
	if (g_canvas.getActiveObject()) {
		g_canvas.getActiveObject().setOpacity($('#picture_editing_opacity').attr("value"));
		g_canvas.renderAll();
	}
}

function picture_editing_bring_to_front() {
	if (g_canvas.getActiveObject()) {
		g_canvas.bringToFront(g_canvas.getActiveObject());
		g_canvas.renderAll();
	}
}

function picture_editing_bring_to_back() {
	if (g_canvas.getActiveObject()) {
		g_canvas.sendToBack(g_canvas.getActiveObject());
		g_canvas.renderAll();
	}
}

function picture_editing_save_file() {
	g_canvas.deactivateAll();
	g_canvas.discardActiveObject()
	g_canvas.crossOrigin = "anonymous";
	var data = g_canvas.toDataURL('image/png');
	
	var template = new Object();
	template.filename = g_current_edit_template;
	template.data = data;
	
	//Serialisation
	
	var json = JSON.stringify(g_canvas);
	console.log(json);
	template.json = json;
	
	$.post( "saveTemplate", {template : JSON.stringify(template)})
		.done(function(data) {
			console.log('Sauvegarde du template');
			show_parameter();
		})
		.fail(function(data) {
			console.log('Echec de la la sauvegarde des photos');
			show_parameter();
		});
}

function picture_editing_cancel() {
	show_parameter();
}
