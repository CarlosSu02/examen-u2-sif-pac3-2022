
import { Column, Model, Table, DataType } from 'sequelize-typescript'

@Table({
    tableName: 'statistics',
    timestamps: false
})
export class Statistic extends Model {
    
    @Column({ 
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    public id?: number;

    @Column({ 
        type: DataType.STRING(20),
        allowNull: false
    })
    public word?: string;

    @Column({ 
        type: DataType.STRING(20),
        allowNull: false
    })
    public progress?: string;

    @Column({ 
        type: DataType.STRING(20),
        allowNull: false,
        defaultValue: 'In progress...'
    })
    public state?: string;
    
    @Column({ 
        type: DataType.INTEGER,
        allowNull: false
    })
    public attempts?: number;

    @Column({ 
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    public completed?: boolean; 

};
