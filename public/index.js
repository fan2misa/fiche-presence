
var electron = require('electron');
var remote = electron.remote;
var fs = require('fs');
const path = require('path');
var storage = require('electron-json-storage');
var move = require('file-move');

var pdf = require('./inc/pdf');
var dater = require('./inc/date');

var data = {};

storage.get('profil', function (error, profil) {
    if (error)
        throw error;

    data = Object.assign(data, {
        nom: profil.nom + " " + profil.prenom,
        lieu: profil.lieu,
        signature: profil.signature,
        date: dater.getCurrentDay()
    });
});


var defaultDate = new Date();
defaultDate.setHours(00);
defaultDate.setMinutes(00);

jQuery(function () {
    jQuery('.monthpicker').datetimepicker({
        viewMode: 'years',
        format: 'MM/YYYY',
        showClose: true
    });
    
    jQuery('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        sideBySide: true,
        showClose: true
    });
        
    jQuery('form').find('[data-name=mois]').attr('placeholder', "exemple : " + dater.getCurrentMonth());
    
});

jQuery('#submit-button').on("click", function () {
    data = Object.assign(data, {
        enfant: jQuery('form').find('[data-name=enfant]').val(),
        mois: jQuery('form').find('[data-name=mois]').val(),
        jours: jQuery('form').find('[data-name=jours]').val(),
        periodes: []
    });

    jQuery('table').find('tbody').find('tr').each((index, tr) => {
        data.periodes.push({
            periode: {
                start: jQuery(tr).find('[data-name=periode1]').val(), 
                end: jQuery(tr).find('[data-name=periode2]').val()
            },
            motif: jQuery(tr).find('[data-name=motif]').val()
        });
    });

    pdf.generate(data);

    remote.dialog.showSaveDialog({
        defaultPath: path.join(remote.app.getPath('documents'), "Fiche de présence.pdf")
    }, (filename) => {
        move(path.join(remote.app.getPath("userData"), "fiche.pdf"), filename, function (err) {
            
        });
    });
   
});
