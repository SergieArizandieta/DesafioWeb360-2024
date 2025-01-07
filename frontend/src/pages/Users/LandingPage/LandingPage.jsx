import "./styles.css"
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    
  return (
      <div className="landingPage">
        <section className="landingPage__section" >
          <div className="landingPage__text">
            <h1>Todo lo que buscas,</h1>
            <h1>Sin salir de casa</h1>
          </div>
          <Button variant="contained" color="secondary" component={Link} to="/SingIn">Empezar</Button>
        </section>
      </div>
  )
}