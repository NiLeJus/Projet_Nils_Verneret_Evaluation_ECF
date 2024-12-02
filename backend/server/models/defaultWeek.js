module.exports = (sequelize, DataTypes) => {
    const DefaultWeek = sequelize.define('DefaultWeek', {
      day_of_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate: {
          min: 1,
          max: 7
        }
      },
      isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      morningOpening: {
        type: DataTypes.TIME
      },
      morningClosing: {
        type: DataTypes.TIME
      },
      afternoonOpening: {
        type: DataTypes.TIME
      },
      afternoonClosing: {
        type: DataTypes.TIME
      },
      isHoliday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
        sequelize,
        modelName: 'DefaultWeek',
        tableName: 'default_week',
        timestamps: false 
    });
  
    return DefaultWeek;
  };
  