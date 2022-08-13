import { RequestOtpResponse, VerifyOtpResponse } from './otp.types';

export const requestOTP = async (): Promise<RequestOtpResponse> => {
  return { otp: '' };
};

export const verifyOTP = async (): Promise<VerifyOtpResponse> => {
  return { verified: false };
};
