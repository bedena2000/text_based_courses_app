import { sequelize } from "./config/database";
import app from "./app";
import { initUserModel, User } from "./models/User";
import { Course, initCourseModel } from "./models/Course";
import { Step, initStepModel } from "./models/Step";
import { DB_CONFIG } from "./config/env";

const PORT = 4000;

async function startServer() {
  try {
    await sequelize.authenticate();

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

  
    await sequelize.sync({ force: true });

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

startServer();
