import Product from "../models/Product";

abstract class BaseProvider {
	
	abstract crawl(): Promise<Product[]>;
	
}

export default BaseProvider;