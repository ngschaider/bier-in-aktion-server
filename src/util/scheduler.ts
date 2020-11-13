import Product from "../models/Product";
import spiders from "../spiders";

const refreshProducts = async () => {
    console.log("Refreshing Products...");
    const products = await Product.find();
    await Product.remove(products);
    
    const newProducts = await spiders.getProducts();
    await Product.save(newProducts);
    console.log("Successfully refresh Products");
};

export default () => {
    setInterval(refreshProducts, 1000 * 60 * 60); // refresh every hour
    console.log("Scheduler started.");
}