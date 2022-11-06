
import { Model, Table, Column, DataType } from 'sequelize-typescript';
import { Category } from './category.model';

@Table({
    tableName: 'words',
    timestamps: false
})
export class Word extends Model {

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
    public name?: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    })
    public categoryId?: number;

    static asociate = (models: any) => {

        Word.belongsToMany(models.Category, {

            through: 'categoryId'

        });

    };

}

