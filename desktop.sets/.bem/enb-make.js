var fs = require('fs-extra'),
    vow = require('vow');

module.exports = function(config) {
    var sourceDir = '../desktop.blocks';
    fs.readdirSync(config.resolvePath(sourceDir)).forEach(function(block) {
        if (block.indexOf('.') === 0) return;

        fs.existsSync(block) && fs.removeSync(block);


        /* Copy examples into set */

        var examplesDir = [block, block + '.examples'].join('/'),
            examplesSourceDir = [sourceDir, examplesDir].join('/');

        fs.mkdirsSync(examplesDir);
        fs.copy(examplesSourceDir, examplesDir); // THIS IS ASYNC!!

    });
};

function getLevels(config, ownLevel) {
    var levels = [
        { path: '../desktop.blocks', check: false }
    ];
    if (fs.existsSync(ownLevel)) {
        levels.push({ path: ownLevel, check: false });
    }
    return levels.map(function(levelPath) { return config.resolvePath(levelPath); });
}
