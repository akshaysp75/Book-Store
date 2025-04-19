import React from "react";
import "./productListing.css";
import ProductListingCard from "../../cards/product-listing-card/productListingCard";
import { BookData } from "../../../Util/BookData";

const ProductListing = () => {
    return (
        <div className="product-listing-container">
            <div className="container">
                <h2>Here are some <span className="text-primary">books</span> you might like</h2>
                <div className="listing-container">
                    {BookData.slice(0, 4).map((book) => (
                        <ProductListingCard key={book.id} bookData={book} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductListing;
