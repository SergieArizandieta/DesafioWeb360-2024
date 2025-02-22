import { useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { loginSchema } from "./yupValidations/yupValidations";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode'

import { singIn_Service } from "./services/SingIn";
import LogoNameBrand from "../../../components/LogoNameBrand/LogoNameBrand";
import CustomAlert from "../../../components/CustomAlert/CustomAlert";
import { useAuthStore } from '../../../storage/auth';

import { Link } from "react-router-dom";
export default function SingIn() {
  const setUserData = useAuthStore((state) => state.setUserData);

  const schema = loginSchema;

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (data) => {
    singIn_Service(data)
    .then(async(res) => {await CustomAlert("Bienvenido", res.message, true); return res.AccJwt;})
    .then((AccJwt) => {    
      const {id_userDPI, rol_id_rol, full_name} = jwtDecode(AccJwt);

      console.log("==AccJwt",AccJwt)
      console.log("id_userDPI, rol_id_rol, full_name",id_userDPI,rol_id_rol, full_name)
      setUserData(AccJwt,id_userDPI, rol_id_rol, full_name)
    })
    .catch((err) => {
      CustomAlert("Ah ocurrido un error", err, false)
    })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100svh - 160px)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          minWidth: '300px',
          width: '40%',
          maxWidth: '500px',
          borderRadius: '30px',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          padding: '10px 20px 30px 20px',
          backgroundColor: '#E2E2E2FF',
          color: "#000"
        }}
      >
        <LogoNameBrand />

        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}>

          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Email:
          </Typography>
          <TextField
            error={Boolean(errors.email)}
            label="Correo Electrónico"
            variant="filled"
            color="quarternary"
            helperText={errors.email?.message}
            {...register('email')}
          />

          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Contraseña:
          </Typography>
          <FormControl variant="filled" color="quarternary" error={Boolean(errors.password)}>
            <InputLabel >Password</InputLabel>
            <FilledInput
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.password && (
          <FormHelperText>{errors.password.message}</FormHelperText>
        )}
          </FormControl>

          <Button
            sx={{ marginTop: '25px', fontWeight: 'bold' }}
            variant="contained"
            type="submit"
            color="secondary">
            Iniciar Sesión
          </Button>

        </form>
        <Button
          component={Link}
          sx={{ marginTop: '10px', fontWeight: 'bold' }}
          variant="contained"
          color="tertiary"
          to="/SingUp">
          Crear una Cuenta
        </Button>

      </Paper>
    </Box>

  )
}