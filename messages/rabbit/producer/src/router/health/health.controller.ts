import { Controller, Get, Route, Tags } from '@hieudoanm/fast';

@Tags('Health')
@Route('health')
export class HealthController extends Controller {
  @Get()
  public get() {
    return { status: 'healthy' };
  }
}
