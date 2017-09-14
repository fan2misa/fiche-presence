
var fs = require('fs');
var pdfMaker = require('pdf-maker');


module.exports.generate = function (data) {

    console.log(data);

    var template = path.join(path.dirname(__dirname), 'files', "fiche.ejs");

    pdfMaker(template, data, 'output.pdf', {
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '.25cm'
        }
    });
}
