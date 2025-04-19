import React from "react";
import "./bookPage.css";
import Navbar from "../../components/layouts/navbar/Navbar";
import SearchInputForm from "../../components/forms/searchInputForms/SearchInputForm";
import ProductListingAll from "../../components/layouts/productListingAll/ProductListingAll";
import Footer from "../../components/layouts/footer/Footer";

const BooksPage = () => {
    return (
        <section>
            <Navbar darkTheme={true}/>

            <div className="search-container">
                <h2>Find the <span className="text-primary">Books</span> that you want!</h2>
                <SearchInputForm darkTheme={false} />

            </div>
          <ProductListingAll />
          <Footer />
            
        </section>
    )
}

export default BooksPage;