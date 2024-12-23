const connectToDatabase = require("../data/dbConnection");



exports.sp_FlowUpdateClient = async (user) => {
   const {
      //  user params
      id_userDPI,
      email,
      full_name,
      password,
      phone,
      birth_date,
      status_id_status,
      // client params
      source,
      reason,
      address,
   } = user;

   const rol_id_rol = 1;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_FlowUpdateClient 

            @id_userDPI = :id_userDPI,
            @email = :email,
            @full_name = :full_name,
            @password = :password,
            @phone = :phone,
            @birth_date = :birth_date,
            @status_id_status = :status_id_status,
            @rol_id_rol = :rol_id_rol,

            @source = :source,
            @reason = :reason,
            @address = :address,
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
            rol_id_rol ,
            source,
            reason,
            address,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_FlowUpdateClient:", error);
      return { success: false, message: error.message };
   }
};


exports.sp_FlowCreateClient = async (user) => {
   const {
      //  user params
      id_userDPI,
      email,
      full_name,
      password,
      phone,
      birth_date,
      status_id_status,
      // client params
      source,
      reason,
      address,
   } = user;

   const rol_id_rol = 1;

   const sequelize = await connectToDatabase();

   try {
      const query = `
         DECLARE @message NVARCHAR(MAX);
         EXEC sp_FlowCreateClient 

            @id_userDPI = :id_userDPI,
            @email = :email,
            @full_name = :full_name,
            @password = :password,
            @phone = :phone,
            @birth_date = :birth_date,
            @status_id_status = :status_id_status,
            @rol_id_rol = :rol_id_rol,

            @source = :source,
            @reason = :reason,
            @address = :address,
            @output_message = @message OUTPUT;
         SELECT @message AS output_message; 
      `;

      const [results] = await sequelize.query(query, {
         replacements: {
            id_userDPI,
            email,
            full_name,
            password,
            phone,
            birth_date,
            status_id_status,
            rol_id_rol ,
            source,
            reason,
            address,
         },
         type: sequelize.QueryTypes.SELECT,
      });

      const outputMessage = results?.output_message || "No se devolvió mensaje";
      return { success: true, message: outputMessage };
   } catch (error) {
      console.error("Err in sp_FlowCreateClient:", error);
      return { success: false, message: error.message };
   }
};
