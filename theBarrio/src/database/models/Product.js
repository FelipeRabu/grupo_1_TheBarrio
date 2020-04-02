module.exports = (sequelize, dataTypes) => {
    
    //CAMPOS QUE ME QUIERO TRAER DE LA TABLA
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

    //PARA AGREGAR EL PRECIO CON EL DESCUENTO APLICADO
    /*
    Product.prototype.getDiscountPrice = function () {
        return (this.price*(1-(this.discount/100)))
    }
    */

    // RELACIONES CON OTRAS TABLAS
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
        Product.belongsTo(models.Artists, {
            as: 'artist',
            foreignKey: 'fk_artist'
        });
        Product.belongsTo(models.Designs, {
            as: 'design',
            foreignKey: 'fk_design'
        });
    }    

    return Product; //Sequielize pone esto en minuscula, lo pluraliza y busca una tabla ocn ese nombre en la base de datos. En este caso buscaria "products"
}
