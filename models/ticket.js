const Sequelize = require('sequelize');

module.exports = class Ticket extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      ticket: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      movieCode: {
        type: Sequelize.INTEGER(100),
        allowNull: false
      },
      movieName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      movieTime: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      movieSeat: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'Ticket',
      tableName: 'tickets',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    });
  }

  static associate(db) {
    db.Ticket.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
  }
};
