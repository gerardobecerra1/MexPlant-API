const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      auth: "/api/auth",
      classifications: "/api/classifications",
      plants: "/api/plants",
      roles: "/api/roles",
      search: "/api/search",
      users: "/api/users",
      uploads: "/api/uploads",
    };

    //Middlewares
    this.middlewares();

    //Rutas de mi aplicación
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del Body
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.roles, require("../routes/role.route"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`API listening in http://localhost:${this.port}`)
    );
  }
}

module.exports = Server;
