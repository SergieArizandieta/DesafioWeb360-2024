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