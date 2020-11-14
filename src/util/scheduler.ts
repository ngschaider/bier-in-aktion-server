import Product from "../models/Product";
import spiders from "../spiders";

const refreshProducts = async () => {
    console.log("Refreshing Products...");
    const products = await Product.find();
    products.forEach(async p => {
        await p.remove();
    });
    //await Product.remove(products);
    
    const newProducts = await spiders.getProducts();
    newProducts.forEach(async p => {
        console.log(p);
        await p.save();
    });
    //await Product.save(newProducts);
    console.log("Successfully refreshed Products");
};

export default () => {
    refreshProducts();
    setInterval(refreshProducts, 1000 * 60 * 60); // refresh every hour

    console.log("Scheduler started.");
}