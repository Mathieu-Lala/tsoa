import { expect } from 'chai';
import 'mocha';
import * as ts from 'typescript';
import { MetadataGenerator } from '@tsoa/cli/metadataGeneration/metadataGenerator';

describe('Schema Regression Integration Tests', () => {
  it('resolves issue #1862 with @types/json-schema without throwing', () => {
    const compilerOptions: ts.CompilerOptions = {
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      module: ts.ModuleKind.CommonJS,
      moduleResolution: ts.ModuleResolutionKind.Node10,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2021,
      types: ['json-schema'],
    };

    const metadata = new MetadataGenerator('./fixtures/controllers/schemaRegressionController.ts', compilerOptions).Generate();

    expect(metadata.controllers).to.have.length(1);
    const jsonSchemaArrayReference = Object.values(metadata.referenceTypeMap).find(type => type.refName.endsWith('JSONSchema7Array'));
    expect(jsonSchemaArrayReference).to.exist;
    expect(jsonSchemaArrayReference?.dataType).to.equal('refAlias');
    expect((jsonSchemaArrayReference as any)?.type?.dataType).to.equal('array');
  });
});
