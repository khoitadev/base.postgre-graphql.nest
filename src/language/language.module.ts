import { Module } from '@nestjs/common';
import { LanguageResolver } from '~/language/language.resolver';
import { LanguageService } from '~/language/language.service';

@Module({
  imports: [],
  providers: [LanguageService, LanguageResolver],
  exports: [LanguageService],
})
export class LanguageModule {}
