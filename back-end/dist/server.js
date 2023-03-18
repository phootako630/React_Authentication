"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./routes");

var _cors = _interopRequireDefault(require("cors"));

var _db = require("./db");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // The rest of your code


var PORT = process.env.PORT || 8080;
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: ["https://react-authentication-phootako630.vercel.app", "https://react-authentication-git-awscognitoauth-phootako630.vercel.app", "https://react-authentication-five.vercel.app", "https://react-authentication-n5xugd1dk-phootako630.vercel.app" // Add more domains as needed
  ]
})); // This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)

app.use(_express["default"].json()); // Add all the routes to our Express server
// exported from routes/index.js

_routes.routes.forEach(function (route) {
  app[route.method](route.path, route.handler);
}); // Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.


(0, _db.initializeDbConnection)().then(function () {
  app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
  });
});