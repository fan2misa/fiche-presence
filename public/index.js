
var JSZip = require('jszip');
var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var FileSaver = require('file-saver');
var storage = require('electron-json-storage');
var ImageModule = require('docxtemplater-image-module');

var data = {};

storage.get('profil', function (error, profil) {
    if (error)
        throw error;

    data = Object.assign(data, {
        nom: profil.nom + " " + profil.prenom,
        lieu: profil.lieu,
        signature: profil.signature
    });
});


var defaultDate = new Date();
defaultDate.setHours(00);
defaultDate.setMinutes(00);

jQuery(function () {
    jQuery('.monthpicker').datetimepicker({
        viewMode: 'years',
        format: 'MM/YYYY'
    });
    
    jQuery('.datetimepicker').datetimepicker({
        format: 'DD/MM/YYYY HH:mm',
        sideBySide: true
    });
});

jQuery('#submit-button').on("click", function () {
    data = Object.assign(data, {
        enfant: jQuery('form').find('[data-name=enfant]').val(),
        mois: jQuery('form').find('[data-name=mois]').val(),
        jours: jQuery('form').find('[data-name=jours]').val(),
    });

    jQuery('table').find('tbody').find('tr').each((index, tr) => {
        data["periode_" + (index + 1)] = "Du " + jQuery(tr).find('[data-name=periode1]').val() + " au " + jQuery(tr).find('[data-name=periode2]').val();
        data["motif_" + (index + 1)] = jQuery(tr).find('[data-name=motif]').val();
    });

    generateFile(data);
});

function generateFile(data) {

    data = Object.assign(data, {
        date: getToday()
    });

    var content = fs.readFileSync(__dirname + "/files/fiche.docx", "binary");
    var doc = new Docxtemplater();

    var zip = new JSZip(content);
    doc.loadZip(zip);

    doc.attachModule(new ImageModule({
        centered: false,
        getImage: function (tagValue, tagName) {
            return fs.readFileSync(tagValue, 'binary');
        },
        getSize: function (img, tagValue, tagName) {
            sizeOf = require('image-size');
            var dimensions = sizeOf(tagValue);
            return [dimensions.width, dimensions.height];
        }
    }));

    doc.setData(data);

    doc.render();

    var out = doc.getZip().generate({type: "blob"});

    FileSaver.saveAs(out, "Fiche de présence - " + data.enfant + " - " + data.mois + ".docx");
}

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