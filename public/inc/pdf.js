
var electron = require('electron');
var remote = electron.remote;
var pdfMaker = require('pdf-maker');
var electron = require('electron');
var remote = electron.remote;

module.exports.generate = function (data) {

    var template = path.join(path.dirname(__dirname), 'files', "fiche.ejs");

    pdfMaker(template, data, path.join(remote.app.getPath("userData"), "fiche.pdf"), {
        paperSize: {
            format: 'A4',
            orientation: 'portrait',
            border: '.25cm'
        }
    });
}
