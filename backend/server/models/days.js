module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      unique: true
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    morningOpening: {
      type: DataTypes.INTEGER
    },
    morningClosing: {
      type: DataTypes.INTEGER
    },
    afternoonOpening: {
      type: DataTypes.INTEGER
    },
    afternoonClosing: {
      type: DataTypes.INTEGER
    },
    isHoliday: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Day',
    tableName: 'days',
    timestamps: false
  });

  return Day;
}
