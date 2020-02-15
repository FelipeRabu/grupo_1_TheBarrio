module.exports = (sequelize, dataTypes) => {
    
    const Design = sequelize.define('Designs', {
        id_design:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: dataTypes.STRING,        
    },{tableName:'designs',})

    return Design; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}