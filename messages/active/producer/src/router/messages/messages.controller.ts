import { Body, Post, Route, Tags } from '@hieudoanm/fast';
import { ACTIVE_MQ_DESTINATION } from '../../environments';

import { stomp } from '../../libs/stomp';

@Tags('Messages')
@Route('messages')
export class MessagesController {
  @Post('produce')
  public async produce(
    @Body() { message }: { message: string }
  ): Promise<{ status: string }> {
    await stomp.send(ACTIVE_MQ_DESTINATION, message);
    return { status: 'success' };
  }
}
