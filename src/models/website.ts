import { Database } from '../database/database';
import { MonitoringResult } from './monitoring-result';

import
{
    Model,
    ModelDefined,
    DataTypes,
    Optional,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin
} from "sequelize";

const sequelize = Database.getHandle().sequelize;

interface WebsiteAttributes
{
    id: number;
    name: string;
    url: string;
    expectedStatusCode: number;
    checkSSL: boolean;
}

interface WebsiteCreationAttributes extends Optional<WebsiteAttributes, "id"> { };

export class Website extends Model<WebsiteAttributes, WebsiteCreationAttributes> implements WebsiteAttributes
{
    id!: number;
    name!: string;
    url!: string;
    expectedStatusCode!: number;
    checkSSL!: boolean;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    public getResults!: HasManyGetAssociationsMixin<MonitoringResult>; // Note the null assertions!
    public addResult!: HasManyAddAssociationMixin<MonitoringResult, number>;
    public hasResult!: HasManyHasAssociationMixin<MonitoringResult, number>;
    public countResults!: HasManyCountAssociationsMixin;
    public createResult!: HasManyCreateAssociationMixin<MonitoringResult>;

    public readonly results?: MonitoringResult[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        results: Association<Website, MonitoringResult>;
    };
}

Website.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expectedStatusCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    checkSSL: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'Website'
    });

Website.hasMany(MonitoringResult, { as: 'results' });
//MonitoringResult.belongsTo(Website, { as: 'website' });