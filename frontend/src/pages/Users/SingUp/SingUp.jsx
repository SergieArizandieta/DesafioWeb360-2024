import { Box, Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Paper, TextField, Typography } from "@mui/material";
import LogoNameBrand from "../../../components/LogoNameBrand/LogoNameBrand";
import { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { registerSchema } from "./yupValidations/yupValidations";
export default function SingUp() {
  const currentYear =  dayjs().subtract(18, 'year');


  const schema = registerSchema;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data)
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '50px 0px',
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
            DPI:
          </Typography>
          <TextField
            label="DPI"
            variant="filled"
            type="number"
            color="quarternary"
            error={Boolean(errors.dpi)}
            helperText={errors.dpi?.message}
            {...register('dpi')}
          />


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Email:
          </Typography>
          <TextField
            label="Correo Electrónico"
            variant="filled"
            color="quarternary"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Nombre Completo:
          </Typography>
          <TextField
            label="Nombre Completo"
            variant="filled"
            color="quarternary"
            error={Boolean(errors.fullName)}
            helperText={errors.fullName?.message}
            {...register('fullName')}
          />


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Contraseña:
          </Typography>
          <FormControl variant="filled" color="quarternary"
            error={Boolean(errors.password)}
          >
            <InputLabel >Contraseña</InputLabel>
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


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Confirmar Contraseña:
          </Typography>
          <FormControl variant="filled" color="quarternary"
            error={Boolean(errors.confirmPass)}
          >
            <InputLabel >Confirmar Contraseña</InputLabel>
            <FilledInput
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPass')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {errors.confirmPass && (
              <FormHelperText>{errors.confirmPass.message}</FormHelperText>
            )}
          </FormControl>


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Celular
          </Typography>
          <TextField
            label="Celular"
            variant="filled"
            color="quarternary"
            type="number"
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            {...register('phone')}
          />

          <Typography variant="h6" sx={{ marginTop: '20px', marginBottom: '10px' }}>
            Fecha de nacimiento:
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento"
              maxDate={currentYear}
              openTo="year"
              views={['year', 'month', 'day']}
              yearsOrder="desc"
              onChange={(date) => {
                setValue('birthDate', date);
              }}
              slots={{
                textField: (params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    error={Boolean(errors.birthDate)}
                    helperText={errors.birthDate?.message}
                  />
                ),
              }}
            />
        </LocalizationProvider>


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Fuente de donde nos conociste
          </Typography>
          <TextField
            label="Facebook, Instagram, Google, etc"
            variant="filled"
            color="quarternary"
            error={Boolean(errors.source)}
            helperText={errors.source?.message}
            {...register('source')}
          />


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Razón por la que nos visitas
          </Typography>
          <TextField
            multiline
            maxRows={4}
            label="Descripción"
            variant="filled"
            color="quarternary"
            error={Boolean(errors.reson)}
            helperText={errors.reson?.message}
            {...register('reson')}
          />


          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Dirección
          </Typography>
          <TextField
            label="Dirección de tu hogar"
            variant="filled"
            color="quarternary"
            error={Boolean(errors.address)}
            helperText={errors.address?.message}
            {...register('address')}
          />



          <Button
            sx={{ marginTop: '25px', fontWeight: 'bold' }}
            variant="contained"
            type="submit"
            color="secondary">
            Crear una Cuenta
          </Button>

        </form>

        <Button
          sx={{ marginTop: '10px', fontWeight: 'bold' }}
          variant="contained"
          color="tertiary">
          Iniciar Sesión
        </Button>

      </Paper>
    </Box>

  )
}