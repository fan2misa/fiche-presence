
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
    if (jQuery('form').find('img').hasClass('signature-changed')) {
        base64Img.base64(jQuery('form').find('img').attr('src'), function(err, data) {
                storage.set('profil', {
                    nom: jQuery('form').find('[data-name=nom]').val(),
                    prenom: jQuery('form').find('[data-name=prenom]').val(),
                    lieu: jQuery('form').find('[data-name=lieu]').val(),
                    signature: data,
                }, () => window.location.href = 'index.html');
            });
    } else {
        storage.set('profil', {
            nom: jQuery('form').find('[data-name=nom]').val(),
            prenom: jQuery('form').find('[data-name=prenom]').val(),
            lieu: jQuery('form').find('[data-name=lieu]').val(),
            signature: jQuery('form').find('[data-name=signature]').val(),
        }, () => window.location.href = 'index.html');
    }
});

/**
 * 
 */
jQuery('#signature').on("click", function () {
    remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
        title: "Selectionnez votre signature",
        properties: ['openFile']
    }, function (filenames) {
        filepath = path.join(remote.app.getPath("userData"), "sign" + path.extname(filenames[0]));

        jQuery('form').find('[data-name=signature]').val(filepath);
        jQuery('#signature_visuel').empty();

        fs.createReadStream(filenames[0])
                .pipe(fs.createWriteStream(filepath).on('finish', () => {
                    jQuery('#signature_visuel').append(jQuery('<img />').attr('src', filepath).addClass('signature-changed'))
        }));
    });
});
