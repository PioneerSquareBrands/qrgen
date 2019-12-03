$(document).foundation()

$(document).on('click', '.generate.button', function() {
	var itemMaster = $('#item_master').val().split(',');
	$('.the-table-thing').html('');
	$('.the-table-thing').append('<div class="generated-table"></div>');
	for (i=0; i < itemMaster.length; i++){
		var item = itemMaster[i].replace(/\+/g, '');
		$('.generated-table').append('<div class="item" data-index="' + i + '">' +
																	 '<div class="item-name">' + 
																			item + 
																		'</div>' + 
																		'<div class="brand-selector">' + 
																			'<div class="radio-input"><input type="radio" name="brand-' + i + '" value="bh" id="bh-radio-' + i +'"> <label for="bh-radio-' + i + '">Brenthaven</label></div>' +
																			'<div class="radio-input"><input type="radio" name="brand-' + i + '" value="gd" id="gd-radio-' + i +'"> <label for="gd-radio-' + i + '">Gumdrop</label></div>' +
																		'</div>' +
																		'<div class="item-generate"><button class="button" disabled>Generate QR</button></div>' + 
																	'</div>');
	}
});
	
$(document).on('change', 'input[name*="brand-"]', function() {
	$(this).parents('.item').find('.item-generate button').prop('disabled', false);
});

$(document).on('click', '.item-generate', function(e) {
	e.preventDefault();
	var item = $(this).parent('.item');
	var index = item.data('index');
	var itemMaster = item.find('.item-name').text().replace(' ', '');

	var brand = item.find('.brand-selector input[name="brand-' + index + '"]:checked').val();
	var brandURL;

	if (brand == 'gd') {
		brandURL = 'https://gumdropcases.com/';
	}
	else if (brand = 'bh') {
		brandURL = 'https://brenthaven.com/';
	}
	console.log(brand);
	var qrcode = brandURL + itemMaster;

	$('.qr-container').html('');
	$('.qr-container').append('<div class="generated-qrlink">' + qrcode + '</div>');
	$('.qr-container').qrcode({width: 300, height: 300, text: qrcode});
	$('.qr-container').append('<div><button class="button download-button">Download Image</button></div>');
	$('.qr-container').attr('data-name', brand + '-' + itemMaster);
});

$(document).on('click', '.download-button', function() {
	var canvas = $('.qr-container canvas')[0];
	var canvasURL = canvas.toDataURL('image/png').replace("image/png", "image/octet-stream");
	var name = $('.qr-container').data('name');

	var link = document.createElement('a');
  link.download = name + '.png';
  link.href = canvasURL;
  link.click();
});