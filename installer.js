
const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller;
const path = require('path');

getInstallerConfig()
        .then(createWindowsInstaller)
        .catch((error) => {
            console.error(error.message || error)
            process.exit(1)
        });

function getInstallerConfig() {
    console.log('creating windows installer');
    const rootPath = path.join('./');
    const outPath = path.join(rootPath, 'dist');

    return Promise.resolve({
        appDirectory: path.join(outPath, 'fiche-presence-win32-x64'),
        authors: 'Gwennael Jean',
        description: "Generateur de fiche de presence",
        noMsi: true,
        outputDirectory: path.join(outPath, 'installers'),
        exe: 'fiche-presence.exe',
        setupExe: 'fiche-presence-setup.exe'
    });
}