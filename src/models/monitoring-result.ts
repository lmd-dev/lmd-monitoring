import { Database } from '../database/database';

import
{
    Model,
    ModelDefined,
    DataTypes,
    Optional
} from "sequelize";

const sequelize = Database.getHandle().sequelize;

interface MonitoringResultAttributes
{
    id: number;
    obtainedStatusCode: number;
    sslStatus: boolean;
    firstMonitoring: Date;
    lastMonitoring: Date;
    WebsiteId: number;
}

interface MonitoringResultCreationAttributes extends Optional<MonitoringResultAttributes, "id">
{
};

export class MonitoringResult extends Model<MonitoringResultAttributes, MonitoringResultCreationAttributes> implements MonitoringResultAttributes
{
    id!: number;
    obtainedStatusCode!: number;
    sslStatus!: boolean;
    firstMonitoring!: Date;
    lastMonitoring!: Date;
    WebsiteId!: number;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

MonitoringResult.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    obtainedStatusCode: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sslStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    firstMonitoring: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastMonitoring: {
        type: DataTypes.DATE,
        allowNull: false
    },
    WebsiteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    sequelize,
    modelName: 'MonitoringResult'
});

