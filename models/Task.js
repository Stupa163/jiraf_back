/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('en_cours','termine','a_faire'),
      allowNull: false
    },
    completionTime: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sprint: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Sprint',
        key: 'id'
      }
    }
  }, {
    tableName: 'Task'
  });
};
