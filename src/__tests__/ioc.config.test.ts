import { Container } from 'inversify';
import TYPES from '@/services/httpclient/axios/types';
import apiClient  from '@/services/httpclient/axios/apiClient';
import ApiClientMock from './apiClientMock';

const container = new Container();
container.bind<apiClient>(TYPES.ApiClient).to(ApiClientMock);

export default container;