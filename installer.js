
var installer = require('electron-installer-windows');

var options = {
    src: 'dist/fiche-presence-win32-x64/',
    dest: 'dist/installers/'
};

console.log('Creating package (this may take a while)');

installer(options, function (err) {
    if (err) {
        console.error(err, err.stack);
        process.exit(1);
    }

    console.log('Successfully created package at ' + options.dest);
});
