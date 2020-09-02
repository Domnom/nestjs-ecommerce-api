export interface IValidatorConstraintError 
{
    description : string;
}

export interface IEnumValidatorConstraintError extends IValidatorConstraintError
{
    enumValues: string[];
}

export interface IEmailValidatorConstraintError extends IValidatorConstraintError
{

}

export interface IUrlValidatorConstraintError extends IValidatorConstraintError
{

}

export interface IMaxLengthValidatorConstraintError extends IValidatorConstraintError
{
    maxLength: number;
}

export interface IMinLengthValidatorConstraintError extends IValidatorConstraintError
{
    minLength: number;
}

export interface IMinValidatorConstraintError extends IValidatorConstraintError
{
    min: number;
}

export interface IMaxValidatorConstraintError extends IValidatorConstraintError
{
    max: number;
}

export interface IMatchValidatorConstraintError extends IValidatorConstraintError
{
    patterns?: {
        message: string,
        example: string,
        format: string
    }[]
}

export interface IRequiredValidatorConstraintError extends IValidatorConstraintError
{
    requiredProperties?: string[];
}

export interface IUniqueValidatorConstraintError extends IValidatorConstraintError
{

}

export interface IInvalidTypeValidatorConstraintError extends IValidatorConstraintError
{
    valueTypes : string[];
}

export interface ISemverValidatorConstraintError extends IValidatorConstraintError
{

}

export interface IVersionNotFoundValidatorConstraintError extends IValidatorConstraintError
{
    version: string;
}

export interface INotFoundValidatorConstraintError extends IValidatorConstraintError
{

}

export interface IPlaybookJsonNotFoundValidatorConstraintError extends IValidatorConstraintError
{
    blueprint_url: string;
    draft_blueprint_git_checkout_ref: string;
}

export interface INoAdditionalPropertiesValidatorConstraintError extends IValidatorConstraintError
{
    additionalProperties: string[];
}

export interface IMultipleOfValidatorConstraintError extends IValidatorConstraintError
{
    multipleOf: number;
}

export interface IPlaybookIsNotABlueprintConstraintError extends IValidatorConstraintError
{

}

export interface IBlueprintVersionUnpublishedConstraintError extends IValidatorConstraintError
{

}

export interface IInvalidRelationshipConstraintError extends IValidatorConstraintError
{

}

/**
 * Base validator constraint class to define the constraint for a given validation
 *
 * @export
 * @class ValidatorConstraintError
 * @extends {Error}
 */
export class ValidatorConstraintError extends Error 
{
    type: string;
    description: string;

    /**
     * Create a new ValidatorConstraintError. Please use the child constraints unless extending this class
     * 
     * @param {string} type The type of constraint. (eg minlength, maxlength)
     * @param {string} description A description of the constraint
     * @memberof ValidatorConstraintError
     */
    constructor(type: string, description: string)
    {
        super();
        
        this.type = type;
        this.description = description;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IValidatorConstraintError}
     * @memberof ValidatorConstraintError
     */
    toJson(): IValidatorConstraintError
    {
        return {
            description : this.description
        }
    }
}


/**
 * The Enum constraint is to be used when a provided value is not provided in an enum
 *
 * @export
 * @class EnumValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class EnumValidatorConstraintError extends ValidatorConstraintError
{    
    enumValues: string[];

    /**
     * Creates an instance of EnumValidatorConstraintError.
     * 
     * @param {string[]} enumValues
     * @param {string} [description="The value must match one of the given enum values"]
     * @memberof EnumValidatorConstraintError
     */
    constructor(
        enumValues: string[], 
        description: string = "The value must match one of the given enum values"
    ) {
        super("enum", description)

        this.enumValues = enumValues;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IEnumValidatorConstraintError}
     * @memberof EnumValidatorConstraintError
     */
    toJson(): IEnumValidatorConstraintError
    {
        return {
            ...super.toJson(),
            enumValues: this.enumValues
        }
    }
}



/**
 * The Email constraint is to be used when a provided value is not a valid email
 *
 * @export
 * @class EmailValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class EmailValidatorConstraintError extends ValidatorConstraintError 
{
    /**
     * Creates an instance of EmailValidatorConstraintError.
     * 
     * @memberof EmailValidatorConstraintError
     */
    constructor() {
        super("email", "The value must be a valid email");
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IEmailValidatorConstraintError}
     * @memberof EmailValidatorConstraintError
     */
    toJson(): IEmailValidatorConstraintError 
    {
        return super.toJson();
    }

}




/**
 * Used when a url is invalid (malformed)
 *
 * @export
 * @class UrlValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class UrlValidatorConstraintError extends ValidatorConstraintError 
{
    /**
     * Creates an instance of UrlValidatorConstraintError.
     * 
     * @memberof UrlValidatorConstraintError
     */
    constructor(description: string = "The url is invalid") {
        super("url", description);
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IUrlValidatorConstraintError}
     * @memberof UrlValidatorConstraintError
     */
    toJson(): IUrlValidatorConstraintError 
    {
        return super.toJson();
    }

}



/**
 * The Max length constraint is to be used when a provided value is too long
 *
 * @export
 * @class MaxLengthValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class MaxLengthValidatorConstraintError extends ValidatorConstraintError
{
    maxLength: number;

    /**
     * Creates an instance of MaxLengthValidatorConstraintError.
     * 
     * @param {number} maxLength
     * @memberof MaxLengthValidatorConstraintError
     */
    constructor(maxLength: number) 
    {
        super("maxLength", "The value must have a maximum character length of '" + maxLength + "'")

        this.maxLength = maxLength;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IMaxLengthValidatorConstraintError}
     * @memberof MaxLengthValidatorConstraintError
     */
    toJson(): IMaxLengthValidatorConstraintError
    {
        return {
            ...super.toJson(),
            maxLength : this.maxLength
        }
    }
}


/**
 * The Min length constraint is to be used when a provided value is too short
 *
 * @export
 * @class MinLengthValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class MinLengthValidatorConstraintError extends ValidatorConstraintError
{
    minLength: number;

    /**
     * Creates an instance of MinLengthValidatorConstraintError.
     * 
     * @param {number} minLength
     * @memberof MinLengthValidatorConstraintError
     */
    constructor(minLength: number) 
    {
        super("minLength", "The value must have a minimum character length of '" + minLength + "'")

        this.minLength = minLength;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IMinLengthValidatorConstraintError}
     * @memberof MinLengthValidatorConstraintError
     */
    toJson(): IMinLengthValidatorConstraintError
    {
        return {
            ...super.toJson(),
            minLength : this.minLength
        }
    }
}


/**
 * The Max constraint is to be used when a provided numeric value is above maximum
 *
 * @export
 * @class MaxValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class MaxValidatorConstraintError extends ValidatorConstraintError
{
    max: number;

    /**
     * Creates an instance of MaxValidatorConstraintError.
     * 
     * @param {number} max
     * @memberof MaxValidatorConstraintError
     */
    constructor(max: number) 
    {
        super("max", "The value must have a maximum numeric value of '" + max + "'")

        this.max = max;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IMaxValidatorConstraintError}
     * @memberof MaxValidatorConstraintError
     */
    toJson(): IMaxValidatorConstraintError
    {
        return {
            ...super.toJson(),
            max : this.max
        }
    }
}


/**
 * The Min constraint is to be used when a provided numeric value is below minimum
 *
 * @export
 * @class MinValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class MinValidatorConstraintError extends ValidatorConstraintError
{
    min: number;

    /**
     * Creates an instance of MinValidatorConstraintError.
     * 
     * @param {number} min
     * @memberof MinValidatorConstraintError
     */
    constructor(min: number) 
    {
        super("min", "The value must have a minimum numeric value of '" + min + "'")

        this.min = min;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IMinValidatorConstraintError}
     * @memberof MinValidatorConstraintError
     */
    toJson(): IMinValidatorConstraintError
    {
        return {
            ...super.toJson(),
            min : this.min
        }
    }
}



/**
 * The Match constraint is to be used when a value does not match a string pattern
 *
 * @export
 * @class MatchValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class MatchValidatorConstraintError extends ValidatorConstraintError
{
    patterns: { message: string, example: string, format: string }[];
    /**
     * Creates an instance of MatchValidatorConstraintError.
     * 
     * @param {string} description
     * @memberof MatchValidatorConstraintError
     */
    constructor(description: string = "The value does not match a given string pattern") 
    {
        super("match", description);
        this.patterns = [];
    }

    /**
     * Adds to the patterns array a description and a basic example and format 
     *
     * @param {string} message
     * * @param {string} example
     * @param {string} format
     * @memberof MatchValidatorConstraintError
     */
    addPattern(message: string, example?: string, format?: string)
    {
        this.patterns.push({
            message : message,
            example : example,
            format: format
        });
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IMatchValidatorConstraintError}
     * @memberof MatchValidatorConstraintError
     */
    toJson(): IMatchValidatorConstraintError
    {
        let returnData: IMatchValidatorConstraintError = {
            ...super.toJson()
        }

        if (this.patterns.length != 0)
        {
            returnData.patterns = this.patterns;
        }

        return returnData;
    }
}



/**
 * The Required constraint is to be used when a value is required
 *
 * @export
 * @class RequiredValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class RequiredValidatorConstraintError extends ValidatorConstraintError
{
    requiredProperties: string[];

    /**
     * Creates an instance of RequiredValidatorConstraintError.
     * 
     * @param {string} description
     * @memberof RequiredValidatorConstraintError
     */
    constructor() 
    {
        super("required", "This property is required");
        this.requiredProperties = [];
    }

    /**
     * Adds a property to the required properties array. This will printed out in the toJson();
     *
     * @param {string} propertyName
     * @memberof RequiredValidatorConstraintError
     */
    addProperty(propertyName: string)
    {
        if (!this.requiredProperties.includes(propertyName))
        {
            this.requiredProperties.push(propertyName);

            this.description = "One or more of these properties are required";
        }
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IRequiredValidatorConstraintError}
     * @memberof RequiredValidatorConstraintError
     */
    toJson(): IRequiredValidatorConstraintError
    {
        return {
            ...super.toJson(),
            requiredProperties : this.requiredProperties.length === 0 ? undefined : this.requiredProperties
        }
    }
}

/**
 * The Unique constraint is to be used when a value is not unique
 *
 * @export
 * @class UniqueValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class UniqueValidatorConstraintError extends ValidatorConstraintError
{
    /**
     * Creates an instance of UniqueValidatorConstraintError.
     * 
     * @memberof UniqueValidatorConstraintError
     */
    constructor(description: string = "This value must be unique") 
    {
        super("unique", description);
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IUniqueValidatorConstraintError}
     * @memberof UniqueValidatorConstraintError
     */
    toJson(): IUniqueValidatorConstraintError
    {
        return {
            ...super.toJson()
        }
    }
}


/**
 * The Invalid Type constraint is to be used when a values type does not match the required type
 *
 * @export
 * @class UniqueValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class InvalidTypeValidatorConstraintError extends ValidatorConstraintError
{
    valueTypes: string[];

    /**
     * Creates an instance of InvalidTypeValidatorConstraintError.
     * 
     * @memberof InvalidTypeValidatorConstraintError
     */
    constructor(valueTypes: string[], description?: string) 
    {
        super("invalidType", description ? description : "This value must be one of the following types: " + valueTypes.join(', '));

        this.valueTypes = valueTypes;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IInvalidTypeValidatorConstraintError}
     * @memberof InvalidTypeValidatorConstraintError
     */
    toJson(): IInvalidTypeValidatorConstraintError
    {
        return {
            ...super.toJson(),
            valueTypes : this.valueTypes
        }
    }
}


/**
 * The Semver constraint is to be used when the value does not match semver requirements
 *
 * @export
 * @class SemverValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class SemverValidatorConstraintError extends ValidatorConstraintError
{
    /**
     * Creates an instance of SemverValidatorConstraintError.
     * 
     * @memberof SemverValidatorConstraintError
     */
    constructor()
    {
        super("semver", "This value must have valid semver formatting. See https://semver.org/");
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {ISemverValidatorConstraintError}
     * @memberof SemverValidatorConstraintError
     */
    toJson(): ISemverValidatorConstraintError
    {
        return {
            ...super.toJson()
        }
    }
}


/**
 * When the version cannot be found
 *
 * @export
 * @class VersionNotFoundValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class VersionNotFoundValidatorConstraintError extends ValidatorConstraintError
{
    version: string;

    /**
     * Creates an instance of VersionNotFoundValidatorConstraintError.
     * 
     * @memberof VersionNotFoundValidatorConstraintError
     */
    constructor(version: string)
    {
        super("versionNotFound", "The version provided could not be found");

        this.version = version;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IVersionNotFoundValidatorConstraintError}
     * @memberof VersionNotFoundValidatorConstraintError
     */
    toJson(): IVersionNotFoundValidatorConstraintError
    {
        return {
            ...super.toJson(),
            version: this.version
        }
    }
}



/**
 * When the fetched url returns a 404 (used when fetching github projects)
 *
 * @export
 * @class NotFoundValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class NotFoundValidatorConstraintError extends ValidatorConstraintError
{
    /**
     * Creates an instance of NotFoundValidatorConstraintError.
     * 
     * @memberof NotFoundValidatorConstraintError
     */
    constructor(description: string = "Resource could not be found")
    {
        super("urlNotFound", description);
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {INotFoundValidatorConstraintError}
     * @memberof NotFoundValidatorConstraintError
     */
    toJson(): INotFoundValidatorConstraintError
    {
        return {
            ...super.toJson()
        }
    }
}


/**
 * When a playbook.json file cannot be found in a branch/tag of a blueprint_url
 *
 * @export
 * @class PlaybookJsonNotFoundValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class PlaybookJsonNotFoundValidatorConstraintError extends ValidatorConstraintError
{
    blueprint_url: string;
    draft_blueprint_git_checkout_ref: string;

    /**
     * Creates an instance of PlaybookJsonNotFoundValidatorConstraintError.
     * 
     * @memberof PlaybookJsonNotFoundValidatorConstraintError
     */
    constructor(blueprintUrl: string, draftBlueprintGitCheckoutRef: string, description: string = "Resource could not be found")
    {
        super("playbookJsonNotFound", description);
        this.blueprint_url = blueprintUrl;
        this.draft_blueprint_git_checkout_ref = draftBlueprintGitCheckoutRef;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IPlaybookJsonNotFoundValidatorConstraintError}
     * @memberof PlaybookJsonNotFoundValidatorConstraintError
     */
    toJson(): IPlaybookJsonNotFoundValidatorConstraintError
    {
        return {
            ...super.toJson(),
            blueprint_url : this.blueprint_url,
            draft_blueprint_git_checkout_ref : this.draft_blueprint_git_checkout_ref
        }
    }
}




/**
 * Used by Json schema when there is an object that does not allow additional properties
 *
 * @export
 * @class NoAdditionalPropertiesValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class NoAdditionalPropertiesValidatorConstraintError extends ValidatorConstraintError {

    additionalProperties: string[];

    /**
     * Creates an instance of NoAdditionalPropertiesValidatorConstraintError.
     * 
     * @memberof NoAdditionalPropertiesValidatorConstraintError
     */
    constructor()
    {
        super("noAdditionalProperties", "The data should not contain these additional properties");
        this.additionalProperties = [];
    }

    addProperty(propertyName: string)
    {
        if (!this.additionalProperties.includes(propertyName))
        {
            this.additionalProperties.push(propertyName);
        }
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {INoAdditionalPropertiesValidatorConstraintError}
     * @memberof NoAdditionalPropertiesValidatorConstraintError
     */
    toJson(): INoAdditionalPropertiesValidatorConstraintError
    {
        return {
            ...super.toJson(),
            additionalProperties: this.additionalProperties
        }
    }
}


/**
 * When a number is not a multiple of a given rule
 *
 * @export
 * @class MultipleOfValidatorConstraintError
 * @extends {ValidatorConstraintError}
 */
export class MultipleOfValidatorConstraintError extends ValidatorConstraintError {

    multipleOf: number;

    /**
     * Creates an instance of MultipleOfValidatorConstraintError.
     * 
     * @memberof MultipleOfValidatorConstraintError
     */
    constructor(multipleOf: number)
    {
        super("multipleOf", "The data is not a multiple of " + multipleOf);
        this.multipleOf = multipleOf;
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IMultipleOfValidatorConstraintError}
     * @memberof MultipleOfValidatorConstraintError
     */
    toJson(): IMultipleOfValidatorConstraintError
    {
        return {
            ...super.toJson(),
            multipleOf: this.multipleOf
        }
    }
}



/**
 * When a playbook cannot be forked as it is not a blueprint (does not have blueprint_url defined)
 *
 * @export
 * @class PlaybookIsNotABlueprintConstraintError
 * @extends {ValidatorConstraintError}
 */
export class PlaybookIsNotABlueprintConstraintError extends ValidatorConstraintError {

    /**
     * Creates an instance of PlaybookIsNotABlueprint.
     * 
     * @memberof PlaybookIsNotABlueprintConstraintError
     */
    constructor()
    {
        super("playbookIsNotABlueprint", "The selected playbook cannot be forked as it is not a blueprint");
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IPlaybookIsNotABlueprintConstraintError}
     * @memberof PlaybookIsNotABlueprintConstraintError
     */
    toJson(): IPlaybookIsNotABlueprintConstraintError
    {
        return {
            ...super.toJson()
        }
    }
}


/**
 * The chosen blueprint version exists but is not published
 *
 * @export
 * @class BlueprintVersionUnpublishedConstraintError
 * @extends {ValidatorConstraintError}
 */
export class BlueprintVersionUnpublishedConstraintError extends ValidatorConstraintError {

    /**
     * Creates an instance of PlaybookIsNotABlueprint.
     * 
     * @memberof BlueprintVersionUnpublished
     */
    constructor()
    {
        super("blueprintVersionUnpublished", "The selected blueprint version is unpublished!");
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IBlueprintVersionUnpublishedConstraintError}
     * @memberof BlueprintVersionUnpublishedConstraintError
     */
    toJson(): IBlueprintVersionUnpublishedConstraintError
    {
        return {
            ...super.toJson()
        }
    }
}


/**
 * A model relationship should not exist. This would happen if:
 * - A nanodegree.children entry points to itself
 * - If we have any relationships that should not exist 
 *
 * @export
 * @class InvalidRelationshipConstraintError
 * @extends {ValidatorConstraintError}
 */
export class InvalidRelationshipConstraintError extends ValidatorConstraintError {

    /**
     * Creates an instance of InvalidRelationshipConstraintError.
     * 
     * @memberof InvalidRelationshipConstraintError
     */
    constructor(description: string = "An invalid relationship was found")
    {
        super("invalidRelationship", description);
    }

    /**
     * Return the json formatted constraint
     *
     * @returns {IBlueprintVersionUnpublishedConstraintError}
     * @memberof InvalidRelationshipConstraintError
     */
    toJson(): IInvalidRelationshipConstraintError
    {
        return {
            ...super.toJson()
        }
    }
}