import { Container } from 'inversify';
import TYPES from '@/app/api/client/axios/types';
import apiClient  from '../app/api/client/axios/apiClient';
import ApiClientMock from './apiClientMock';

const container = new Container();
container.bind<apiClient>(TYPES.ApiClient).to(ApiClientMock);

export default container;