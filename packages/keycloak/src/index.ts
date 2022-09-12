import axios, { AxiosError } from 'axios';
import { KeyCloakTokenResponseDto, KeyCloakUserInfoResponseDto } from './types';

enum ContentTypes {
  APPLICATION_URLENCODED = 'application/x-www-form-urlencoded',
  APPLICATION_JSON = 'application/json',
}

export enum GrantTypes {
  CLIENT_CREDENTIALS = 'client_credentials',
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export class KeyCloakClient {
  private host: string;
  private clientId: string;
  private clientSecret: string;

  private adminHost: string;
  private adminClientId: string;
  private adminClientSecret: string;

  private redirectUri: string;

  constructor({
    host,
    clientId,
    clientSecret,
    adminHost,
    adminClientId,
    adminClientSecret,
    redirectUri,
  }: {
    host: string;
    clientId: string;
    clientSecret: string;
    adminHost: string;
    adminClientId: string;
    adminClientSecret: string;
    redirectUri: string;
  }) {
    this.host = host;
    this.clientId = clientId;
    this.clientSecret = clientSecret;

    this.adminHost = adminHost;
    this.adminClientId = adminClientId;
    this.adminClientSecret = adminClientSecret;

    this.redirectUri = redirectUri;
  }

  public async getToken({
    clientId,
    clientSecret,
    grantType,
    host,
    refreshToken = '',
    username = '',
    password = '',
  }: {
    clientId: string;
    clientSecret: string;
    grantType: GrantTypes;
    host: string;
    refreshToken?: string;
    username?: string;
    password?: string;
  }): Promise<KeyCloakTokenResponseDto> {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', grantType);
    if (!refreshToken) params.append('refresh_token', refreshToken);
    if (!username) params.append('username', username);
    if (!password) params.append('password', password);

    const headers = { 'content-type': ContentTypes.APPLICATION_URLENCODED };
    const url = `${host}/protocol/openid-connect/token`;
    try {
      const { data } = await axios.post<KeyCloakTokenResponseDto>(url, params, {
        headers,
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError', error);
      }
      throw error;
    }
  }

  public async addUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    // Get Admin Access Token
    const { access_token, token_type } = await this.getToken({
      clientId: this.adminClientId,
      clientSecret: this.adminClientSecret,
      grantType: GrantTypes.CLIENT_CREDENTIALS,
      host: this.host,
    });
    const authorization = `${token_type} ${access_token}`;
    // Sign Up
    const url = `${this.adminHost}/users`;
    const data = {
      enabled: true,
      groups: [],
      email: username,
      emailVerified: true,
      username,
      requiredActions: [],
      credentials: [{ type: 'password', value: password, temporary: false }],
    };
    const headers = { authorization };
    try {
      return axios.post(url, data, { headers });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError', error);
      }
      throw error;
    }
  }

  public async getUser(
    authorization: string
  ): Promise<KeyCloakUserInfoResponseDto> {
    const url = `${this.host}/protocol/openid-connect/userinfo`;
    const headers = { authorization };
    try {
      const { data } = await axios.post<KeyCloakUserInfoResponseDto>(
        url,
        {},
        { headers }
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError', error);
      }
      throw error;
    }
  }

  public async refreshToken(
    refreshToken: string
  ): Promise<KeyCloakTokenResponseDto> {
    try {
      return this.getToken({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        grantType: GrantTypes.REFRESH_TOKEN,
        refreshToken: refreshToken,
        host: this.host,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError', error);
      }
      throw error;
    }
  }

  public async logOut({
    authorization,
    refreshToken,
  }: {
    authorization: string;
    refreshToken: string;
  }): Promise<void> {
    const params = new URLSearchParams();
    params.append('client_id', this.clientId);
    params.append('client_secret', this.clientSecret);
    params.append('refresh_token', refreshToken);
    params.append('redirect_uri', this.redirectUri);

    const contentType = ContentTypes.APPLICATION_URLENCODED;
    const headers = { authorization, 'content-type': contentType };
    const url = `${this.host}/protocol/openid-connect/logout`;

    try {
      await axios.post(url, params, { headers });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError', error);
      }
      throw error;
    }
  }

  public async resetPassword({
    userId,
    newPassword,
  }: {
    userId: string;
    newPassword: string;
  }): Promise<void> {
    // Get Admin Access Token
    const { access_token, token_type } = await this.getToken({
      clientId: this.adminClientId,
      clientSecret: this.adminClientSecret,
      grantType: GrantTypes.CLIENT_CREDENTIALS,
      host: this.host,
    });
    const authorization = `${token_type} ${access_token}`;
    // Sign Up
    const resetPasswordUrl = `${this.host}/users/${userId}/reset-password`;
    const data = { type: 'password', temporary: false, value: newPassword };
    const headers = { authorization: authorization };

    try {
      axios.put(resetPasswordUrl, data, { headers });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error('AxiosError', error);
      }
      throw error;
    }
  }
}
