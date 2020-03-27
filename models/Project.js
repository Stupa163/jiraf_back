/* jshint indent: 2 */

const moment = require('moment');
const InvalidGithubRepoLinkFormatError = require('../error/Validation/InvalidGithubRepoLinkFormatError');

module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('Project', {
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
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        delay: {
            type: DataTypes.BIGINT,
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
            type: DataTypes.ENUM('en_cours', 'realise'),
            allowNull: false,
        },
        stacks: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        adr: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        githubRepository: {
            type: DataTypes.STRING(255),
            allowNull: true,
            defaultValue: null,
            validate: {
                validateLink(value) {
                    if (value !== null && !/^https:\/\/github\.com\/[a-zA-Z0-9-_]+\/[a-zA-Z0-9-_]+$/.test(value)) {
                        throw new InvalidGithubRepoLinkFormatError();
                    }
                },
            },
        },
        client: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            isImmutable: true,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        user: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            isImmutable: true,
            references: {
                model: 'User',
                key: 'id',
            },
        },
    }, {
        tableName: 'Project',
        timestamps: false,
    });

    Project.associate = (models) => {
        Project.belongsTo(models.User, { foreignKey: 'user' });
        Project.belongsTo(models.Client, { foreignKey: 'client' });
        Project.hasMany(models.Sprint, { foreignKey: 'project' });
    };

    return Project;
};
