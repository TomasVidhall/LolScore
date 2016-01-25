var _getAllImagesFromDir = function(dir) {

    var filesystem = require("fs");
    var results = {};

    filesystem.readdirSync(dir).forEach(function(file) {

        req = 'require("' + dir+"/"+file +'")';
        name = file.substring(0,file.length -4);
        console.log(name);
        results[name] = req;

    });

    return results;

};

var Constants = {};

Constants.playerImages = _getAllImagesFromDir("./images/players");
Constants.teamImages = _getAllImagesFromDir("./images/teams");

console.log(Constants);
