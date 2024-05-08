import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '@hackatone/config';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { RefreshToken } from './RefreshToken';

export class User extends Model {

  @Expose({ groups: ['read'] })
  id!: number;

  @Expose()
  @IsNotEmpty()
  name!: string;

  @Expose()
  @IsNotEmpty()
  email!: string;

  phone!: string;

  @Exclude({ toPlainOnly: true }) // Exclude the password field when transforming to plain object
  password!: string;

  @Expose()
  created!: Date;

  @Expose()
  modified!: Date;

  role!: number;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: `users`
});

User.hasMany(RefreshToken, {
  foreignKey: 'userId',
  as: 'refreshTokens',
});
RefreshToken.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

User.sync({ force: false });

export default User;