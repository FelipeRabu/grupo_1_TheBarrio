module.exports = (sequelize, dataTypes) => {
    
    const Size = sequelize.define('Sizes', {
        id_size:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: dataTypes.STRING,        
    },{tableName:'sizes',})

    return Size; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}