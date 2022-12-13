import axios from '@hieudoanm/axios';

enum ContentTypes {
  APPLICATION_URLENCODED = 'application/x-www-form-urlencoded',
  APPLICATION_JSON = 'application/json',
}

export enum GrantTypes {
  CLIENT_CREDENTIALS = 'client_credentials',
  PASSWORD = 'password',
  REFRESH_TOKEN = 'refresh_token',
}

export type KeyCloakTokenResponse = {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  session_state: string;
  scope: string;
};

export type KeyCloakAddUserResponse = {
  email: string;
  emailVerified: boolean;
  enabled: boolean;
  firstName: string;
  groups: string[];
  lastName: string;
  requiredActions: string[];
};

export type KeyCloakUserInfoResponse = {
  sub: string;
  email_verified: boolean;
  preferred_username: string;
  email: string;
};

export type AddUserRequest = {
  enabled: boolean;
  groups: never[];
  email: string;
  emailVerified: boolean;
  username: string;
  requiredActions: never[];
  credentials: {
    type: string;
    value: string;
    temporary: boolean;
  }[];
};

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

  private async getToken({
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
  }): Promise<KeyCloakTokenResponse> {
    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', grantType);
    if (refreshToken !== '') {
      params.append('refresh_token', refreshToken);
    }
    if (username !== '') {
      params.append('username', username);
    }
    if (password !== '') {
      params.append('password', password);
    }

    const headers = { 'content-type': ContentTypes.APPLICATION_URLENCODED };
    const url = `${host}/protocol/openid-connect/token`;

    return axios.post<KeyCloakTokenResponse, URLSearchParams>(url, params, {
      headers,
    });
  }

  public async addUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<KeyCloakAddUserResponse> {
    // Get Admin Access Token
    const { access_token, token_type } = await this.getToken({
      host: this.host,
      clientId: this.adminClientId,
      clientSecret: this.adminClientSecret,
      grantType: GrantTypes.CLIENT_CREDENTIALS,
    });
    const authorization = `${token_type} ${access_token}`;
    // Sign Up
    const url = `${this.adminHost}/users`;
    const data: AddUserRequest = {
      enabled: true,
      groups: [],
      email: username,
      emailVerified: true,
      username,
      requiredActions: [],
      credentials: [{ type: 'password', value: password, temporary: false }],
    };
    const headers = { authorization };
    return axios.post<KeyCloakAddUserResponse, AddUserRequest>(url, data, {
      headers,
    });
  }

  public async getUserInfo(
    authorization: string
  ): Promise<KeyCloakUserInfoResponse> {
    const url = `${this.host}/protocol/openid-connect/userinfo`;
    const headers = { authorization };
    return axios.post<KeyCloakUserInfoResponse, object>(url, {}, { headers });
  }

  public async getUserToken({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<KeyCloakTokenResponse> {
    return this.getToken({
      host: this.host,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      grantType: GrantTypes.PASSWORD,
      username,
      password,
    });
  }

  public async refreshToken(
    refreshToken: string
  ): Promise<KeyCloakTokenResponse> {
    return this.getToken({
      host: this.host,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      grantType: GrantTypes.REFRESH_TOKEN,
      refreshToken: refreshToken,
    });
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
    await axios.post(url, params, { headers });
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
      host: this.host,
      clientId: this.adminClientId,
      clientSecret: this.adminClientSecret,
      grantType: GrantTypes.CLIENT_CREDENTIALS,
    });
    const authorization = `${token_type} ${access_token}`;
    // Sign Up
    const resetPasswordUrl = `${this.adminHost}/users/${userId}/reset-password`;
    const data = { type: 'password', temporary: false, value: newPassword };
    const headers = { authorization: authorization };
    await axios.put(resetPasswordUrl, data, { headers });
  }
}
