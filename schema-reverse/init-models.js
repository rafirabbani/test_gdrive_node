var DataTypes = require("sequelize").DataTypes;
var _photos = require("./photos");
var _users = require("./users");

function initModels(sequelize) {
  var photos = _photos(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  photos.belongsTo(users, { as: "photo_user", foreignKey: "photo_user_id"});
  users.hasMany(photos, { as: "photos", foreignKey: "photo_user_id"});

  return {
    photos,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
