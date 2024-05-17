import { Container } from 'inversify';
import TYPES from '@/app/api/client/axios/types';
import apiClient  from '../app/api/client/axios/apiClient';
import ApiClientImpl  from '../app/api/client/axios/apiClientImpl';

const container = new Container();
container.bind<apiClient>(TYPES.ApiClient).to(ApiClientImpl);

export default container;