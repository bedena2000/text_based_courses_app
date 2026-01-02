import { Model, DataTypes, Sequelize } from "sequelize";
import bcrypt from "bcrypt";

export class User extends Model {
  public id!: number;
  public username!: string;
  public password_hash!: string;
  public bio!: string | null; // <--- ADD THIS LINE
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  // Method to check password
  public async verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password_hash);
  }
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.TEXT, // <--- ADD THIS COLUMN
        allowNull: true,
        defaultValue: "",
      },
    },
    {
      sequelize,
      tableName: "Users",
      underscored: true,
      hooks: {
        beforeCreate: async (user: User) => {
          if (user.password_hash) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
          }
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("password_hash")) {
            const salt = await bcrypt.genSalt(10);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
          }
        },
      },
    }
  );
};
