import container from "@/di/ioc.config";
import { ProductService } from "@/services/productService";

export function getProductService() : ProductService {
    return container.get(ProductService);
}