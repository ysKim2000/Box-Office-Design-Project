// const Sequelize = require('sequelize');

// module.exports = class User extends Sequelize.Model {
//     static init(sequelize) {
//         return super.init({
//             id: {
//                 type: Sequelize.STRING(100),
//                 allowNull: false,
//                 primaryKey: true
//             },
//             password: {
//                 type: Sequelize.STRING(100),
//                 allowNull: false
//             },
//             name: {
//                 type: Sequelize.STRING(20),
//                 allowNull: false
//             },
//             description: {
//                 type: Sequelize.TEXT,
//                 allowNull: true
//             }
//         }, {
//             sequelize,
//             timestamps: false,
//             underscored: false,
//             modelName: 'User',
//             tableName: 'users',
//             paranoid: false,
//             charset: 'utf8mb4',
//             collate: 'utf8mb4_general_ci',
//         });
//     }

//     static associate(db) {
//         db.User.hasMany(db.Comment, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
//         db.User.hasOne(db.Info, { foreignKey: 'userId', sourceKey: 'id', onDelete: 'cascade' });
//     }//1:N관계로 시퀄라이즈에서는 1:N관계를 hasMany로 표현, 반대는 belongsTO로 표현
// };
