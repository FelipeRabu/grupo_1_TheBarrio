module.exports = (sequelize, dataTypes) => {
    
    const Artist = sequelize.define('Artists', {
        id_artist:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        first_name: dataTypes.STRING, 
        last_name: dataTypes.STRING, 
    },{tableName:'artists',})

    return Artist; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}
