CREATE PROCEDURE FlowCreateClient
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
       
         EXEC @return_code = InsertUser
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
        EXEC @return_code = InsertClient
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




CREATE TABLE [Order](
   id_order INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   creation_date DATETIME DEFAULT GETDATE(),
   address  NVARCHAR(255) NOT NULL,
   delivery_date DATE NOT NULL,
   total DECIMAL(18, 2) NOT NULL,
   client_id_client CHAR(13) NOT NULL,
   user_id_user CHAR(13) NOT NULL,
);
GO

CREATE TABLE Detail(
   id_detail INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   quantity INT NOT NULL,
   subtotal DECIMAL(18, 2) NOT NULL,
   product_id_product INT NOT NULL,
   order_id_order INT NOT NULL,
);
GO

CREATE PROCEDURE FlowCreateOrder
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
            INSERT INTO [Order] (address, delivery_date, 0, client_id_client, user_id_user)
            
            -- Get the ID of the inserted order
            DECLARE @OrdenID INT = SCOPE_IDENTITY();

            -- Calculate subtotals and prepare data for the Detail table
            INSERT INTO Detail (order_id_order, product_id_product, quantity, subtotal)
            SELECT 
                @OrderID, 
                d.id_order, 
                d.quantity,
                d.quantity * p.price 
            FROM 
                @details AS d
            INNER JOIN 
                Product AS p ON d.id_product = p.id_product; 

             -- Calculate the total of the order and update in the [Order] table
            DECLARE @Total DECIMAL(18, 2);
            SELECT @Total = SUM(subtotal)
            FROM DetailOrder
            WHERE order_id_order = @OrderID;

            UPDATE [Order]
            SET total = @Total
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
