import { KEY_CLOAK_ADMIN_HOST } from '../../../configs';
import { axiosGet } from '../../../libs/axios';
import { getAdminToken, getAuthorization } from '../../../libs/key-cloak';
import { KeyCloakTokenResponse } from '../../../libs/key-cloak/key-cloak.types';
import { User } from './users.types';

export const getUser = async (
  email: string
): Promise<{ user: User | null }> => {
  // Get Admin Access Token
  const adminToken: KeyCloakTokenResponse = await getAdminToken();
  const adminAuthorization: string = getAuthorization(adminToken);
  // Get User
  const urlSearchParams = new URLSearchParams();
  urlSearchParams.set('username', email);
  urlSearchParams.set('exact', 'true');
  const getUserURL = `${KEY_CLOAK_ADMIN_HOST}/users?${urlSearchParams.toString()}`;
  const headers = { authorization: adminAuthorization };
  const users = await axiosGet<User[]>(getUserURL, { headers });
  if (users.length === 1) {
    return { user: users[0] };
  }
  return { user: null };
};
