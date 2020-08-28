# RTMP SERVER

# Install
Follow 
[instructions](https://github.com/illuspas/Node-Media-Server#npm-version-recommended)

```bash
mkdir nms
cd nms
npm install --save node-media-server
vi index.js
```
```javascript
const NodeMediaServer = require('node-media-server');

const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60
  },
  http: {
    port: 8000,
    allow_origin: '*'
  }
};

var nms = new NodeMediaServer(config)
nms.run();
```

Update package.json file:
```json
{
  "name": "nms",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "node-media-server": "^2.2.2"
  }
}
```

### Run
```bash
npm start
```
