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

function mapperOrders(orders) {
   const mapProducts = orders.map((order) => {
      return {
         id_order: order.id_order,
         creation_date: formatDate(order.creation_date),
         address: order.address,
         delivery_date: formatDate(order.delivery_date),
         total: order.total,
         client_id_client: order.client_id_client,
         status_name: order.status_name,
         id_status: order.id_status
      };
   });
   return mapProducts;
}

function formatDate(dateString) {
   const date = new Date(dateString);
   const day = String(date.getDate()).padStart(2, '0');
   const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
   const year = date.getFullYear();
   return `${day}/${month}/${year}`;
 }


module.exports = { 
   mapperDetailOrders,
   mapperOrders
 };
