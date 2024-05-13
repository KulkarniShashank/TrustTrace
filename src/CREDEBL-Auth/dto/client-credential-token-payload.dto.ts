/* eslint-disable camelcase */
export class AuthTokenRequest {
  clientId?: string;
  clientSecret?: string;
  audience?: string;
  grantType?: string = 'client_credentials';
  scope?: string;
  email?: string;
  password?: string;
  isPasskey?: boolean;
}


export interface RequestConfig {
  headers: {
      'content-type': string;
      Authorization: string;
  };
}
