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
