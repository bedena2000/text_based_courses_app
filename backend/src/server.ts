import { sequelize } from "./config/database";
import app from "./app";
import { initUserModel, User } from "./models/User";
import { Course, initCourseModel } from "./models/Course";
import { Step, initStepModel } from "./models/Step";
// Removed DB_CONFIG import if it's not used in this file anymore

const PORT = process.env.PORT || 4000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected to Supabase!");

    initUserModel(sequelize);
    initCourseModel(sequelize);
    initStepModel(sequelize);

    User.hasMany(Course, {
      foreignKey: "instructor_id",
      as: "authoredCourses",
    });
    Course.belongsTo(User, {
      foreignKey: "instructor_id",
      as: "instructor",
    });

    Course.hasMany(Step, {
      foreignKey: "course_id",
      as: "steps",
      onDelete: "CASCADE",
    });
    Step.belongsTo(Course, {
      foreignKey: "course_id",
      as: "course",
    });

    await sequelize.sync({ alter: false });

    app.listen(Number(PORT), "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
