import { Database } from '../database/database';

import
{
    Model,
    DataTypes,
    Optional,
} from "sequelize";

const sequelize = Database.getHandle().sequelize;

interface UserAttributes
{
    id: number;
    login: string;
    password: string;
    email: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { };

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes
{
    id!: number;
    login!: string;
    password!: string;
    email!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        sequelize,
        modelName: 'User'
    });