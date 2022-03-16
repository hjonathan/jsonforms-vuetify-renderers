import { JsonSchema, UISchemaElement } from '@jsonforms/core';
import { maxBy } from 'lodash';

import { SchemaElement } from '../../../model';
import { EditorUISchemaElement } from '../../../model/uischema';

export interface PropertiesService {
  getProperties(
    uiElement: any,
    schemaElement: any
  ): PropertySchemas | undefined;
}

/**
 * Schemas describing the properties view of an editor element.
 */
export interface PropertySchemas {
  schema: JsonSchema;
  uiSchema?: UISchemaElement;
}

/**
 * Decorator for the PropertySchemas of an EditorUISchemaElement.
 */
export interface PropertySchemasDecorator {
  (
    schemas: PropertySchemas,
    uiElement: EditorUISchemaElement,
    schemaElement?: SchemaElement
  ): PropertySchemas;
}

/**
 * Constant that indicates that a tester is not capable of handling
 * an EditorUISchemaElement.
 */
export const NOT_APPLICABLE = -1;

/**
 * Returns a PropertySchemas object for an EditorUISchemaElement. The tester will return a ranking
 * or NOT_APPLICABLE if the provider cannot supply any schema for the given editor element. */
export interface PropertySchemasProvider {
  tester: (uiElement: EditorUISchemaElement) => number;
  getPropertiesSchemas: (
    uiElement: EditorUISchemaElement,
    schemaElement?: SchemaElement
  ) => PropertySchemas;
}
export class PropertiesServiceImpl implements PropertiesService {
  constructor(
    private schemaProviders: PropertySchemasProvider[],
    private schemaDecorators: PropertySchemasDecorator[],
    private schemaVariableDecorators: PropertySchemasDecorator[],
    private schemaRequiredDecorators: PropertySchemasDecorator[]
  ) {}
  getDesignProperties = (
    uiElement: EditorUISchemaElement,
    schemaElement: SchemaElement | undefined
  ): PropertySchemas | undefined => {
    const provider = maxBy(this.schemaProviders, (p) => p.tester(uiElement));
    if (!provider || provider.tester(uiElement) === NOT_APPLICABLE) {
      return undefined;
    }
    const elementSchemas = provider.getPropertiesSchemas(
      uiElement,
      schemaElement
    );
    if (!elementSchemas) {
      return undefined;
    }
    const decoratedSchemas = this.schemaDecorators.reduce(
      (schemas, decorator) => decorator(schemas, uiElement, schemaElement),
      elementSchemas
    );
    return decoratedSchemas;
  };
  getVariableSettings = (
    uiElement: EditorUISchemaElement,
    schemaElement: SchemaElement | undefined
  ): PropertySchemas | undefined => {
    const provider = maxBy(this.schemaProviders, (p) => p.tester(uiElement));
    if (!provider || provider.tester(uiElement) === NOT_APPLICABLE) {
      return undefined;
    }
    const elementSchemas = provider.getPropertiesSchemas(
      uiElement,
      schemaElement
    );
    if (!elementSchemas) {
      return undefined;
    }
    const decoratedSchemas = this.schemaVariableDecorators.reduce(
      (schemas, decorator) => decorator(schemas, uiElement, schemaElement),
      elementSchemas
    );
    return decoratedSchemas;
  };
  getRequiredSettings = (
    uiElement: EditorUISchemaElement,
    schemaElement: SchemaElement | undefined
  ): PropertySchemas | undefined => {
    const provider = maxBy(this.schemaProviders, (p) => p.tester(uiElement));
    if (!provider || provider.tester(uiElement) === NOT_APPLICABLE) {
      return undefined;
    }
    const elementSchemas = provider.getPropertiesSchemas(
      uiElement,
      schemaElement
    );
    if (!elementSchemas) {
      return undefined;
    }
    const decoratedSchemas = this.schemaRequiredDecorators.reduce(
      (schemas, decorator) => decorator(schemas, uiElement, schemaElement),
      elementSchemas
    );
    return decoratedSchemas;
  };
}
