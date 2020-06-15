const Sequelize = require("sequelize");
const ClassDB = require("../config/Db");
//const User = require("./User");
//const Category = require("./category");

const Projects = ClassDB.define("Projects", {
  project_id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  project_title: {
    type: Sequelize.STRING,
    field: "project_title",
    allowNull: false
  },
  user_id: {
    type: Sequelize.INTEGER
  },
  c_id: {
    type: Sequelize.INTEGER
  }
});

//Projects.hasOne(User, { foreignKey: "user_id" ,foreignKeyConstraint: true  });
//Projects.belongsTo(Category, { foreignKey: "c_id" ,foreignKeyConstraint: true  });

const projectData = [
  {
    project_id: 1000,
    project_title: "WebApp",
    user_id: 1,
    c_id: 11
  },
  {
    project_id: 2000,
    project_title: "MobileApp",
    user_id: 2,
    c_id: 12
  },
  {
    project_id: 3000,
    project_title: "InteractiveApp",
    user_id: 3,
    c_id: 13
  },
  {
    project_id: 4000,
    project_title: "UserfriendlyApp",
    user_id: 4,
    c_id: 14
  },
  {
    project_id: 5000,
    project_title: "mindblowingApp",
    user_id: 5,
    c_id: 15
  }
];

//const projectSeed = () => {
Projects.sync({ force: true })
  .then(() => {
    return Projects.bulkCreate(projectData, { returning: true });
  })
  .then(result => {
    console.log(result.forEach(item => console.log(item.get())));
  })
  .catch(console.error);
//}

module.exports = Projects;
