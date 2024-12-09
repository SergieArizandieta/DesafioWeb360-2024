-- ////////////////////////////////////////////////////////////// DROP VIEWS //////////////////////////////////////////////////////////////

--  Drop View A ---------------------------------------------------------------
IF OBJECT_ID('v_ProductosActivosConStock', 'V') IS NOT NULL
DROP VIEW v_ProductosActivosConStock;
GO

--  Drop View B ---------------------------------------------------------------
IF OBJECT_ID('v_TotalOrdenesAgosto2024', 'V') IS NOT NULL
DROP VIEW v_TotalOrdenesAgosto2024;
GO

--  Drop View B Modified ---------------------------------------------------------------
IF OBJECT_ID('v_TotalOrdenesDiciembre2024', 'V') IS NOT NULL
DROP VIEW v_TotalOrdenesDiciembre2024;
GO

--  Drop View C ---------------------------------------------------------------
IF OBJECT_ID('v_TopClientesMayorConsumo', 'V') IS NOT NULL
DROP VIEW v_TopClientesMayorConsumo;
GO

--  Drop View D ---------------------------------------------------------------
IF OBJECT_ID('v_TopProductosMasVendidos', 'V') IS NOT NULL
DROP VIEW v_TopProductosMasVendidos;
GO
