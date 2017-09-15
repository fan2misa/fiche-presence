
var path = require('path');
var electron = require('electron');

var PUBLIC_PATH = path.join(__dirname, 'public');

var Window = {

    main: null,

    init: function () {
        if (Window.main === null) {
            Window.create();
        }
    },

    create: function () {
        Window.main = new electron.BrowserWindow({
            width: 1100,
            height: 700
        });

        Window.main.setMenu(Window.getMenu());

        Window.main.loadURL('file://' + PUBLIC_PATH + '/index.html');

        // Window.main.webContents.openDevTools();

        Window.main.on('closed', function () {
            Window.main = null;
        });
    },

    getMenu: function () {
        return electron.Menu.buildFromTemplate([
            {
                label: 'Configuration',
                click: function () {
                    Window.main.loadURL('file://' + PUBLIC_PATH + '/profil.html');
                }
            },
            {
                label: 'Quitter',
                click: function () {
                    electron.app.quit();
                }
            }
        ]);
    }
};

electron.app.on('ready', Window.create);

electron.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('activate', function () {
    Window.init();
});