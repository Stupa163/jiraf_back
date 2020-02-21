/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define('Client', {
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
      type: DataTypes.BIGINT,
      allowNull: false,
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
