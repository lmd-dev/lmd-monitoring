import { Sequelize } from "sequelize";

const { database: db} = require('@settings');

//Database singleton
export class Database
{
    private static _handle: Database = null;

    private _sequelize: Sequelize;
    public get sequelize(): Sequelize { return this._sequelize; }

    /**
     * Constructor (private)
     */
    private constructor()
    {
        try
        {
            this._sequelize = new Sequelize(`${db.dialect}://${db.user}:${db.password}@${db.host}:${db.port}/${db.dbName}`, { logging: db.logging });
        }
        catch (error)
        {
            console.log(error);
        }
    }

    //Returns unique instance of the database
    public static getHandle()
    {
        if (Database._handle == null)
            Database._handle = new Database();

        return Database._handle;
    }
}