import "./styles.css"


export default function Footer() {

   const handleClick = (e) => {
      e.preventDefault()
      const parent = e.target.parentElement
      parent.classList.toggle('open');
   }

   return (
      <footer className="Layout__footer">
         <section className="footer-section" >
            <p className="footer-title" onClick={handleClick}>Conócenos</p>
            <ul className="footer-list">
               <li>Cancelaciones y devoluciones</li>
               <li>Términos y Condiciones</li>
               <li>Aviso de Privacidad eCommerce</li>
               <li>Reglamento de promociones</li>
               <li>Mi Tiendita te escucha</li>
            </ul>
         </section>
         <section className="footer-section" >
            <p className="footer-title" onClick={handleClick}>¿Necesitas ayuda?</p>
            <ul className="footer-list">
               <li>¿Cómo comprar en MiTiendita.com.gt?</li>
               <li>Preguntas frecuentes</li>
               <li>Llámanos 4123-23XX</li>
            </ul>
         </section>
         <section className="footer-section" >
            <p className="footer-title" onClick={handleClick}>Síguenos en</p>
            <ul className="footer-list">
               <li>Facebook</li>
               <li>Instagram</li>
               <li>Twitter</li>
            </ul>
         </section>
         <section>
            <p>© 2025 Mi Tiendita.<br/> Todos los Derechos Reservados.</p>
         </section>
      </footer>
   )
}