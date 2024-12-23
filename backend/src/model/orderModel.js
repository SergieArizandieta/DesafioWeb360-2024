const connectToDatabase = require("../data/dbConnection");
const { models } = require("../types/orderTypes");


exports.getOrders = async (query) => {
   
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

         console.log("models",models)
      const categories = await models.Order.findAndCountAll({
         where,
         raw: true,
         order: [[query.sortBy, query.sortOrder.toUpperCase()]],
         limit: parseInt(query.limit),
         offset: parseInt(offset),
      });

      return categories;
   } catch (error) {
      console.error("Error en getOrders:", error);
      throw new Error(`Error al obtener las ordenes`);
   }
};

exports.sp_UpdateOrder = async (order) => {
   const {
      id_order,
      address,
      delivery_date,
      client_id_client,
      user_id_user,
   } = order;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_UpdateOrder 
            @id_order = :id_order,
            @address = :address, 
            @delivery_date = :delivery_date, 
            @client_id_client = :client_id_client, 
            @user_id_user = :user_id_user, 
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_order,
            address,
            delivery_date,
            client_id_client,
            user_id_user,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_UpdateOrder:", error);
      return { success: false, message: error.message };
   }
};


exports.sp_FlowCreateOrder = async (order) => {
   const {
      address,
      delivery_date,
      client_id_client,
      user_id_user,
      details,
   } = order;

   const sequelize = await connectToDatabase();

   const valuesOrderDetails = details
   .map(detail => `(${detail.id_product}, ${detail.quantity})`)
   .join(',\n');

   try {

      const query = `
          DECLARE @OrderDetails DetailOrderType;

          -- Insertar detalles en el tipo de tabla
          INSERT INTO @OrderDetails (id_product, quantity)
          VALUES ${valuesOrderDetails};

          -- Ejecutar el procedimiento almacenado
          DECLARE @output_message NVARCHAR(MAX);
          EXEC sp_FlowCreateOrder 
              @address = :address,
              @delivery_date = :delivery_date,
              @client_id_client = :client_id_client,
              @user_id_user = :user_id_user,
              @details = @OrderDetails,
              @output_message = @output_message OUTPUT;

          SELECT @output_message AS output_message;
      `;

       const [results] = await sequelize.query(query, {
         replacements: {
            address,
            delivery_date,
            client_id_client,
            user_id_user,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_FlowCreateOrder:", error);
      return { success: false, message: error.message };
   }
};

