/* jshint indent: 2 */

const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Sprint = sequelize.define('Sprint', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            isImmutable: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        startDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            get() {
                return moment(this.getDataValue('startDate')).format('DD/MM/YYYY');
            }
        },
        endDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            get() {
                return moment(this.getDataValue('endDate')).format('DD/MM/YYYY');
            }
        },
        status: {
            type: DataTypes.ENUM('en_cours', 'termine', 'a_faire'),
            allowNull: false,
        },
        project: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'Project',
                key: 'id',
            },
        },
    }, {
        tableName: 'Sprint',
        timestamps: false,
    });

    Sprint.associate = (models) => {
        Sprint.belongsTo(models.Project, { foreignKey: 'project' });
        Sprint.hasMany(models.Task, { foreignKey: 'sprint' });
    };

    return Sprint;
};
