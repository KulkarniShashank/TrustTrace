export interface AuthTokenRequest {
    clientSecret: string;
}

export interface RequestConfig {
    headers: {
        'content-type': string;
        Authorization: string;
    };
  }
