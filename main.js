
const Config = require('electron-config');

const setupEvents = require('./setupEvents');

var config = new Config();

if (!setupEvents.handleSquirrelEvent()) {

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
                
            let opt = Object.assign({
                width: 1100,
                height: 700,
            }, config.get('winSize'));
            
            Window.main = new electron.BrowserWindow({
                width: opt.width,
                height: opt.height
            });

            Window.main.setMenu(Window.getMenu());

            Window.main.loadURL('file://' + PUBLIC_PATH + '/index.html');

            // Window.main.webContents.openDevTools();

            Window.main.on('closed', function () {
                Window.main = null;
            });

            Window.main.on('close', () => {
                config.set('winSize', {
                    width: Window.main.getSize()[0],
                    height: Window.main.getSize()[1],
                });
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

    electron.app.on('close', function() {
        console.log(Window.main.getSize());
    });
    
    electron.app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            electron.app.quit();
        }
    });

    electron.app.on('activate', function () {
        Window.init();
    });
}