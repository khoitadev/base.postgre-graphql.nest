import { Global, Module } from '@nestjs/common';
import { LoggingPlugin } from './plugins/logging.plugin';
import { DateScalar } from './scalars/date.scalar';

@Global()
@Module({
  providers: [
    // LoggingPlugin,
    DateScalar,
  ],
})
export class CommonModule {}
