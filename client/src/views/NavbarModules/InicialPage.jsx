import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PetsIcon from '@mui/icons-material/Pets';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from '../../components/NavbarComponents/Header';
import MainFeaturedPost from '../../components/NavbarComponents/MainFeaturedPost';
import FeaturedPost from '../../components/NavbarComponents/FeaturedPost';
import Main from '../../components/NavbarComponents/Main';
import Sidebar from '../../components/NavbarComponents/Sidebar';
import Footer from '../../components/NavbarComponents/Footer';

import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

//import post1 from '../../components/NavbarComponents/blog-post.1.md';
//import post2 from '../../components/NavbarComponents/blog-post.2.md';
//import post3 from '../../components/NavbarComponents/blog-post.3.md';

const sections = [
  { title: 'Salud', url: '#' },
  { title: 'Alimentacion', url: '#' },
  { title: 'Cuidado', url: '#' },
  { title: 'Higiene', url: '#' },
];

const randomImage = [
  'https://previews.123rf.com/images/elenavdovina/elenavdovina1609/elenavdovina160900062/65022386-mercanc%C3%ADas-para-animales-fondo-transparente-azul-verde-vector-fondo-transparente-azul-verde.jpg',
  'https://img.freepik.com/vector-premium/patron-fisuras-cabeza-perro-lindo-sobre-fondo-blanco_426735-106.jpg?w=2000',
  'https://img.freepik.com/vector-gratis/fondo-colorido-modelo-huellas-pata-perro-o-gato_1017-30662.jpg?w=2000',
  'https://previews.123rf.com/images/sabbracadabra/sabbracadabra1701/sabbracadabra170100026/70250375-mascotas-tema-de-fondo-vector-patr%C3%B3n-con-las-impresiones-de-la-pata-de-los-gatos.jpg'
]

// PASAR ESTO COMO UN CONSUMO PARA QUE EL ADMIN PUEDA QUITAR Y PONER NUEVOS POST
const featuredPosts = [
  {
    title: 'Alimentación',
    date: `${Date.now()}`,
    description:
      'Una buena alimentacion mejora el cuidado y no se que mas inventar jajajaja.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'PRINCIPAL POST',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'HOLA',
  },
  ,
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
  ,
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageLabel: 'Image Text',
  },
];

//const posts = [post1, post2, post3];  

const sidebar = {
  title: 'Acerca de Nosotros',
  description:
    'Estamos comprometidos con el cuidado de tu peludito, sabemos que es parte de tu familia, y darle amor es fundamental en su dia a dia.',
  archives: [
    { title: 'Peluditos trendy', url: '#' },
    { title: 'Veterinaria canina', url: '#' },
    { title: 'Veterinaria plus', url: '#' },
    { title: 'Veterinario Angel gallardo', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'Instagram', icon: InstagramIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
    { name: 'Youtube', icon: YouTubeIcon },
  ],
};

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const stepperImages = [
  { 
    label: 'Imagen 1', 
    imgPath: randomImage[0], 
    title: 'Tips para el cuidado de nuestras mascotas', 
    description: 'No se que texto poner aqui, pero solo lo pongo para poder rellenar los espacios y visualizar la adaptacion de la fuente. 1' 
  },
  { 
    label: 'Imagen 2', 
    imgPath: randomImage[1], 
    title: 'Tips para el cuidado de nuestras mascotas', 
    description: 'No se que texto poner aqui, pero solo lo pongo para poder rellenar los espacios y visualizar la adaptacion de la fuente. 1' 
  },
  { 
    label: 'Imagen 3', 
    imgPath: randomImage[2], 
    title: 'Tips para el cuidado de nuestras mascotas', 
    description: 'No se que texto poner aqui, pero solo lo pongo para poder rellenar los espacios y visualizar la adaptacion de la fuente. 1' 
  },
  { 
    label: 'Imagen 4', 
    imgPath: randomImage[3], 
    title: 'Tips para el cuidado de nuestras mascotas', 
    description: 'No se que texto poner aqui, pero solo lo pongo para poder rellenar los espacios y visualizar la adaptacion de la fuente. 1' 
  },
];

function ImageStepper({ images }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Grid mb={5}>
      <Paper elevation={3} square sx={{mt:4}}>
        {/* <Typography>{images[activeStep].label}</Typography> */}
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
          interval={5000} // tiempo de cambio, en este caso 5 segundos
        >
          {images.map((image, index) => (
            <div key={index} style={{ position: 'relative' }}>
              {Math.abs(activeStep - index) <= 2 ? ( // Verifica si la vista está dentro de tres pasos para una mejor experiencia de carga
                <img
                  src={image.imgPath}
                  alt={image.label}
                  style={{ width: '100%', height: 345, objectFit: 'cover' }}
                />
              ) : null}

              {/* Añade tu texto aquí */}
              <Grid style={{ position: 'absolute', color: 'black', width:"100%", top:"10%" }}>
               <Typography variant="h3" component="div">
                 {image.title}
               </Typography>
               <Typography variant="h4" component="div">
                 {image.description}
               </Typography>
              </Grid>
            </div>
          ))}
        </AutoPlaySwipeableViews>
      </Paper>
      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="dots"
        activeStep={activeStep}
        backButton={
          <Button size="small" onClick={() => handleStepChange(activeStep - 1)} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
        nextButton={
          <Button size="small" onClick={() => handleStepChange(activeStep + 1)} disabled={activeStep === maxSteps - 1}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
      />
    </Grid>
  );
}

const theme = createTheme();

export default function Blog() {
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header title="Página principal" sections={sections}/>
      <Grid container 
          style={{ 
                  display:"flex",
                  alignItems:"center", 
                  justifyContent:"center" ,
                  width:"93%", 
                  marginLeft:50, 
                  marginRight:50
                  }}>
        <main>
        <ImageStepper images={stepperImages} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            {/* <Main title="From the firehose" posts={posts} /> */}
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Grid>
      <Footer
        title="PELUDITOS "
        description="Una descripcion sobre la empresa"
      />
      <PetsIcon></PetsIcon>
      
    </ThemeProvider>
  );
}