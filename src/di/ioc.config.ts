import { Container } from 'inversify';
import TYPES from '@/services/httpclient/axios/types';
import apiClient  from '@/services/httpclient/axios/apiClient';
import ApiClientImpl  from '@/services/httpclient/axios/apiClientImpl';

const container = new Container();
container.bind<apiClient>(TYPES.ApiClient).to(ApiClientImpl);

export default container;