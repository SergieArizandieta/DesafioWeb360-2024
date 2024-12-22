const connectToDatabase = require("../data/dbConnection");
const { models } = require("../types/productType");

exports.getProducts = async (query) => {
   try {
      const sequelize = await connectToDatabase();

      const offset = (query.page - 1) * query.limit;
      const where = query.filterValue
         ? {
              [query.filterBy]: {
                 [sequelize.Op.like]: `%${query.filterValue}%`,
              },
           }
         : {};

      const products = await models.Product.findAndCountAll({
         where,
         raw: true,
         order: [[query.sortBy, query.sortOrder.toUpperCase()]],
         limit: parseInt(query.limit),
         offset: parseInt(offset),
      });

      return products;
   } catch (error) {
      console.error("Error en getProducts:", error);
      throw new Error(`Error al obtener los productos`);
   }
};

exports.sp_UpdateProduct = async (product) => {
   const {
      id_product,
      name,
      brand,
      code,
      stock,
      price,
      picture,
      category_id_category,
      status_id_status,
   } = product;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_UpdateProduct 
            @id_product = :id_product,
            @name = :name, 
            @brand = :brand, 
            @code = :code, 
            @stock = :stock, 
            @price = :price, 
            @picture = :picture, 
            @category_id_category = :category_id_category, 
            @status_id_status = :status_id_status, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_product,
            name,
            brand,
            code,
            stock,
            price,
            picture,
            category_id_category,
            status_id_status,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_UpdateProduct:", error);
      return { success: false, message: error.message };
   }
};

exports.sp_InsertProduct = async (product) => {
   const {
      name,
      brand,
      code,
      stock,
      price,
      picture,
      category_id_category,
      status_id_status,
   } = product;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_InsertProduct 
            @name = :name, 
            @brand = :brand, 
            @code = :code, 
            @stock = :stock, 
            @price = :price, 
            @picture = :picture, 
            @category_id_category = :category_id_category, 
            @status_id_status = :status_id_status, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            name,
            brand,
            code,
            stock,
            price,
            picture,
            category_id_category,
            status_id_status,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_InsertProduct:", error);
      return { success: false, message: error.message };
   }
};
