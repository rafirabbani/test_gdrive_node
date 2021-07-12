const photos = (sequelize, DataTypes) => {
  const Photos = sequelize.define('photos', {
    photo_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    photo_path: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    photo_file: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    photo_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'photos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "photos_pkey",
        unique: true,
        fields: [
          { name: "photo_id" },
        ]
      },
    ]
  });
  Photos.associate = (models) => {
      Photos.belongsTo(models.Users, { foreignKey: 'photo_user_id' })
  }
  return Photos
}

export default photos
