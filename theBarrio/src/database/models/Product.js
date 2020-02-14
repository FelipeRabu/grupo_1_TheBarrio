module.exports = (sequelize, dataTypes) => {
    
    const Product = sequelize.define('Products', {
        id_product:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: dataTypes.STRING,
        image: dataTypes.STRING,
        fk_category: dataTypes.INTEGER,
        fk_color: dataTypes.INTEGER,
        fk_size: dataTypes.INTEGER,
        fk_artist: dataTypes.INTEGER,
        fk_design: dataTypes.INTEGER,
        price: dataTypes.INTEGER,
        discount: dataTypes.INTEGER,
    },{tableName:'products',})

    Product.associate = (models) => {
        Product.belongsTo(models.Colors, {
            as: 'color',
            foreignKey: 'fk_color'
        });
        Product.belongsTo(models.Categories, {
            as: 'category',
            foreignKey: 'fk_category'
        });
        Product.belongsTo(models.Sizes, {
            as: 'size',
            foreignKey: 'fk_size'
        });
    }

    return Product; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}





// TEST
/*
module.exports = (sequelize, dataTypes) => {
    
    const Product = sequelize.define('Products', {
        id_product:  {
            type: dataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: dataTypes.STRING,
        image: dataTypes.STRING,
        category: dataTypes.STRING,
        color: dataTypes.STRING,
        size: dataTypes.STRING,
        artist: dataTypes.STRING,
        design: dataTypes.STRING,
        price: dataTypes.INTEGER,
        discount: dataTypes.INTEGER,
    },{tableName:'products_test',}) //CAMBIAR EL NOMBRE DE LA TABLA CUANDO USAEMOS LA CORRECTA

    return Product; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}
*/