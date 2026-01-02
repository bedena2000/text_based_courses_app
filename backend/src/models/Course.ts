import { Model, DataTypes, Sequelize } from "sequelize";

export class Course extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public level!: string;
  public instructorId!: number; // Updated to camelCase
  public isPublished!: boolean; // Updated to camelCase
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initCourseModel = (sequelize: Sequelize) => {
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "instructor_id", // Maps the class property to the DB column
      },
      isPublished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        field: "is_published", // Maps the class property to the DB column
      },
    },
    {
      sequelize,
      tableName: "Courses",
      underscored: true,
    }
  );
};
