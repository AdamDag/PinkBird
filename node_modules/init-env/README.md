init-env
=========
This module will initialize environment variables into process.env using a JSON file

[![Build Status](https://travis-ci.org/lwhiteley/init-env.svg)](https://travis-ci.org/lwhiteley/init-env)

### Requirements

By default, the module will look for a file in your root directory, `.env.json`,
and use this to read a JSON object of values you want to use as environment variables.

eg.

file: `.env.json`
```json
{
  "NODE_ENV": "development",
  "API_KEY": "dwdewd232ed23e2321ews12e1"
}
```

file: `server.js`
```js
require('init-env')();
console.log(process.env.NODE_ENV) // --> development

```

### Custom Configuration

You can pass custom configs to the module if the defaults don't match what you want to do.

#### Options
```
____________________________________________________
property:    logToConsole (Boolean)
default:     false          
description: this will let the module log messages
             about what its doing
____________________________________________________
property:    filePath (String)
default:     './.env.json'                
description: a file path relative to the root of
             the directory eg.  ./.env.json
____________________________________________________
property:    jsonPath (string)
default:     null              
description: property path to where the environment
             vars are located in the JSON
____________________________________________________
property:    overwrite (boolean)
default:     true              
description: when true this decide if the env var
             will be overwritten if already defined
____________________________________________________
```

eg.

filepath: `./.config/.env.json`
```json
{
  "config":{
    "envVars":{
      "NODE_ENV": "development",
      "API_KEY": "dwdewd232ed23e2321ews12e1"
    }
  }
}
```

file: `server.js`
```js
require('init-env')({
  logToConsole:true,
  jsonPath:'config.envVars',
  filePath: './.config/.env.json',
  overwrite: true
});
console.log(process.env.NODE_ENV) // --> development

```

Notes:
- report issues
- pull requests are welcome
