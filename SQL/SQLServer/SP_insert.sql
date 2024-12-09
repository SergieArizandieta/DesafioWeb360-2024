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
            INSERT INTO [User] (id_userDPI, email, full_name, password, phone, birth_date, status_id_status, rol_id_rol)
            VALUES (@id_userDPI, @email, @full_name, @password, @phone, @birth_date, @status_id_status, @rol_id_rol);
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
            INSERT INTO [Order] (address, delivery_date, total, client_id_client, user_id_user)
            VALUES (@address, @delivery_date, @total, @client_id_client, @user_id_user);
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
