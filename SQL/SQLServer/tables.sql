-- EXEC sp_helpindex 'Rol';


CREATE TABLE Rol (
   id_rol INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);


CREATE TABLE Status (
   id_status INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name VARCHAR(50) NOT NULL
);

CREATE TABLE Category(
   id_category INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   creation_date DATETIME DEFAULT GETDATE(),
   status_id_status INT NOT NULL,
);

ALTER TABLE Category 
ADD CONSTRAINT FK_Category_Status 
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);

CREATE TABLE [User](
   id_userDPI CHAR(13) NOT NULL PRIMARY KEY,
   email VARCHAR(256) NOT NULL,
   full_name VARCHAR(100) NOT NULL,
   password VARCHAR(255) NOT NULL,
   phone CHAR(8) NOT NULL,
   birth_date DATE NOT NULL,
   creation_date DATETIME DEFAULT GETDATE(),
   status_id_status INT NOT NULL,
   rol_id_rol INT NOT NULL,
);

ALTER TABLE [User]
ADD CONSTRAINT FK_User_Status
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);

ALTER TABLE [User]
ADD CONSTRAINT FK_User_Rol
FOREIGN KEY (rol_id_rol) REFERENCES Rol(id_rol);


CREATE TABLE Client(
   id_clientDPI CHAR(13) NOT NULL PRIMARY KEY,
   id_client INT IDENTITY(1,1) NOT NULL UNIQUE,
   source VARCHAR(50) NOT NULL,
   reason VARCHAR(255) NOT NULL,
   address VARCHAR(255) NOT NULL,
);

ALTER TABLE Client
ADD CONSTRAINT FK_Client_User
FOREIGN KEY (id_clientDPI) REFERENCES [User](id_userDPI);

CREATE TABLE Product(
   id_product INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   brand VARCHAR(50) NOT NULL,
   code VARCHAR(50) NOT NULL UNIQUE,
   stock INT NOT NULL,
   price DECIMAL(18, 2) NOT NULL,
   creation_date DATETIME DEFAULT GETDATE(),
   picture VARBINARY(MAX) NOT NULL,
   category_id_category INT NOT NULL,
   status_id_status INT NOT NULL,
);

ALTER TABLE Product
ADD CONSTRAINT FK_Product_Category
FOREIGN KEY (category_id_category) REFERENCES Category(id_category);

ALTER TABLE Product
ADD CONSTRAINT FK_Product_Status
FOREIGN KEY (status_id_status) REFERENCES Status(id_status);

CREATE TABLE [Order](
   id_order INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   creation_date DATETIME DEFAULT GETDATE(),
   address VARCHAR(255) NOT NULL,
   delivery_date DATE NOT NULL,
   total DECIMAL(18, 2) NOT NULL,
   client_id_client CHAR(13) NOT NULL,
   user_id_user CHAR(13) NOT NULL,
);

ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_Client
FOREIGN KEY (client_id_client) REFERENCES Client(id_clientDPI);

ALTER TABLE [Order]
ADD CONSTRAINT FK_Order_User
FOREIGN KEY (user_id_user) REFERENCES [User](id_userDPI);

CREATE TABLE Detail(
   id_detail INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
   quantity INT NOT NULL,
   subtotal DECIMAL(18, 2) NOT NULL,
   product_id_product INT NOT NULL,
   order_id_order INT NOT NULL,
);

ALTER TABLE Detail
ADD CONSTRAINT FK_Detail_Product
FOREIGN KEY (product_id_product) REFERENCES Product(id_product);

ALTER TABLE Detail
ADD CONSTRAINT FK_Detail_Order
FOREIGN KEY (order_id_order) REFERENCES [Order](id_order);
