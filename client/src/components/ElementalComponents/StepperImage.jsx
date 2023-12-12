import * as React from 'react';
import { Fragment, useState, useEffect} from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Grid from '@mui/material/Grid';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const flexcomponent = {
  display:"flex",
  justifyContent: "center",
  alignItems: "center",
} 

function SwipeableTextMobileStepper({productArray, FunctionOpenModalImage, productArrayIndex}) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activeStep, setActiveStep] = React.useState(0);
  const [indexProduct, setIndexProduct] = React.useState(null);

  const theme = useTheme();
  const maxSteps = (productArray.photo).length ;

  useEffect(() => {
    const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };
      window.addEventListener('resize', handleResize);
      // Limpiar el event listener al desmontar el componente
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Fragment>
    <Box sx={{ maxWidth: 400, height: screenWidth<600 ? 200:308}}>
    <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center',
          height: 25,
          pl: 0,
          bgcolor: 'yellow',
        }}
      >
        <Typography  textAlign='center' style={{marginTop: '0px', width:'100%', backgroundColor:'yellow'}}>
           $ <strong>{(productArray.photo)[activeStep].price} </strong>{productArray.typeOfCurrency}
         </Typography>
      </Paper>

      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {productArray.photo.map((producto, index) => (
          <div key={`${producto.label}-${index}`}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: screenWidth<600 ? 145:250,
                  display: 'block',
                  maxWidth: 400,
                  overflow: 'hidden',
                  width: '100%',
                }}
                onMouseUp={()=>{
                  FunctionOpenModalImage(productArrayIndex); // Pasa el índice aquí
                  setIndexProduct(productArrayIndex)
                }}
                src={producto.imgPath}
                alt={producto.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent:'center',
          height: 25,
          pl: 0,
          bgcolor: 'background.default',
        }}
      >
        <Typography textAlign='center'>{(productArray.photo)[activeStep].label}</Typography>
      </Paper>
     {screenWidth<600 ? 
      <Grid style={flexcomponent}>
        <MobileStepper
         steps={maxSteps}
         position="static"
         activeStep={activeStep}
         sx={{ marginTop: '-13px', backgroundColor: 'transparent' }}
         nextButton={
           <Button
             size="small"
             onClick={handleNext}
             disabled={activeStep === maxSteps - 1}
             style={{outline:'none'}}
           >
             {theme.direction === 'rtl' ? (
               <KeyboardArrowLeft />
             ) : (
               <KeyboardArrowRight />
             )}
           </Button>
         }
         backButton={
           <Button 
              size="small" 
              onClick={handleBack} 
              disabled={activeStep === 0}
              style={{outline:'none'}}
              >
             {theme.direction === 'rtl' ? (
               <KeyboardArrowRight />
             ) : (
               <KeyboardArrowLeft />
             )}
           </Button>
         }
       />  
      </Grid>
      :
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ marginTop: '-14px', backgroundColor: 'transparent' }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            style={{outline:'none'}}
          >
            {/* Next */}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button 
            size="small" 
            onClick={handleBack} 
            disabled={activeStep === 0}
            style={{outline:'none'}}
            >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {/* Back */}
          </Button>
        }
      />
      }
    </Box>
    </Fragment>
  );
}

export default SwipeableTextMobileStepper;
