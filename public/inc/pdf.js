
var fs = require('fs');
var convertFactory = require('electron-html-to');
var ejs = require('ejs');
// var pdfMaker = require('pdf-maker');

var conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});

module.exports.generate = function (data) {

    console.log(data);

    console.log(ejs.renderFile(path.join(path.dirname(__dirname), 'files', "fiche.ejs"), data));
}

//module.exports.generate = function (data) {
//
//    console.log(data);
//
//    var template = path.join(path.dirname(__dirname), 'files', "fiche.ejs");
//
//    pdfMaker(template, data, 'output.pdf', {
//        paperSize: {
//            format: 'A4',
//            orientation: 'portrait',
//            border: '1cm'
//        }
//    });
//}
