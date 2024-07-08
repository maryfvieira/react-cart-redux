import container from "@/di/ioc.config";
import { ProductService } from "@/services/productService";
import { UserService } from "@/services/userService";

export function getProductService() : ProductService {
    return container.get(ProductService);
}

export function getUserService() : UserService {
    return container.get(UserService);
}