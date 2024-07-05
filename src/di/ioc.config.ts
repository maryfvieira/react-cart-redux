import { Container } from 'inversify';
import TYPES from '@/services/httpclient/axios/types';
import apiClient  from '@/services/httpclient/axios/apiClient';
import ApiClientImpl  from '@/services/httpclient/axios/apiClientImpl';
import { ProductService } from '@/services/productService';

const container = new Container();
container.bind<apiClient>(TYPES.ApiClient).to(ApiClientImpl);
container.bind(ProductService).to(ProductService).inTransientScope();

export default container;