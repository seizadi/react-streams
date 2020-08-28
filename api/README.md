# Streams API Server

This is based on [json-server](https://www.npmjs.com/package/json-server)
to server Streams REST API interface.

To create it:

```bash
mkdir api
cd api
npm init
npm install --save json-server
```
Create a db.json file as described
[here](https://www.npmjs.com/package/json-server#getting-started).

The db.json has only a single resource:

```json
{
  "streams": []
}
```
The records in this file will grow over time as
we add new records.

We also modify package.json for the startup script:

```json
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "json-server -p 3001 -w db.json"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "json-server": "^0.16.1"
  }
}
```

Note that we start json-server watching the db.json
file and using port '3001' since
our reactJS server is running on '3000', now to run
the API server:

```bash
npm start
```

You can test the server working:

```bash
curl localhost:3001/streams | jq
[]
```
