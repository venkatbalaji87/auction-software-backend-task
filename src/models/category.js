const Sequelize = require("sequelize");
const ClassDB = require("../config/Db");


const Category = ClassDB.define("Category", {
  c_id:  {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  category_name: {
    type: Sequelize.STRING,
    field: "category_name",
    allowNull: false
  },
})

const CategoryData = [{
  c_id: "11",
  category_name: "1st Category"
},
{
  c_id: "12",
  category_name: "2nd Category"
},
{
  c_id: "13",
  category_name: "3rd Category"
},
{
  c_id: "14",
  category_name: "4th Category"
},
{
  c_id: "15",
  category_name: "5th Category"
}];

//const categorySeed = () => {
  Category
  .sync({ force: true })
  .then(() => {
    return Category.bulkCreate(CategoryData, { returning: true });
  })
  .then(result => {
    console.log(result.forEach(item => console.log(item.get())));
  })
  .catch(console.error);
//}

module.exports = Category;