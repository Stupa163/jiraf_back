/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define('Company', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        siret: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('sas', 'sasu', 'autoentrepreneur', 'eurl', 'sarl'),
            allowNull: false,
        },
    }, {
        tableName: 'Company',
        timestamps: false,
    });

    Company.associate = (models) => {
        Company.hasMany(models.User, { foreignKey: 'company' });
    };

    return Company;
};
