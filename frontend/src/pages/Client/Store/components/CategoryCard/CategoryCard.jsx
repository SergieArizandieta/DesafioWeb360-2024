import { Box, Paper, Typography } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function CategoryCard({title,imagesArr = []}) {

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          height: "100%",
          minWidth: '300px',
          maxWidth: '400px',
          minHeight: '375px',
          padding: '20px 20px 0px 20px',
          backgroundColor: '#fff',
          color: "#000"
        }}
      >

        <Typography variant="h6" fontWeight={"bold"}>
          
          {title}
        </Typography>

        <Box  sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            rowGap: 3, 
          }}>

          
          {imagesArr.map((item, index) => (
            // center all items
            <Box key={index} sx={{ cursor: "pointer", height: "80%"}}>
              <img src={item.img} alt={item.title} style={{ width: "100%", height: "90%"}} />
              <Typography variant="body">
                {item.title}
              </Typography>
            </Box>
          ))}

        </Box>
      </Paper>
    </Box>
  )
}