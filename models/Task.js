/* jshint indent: 2 */
const Models = require('../models');
const ModelNotFoundError = require('../error/Sequelize/ModelNotFoundError');

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
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
    description: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('en_cours', 'termine', 'a_faire'),
      allowNull: false,
    },
    completionTime: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sprint: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Sprint',
        key: 'id',
      },
    },
  }, {
    tableName: 'Task',
    timestamps: false,
  });

  Task.associate = (models) => {
    Task.belongsTo(models.Sprint, { foreignKey: 'sprint' });
  };

  return Task;
};
