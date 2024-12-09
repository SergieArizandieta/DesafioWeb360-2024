-- ////////////////////////////////////////////////////////////// CREATE DATA //////////////////////////////////////////////////////////////

-- CREATE ROLES ----------------------------------------------------------------
DECLARE @message NVARCHAR(MAX);

-- Crear rol de cliente
EXEC sp_InsertRol 
    @name = 'Cliente',
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Crear rol de operador
EXEC sp_InsertRol 
    @name = 'Operador',
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Mostrar todos los registros de la tabla Rol
SELECT * FROM Rol;

-- CREATE ROLES ----------------------------------------------------------------

-- DECLARE @message NVARCHAR(MAX);

-- Insertar estado Activo
EXEC sp_InsertStatus 
    @name = 'Activo',
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Insertar estado Inactivo
EXEC sp_InsertStatus 
    @name = 'Inactivo',
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Insertar estado Pendiente
EXEC sp_InsertStatus 
    @name = 'Pendiente',
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Mostrar todos los registros de la tabla Status
SELECT * FROM Status;

-- CREATE CATEGORIES ----------------------------------------------------------------

-- DECLARE @message NVARCHAR(MAX);

-- Insertar categoría Cereales
EXEC sp_InsertCategory 
    @name = 'Cereales',
    @status_id_status = 1,
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Insertar categoría Limpieza
EXEC sp_InsertCategory 
    @name = 'Limpieza',
    @status_id_status = 1,
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Insertar categoría Artículos para el hogar
EXEC sp_InsertCategory 
    @name = 'Artículos para el hogar',
    @status_id_status = 1,
    @output_message = @message OUTPUT;

-- Imprimir el mensaje de salida
PRINT @message;

-- Mostrar todos los registros de la tabla Category
SELECT * FROM Category;

-- CREATE PRODUCTS ----------------------------------------------------------------

-- DECLARE @message NVARCHAR(MAX);

-- Insertar productos para la categoría Cereales (category_id_category = 1)
EXEC sp_InsertProduct @name = 'Corn Flakes', @brand = 'Kelloggs', @code = 'CFL123', @stock = 50, @price = 3.50, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 1, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Choco Krispis', @brand = 'Kelloggs', @code = 'CHK456', @stock = 40, @price = 4.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 1, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Zucaritas', @brand = 'Kelloggs', @code = 'ZUC789', @stock = 30, @price = 4.20, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 1, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Granola', @brand = 'Nature Valley', @code = 'GRN101', @stock = 25, @price = 5.50, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 1, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Avena Quaker', @brand = 'Quaker', @code = 'AVN202', @stock = 60, @price = 2.80, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 1, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

-- Insertar productos para la categoría Limpieza (category_id_category = 2)
EXEC sp_InsertProduct @name = 'Detergente Líquido', @brand = 'Ariel', @code = 'DLQ303', @stock = 100, @price = 7.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Suavizante', @brand = 'Downy', @code = 'SWZ404', @stock = 80, @price = 5.50, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Cloro', @brand = 'Cloralex', @code = 'CLR505', @stock = 150, @price = 3.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Desinfectante', @brand = 'Lysol', @code = 'DSF606', @stock = 90, @price = 6.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Escoba', @brand = 'Vileda', @code = 'ECB707', @stock = 70, @price = 4.50, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

-- Insertar productos para la categoría Artículos para el hogar (category_id_category = 3)
EXEC sp_InsertProduct @name = 'Juego de Sábanas', @brand = 'SleepWell', @code = 'JDS808', @stock = 20, @price = 15.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Toallas de Baño', @brand = 'SoftTouch', @code = 'TDB909', @stock = 35, @price = 12.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Cortina de Ducha', @brand = 'Haven', @code = 'CDD010', @stock = 15, @price = 10.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Almohadas', @brand = 'DreamSoft', @code = 'ALM111', @stock = 25, @price = 8.50, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Cubo de Basura', @brand = 'CleanLife', @code = 'CDB212', @stock = 50, @price = 6.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

-- Repetir productos en diferentes categorías
EXEC sp_InsertProduct @name = 'Cereal Integral', @brand = 'Kelloggs', @code = 'CIN313', @stock = 40, @price = 5.20, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 1, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Detergente en Polvo', @brand = 'Ariel', @code = 'DPW414', @stock = 110, @price = 6.50, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Cortina Opaca', @brand = 'Haven', @code = 'CRO515', @stock = 10, @price = 20.00, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Toallas de Cocina', @brand = 'CleanLife', @code = 'TCK616', @stock = 60, @price = 4.80, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 3, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

EXEC sp_InsertProduct @name = 'Escobilla', @brand = 'Vileda', @code = 'ESC717', @stock = 30, @price = 3.20, 
    @picture = 0x89504E470D0A1A0A, @category_id_category = 2, @status_id_status = 1, @output_message = @message OUTPUT;
PRINT @message;

-- Mostrar todos los productos
SELECT * FROM Product;


-- CREATE USERS ----------------------------------------------------------------

-- DECLARE @message NVARCHAR(MAX);

-- Insertar Usuario 1
EXEC sp_InsertUser 
    @id_userDPI = '1000523830100',
    @email = 'sergie1@gmail.com',
    @full_name = 'Sergio Pérez',
    @password = 'password123',
    @phone = '55512345',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 2,
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Usuario 2
EXEC sp_InsertUser 
    @id_userDPI = '1000523830101',
    @email = 'sergie2@gmail.com',
    @full_name = 'Carlos Hernández',
    @password = 'password123',
    @phone = '55567890',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 2,
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Usuario 3
EXEC sp_InsertUser 
    @id_userDPI = '1000523830102',
    @email = 'sergie3@gmail.com',
    @full_name = 'Ana García',
    @password = 'password123',
    @phone = '55598765',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 2,
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Usuario 4
EXEC sp_InsertUser 
    @id_userDPI = '1000523830103',
    @email = 'sergie4@gmail.com',
    @full_name = 'Lucía Gómez',
    @password = 'password123',
    @phone = '55565432',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 2,
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Usuario 5
EXEC sp_InsertUser 
    @id_userDPI = '1000523830104',
    @email = 'sergie5@gmail.com',
    @full_name = 'Miguel Torres',
    @password = 'password123',
    @phone = '55532100',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 2,
    @output_message = @message OUTPUT;
PRINT @message;

-- Mostrar todos los usuarios
SELECT * FROM [User];

-- CREATE CLIENTS ----------------------------------------------------------------

-- DECLARE @message NVARCHAR(MAX);

-- Insertar Cliente 1
EXEC sp_FlowCreateClient 
    @id_userDPI = '2000523830100',
    @email = 'daniel1@gmail.com',
    @full_name = 'Daniel López',
    @password = 'password123',
    @phone = '12345678',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 1,
    @source = 'Publicidad Online',
    @reason = 'Compra de productos para el hogar',
    @address = 'Calle 1, Zona 2, Ciudad',
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Cliente 2
EXEC sp_FlowCreateClient 
    @id_userDPI = '2000523830101',
    @email = 'daniel2@gmail.com',
    @full_name = 'Ana Torres',
    @password = 'password123',
    @phone = '87654321',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 1,
    @source = 'Recomendación de un amigo',
    @reason = 'Interés en productos exclusivos',
    @address = 'Avenida Central, Zona 5, Ciudad',
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Cliente 3
EXEC sp_FlowCreateClient 
    @id_userDPI = '2000523830102',
    @email = 'daniel3@gmail.com',
    @full_name = 'Carlos Martínez',
    @password = 'password123',
    @phone = '55667788',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 1,
    @source = 'Evento presencial',
    @reason = 'Interesado en descuentos',
    @address = 'Boulevard Vista Hermosa, Zona 10, Ciudad',
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Cliente 4
EXEC sp_FlowCreateClient 
    @id_userDPI = '2000523830103',
    @email = 'daniel4@gmail.com',
    @full_name = 'Lucía Gómez',
    @password = 'password123',
    @phone = '66778899',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 1,
    @source = 'Redes sociales',
    @reason = 'Conocer promociones en productos',
    @address = 'Colonia Las Flores, Zona 11, Ciudad',
    @output_message = @message OUTPUT;
PRINT @message;

-- Insertar Cliente 5
EXEC sp_FlowCreateClient 
    @id_userDPI = '2000523830104',
    @email = 'daniel5@gmail.com',
    @full_name = 'María Fernández',
    @password = 'password123',
    @phone = '77889900',
    @birth_date = '2002-05-22',
    @status_id_status = 1,
    @rol_id_rol = 1,
    @source = 'Visita a tienda física',
    @reason = 'Solicitar productos personalizados',
    @address = 'Residenciales El Encinal, Zona 16, Ciudad',
    @output_message = @message OUTPUT;
PRINT @message;

-- Mostrar todos los usuarios y clientes relacionados
SELECT * FROM [User];
SELECT * FROM Client;

-- CREATE ORDERS ----------------------------------------------------------------

DECLARE @OrderDetails DetailOrderType;
DECLARE @OutputMessage NVARCHAR(MAX);
DECLARE @DeliveryDate DATETIME;
SET @DeliveryDate = DATEADD(DAY, 7, GETDATE());


-- Insertar detalles en el tipo de tabla
INSERT INTO @OrderDetails (id_product, quantity)
VALUES 
    (1, 3),
    (6, 2),
    (7, 1),
    (15, 1),
    (16, 1),
    (17, 1),
    (20, 2);

-- Crear la orden
EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830100',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830101',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830101',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830101',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830101',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830104',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830104',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830103',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830103',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;

EXEC sp_FlowCreateOrder 
    @address = 'Avenida Siempre Viva 123, Ciudad',
    @delivery_date = @DeliveryDate, -- Fecha de entrega dentro de 7 días
    @client_id_client = '2000523830103',
    @user_id_user = '1000523830100',
    @details = @OrderDetails,
    @output_message = @OutputMessage OUTPUT;
-- Imprimir el mensaje de salida
PRINT @OutputMessage;

-- Mostrar la orden creada
SELECT * FROM [Order];

-- Mostrar los detalles de la orden creada
SELECT * FROM Detail WHERE order_id_order = (
  SELECT id_order
	FROM [Order]
	ORDER BY id_order DESC
	OFFSET 2 ROW FETCH NEXT 1 ROW ONLY
);
