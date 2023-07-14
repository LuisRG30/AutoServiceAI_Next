import * as React from "react";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

import { NextPageWithLayout } from "./page";
import Typed from "react-typed";
import Head from 'next/head'
import { Header } from "../components/landingPageComponents/Header";
import { Hero } from "../components/landingPageComponents/Hero";
import { PrimaryFeatures } from "../components/landingPageComponents/PrimaryFeatures";
import CallToAction from "@mui/icons-material/CallToAction";
import { Footer } from "../components/landingPageComponents/Footer";
import { SecondaryFeatures } from "../components/landingPageComponents/SecondaryFeatures";
import { Testimonials } from "../components/landingPageComponents/Testimonials";


const Home: NextPageWithLayout = () => {
  const { user, logoutUser } = React.useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Firmala - Experiencia en tus manos</title>
        <meta
          name="description"
          content="Firmala es una plataforma que te permite firmar documentos de manera digital y segura, al igual que conseguir consultas legales."
        />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
};

export default Home;

// Home.getLayout = (page) => {
//   return (
//     <PrimaryLayout>
//       <SidebarLayout />
//       {page}
//     </PrimaryLayout>
//   );
// };
