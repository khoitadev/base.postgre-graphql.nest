import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from '~/auth/decorators/public.decorator';
import { CreateLanguageInput } from '~/dto';
import { Language } from '~/entities';
import { LanguageService } from './language.service';

@Resolver(() => Language)
export class LanguageResolver {
  constructor(private readonly languageService: LanguageService) {}

  @Public()
  @Query(() => [Language], { name: 'languages' })
  findAll() {
    return this.languageService.findAll({});
  }

  @Public()
  @Mutation(() => Language)
  createLanguage(
    @Args('createLanguageInput') createLanguageInput: CreateLanguageInput,
  ) {
    return this.languageService.create(createLanguageInput);
  }
}
