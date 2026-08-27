import type { JSONSchema7 } from 'json-schema';

// NOTE: These local decorator stubs are intentional for issue #1862 reproduction.
// Importing decorators from @tsoa/runtime pulls extra ambient typings that can
// hide the failing Array<JSONSchema7Type> path in this test environment.
function Route(_path: string): ClassDecorator {
  return () => {
    /**/
  };
}

function Tags(..._tags: string[]): ClassDecorator {
  return () => {
    /**/
  };
}

function Get(_path?: string): MethodDecorator {
  return () => {
    /**/
  };
}

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
