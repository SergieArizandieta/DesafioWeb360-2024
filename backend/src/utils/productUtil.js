function mapperProducts(products) {

   const mapProducts = products.map((product) => {
      return {
         id_product: product.id_product,
         name: product.name,
         brand: product.brand,
         code: product.code,
         stock: product.stock,
         price: product.price,
         picture: "data:image/png;base64," + product.picture.toString("base64"),
         category_id_category: product.category_id_category,
         status_id_status: product.status_id_status,
      };
   });

   return mapProducts;
}



module.exports = { 
   mapperProducts
 };
