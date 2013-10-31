/****
 * Manage Coverflow gallerie
 ****/
 
$container = $('#container');

//Request list of all actual photos to populate the gallery
function requestAllPhoto() {
	//loading_show();
	$.post( "getAllPhotos")
	.done(handleRequestAllPhoto)
	.fail(function(data) {
		console.log('Echec de récupération de toute les photos');
	});
}

function handleRequestAllPhoto(data) {
	gallery_show();
	$("#container").html(data);
	$('#container').imagesLoaded( function(){
		$('#container').isotope({
		  itemSelector : '.thumb',
		  masonry : {
			columnWidth : 80
		  },
		});
		if ($('.thumb_current').length > 0) {
			$top = $('.thumb_current').offset().top;
			$('#container').attr('thumb_basic_x', $top);
		}
		//camera_show();
	  });
}

//Add a new photo to the gallery
function gallery_add(photo) {
	$('#container').find('.thumb_current').removeClass('thumb_current');
	photo.addClass("thumb_current");
	photo.addClass('selected');
	$('#container').append(photo).isotope('appended', photo, gallery_adjust_container_position);
	gallery_zoom();
}

//Select next thumb with class thumb_current
  function gallery_next() {
	if ($('#container').find('.thumb_current').length > 0) {
		var nb_thumb = $('#container').find('.thumb').length;
		var index = $('.thumb_current').index();
		index++;
		if (index < nb_thumb) { //Goto next
			item_next = $('#container').children()[index];
			$('.thumb_current').removeClass('thumb_current');
			item_next.className += ' thumb_current';
			gallery_adjust_container_position();
			return true; //We have move
		} else {
			return false; //We do not move
		}
	}
  }
  
  function gallery_prev() {
  	if ($('#container').find('.thumb_current').length > 0) {
		nb_thumb = $('#container').find('.thumb').length;
		index = $('.thumb_current').index();
		index--;
		if (index >= 0) { //Goto prev
			item_next = $('#container').children()[index];
			$('.thumb_current').removeClass('thumb_current');
			item_next.className += ' thumb_current';
			gallery_adjust_container_position();
			return true;
		} else {
			return false;
		}
	}
  }
  
   //Adjust galery top when scrooling by adjusting margin-top;
  function gallery_adjust_container_position() {
  	gallery_show();
	$top_basic = $('#container').attr('thumb_basic_x');
	$top = $('.thumb_current').offset().top;
	$current_height = $('.thumb_current').height();
	$container_top_marging = $('#container').css("margin-top");
	$container_top_marging = $container_top_marging.substring(0, $container_top_marging.length - 2);
	
	if (((parseInt($top) + parseInt($current_height)) > window.innerHeight) || (parseInt($top) < parseInt($top_basic))) { //On dépasse la zone visible, on remonte tout ca
		$new_top = parseInt($container_top_marging) - parseInt($top) + parseInt($top_basic);
		if ($new_top > 0) {
			$new_top = 0;
		}
		$new_top = $new_top + 'px';
		$('#container').css("margin-top", $new_top);
	}
  }
  
  
  /////// TODO : A supprimer pour la nouvelle interface
  
function gallery_zoom() { //Zoomer sur l'element courant
	remove_watermark();
	
	$('.selected img').each(function(index) {
		$(this).attr('src', $(this).attr('src_small'));
	});
	
	$('.selected').each(function(index) {
		$(this).removeClass('selected');
	});
	//$('#container').find('.selected').removeClass('selected');
	$('.thumb_current').toggleClass('selected');
	$('.thumb_current img').attr('src', $('.thumb_current img').attr('src_big'));
	$('#container').isotope('reLayout', gallery_adjust_container_position);
}

function gallery_zoom() { //Zoomer sur l'element courant
	remove_watermark();
	
	$('.selected img').each(function(index) {
		$(this).attr('src', $(this).attr('src_small'));
	});
	
	$('.selected').each(function(index) {
		$(this).removeClass('selected');
	});
	//$('#container').find('.selected').removeClass('selected');
	$('.thumb_current').toggleClass('selected');
	$('.thumb_current img').attr('src', $('.thumb_current img').attr('src_big'));
	$('#container').isotope('reLayout', gallery_adjust_container_position);
}
  
  
  
function remove_watermark() {
	$('#container').find('.delete_watermark').removeClass('delete_watermark');
	$('#container').find('.print_watermark').removeClass('print_watermark');
}
  
  //Select a item for delete
function gallery_select_delete() {
	gallery_zoom();
	var elem = $('.thumb_current');
	
	remove_watermark();
	$('#container').find('.selected').removeClass('selected');
	elem.addClass('selected');
	elem.addClass('delete_watermark');
	$('#container').isotope('reLayout', gallery_adjust_container_position);
}
  
  //Delete current item
function gallery_delete() {  
	$('#container').find('.selected').removeClass('selected');
	remove_watermark();
	var src_small =  $('.thumb_current img').attr('src_small'); 
	var src_big =  $('.thumb_current img').attr('src_big'); 
		
	$.ajax({
		type: "POST",
		url:"/deletePhotos",
		data: {small:src_small, big:src_big},
		success: gallery_delete_handle
	});
}
  
  function gallery_delete_handle() {
	elem = $('#container').find('.thumb_current');
	
	if (gallery_prev() == false) {
		gallery_next();
	}
	
	$('#container').isotope( 'remove', elem);
  }
  
  function gallery_select_print() {
	gallery_zoom();
	var $elem = $('.thumb_current');
	
	remove_watermark();
	$('#container').find('.selected').removeClass('selected');
	$elem.addClass('selected');
	$elem.addClass('print_watermark');
	$('#container').isotope('reLayout', gallery_adjust_container_position);
  }
  
    //Print current photo
  function gallery_print() {
	$('#container').find('.selected').removeClass('selected');
	remove_watermark();
	var src_small =  $('.thumb_current img').attr('src_small'); 
	var src_big =  $('.thumb_current img').attr('src_big'); 
		
	$.ajax({
		type: "POST",
		url:"/printPhoto",
		data: {big:src_big},
		success: gallery_print_handle
	});
  }
  
  function gallery_print_handle() {
	$('#container').find('.selected').removeClass('selected');
	remove_watermark();
	$('#container').isotope('reLayout', gallery_adjust_container_position);
  }