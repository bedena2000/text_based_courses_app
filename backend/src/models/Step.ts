import { Model, DataTypes, Sequelize } from "sequelize";

export class Step extends Model {
  public id!: number;
  public courseId!: number; // Changed to camelCase
  public title!: string;
  public order!: number;
  public contentBlocks!: any; // Changed to camelCase
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initStepModel = (sequelize: Sequelize) => {
  Step.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      courseId: {
        // Use camelCase here
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "course_id", // Explicitly map it to be safe
        references: {
          model: "Courses",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Untitled Step",
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        // No changes needed here, but 'order' is a SQL reserved word
      },
      contentBlocks: {
        // Use camelCase here
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        field: "content_blocks", // Explicitly map it
      },
    },
    {
      sequelize,
      tableName: "Steps",
      underscored: true,
    }
  );
};
