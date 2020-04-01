/* jshint indent: 2 */
const bcrypt = require('bcrypt');
const BadPhoneFormatError = require('../error/Registration/BadPhoneFormatError');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            isImmutable: true,
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        mail: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                validatePhone(value) {
                    if (!/^\+[0-9]+/.test(value)) {
                        throw new BadPhoneFormatError();
                    }
                },
            },
        },
        profile: {
            type: DataTypes.ENUM('back', 'front', 'data_analyst', 'qa'),
            allowNull: false,
        },
        lastPaymentDate: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            isImmutable: true,
            defaultValue: null,
        },
        company: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Company',
                key: 'id',
            },
        },
    }, {
        tableName: 'User',
        timestamps: false,
    });

    User.addScope('defaultScope', {
        attributes: { exclude: ['password', 'lastPaymentDate'] },
    });

    User.addScope('passwordIncluded', {});

    User.associate = (models) => {
        User.belongsTo(models.Company, { foreignKey: 'company' });
        User.hasMany(models.Project, { foreignKey: 'user' });
    };

    User.prototype.isPasswordValid = function isPasswordValid(pwd) {
        return bcrypt.compare(pwd, this.password);
    };

    User.prototype.hasPaid = function hasPaid() {
        // noinspection JSIncompatibleTypesComparison
        if (this.lastPaymentDate === null) {
            return false;
        }
        const interval = new Date() - new Date(this.lastPaymentDate).getTime();
        return Math.abs(Math.ceil(interval / (1000 * 3600 * 24))) < 365;
    };

    return User;
};
