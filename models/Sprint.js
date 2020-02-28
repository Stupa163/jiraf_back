/* jshint indent: 2 */

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
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
      validate: {
        onForeignConstraintError(field, message) {
          message(`Unable to find the project n°${field}`);
        }
      }
    },
  }, {
    tableName: 'Sprint',
    timestamps: false,
  });

  Sprint.associate = (models) => {
    Sprint.belongsTo(models.Project, { foreignKey: 'id' });
    Sprint.hasMany(models.Task, { foreignKey: 'sprint' });
  };

  return Sprint;
};
