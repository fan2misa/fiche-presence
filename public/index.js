
var JSZip = require('jszip');
var fs = require('fs');
var Docxtemplater = require('docxtemplater');
var FileSaver = require('file-saver');

jQuery('#submit-button').on("click", function () {
    var data = {
        enfant: jQuery('form').find('[data-name=enfant]').val(),
        mois: jQuery('form').find('[data-name=mois]').val(),
        jours: jQuery('form').find('[data-name=jours]').val(),
    };

    jQuery('table').find('tbody').find('tr').each((index, tr) => {
        data["periode_" + (index + 1)] = jQuery(tr).find('[data-name=periode]').val();
        data["motif_" + (index + 1)] = jQuery(tr).find('[data-name=motif]').val();
    });

    generateFile(data);
});

function generateFile(data) {    
    var content = fs.readFileSync(__dirname + "/files/fiche.docx", "binary");
    var doc = new Docxtemplater();
    
    var zip = new JSZip(content);
    doc.loadZip(zip);
    
    doc.setData(data);

    doc.render();
    
    var out = doc.getZip().generate({type: "blob"});

    FileSaver.saveAs(out, "Fiche de présence - " + data.enfant + " - " + data.mois + ".docx");
}
