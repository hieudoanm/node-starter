import { Body, Post, Route, Tags } from '@hieudoanm/fast';
import configs from '../../environments';
import { rabbitClient } from '../../libs/rabbit';

@Tags('Messages')
@Route('messages')
export class MessagesController {
  @Post('produce')
  public async produce(
    @Body() { message }: { message: string }
  ): Promise<void> {
    rabbitClient.sendToQueue(configs.rabbit.queue, message);
    return;
  }
}
