


module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    // définissez les champs ici
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
      // options du modèle
      sequelize,
      modelName: 'Option',
      tableName: 'options',
      timestamps: false 
  });


  return Option;
};
