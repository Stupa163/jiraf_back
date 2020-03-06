/* jshint indent: 2 */
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
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
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        profile: {
            type: DataTypes.ENUM('back', 'front', 'data_analyst', 'qa'),
            allowNull: false,
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
        attributes: { exclude: ['password'] },
    });

    User.addScope('passwordIncluded', {});

    User.associate = (models) => {
        User.belongsTo(models.Company, { foreignKey: 'company' });
        User.hasMany(models.Project, { foreignKey: 'user' });
    };

    User.prototype.isPasswordValid = function isPasswordValid(pwd) {
        return bcrypt.compare(pwd, this.password);
    };

    return User;
};
