import { Sequelize, DataTypes, Model } from 'sequelize';
import { sequelize } from '@hackatone/config';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { RefreshToken } from './RefreshToken';
import User from './User';

export class Post extends Model {

  @Expose()
  id!: number;

  @Expose()
  @IsNotEmpty()
  title!: string;

  @Expose()
  @IsNotEmpty()
  description!: string;

  @Expose()
  authorId!: number;


}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  }
}, {
  sequelize,
  modelName: 'Post',
  tableName: `posts`
});

Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
User.hasMany(Post, { foreignKey: 'authorId', as: 'posts' });

Post.sync({ force: false });

export default Post;