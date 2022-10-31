var _ = require('lodash'),
  fs = require('fs');
var logger = {log:_.noop, warn:_.noop, error: _.noop, info: _.noop};
var constants = {
  UTF8: 'utf8',
  TAG: '[INIT-ENV]'
};
var defaultConfig = {
  //decide whether to log to console
  logToConsole: false,
  //file to read with env vars
  filePath: './.env.json',
  //path in json to look for env vars
  jsonPath: null,
  //decides whether to overwrite an env var
  overwrite: true
};

var configure = function(config){
  var _config = _.cloneDeep(defaultConfig);
  if(_.isPlainObject(config)){
    _config = _.merge(_config, config);
    if(_config.logToConsole){
      logger = console;
    }
  }
  return _config;
};

var self = function(config){
  // configure instance
  var _config = configure(config);
  try{
    var envVars = JSON.parse(fs.readFileSync(_config.filePath, constants.UTF8)),
        result = {};

    if(_.isPlainObject(envVars)){
      if(_.isString(_config.jsonPath) && !_.isEmpty(_config.jsonPath)){
        envVars = _.get(envVars, _config.jsonPath, {});
      }

      if(!_.isEmpty(envVars)){
        _.forEach(envVars, function(value, key){
          if(!_.isObject(value) && _config.overwrite){
            process.env[key] = value;
          }
        });
        logger.log(constants.TAG, 'COMPLETE: environment variables set');
        result = _.pick(process.env, Object.keys(envVars));
        logger.log(constants.TAG, 'process.env: ', result);
      }else{
        logger.warn(constants.TAG, 'No environment variables set!');
      }
    }else{
      logger.warn(constants.TAG, 'JSON may not be in the right format');
      logger.warn(constants.TAG, 'No environment variables set!');
    }
    return result;
  }catch(e){
    logger.error(constants.TAG, e);
    logger.warn(constants.TAG, 'JSON may not have been valid');
    return {};
  }
};

module.exports = self;
