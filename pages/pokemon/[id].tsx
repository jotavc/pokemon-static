import { useState } from 'react';

import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { Grid, Card, Text, Button, Container, Image } from '@nextui-org/react';

import confetti from "canvas-confetti";

import { Layout } from "../../components/layouts";
import { Pokemon } from '../../interfaces';
import { getPokemonInfo, localFavorites } from '../../utils';


interface Props {
  pokemon: Pokemon;
}

const Pokemonpage: NextPage<Props> = ({pokemon}) => {

  // console.log(pokemon);

    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ) );

    const onToggleFavorite = () => {      
      localFavorites.toggleFavorites(pokemon.id);
      setIsInFavorites( !isInFavorites );

      if ( !isInFavorites ) {
        confetti({
          zIndex: 999,
          particleCount: 100,
          spread: 160,
          angle: -100,
          origin: {
            x: 1,
            y: 0,
          }
        })
      }

    }

    return (
      <Layout title={ pokemon.name }>
          
          <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>

            <Grid xs={ 12 } sm={ 4 }>
              <Card hoverable css={{padding: '30px'}}>
                <Card.Body>
                    <Card.Image 
                      src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png' }
                      alt={ pokemon.name }
                      width="100%"
                      height={ 200 }
                    />
                </Card.Body>

              </Card>
            </Grid> 

            <Grid xs={ 12 } sm={ 8 }>
              <Card>
                <Card.Header css={{ display: 'flex', justifyContent: 'flex-end' }}>                 

                  <Button
                    color="gradient"
                    ghost={ !isInFavorites }
                    onClick={ onToggleFavorite }
                  >
                    { isInFavorites ? 'En favoritos' : 'Guardar en favoritos' }
                  </Button>

                </Card.Header>

                <Card.Body>
                <Text h1 transform='capitalize'>{ pokemon.name }</Text>
                  <Text size={30}>Sprites:</Text>

                  <Container direction='row' display='flex' gap={ 0 }>
                    <Image 
                      src={ pokemon.sprites.front_default }
                      alt={ pokemon.name }
                      width={ 100 }
                      height={ 100 }
                    />
                    <Image 
                      src={ pokemon.sprites.back_default }
                      alt={ pokemon.name }
                      width={ 100 }
                      height={ 100 }
                    />
                    <Image 
                      src={ pokemon.sprites.front_shiny }
                      alt={ pokemon.name }
                      width={ 100 }
                      height={ 100 }
                    />
                    <Image 
                      src={ pokemon.sprites.back_shiny }
                      alt={ pokemon.name }
                      width={ 100 }
                      height={ 100 }
                    />

                  </Container>


                </Card.Body>  

              </Card>
            </Grid>

          </Grid.Container>


      </Layout>
    )
};


// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

//Genera las paginas en el build
export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const pokemon151 = [...Array(151)].map ( (value, index) => `${ index + 1 }`);
  
  return {
    paths: pokemon151.map( id => ({
      params: { id }
    })),
    // fallback: false //para enviar error si no exite parametro
    fallback: 'blocking'//para dejar pasar peticion
  }
  
}


export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo( id );

  if( !pokemon ){
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      pokemon 
    },
    revalidate: 86400, // In seconds (86400s = 24h)
  }

}





export default Pokemonpage;