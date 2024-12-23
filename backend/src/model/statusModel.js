const connectToDatabase = require("../data/dbConnection");
const { models } = require("../types/statusTypes");

exports.getStatus = async (query) => {
   try {
      const sequelize = await connectToDatabase();

      const where = query.filterValue
         ? {
              [query.filterBy]: {
                 [sequelize.Op.like]: `%${query.filterValue}%`,
              },
           }
         : {};

      const status = await models.Status.findAndCountAll({
         where,
         raw: true,
         order: [[query.sortBy, query.sortOrder.toUpperCase()]],
      });

      return status;
   } catch (error) {
      console.error("Error en getStatus:", error);
      throw new Error(`Error al obtener los productos`);
   }
};

exports.sp_UpdateStatus = async (status) => {
   const {
      id_status,
      name,
   } = status;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_UpdateStatus 
            @id_status = :id_status, 
            @name = :name, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_status,
            name,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_UpdateStatus:", error);
      return { success: false, message: error.message };
   }
};



exports.sp_InsertStatus = async (status) => {
   const {
      name,
   } = status;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_InsertStatus 
            @name = :name, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            name,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_InsertStatus:", error);
      return { success: false, message: error.message };
   }
};
