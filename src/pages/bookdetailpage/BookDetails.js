import React from "react";
import "./bookDetails.css";
import Navbar from "../../components/layouts/navbar/Navbar";

import BookDetailsSection from "../../components/BookDetailsSection/bookDetailsSection";
import Footer from "../../components/layouts/footer/Footer";

const BookDetails = () => {
    return (
        <section>
            <Navbar darkTheme={true}/>

            <BookDetailsSection />

            <Footer />
            
        </section>
    )
}

export default BookDetails;