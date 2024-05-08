import { Sequelize, DataTypes, Model } from 'sequelize';
import { config, sequelize } from '@hackatone/config';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { User } from './User';


export class RefreshToken extends Model {
    id!: number;
    token!: string;
    userId!: string;
    valid!: Date;
    
    static generateExpiryDate(): Date {
        const expiresIn = config.refreshTokenExpiresIn;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + parseInt(expiresIn));

        return expiryDate;
    }
}

RefreshToken.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    valid: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'RefreshToken',
    tableName: `refresh_tokens`
});

RefreshToken.sync({ force: false });

export default RefreshToken;