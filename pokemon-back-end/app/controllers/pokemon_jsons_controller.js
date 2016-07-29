'use strict';

const Nodal = require('nodal');
const PokemonJson = Nodal.require('app/models/pokemon_json.js');

class PokemonJsonsController extends Nodal.Controller {

  index() {

    PokemonJson.query()
      .where(this.params.query)
      .end((err, models) => {

        this.respond(err || models);

      });

  }

  show() {

    PokemonJson.find(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

  create() {

    PokemonJson.create(this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  update() {

    PokemonJson.update(this.params.route.id, this.params.body, (err, model) => {

      this.respond(err || model);

    });

  }

  destroy() {

    PokemonJson.destroy(this.params.route.id, (err, model) => {

      this.respond(err || model);

    });

  }

}

module.exports = PokemonJsonsController;
