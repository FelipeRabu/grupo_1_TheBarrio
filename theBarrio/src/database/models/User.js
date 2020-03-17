module.exports = (sequelize, dataTypes) => {
    
    const User = sequelize.define('Users', {
        id_user:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        first_name: dataTypes.STRING,   
        last_name: dataTypes.STRING,
        email: dataTypes.STRING,
        password: dataTypes.STRING,
        avatar: dataTypes.STRING,     
    },{tableName:'users',})

    return User; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}