import "./styles.css"
import XIcon from '@mui/icons-material/X';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton } from "@mui/material";

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
          <div style={{ display: 'flex', gap: '1rem' }}>
            <IconButton>
              <FacebookIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton>
              <InstagramIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton>
              <TwitterIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton>
              <XIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </div>
        </ul>
      </section>
      <section>
        <p>© 2025 Mi Tiendita.<br /> Todos los Derechos Reservados.</p>
      </section>
    </footer>
  )
}