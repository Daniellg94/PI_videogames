const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type: DataTypes.UUID,defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull: false
      
    },
    // guarda el objeto directamente
    platforms:{
      type: DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false
    },
    image:{
      type:DataTypes.STRING,
      allowNull: false
   },
   //muestra fecha
   released:{
    type: DataTypes.STRING,
    allowNull: false
   },
   rating:{
    type: DataTypes.FLOAT,

   }
  },{timestamps:false});
};
