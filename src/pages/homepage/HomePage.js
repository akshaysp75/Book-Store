import React from "react";
import Showcae from "../../components/layouts/showcase/Showcase";
import ProductListing from "../../components/layouts/productlisting/ProductListing";
import Footer from "../../components/layouts/footer/Footer";

const HomePage = () => {
    return (
        <section>
            <Showcae />
           <ProductListing />
           <Footer />
        </section>
    )
}

export default HomePage;