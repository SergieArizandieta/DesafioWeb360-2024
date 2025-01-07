import "./styles.css"
import { useAuthStore } from '../../../store/auth';

export default function Store() {
  const logout = useAuthStore((state) => state.logout);


   const handleLogout = () => {
      logout()
   }

  return (
   <>
      <h1>Store</h1>
      <button onClick={handleLogout}>Logout</button>
      </>
  )
}