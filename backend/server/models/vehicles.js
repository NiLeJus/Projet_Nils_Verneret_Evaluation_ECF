module.exports = (sequelize, DataTypes) => {

const Vehicle = sequelize.define('Vehicle', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    vehicle_model_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'VehicleModel', 
            key: 'id',
        }
    },
    color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Color',
            key: 'id',
        }
    },
    vehicle_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'VehicleType', 
            key: 'id',
        }
    },
    paint_type: {
        type: DataTypes.ENUM('glossy', 'matte', 'metallic'),
        defaultValue: 'glossy',
        allowNull: false
    },
    production_year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mileage: {
        type: DataTypes.MEDIUMINT,
        allowNull: false
    },
    vehicle_condition_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'VehicleCondition', 
            key: 'id',
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    vehicle_comment: {
        type: DataTypes.TEXT,
        allowNull: true 
    },
    fuel_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'FuelType',
            key: 'id',
        }
    },
    transmission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Transmission',
            key: 'id',
        }
    },
    tax_horsepower: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    clicked: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false
    },
    vehicle_ad_status: {
        type: DataTypes.ENUM('displayed', 'hidden'),
        defaultValue: 'hidden',
        allowNull: false
    },
    vehicle_status: {
        type: DataTypes.ENUM('available', 'reserved', 'sold'),
        defaultValue: 'available',
        allowNull: false
    },
    at_garage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model:'Garage',
            key: 'id',
        }
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Vehicle',
    tableName: 'vehicles',
    timestamps: false 
});



return Vehicle;
};
