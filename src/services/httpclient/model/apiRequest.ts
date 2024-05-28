export interface ApiRequest <T>{
	data?: T;
	params?: any;
	authToken?: string
}