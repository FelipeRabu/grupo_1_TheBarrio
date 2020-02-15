module.exports = (sequelize, dataTypes) => {
    
    const Color = sequelize.define('Colors', {
        id_color:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: dataTypes.STRING,        
    },{tableName:'colors',})

    return Color; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}