const connectToDatabase = require("../data/dbConnection");
const { models } = require("../types/categoryTypes");

exports.getCategories = async (query) => {
   try {
      const sequelize = await connectToDatabase();

      const where = query.filterValue
         ? {
              [query.filterBy]: {
                 [sequelize.Op.like]: `%${query.filterValue}%`,
              },
           }
         : {};

      const categories = await models.Category.findAndCountAll({
         where,
         raw: true,
         order: [[query.sortBy, query.sortOrder.toUpperCase()]],
      });

      return categories;
   } catch (error) {
      console.error("Error en getCategories:", error);
      throw new Error(`Error al obtener los productos`);
   }
};

exports.sp_UpdateCategory = async (category) => {
   const {
      id_category,
      name,
      status_id_status,
   } = category;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_UpdateCategory 
            @id_category = :id_category,
            @name = :name, 
            @status_id_status = :status_id_status, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_category,
            name,
            status_id_status,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_UpdateCategory:", error);
      return { success: false, message: error.message };
   }
};

exports.sp_InsertCategory = async (category) => {
   const {
      name,
      status_id_status,
   } = category;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_InsertCategory 
            @name = :name, 
            @status_id_status = :status_id_status, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            name,
            status_id_status,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_InsertCategory:", error);
      return { success: false, message: error.message };
   }
};
