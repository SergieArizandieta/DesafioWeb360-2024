function mapperDetailOrders(datails) {
   const mapProducts = datails.map((datail) => {
      return {
         id_product: datail.id_product,
         name: datail.name,
         brand: datail.brand,
         code: datail.code,
         stock: datail.stock,
         price: datail.price,
         picture: "data:image/png;base64," + datail.picture.toString("base64"),
         category_id_category: datail.category_id_category,
         status_id_status: datail.status_id_status,
         quantity: datail.quantity,
         subtotal: datail.subtotal,
         id_detail: datail.id_detail
      };
   });
   return mapProducts;
}



module.exports = { 
   mapperDetailOrders
 };
