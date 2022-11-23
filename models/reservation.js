const Sequelize = require('sequelize');

module.exports = class Reservation extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      MoiveCode: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      MoiveName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      MoiveTime: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      MoiveSeats: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Reservation',
      tableName: 'reservations',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Reservation.belongsTo(db.Client, { foreignKey: 'clientId', targetKey: 'id' });
  }
};
