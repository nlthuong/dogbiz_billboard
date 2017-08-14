"use strict";

module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define('dog', {
      name: { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required"
          },
          len: {
            args: [1, 128],
            msg: "Name should be from 1 to 128 characters length"
          }
        }
      },
      birthday: { 
        type: DataTypes.DATEONLY, 
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Birthday is required"
          }
        }
      },
      sex: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true //true: male, false: female
      },
      parents: { 
        type: DataTypes.STRING, 
        allowNull: true
      },
      address: { 
        type: DataTypes.STRING, 
        allowNull: true
      },
      photo: { 
        type: DataTypes.STRING,
        allowNull: true
      },
      note: { 
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { 
      underscored: true,
      freezeTableName: true
    }
  );

  // Class methods, new from Seq v4
  Dog.associate = function(models) {
    Dog.belongsTo(models.breed, {
      onDelete: "SET NULL"
    });
    Dog.hasMany(models.achievement, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Dog.belongsToMany(models.contest, {
      through: models.achievement,
      as: "contests"
    });
  };

  return Dog;
};