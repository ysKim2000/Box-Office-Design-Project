// const Sequelize = require('sequelize');

// module.exports = class Info extends Sequelize.Model {
//   static init(sequelize) {
//     return super.init({
//       favorProf: {
//         type: Sequelize.STRING(100),
//         allowNull: false
//       },
//       loveLife: {
//         type: Sequelize.STRING(100),
//         allowNull: false
//       }
//     }, {
//       sequelize,
//       timestamps: false,
//       modelName: 'Info',
//       tableName: 'info',
//       paranoid: false,
//       charset: 'utf8mb4',
//       collate: 'utf8mb4_general_ci'
//     });
//   }

//   static associate(db) {
//     db.Info.belongsTo(db.User, { foreignKey: 'userId', targetKey: 'id' });
//   }
// };