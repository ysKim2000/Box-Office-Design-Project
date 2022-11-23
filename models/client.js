const Sequelize = require('sequelize');

module.exports = class Client extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            id: {
                type: Sequelize.STRING(100),
                allowNull: false,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(20),
                allowNull: false
            },
            birth: {
                type: Sequelize.STRING(20),
                allowNull: true
            },
            gender: {
                type: Sequelize.STRING(20),
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Client',
            tableName: 'clients',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        db.Client.hasMany(db.Reservation, { foreignKey: 'clientId', sourceKey: 'id', onDelete: 'cascade' });
    }//1:N관계로 시퀄라이즈에서는 1:N관계를 hasMany로 표현, 반대는 belongsTO로 표현
};
