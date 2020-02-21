/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  const Sprint = sequelize.define('Sprint', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('en_cours','termine','a_faire'),
      allowNull: false
    },
    project: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Project',
        key: 'id'
      }
    }
  }, {
    tableName: 'Sprint'
  });

  Sprint.associate = (models) => {
    Sprint.hasOne(models.Project, {foreignKey: 'id'});
    Sprint.hasMany(models.Task, {foreignKey: 'sprint'});
  };

  return Sprint;
};
