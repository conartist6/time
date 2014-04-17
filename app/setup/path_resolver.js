if (typeof define !== 'function') { var define = require('amdefine')(module) }

define(
  ["exports"],
  function(__exports__) {
    "use strict";
	function pathResolver (modulePath) {
        //input: models/day
        //output: pods/data/day/day_model
        //input: controllers/calendar/day
        //output: pods/router/day/calendar/day_controller
        var match = /(^\/)?([^\/]+)\/(.+)$/.exec(modulePath),
            type = match[2].slice(0, -1),
            relativePath = match[3],
            pathPieces = relativePath.split('/'),
            invertedRelativePath = pathPieces.reverse().join('/'),
            moduleName = pathPieces[0];

        switch(type) {
            case "template":
            case "controller":
            case "route":
            case "view":
                return 'pods/router/'+invertedRelativePath+'/'+moduleName+'_'+type;
            case "model":
            case "adapter":
            case "serializer":
                return 'pods/data/'+relativePath+'/'+moduleName+'_'+type;
            case "component":
                return 'components/'+moduleName+'/'+moduleName;
            default:
                return modulePath;
        }
    }

    __exports__.pathResolver = pathResolver;
});