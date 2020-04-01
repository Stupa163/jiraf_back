/* jshint indent: 2 */

const BadPhoneFormatError = require('../error/Registration/BadPhoneFormatError');

module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            isImmutable: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(400),
            allowNull: false,
        },
        contactFirstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        contactLastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validatePhone(value) {
                if (!/^\+[0-9]+/.test(value)) {
                    throw new BadPhoneFormatError();
                }
            },
        },
        mail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    }, {
        tableName: 'Client',
        timestamps: false,
    });

    Client.associate = (models) => {
        Client.hasMany(models.Project, { foreignKey: 'client' });
    };

    return Client;
};
