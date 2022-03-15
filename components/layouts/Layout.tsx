import { FC } from 'react';
import Head from "next/head";

import { Navbar } from '../ui';

interface Props {
    title?: string;
}

const origin = (typeof window === 'undefined' ? '' : window.location.origin);


export const Layout: FC<Props> = ({children, title}) => {


  return (
    <>
        <Head>
            <title>{title || 'PokemonApp'}</title>
            <meta name="author" content="Josue Vallejo" />
            <meta name="decription" content={`Información sobre ${ title || 'Pokémons'}`}/>
            <meta name="keywords" content={`${title}, pokemon, pokedex`}/>

            <meta property="og:title" content={`Informacion sobre ${title || 'Pokémons'}`} />
            <meta property="og:description" content={`Esta es la pagina sobre ${title || 'Pokèmons'}`} />
            <meta property="og:image" content={`${origin}/img/banner.png`} />
        </Head>

        <Navbar/>

        <main style={{
          padding: '0px 20px'
        }}>
            { children }
        </main>

    </>
  )
}
