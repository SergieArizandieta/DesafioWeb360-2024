-- ////////////////////////////////////////////////////////////// CREATE DB //////////////////////////////////////////////////////////////

CREATE DATABASE GDA00207_OT_SergieArizandieta;
GO

USE GDA00207_OT_SergieArizandieta;
GO

-- ////////////////////////////////////////////////////////////// CREATE TABLES //////////////////////////////////////////////////////////////

CREATE TABLE Rol (
   id_rol INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name  NVARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE Status (
   id_status INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name  NVARCHAR(50) NOT NULL UNIQUE
);
GO

CREATE TABLE Category(
   id_category INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name  NVARCHAR(50) NOT NULL UNIQUE,
   creation_date DATETIME DEFAULT GETDATE(),
   status_id_status INT NOT NULL,
);
GO

-- add the FK: Category - Status relationship
ALTER TABLE Category 
ADD CONSTRAINT FK_Category_Status 
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);
GO

CREATE TABLE [User](
   id_userDPI CHAR(13) NOT NULL PRIMARY KEY,
   email  NVARCHAR(256) NOT NULL UNIQUE,
   refresh_token NVARCHAR(255) NOT NULL,
   full_name  NVARCHAR(100) NOT NULL,
   password  NVARCHAR(255) NOT NULL,
   phone CHAR(8) NOT NULL UNIQUE,
   birth_date DATE NOT NULL,
   creation_date DATETIME DEFAULT GETDATE(),
   status_id_status INT NOT NULL,
   rol_id_rol INT NOT NULL,
);
GO

-- add phone format check constraint
ALTER TABLE [User]
ADD CONSTRAINT chk_phone_format CHECK (phone LIKE '[1-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]');
GO

-- add unique constraint for email
ALTER TABLE [User]
ADD CONSTRAINT uq_user_email UNIQUE (email);
GO

-- add check constraint for birth date to be at least 18 years ago
ALTER TABLE [User]
ADD CONSTRAINT chk_birth_date_18_years
CHECK (DATEDIFF(YEAR, birth_date, GETDATE()) >= 18);
GO

-- add chech constraint for birth date dont be in the future
ALTER TABLE [User]
ADD CONSTRAINT chk_birth_date_not_future
CHECK (birth_date <= GETDATE());
GO

-- add FK: User - User and Status relationships
ALTER TABLE [User]
ADD CONSTRAINT FK_User_Status
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);
GO

-- add FK: User - Rol relationship
ALTER TABLE [User]
ADD CONSTRAINT FK_User_Rol
FOREIGN KEY (rol_id_rol) REFERENCES Rol(id_rol);
GO

CREATE TABLE Client(
   id_clientDPI CHAR(13) NOT NULL PRIMARY KEY,
   id_client INT IDENTITY(1,1) NOT NULL UNIQUE,
   source  NVARCHAR(50) NOT NULL,
   reason  NVARCHAR(255) NOT NULL,
   address  NVARCHAR(255) NOT NULL,
);
GO

-- add FK: Client - User relationship
ALTER TABLE Client
ADD CONSTRAINT FK_Client_User
FOREIGN KEY (id_clientDPI) REFERENCES [User](id_userDPI);
GO

CREATE TABLE Product(
   id_product INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name  NVARCHAR(50) NOT NULL,
   brand  NVARCHAR(50) NOT NULL,
   code  NVARCHAR(50) NOT NULL UNIQUE,
   stock INT NOT NULL,
   price DECIMAL(18, 2) NOT NULL,
   creation_date DATETIME DEFAULT GETDATE(),
   picture VARBINARY(MAX) NOT NULL,
   category_id_category INT NOT NULL,
   status_id_status INT NOT NULL,
);
GO

-- add check constraint for price and stock to be non-negative
ALTER TABLE Product
ADD CONSTRAINT chk_price_and_stock_non_negative
CHECK (price >= 0 AND stock >= 0);
GO

-- add FK: Product - Category and Status relationships
ALTER TABLE Product
ADD CONSTRAINT FK_Product_Category
FOREIGN KEY (category_id_category) REFERENCES Category(id_category);
GO

-- add FK: Product - Status relationship
ALTER TABLE Product
ADD CONSTRAINT FK_Product_Status
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);
GO

CREATE TABLE [Order](
   id_order INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   creation_date DATETIME DEFAULT GETDATE(),
   address  NVARCHAR(255) NOT NULL,
   delivery_date DATE NOT NULL,
   total DECIMAL(18, 2) NOT NULL,
   client_id_client CHAR(13) NOT NULL,
   status_id_status INT NOT NULL,
   user_id_user CHAR(13) NOT NULL,
);
GO

-- add check constraints for total being non-negative
ALTER TABLE [Order]
ADD CONSTRAINT chk_total_non_negative
CHECK (total >= 0);
GO

-- add check constraint for delivery date to be after creation date
ALTER TABLE [Order]
ADD CONSTRAINT chk_delivery_date_valid 
CHECK (delivery_date >= CAST(creation_date AS DATE));
GO

-- add FK: Order - Client and User relationships
ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_Client
FOREIGN KEY (client_id_client) REFERENCES Client(id_clientDPI);
GO

-- add FK: Order - User relationship
ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_User
FOREIGN KEY (user_id_user) REFERENCES [User](id_userDPI);
GO

-- add FK: Order - Status relationship
ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_Status
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);
GO

CREATE TABLE Detail(
   id_detail INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   quantity INT NOT NULL,
   subtotal DECIMAL(18, 2) NOT NULL,
   product_id_product INT NOT NULL,
   order_id_order INT NOT NULL,
);
GO

-- add check constraints for quantity and subtotal being non-negative
ALTER TABLE Detail
ADD CONSTRAINT chk_quantity_and_subtotal_non_negative
CHECK (quantity > 0 and subtotal >= 0);
GO

-- add FK: Detail - Product and Order relationships
ALTER TABLE Detail
ADD CONSTRAINT FK_Detail_Product
FOREIGN KEY (product_id_product) REFERENCES Product(id_product);
GO

-- add FK: Detail - Order relationship
ALTER TABLE Detail
ADD CONSTRAINT FK_Detail_Order
FOREIGN KEY (order_id_order) REFERENCES [Order](id_order);
GO

-- EXEC sp_helpindex 'Rol';

-- ////////////////////////////////////////////////////////////// Get PROCEDURES //////////////////////////////////////////////////////////////

CREATE PROCEDURE sp_GetOrdersByClient
    @client_id_client CHAR(13)
AS
BEGIN
    SELECT 
        o.id_order,
        o.creation_date,
        o.address,
        o.delivery_date,
        o.total,
        o.client_id_client,
        o.status_id_status,
        s.name AS status_name,
        o.user_id_user
    FROM [Order] o
    INNER JOIN Status s ON o.status_id_status = s.id_status
    WHERE o.client_id_client = @client_id_client;
END;
GO

CREATE PROCEDURE sp_GetProductsByOrder
    @id_order INT,
    @client_id_client CHAR(13)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        P.id_product,
        P.name,
        P.brand,
        P.code,
        P.stock,
        P.price,
        P.creation_date,
        P.picture,
        P.category_id_category,
        P.status_id_status
    FROM 
        Product P
    INNER JOIN 
        Detail D ON P.id_product = D.product_id_product
    WHERE 
        D.order_id_order = @id_order AND @client_id_client = (SELECT client_id_client FROM [Order] WHERE id_order = @id_order);
END;
GO


-- ////////////////////////////////////////////////////////////// SP Simple Inserts  //////////////////////////////////////////////////////////////

CREATE PROCEDURE sp_InsertRol
        @name NVARCHAR(50),
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO Rol (name) VALUES (@name);
            SET @output_message = 'Inserción realizada exitosamente en Rol.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertStatus
        @name NVARCHAR(50),
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO Status (name) VALUES (@name);
            SET @output_message = 'Inserción realizada exitosamente en Status.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertCategory
        @name NVARCHAR(50),
        @status_id_status INT,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO Category (name, status_id_status) VALUES (@name, @status_id_status);
            SET @output_message = 'Inserción realizada exitosamente en Category.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertProduct
        @name NVARCHAR(50),
        @brand NVARCHAR(50),
        @code NVARCHAR(50),
        @stock INT,
        @price DECIMAL(18, 2),
        @picture VARBINARY(MAX),
        @category_id_category INT,
        @status_id_status INT,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO Product (name, brand, code, stock, price, picture, category_id_category, status_id_status)
            VALUES (@name, @brand, @code, @stock, @price, @picture, @category_id_category, @status_id_status);
            SET @output_message = 'Inserción realizada exitosamente en Product.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertUser
        @id_userDPI CHAR(13),
        @email NVARCHAR(256),
        @full_name NVARCHAR(100),
        @password NVARCHAR(255),
        @phone CHAR(8),
        @birth_date DATE,
        @status_id_status INT,
        @rol_id_rol INT,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO [User] (id_userDPI, email, refresh_token, full_name, password, phone, birth_date, status_id_status, rol_id_rol)
            VALUES (@id_userDPI, @email, '', @full_name, @password, @phone, @birth_date, @status_id_status, @rol_id_rol);
            SET @output_message = 'Inserción realizada exitosamente en User.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertClient
        @id_clientDPI CHAR(13),
        @source NVARCHAR(50),
        @reason NVARCHAR(255),
        @address NVARCHAR(255),
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO Client (id_clientDPI, source, reason, address)
            VALUES (@id_clientDPI, @source, @reason, @address);
            SET @output_message = 'Inserción realizada exitosamente en Client.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertOrder
        @address NVARCHAR(255),
        @delivery_date DATE,
        @total DECIMAL(18, 2),
        @client_id_client CHAR(13),
        @user_id_user CHAR(13),
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO [Order] (address, delivery_date, total, client_id_client, user_id_user, status_id_status)
            VALUES (@address, @delivery_date, @total, @client_id_client, @user_id_user, 3);
            SET @output_message = 'Inserción realizada exitosamente en Order.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE PROCEDURE sp_InsertDetail
        @quantity INT,
        @subtotal DECIMAL(18, 2),
        @product_id_product INT,
        @order_id_order INT,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRY
            INSERT INTO Detail (quantity, subtotal, product_id_product, order_id_order)
            VALUES (@quantity, @subtotal, @product_id_product, @order_id_order);
            SET @output_message = 'Inserción realizada exitosamente en Detail.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO

-- ////////////////////////////////////////////////////////////// SP update  //////////////////////////////////////////////////////////////

CREATE PROCEDURE sp_UpdateRol
        @id_rol INT,
        @name NVARCHAR(50) = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @name IS NOT NULL
            BEGIN
                UPDATE Rol
                SET 
                    name = ISNULL(@name, name)
                WHERE id_rol = @id_rol;
                SET @output_message = 'Actualización realizada exitosamente en Rol.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Rol.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateStatus
        @id_status INT,
        @name NVARCHAR(50) = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @name IS NOT NULL
            BEGIN
                UPDATE Status
                SET 
                    name = ISNULL(@name, name)
                WHERE id_status = @id_status;
                SET @output_message = 'Actualización realizada exitosamente en Status.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Status.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateCategory
        @id_category INT,
        @name NVARCHAR(50) = NULL,
        @creation_date DATETIME = NULL,
        @status_id_status INT = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @name IS NOT NULL OR @creation_date IS NOT NULL OR @status_id_status IS NOT NULL
            BEGIN
                UPDATE Category
                SET 
                    name = ISNULL(@name, name),
                    creation_date = ISNULL(@creation_date, creation_date),
                    status_id_status = ISNULL(@status_id_status, status_id_status)
                WHERE id_category = @id_category;
                SET @output_message = 'Actualización realizada exitosamente en Category.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Category.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateUser
        @id_userDPI CHAR(13),
        @email NVARCHAR(256) = NULL,
        @full_name NVARCHAR(100) = NULL,
        @password NVARCHAR(255) = NULL,
        @phone CHAR(8) = NULL,
        @birth_date DATE = NULL,
        @status_id_status INT = NULL,
        @rol_id_rol INT = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @email IS NOT NULL OR @full_name IS NOT NULL OR @password IS NOT NULL OR @phone IS NOT NULL OR @birth_date IS NOT NULL OR @status_id_status IS NOT NULL OR @rol_id_rol IS NOT NULL
            BEGIN
                UPDATE [User]
                SET 
                    email = ISNULL(@email, email),
                    full_name = ISNULL(@full_name, full_name),
                    password = ISNULL(@password, password),
                    phone = ISNULL(@phone, phone),
                    birth_date = ISNULL(@birth_date, birth_date),
                    status_id_status = ISNULL(@status_id_status, status_id_status),
                    rol_id_rol = ISNULL(@rol_id_rol, rol_id_rol)
                WHERE id_userDPI = @id_userDPI;
                SET @output_message = 'Actualización realizada exitosamente en User.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en User.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateClient
        @id_clientDPI CHAR(13),
        @source NVARCHAR(50) = NULL,
        @reason NVARCHAR(255) = NULL,
        @address NVARCHAR(255) = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @source IS NOT NULL OR @reason IS NOT NULL OR @address IS NOT NULL
            BEGIN
                UPDATE Client
                SET 
                    source = ISNULL(@source, source),
                    reason = ISNULL(@reason, reason),
                    address = ISNULL(@address, address)
                WHERE id_clientDPI = @id_clientDPI;
                SET @output_message = 'Actualización realizada exitosamente en Client.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Client.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateProduct
        @id_product INT,
        @name NVARCHAR(50) = NULL,
        @brand NVARCHAR(50) = NULL,
        @code NVARCHAR(50) = NULL,
        @stock INT = NULL,
        @price DECIMAL(18, 2) = NULL,
        @creation_date DATETIME = NULL,
        @picture VARBINARY(MAX) = NULL,
        @category_id_category INT = NULL,
        @status_id_status INT = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @name IS NOT NULL OR @brand IS NOT NULL OR @code IS NOT NULL OR @stock IS NOT NULL OR @price IS NOT NULL OR @creation_date IS NOT NULL OR @picture IS NOT NULL OR @category_id_category IS NOT NULL OR @status_id_status IS NOT NULL
            BEGIN
                UPDATE Product
                SET 
                    name = ISNULL(@name, name),
                    brand = ISNULL(@brand, brand),
                    code = ISNULL(@code, code),
                    stock = ISNULL(@stock, stock),
                    price = ISNULL(@price, price),
                    creation_date = ISNULL(@creation_date, creation_date),
                    picture = ISNULL(@picture, picture),
                    category_id_category = ISNULL(@category_id_category, category_id_category),
                    status_id_status = ISNULL(@status_id_status, status_id_status)
                WHERE id_product = @id_product;
                SET @output_message = 'Actualización realizada exitosamente en Product.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Product.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateOrder
        @id_order INT,
        @address NVARCHAR(255) = NULL,
        @delivery_date DATE = NULL,
        @client_id_client CHAR(13) = NULL,
        @user_id_user CHAR(13) = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @address IS NOT NULL OR @delivery_date IS NOT NULL OR @client_id_client IS NOT NULL OR @user_id_user IS NOT NULL
            BEGIN
                UPDATE [Order]
                SET 
                    address = ISNULL(@address, address),
                    delivery_date = ISNULL(@delivery_date, delivery_date),
                    client_id_client = ISNULL(@client_id_client, client_id_client),
                    user_id_user = ISNULL(@user_id_user, user_id_user)
                WHERE id_order = @id_order;
                SET @output_message = 'Actualización realizada exitosamente en Order.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Order.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO


CREATE PROCEDURE sp_UpdateDetail
        @id_detail INT,
        @quantity INT = NULL,
        @subtotal DECIMAL(18, 2) = NULL,
        @product_id_product INT = NULL,
        @order_id_order INT = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @quantity IS NOT NULL OR @subtotal IS NOT NULL OR @product_id_product IS NOT NULL OR @order_id_order IS NOT NULL
            BEGIN
                UPDATE Detail
                SET 
                    quantity = ISNULL(@quantity, quantity),
                    subtotal = ISNULL(@subtotal, subtotal),
                    product_id_product = ISNULL(@product_id_product, product_id_product),
                    order_id_order = ISNULL(@order_id_order, order_id_order)
                WHERE id_detail = @id_detail;
                SET @output_message = 'Actualización realizada exitosamente en Detail.';
                RETURN 1; -- Código de retorno indicando éxito
            END
            ELSE
            BEGIN
                SET @output_message = 'No se proporcionaron valores para actualizar en Detail.';
                RETURN 0; -- Código de retorno indicando que no se hizo la actualización
            END
        END TRY
        BEGIN CATCH
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Código de retorno indicando error
        END CATCH
END;
GO

-- ////////////////////////////////////////////////////////////// SP create flows  //////////////////////////////////////////////////////////////

CREATE PROCEDURE sp_FlowCreateClient
		-- user params
		@id_userDPI CHAR(13),
        @email NVARCHAR(256),
        @full_name NVARCHAR(100),
        @password NVARCHAR(255),
        @phone CHAR(8),
        @birth_date DATE,
        @status_id_status INT,
        @rol_id_rol INT,
		-- client params
        @source NVARCHAR(50),
        @reason NVARCHAR(255),
        @address NVARCHAR(255),
        -- output params
        @output_message NVARCHAR(MAX) OUTPUT
	AS
    BEGIN
	BEGIN TRANSACTION;
	BEGIN TRY

        DECLARE @return_code INT;
        DECLARE @inner_message NVARCHAR(MAX);

        -- Insert User
       
         EXEC @return_code = sp_InsertUser
            @id_userDPI,
            @email,
            @full_name,
            @password,
            @phone,
            @birth_date,
            @status_id_status,
            @rol_id_rol,
            @inner_message OUTPUT;

        IF @return_code <> 1
        BEGIN
            SET @output_message = 'Error al insertar usuario: ' + @inner_message;
            THROW 50001, @output_message, -2; -- Código de error y estado personalizado  
        END

        -- Insert Client
        EXEC @return_code = sp_InsertClient
            @id_userDPI,
            @source,
            @reason,
            @address,
            @inner_message OUTPUT;
        
        IF @return_code <> 1
        BEGIN
            SET @output_message = 'Error al insertar cliente: ' + @inner_message;
            THROW 50002, @output_message, -3; -- Código de error y estado personalizado  
        END

        COMMIT TRANSACTION;
        SET @output_message = 'Inserción realizada exitosamente en User y Client.';
        RETURN 1; -- Indicar éxito
            
        END TRY
        BEGIN CATCH
			IF XACT_STATE() <> 0
                ROLLBACK TRANSACTION;
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO
CREATE PROCEDURE sp_FlowUpdateClient
        -- user params
        @id_userDPI CHAR(13),
        @email NVARCHAR(256) = NULL,
        @full_name NVARCHAR(100) = NULL,
        @password NVARCHAR(255) = NULL,
        @phone CHAR(8) = NULL,
        @birth_date DATE = NULL,
        @status_id_status INT = NULL,
        @rol_id_rol INT = NULL,
        -- client params
        @source NVARCHAR(50) = NULL,
        @reason NVARCHAR(255) = NULL,
        @address NVARCHAR(255) = NULL,
        -- output params
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
    BEGIN TRANSACTION;
    BEGIN TRY

        DECLARE @return_code INT;
        DECLARE @inner_message NVARCHAR(MAX);

        -- Update User
       
         EXEC @return_code = sp_UpdateUser
            @id_userDPI,
            @email,
            @full_name,
            @password,
            @phone,
            @birth_date,
            @status_id_status,
            @rol_id_rol,
            @inner_message OUTPUT;

        IF @return_code <> 1
        BEGIN
            SET @output_message = 'Error al actualizar usuario: ' + @inner_message;
            THROW 50001, @output_message, -2; -- Código de error y estado personalizado  
        END

        -- Update Client
        EXEC @return_code = sp_UpdateClient
            @id_userDPI,
            @source,
            @reason,
            @address,
            @inner_message OUTPUT;
        
        IF @return_code <> 1
        BEGIN
            SET @output_message = 'Error al actualizar cliente: ' + @inner_message;
            THROW 50002, @output_message, -3; -- Código de error y estado personalizado  
        END

        COMMIT TRANSACTION;
        SET @output_message = 'Actualización realizada exitosamente en User y Client.';
        RETURN 1; -- Indicar éxito
            
        END TRY
        BEGIN CATCH
            IF XACT_STATE() <> 0
                ROLLBACK TRANSACTION;
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO


CREATE TYPE DetailOrderType AS TABLE (
    id_product INT NOT NULL,    
    quantity INT NOT NULL 
);
GO

CREATE FUNCTION fn_CalculateDetailSubtotals (
        @details DetailOrderType READONLY
    ) RETURNS TABLE
    AS
    RETURN 
    SELECT 
        d.id_product AS ProductID,
        d.quantity AS Quantity,
        d.quantity * p.price AS Subtotal
    FROM 
        @details AS d
    INNER JOIN 
        Product AS p ON d.id_product = p.id_product;
GO

CREATE FUNCTION fn_CalculateOrderTotal (
        @order_id INT
    ) RETURNS DECIMAL(18, 2)
    AS
    BEGIN
        DECLARE @Total DECIMAL(18, 2);
        SELECT @Total = SUM(subtotal)
        FROM Detail
        WHERE order_id_order = @order_id;

        RETURN @Total;
END;
GO

CREATE PROCEDURE sp_FlowCreateOrder
        -- order params
        @address NVARCHAR(255),
        @delivery_date DATE,
        @client_id_client CHAR(13),
        @user_id_user CHAR(13),
        -- detail params
        @details DetailOrderType READONLY,
        -- output params
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        BEGIN TRANSACTION;
        BEGIN TRY
            -- Insert the order and total 0 for now
            INSERT INTO [Order] (address, delivery_date, total, client_id_client, user_id_user, status_id_status)
			VALUES (@address, @delivery_date, 0, @client_id_client, @user_id_user, 3);
            
            -- Get the ID of the inserted order
            DECLARE @OrderID INT = SCOPE_IDENTITY();

            -- Calculate subtotals and prepare data for the Detail table
            INSERT INTO Detail (order_id_order, product_id_product, quantity, subtotal)
            SELECT 
                @OrderID, 
                ProductID, 
                Quantity, 
                Subtotal
            FROM 
                dbo.fn_CalculateDetailSubtotals(@details);

            -- Update the total in the [Order]
            UPDATE [Order]
            SET total = dbo.fn_CalculateOrderTotal(@OrderID)
            WHERE id_order = @OrderID;

            COMMIT TRANSACTION;
            SET @output_message = 'Orden creada con éxito.';
            RETURN 1; -- Indicar éxito
        END TRY
        BEGIN CATCH
            IF XACT_STATE() <> 0
                ROLLBACK TRANSACTION;
            SET @output_message = ERROR_MESSAGE();
            RETURN -1; -- Indicar error
        END CATCH
END;
GO

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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
    @password = '$argon2id$v=19$m=65536,t=3,p=2$lVCtnRzRO6/cpClaTrrDAw$9pOYySzpIR2SG5Rkps77NUqN6AU/OHqUmgJTeau1r/4',
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
GO

-- ////////////////////////////////////////////////////////////// CREATE VIEWS //////////////////////////////////////////////////////////////

--  View A ---------------------------------------------------------------
CREATE VIEW v_ProductosActivosConStock AS
SELECT 
    p.id_product,
    p.name,
    p.stock,
    p.price
FROM 
    Product p
INNER JOIN 
    Status s ON p.status_id_status = s.id_status
WHERE 
    p.stock > 0
    AND s.name = 'Activo';
GO

select * from v_ProductosActivosConStock;
GO

--  View B ---------------------------------------------------------------
CREATE VIEW v_TotalOrdenesAgosto2024 AS
SELECT 
    SUM(o.total) AS TotalQuetzales,
    COUNT(o.id_order) AS TotalOrdenes
FROM 
    [Order] o
WHERE 
    YEAR(o.creation_date) = 2024 
    AND MONTH(o.creation_date) = 8;
GO

SELECT * FROM v_TotalOrdenesAgosto2024;
GO

--  View B Modified ---------------------------------------------------------------
CREATE VIEW v_TotalOrdenesDiciembre2024 AS
SELECT 
    SUM(o.total) AS TotalQuetzales,
    COUNT(o.id_order) AS TotalOrdenes
FROM 
    [Order] o
WHERE 
    YEAR(o.creation_date) = 2024 
    AND MONTH(o.creation_date) = 12;
GO

SELECT * FROM v_TotalOrdenesDiciembre2024;
GO

--  View C ---------------------------------------------------------------
CREATE VIEW v_TopClientesMayorConsumo AS
SELECT 
    c.id_clientDPI,
    u.full_name AS Cliente,
    SUM(o.total) AS TotalConsumo
FROM 
    Client c
INNER JOIN 
    [Order] o ON c.id_clientDPI = o.client_id_client
INNER JOIN 
    [User] u ON c.id_clientDPI = u.id_userDPI
GROUP BY 
    c.id_clientDPI, u.full_name
ORDER BY 
    TotalConsumo DESC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;

GO

SELECT * FROM v_TopClientesMayorConsumo;
GO

--  View D ---------------------------------------------------------------
CREATE VIEW v_TopProductosMasVendidos AS
SELECT 
    p.id_product,
    p.name AS Producto,
    SUM(d.quantity) AS TotalVendidos
FROM 
    Product p
INNER JOIN 
    Detail d ON p.id_product = d.product_id_product
GROUP BY 
    p.id_product, p.name
ORDER BY 
    TotalVendidos ASC
OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY;

GO

SELECT * FROM v_TopProductosMasVendidos;
GO