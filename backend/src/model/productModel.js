const connectToDatabase = require('../data/dbConnection');

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
      console.error("Error ejecutando sp_InsertProduct:", error);
      return { success: false, message: error.message };
   }
};
