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
        @creation_date DATETIME = NULL,
        @status_id_status INT = NULL,
        @rol_id_rol INT = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @email IS NOT NULL OR @full_name IS NOT NULL OR @password IS NOT NULL OR @phone IS NOT NULL OR @birth_date IS NOT NULL OR @creation_date IS NOT NULL OR @status_id_status IS NOT NULL OR @rol_id_rol IS NOT NULL
            BEGIN
                UPDATE [User]
                SET 
                    email = ISNULL(@email, email),
                    full_name = ISNULL(@full_name, full_name),
                    password = ISNULL(@password, password),
                    phone = ISNULL(@phone, phone),
                    birth_date = ISNULL(@birth_date, birth_date),
                    creation_date = ISNULL(@creation_date, creation_date),
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
        @id_client INT = NULL,
        @source NVARCHAR(50) = NULL,
        @reason NVARCHAR(255) = NULL,
        @address NVARCHAR(255) = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @id_client IS NOT NULL OR @source IS NOT NULL OR @reason IS NOT NULL OR @address IS NOT NULL
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
        @creation_date DATETIME = NULL,
        @address NVARCHAR(255) = NULL,
        @delivery_date DATE = NULL,
        @total DECIMAL(18, 2) = NULL,
        @client_id_client CHAR(13) = NULL,
        @user_id_user CHAR(13) = NULL,
        @output_message NVARCHAR(MAX) OUTPUT
    AS
    BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
            IF @creation_date IS NOT NULL OR @address IS NOT NULL OR @delivery_date IS NOT NULL OR @total IS NOT NULL OR @client_id_client IS NOT NULL OR @user_id_user IS NOT NULL
            BEGIN
                UPDATE [Order]
                SET 
                    creation_date = ISNULL(@creation_date, creation_date),
                    address = ISNULL(@address, address),
                    delivery_date = ISNULL(@delivery_date, delivery_date),
                    total = ISNULL(@total, total),
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