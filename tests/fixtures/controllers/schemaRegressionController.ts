import { Get, Route, Tags } from '@tsoa/runtime';
import type { JSONSchema7 } from 'json-schema';

@Route('SchemaRegression')
@Tags('SchemaRegression')
export class SchemaRegressionController {
  @Get()
  public getSchema(): JSONSchema7 {
    return {
      $schema: 'http://json-schema.org/draft-07/schema#',
      type: 'object',
      enum: ['message'],
      properties: {
        message: {
          type: 'string',
        },
      },
      required: ['message'],
      additionalProperties: false,
    };
  }
}
