const users = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  Users.associate = (models) => {
      Users.hasMany(models.Photos, { foreignKey: "photo_user_id", onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  }
  return Users
}

export default users