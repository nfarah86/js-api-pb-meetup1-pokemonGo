'use strict';

const Nodal = require('nodal');

class CreatePokemonJsons extends Nodal.Migration {

  constructor(db) {
    super(db);
    this.id = 2016072819431421;
  }

  up() {

    return [
      this.createTable("pokemon_jsons", [{"name":"type","type":"string"},{"name":"geometry","type":"json"},{"name":"properties","type":"json"}])
    ];

  }

  down() {

    return [
      this.dropTable("pokemon_jsons")
    ];

  }

}

module.exports = CreatePokemonJsons;
