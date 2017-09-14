
var electron = require('electron');
var remote = electron.remote;
var fs = remote.require('fs');
var storage = require('electron-json-storage');
const path = require('path');
var base64Img = require('base64-img');

/**
 * 
 */
storage.get('profil', function (error, data) {
    if (error) throw error;

    jQuery('form').find('[data-name=nom]').val(data.nom);
    jQuery('form').find('[data-name=prenom]').val(data.prenom);
    jQuery('form').find('[data-name=lieu]').val(data.lieu);
    jQuery('form').find('[data-name=signature]').val(data.signature);
    
    jQuery('#signature_visuel').append(jQuery('<img />').attr('src', data.signature));
});

/**
 * 
 */
jQuery('#submit-button').on("click", function () {
    storage.set('profil', {
        nom: jQuery('form').find('[data-name=nom]').val(),
        prenom: jQuery('form').find('[data-name=prenom]').val(),
        lieu: jQuery('form').find('[data-name=lieu]').val(),
        signature: jQuery('form').find('[data-name=signature]').val(),
    });

    window.location.href = 'index.html';
});

/**
 * 
 */
jQuery('#signature').on("click", function () { 
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        title: "Selectionnez votre signature",
        properties: ['openFile']
    }, function (filenames) {
        filepath = path.join(remote.app.getPath("userData"), path.basename(filenames[0]));
        
        base64Img.base64(filepath, function(err, data) {
            jQuery('form').find('[data-name=signature]').val(data);
            jQuery('#signature_visuel').empty();

            fs.createReadStream(filenames[0]).pipe(fs.createWriteStream(filepath));

            jQuery('#signature_visuel').append(jQuery('<img />').attr('src', data));
        });
    });
});
