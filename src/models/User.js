const Sequelize = require("sequelize");
const ClassDB = require("../config/Db");
const { generateHashSync } = require("../services/hashingService");


const User = ClassDB.define("Users", {
  user_id:  {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  user_name: {
    type: Sequelize.STRING,
    field: "user_name",
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  setterMethods: {
    password(plainTextPassword) {
      this.setDataValue(
        "password", 
        generateHashSync(plainTextPassword)
      );
    },
  }
})

const UserData = [{
  user_id: "1",
  user_name: "Praveen",
  password : "password"
},{
  user_id: "2",
  user_name: "naveen",
  password : "password"
},
{
  user_id: "3",
  user_name: "dinesh",
  password : "password"
},{
  user_id: "4",
  user_name: "rajesh",
  password : "password"
},{
  user_id: "5",
  user_name: "suresh",
  password : "password"
}];

//const userFeed = () => {
  User
  .sync({ force: true })
  .then(() => {
    return User.bulkCreate(UserData, { returning: true });
  })
  .then(result => {
    console.log(result.forEach(item => console.log(item.get())));
  })
  .catch(console.error);
//}

module.exports = User;