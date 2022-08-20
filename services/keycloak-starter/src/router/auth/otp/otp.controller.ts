import { Controller, Post, Route, Tags } from 'tsoa';
import { requestOTP, verifyOTP } from './otp.service';
import { RequestOtpResponse, VerifyOtpResponse } from './otp.types';

@Route('auth/otp')
@Tags('Authentication', 'OTP')
export class OtpController extends Controller {
  @Post('request')
  public async requestOTP(): Promise<RequestOtpResponse> {
    return requestOTP();
  }

  @Post('verify')
  public async verifyOTP(): Promise<VerifyOtpResponse> {
    return verifyOTP();
  }
}
