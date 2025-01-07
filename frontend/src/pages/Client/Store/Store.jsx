import "./styles.css"
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Store() {


  return (
    <div className="store">
      <section className="store__categories" >
        <article>
          <DashboardIcon />
          <p>Departamentos</p>
        </article>

        <article>
          <p>Liquidación</p>
        </article>

        <article>
          <p>Consumibles y básicos</p>
        </article>


        <article>
          <p>Moda</p>
        </article>

        <article>
          <p>Hogar</p>
        </article>


        <article>
          <p>Electrónicos</p>
        </article>


        <article>
          <p>Bebés</p>
        </article>
      </section>
      <section className="store__content" >

      </section>

    </div>
  )
}