const Sequelize = require("sequelize");
const Model = Sequelize.Model;
class DepositRequestModel extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      { 
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        email: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        phone: {
          type: DataTypes.STRING,
          allowNull: true
        },  
        cityId: {
          type: DataTypes.INTEGER,
          allowNull: true,
          references: {
            model: 'cities',
            key: 'id'
          }
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        }, 
        companyId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'companies',
            key: 'id'
          }
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true
        },  
      },
      {
        sequelize,
        modelName: "depositRequest"
      }
    );
  }
}

module.exports = DepositRequestModel;
