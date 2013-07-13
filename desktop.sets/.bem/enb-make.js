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

        var examplesDirCopied = vow.promise();
        examplesDirCopied.then(function(){

            config.node(examplesDir, function(nodeConfig) {

                fs.readdirSync(config.resolvePath(examplesDir)).forEach(function(exampleFile){

                    if (exampleFile.indexOf('.') === 0 || exampleFile.indexOf('.bemjson.js') === -1) return;

                    var targetName = exampleFile.replace('.bemjson.js', ''),
                        ownLevel = examplesDir + '/' + targetName + '.blocks';

                    nodeConfig.addTechs([
                        [
                            require('enb/techs/levels'),
                            {
                                levels: getLevels(config, ownLevel),
                                target: targetName + '.levels'
                            }
                        ],
                        [ require('enb/techs/file-provider'), { target: targetName + '.bemjson.js' } ],
                        [ require('enb/techs/bemdecl-from-bemjson'), {
                            sourceTarget: targetName + '.bemjson.js',
                            destTarget: targetName + '.bemdecl.js'
                        } ],
                        [ require('enb/techs/deps-old'), {
                            depsTarget: targetName + '.deps.js',
                            bemdeclTarget: targetName + '.bemdecl.js',
                            levelsTarget: targetName + '.levels'
                        } ],
                        [ require('enb/techs/files'), {
                            filesTarget: targetName + '.files',
                            dirsTarget: targetName + '.dirs',
                            depsTarget: targetName + '.deps.js',
                            levelsTarget: targetName + '.levels'
                        } ],
                        [ require('enb/techs/js'), {
                            filesTarget: targetName + '.files',
                            target: targetName + '.js'
                        } ],
                        [ require('enb/techs/css'), {
                            filesTarget: targetName + '.files',
                            target: targetName + '.css'
                        } ],
                        [   require('bh/techs/bh-server'), {
                            filesTarget: targetName + '.files',
                            target: targetName + '.bh.js'
                        } ],
                        [ require("enb/techs/html-from-bemjson"), {
                            bemhtmlTarget: targetName + '.bh.js',
                            bemjsonTarget: targetName + '.bemjson.js',
                            destTarget: targetName + '.html'
                        } ]
                    ]);
                    nodeConfig.addTargets([
                        targetName + '.css',
                        targetName + '.js',
                        targetName + '.html'
                    ]);

                });

            });

        })
        fs.copy(examplesSourceDir, examplesDir, function() {
            examplesDirCopied.fulfill('completed');
        });

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
