import { expect } from 'chai';
import 'mocha';
import * as ts from 'typescript';
import { MetadataGenerator } from '@tsoa/cli/metadataGeneration/metadataGenerator';
import { GenerateMetadataError } from '@tsoa/cli/metadataGeneration/exceptions';

describe('Schema Regression Integration Tests', () => {
  it('reproduces issue #1862 with @types/json-schema', () => {
    const compilerOptions: ts.CompilerOptions = {
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2021,
      types: ['json-schema'],
    };

    expect(() => new MetadataGenerator('./fixtures/controllers/schemaRegressionController.ts', compilerOptions).Generate()).to.throw(
      GenerateMetadataError,
      "Could not find declarations for type 'Array<JSONSchema7Type>'. This might be a complex generic type that needs special handling.",
    );
  });
});
