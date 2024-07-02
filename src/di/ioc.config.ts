import { Container } from 'inversify';
import TYPES from '@/services/httpclient/axios/types';
import apiClient  from '@/services/httpclient/axios/apiClient';
import ApiClientImpl  from '@/services/httpclient/axios/apiClientImpl';
import ApiServerClientImpl from '@/services/httpclient/axios/apiServerClientImpl';
import { ProductService } from '@/services/productService';

const container = new Container();
container.bind<apiClient>(TYPES.ApiClient).to(ApiClientImpl);
container.bind<apiClient>(TYPES.ApiServerClient).to(ApiServerClientImpl);
container.bind(ProductService).to(ProductService).inTransientScope();

export default container;