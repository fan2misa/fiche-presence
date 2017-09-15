
var electron = require('electron');
var remote = electron.remote;
var fs = require('fs');
const path = require('path');
var storage = require('electron-json-storage');
var move = require('file-move');

var pdf = require('./inc/pdf');

var data = {};

storage.get('profil', function (error, profil) {
    if (error)
        throw error;

    data = Object.assign(data, {
        nom: profil.nom + " " + profil.prenom,
        lieu: profil.lieu,
        signature: profil.signature,
        date: getToday()
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

/**
 * 
 * @returns {getToday.today|String|Date}
 */
function getToday() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = dd + '/' + mm + '/' + yyyy;

    return today;
}