module.exports = (sequelize, dataTypes) => {
    
    const Category = sequelize.define('Categories', {
        
        id_category:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: dataTypes.STRING,        
    },{tableName:'categories',})

    return Category; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}