import { Body, Post, Route, Tags } from '@hieudoanm/express';
import { sendMessage } from './messages.service';

@Tags('Messages')
@Route('messages')
export class MessagesController {
  @Post('produce')
  public async produce(
    @Body() { message }: { message: string }
  ): Promise<AWS.SQS.SendMessageResult> {
    return sendMessage(message);
  }
}
