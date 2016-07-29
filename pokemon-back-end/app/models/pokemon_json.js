'use strict';

const Nodal = require('nodal');

class PokemonJson extends Nodal.Model {}

PokemonJson.setDatabase(Nodal.require('db/main.js'));
PokemonJson.setSchema(Nodal.my.Schema.models.PokemonJson);

module.exports = PokemonJson;
