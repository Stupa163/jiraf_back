/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
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
  });

  User.associate = (models) => {
    User.hasOne(models.Company, { foreignKey: 'id' });
    User.hasMany(models.Project, { foreignKey: 'user' });
  };

  return User;
};
