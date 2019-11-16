# Simple React/Redux/Bootstrap JSON Schema Form Builder Boilerplate

A simple React based boilerplate using Redux for state management of the forms' data, JSON schema for creation of forms and Bootstrap for appearance. Allows for dynamic fields that depend on input of other field

# Content

1. Installation
2. Usage
3. Schema Structure
    1. Form
    2. Fields
    3. Output
    4. Parsed JSON
4. Inputs
    1. Common properties
    2. Default values
    3. Types
6. State Management
    1. Structure
7. Limitations


## Installation

1. With node and npm installed, go to command line (at this root directory) and type ``` npm i && npm start ``` 

## Usage
1. Edit ``` src/schema/outline.json```
2. Run ``` npm start ``` after editing
3. Forms will be populated

### Schema Structure

In general this is how the schema looks like:
```
{
    form:{
        displayname: "First Form"
        fields:{
            ...
        }
        output:{

        }
    },
    anotherForm:{
        ...
    }
}
```
### Form

Within the form,  **displayName** key is required to specify the name of the form in the navbar

### Fields

Within the fields contains the specification of the different inputs. More about the inputs at the Input Types section

### Output

This is an optional key that outputs the results of the inputs in the format desired. Alternatively, one can access the data from the inputs via Redux. More on it at the State Management section

### Parsed JSON

The ```outline.json``` will be parsed and stored at ```src/data/processed/overall.json```. The location and the file name can be changed by editing the path inside the files: ```prep.js```, ```src/App.js``` and ```src/redux/reducers/reducerInput.js```.

## Inputs

### Common properties

Regardless of input types, all of the fields contains
```
displayName, width, type, dependent, placeholder
```

**displayName** - Appears on the label of the field (default value is '...')

**width** - The sizing of the field. Grid is based Bootstrap sizing (default value is 12)

**type** -  The types of the input. More on that in the Input Type section (Required)

**dependent** - Whether the input is dependent on another input (default value is null)

**placeholder** - Value to display inside the input when the input is empty (default is '' )

**show** - Determines whether the input should be shown but disabled or hidden when dependent is not null (default value is true)

### Default values

By default the field values are as such
```
        displayName: 'Default',
        width: 12,
        placeholder: '...',
        dependent: null,
        show: true,
        type: 'manual',
        case: {},
        data: {},
        prefix: '',
        suffix: '',
        regex: '.*'
```

### Types

Currently there are only 4 input types:

1. Manual
2. Dropdown
3. Case
4. Lookup

#### Manual Input

Manual input is a basic input that allows for prefix and suffix. Regex can also be added for input matching. Example 
```
"displayName": "Basic Input",
"dependent": null,
"placeholder": "Basic Input",
"type": "manual",
"regex": ".*",
"prefix": "",
"suffix": "",
"width": 6
```


#### Dropdown Input

Dropdown input is a basic input that allows for dropdown with autocomplete functionality 
```
"displayName": "Basic Dropdown",
"dependent": null,
"placeholder": "Basic Dropdown",
"type": "case",
"data": "month.json",
"width": 6
```
The ```month.json``` referenced resides in ```src/data``` and the format for the json should be in simple object key, value pairing.
```
{
    "January": "Jan",
    "February": "Feb",
    "March": "Mar",
    "April": "Apr",
    "May": "May",
    "June": "Jun",
    "July": "Jul",
    "August": "Aug",
    "September": "Sep",
    "October": "Oct",
    "November": "Nov",
    "December": "Dec"
}
```

#### Case Input

Case input is an advance input that is dependent on the input value referenced. Think of it as the cases in a switch statement.
```
"displayName": "Advance Case Dropdown",
"dependent": "basicDropdown",
"show": false,
"type": "case",
"width": 6,
"case": {
    "January": {
        "placeholder": "Manual Field",
        "type": "manual",
        "regex": "[A-Z]*",
        "prefix": "L_",
        "suffix": "LOL"
    },
    "February": {
        "placeholder": "Dropdown Field",
        "type": "dropdown",
        "data": "campaigns.json"
    }
}
```
The dependent key is referenced on the target field key while case key is referencing the key of the input. The case input is also able to reference on manual input as well.
```
"displayName": "Advance Case Manual Input",
"width": 6,
"dependent": "basicInput",
"type": "case",
"case":{
    "abracadabra": {
        "displayName": "Month",
        "width": 6,
        "type": "dropdown",
        "data": "month.json"
    },
    "hocuspocus":{
        "displayName": "Another manual Input",
        "width": 6,
        "type": "manual",
        "regex": "[A-Z]*"
    }
}

```
Do note that it supports only manual, dropdown and lookup as inputs within case. It does not support recursive referencing of a greater depth (i.e case field creating another case field...)

#### Lookup Input

Lookup input is an advance version of a dropdown that also dependent on the input value referenced. It is similar to case input where you can specify the data based on the dependent input. However, you can also specify what the dropdown content is going to be using a nested JSON object.
```
"displayName": "Weather",
"dependent": "basicInput",
"width": 6,
"type": "lookup",
"data": "season.json"
```
##### Linking up with manual input
The lookup input will be usable once the manual input matches the **key** of the JSON data specified in the schema

##### Linking up with a dropdown input

To link up the input data with the lookup input, the **key** of JSON data on the dropdown input needs to be specified on the JSON data of the lookup input
```
// dropdown input JSON data
{
    "January": "Jan",
    "February": "Feb",
    "March": "Mar",
    "April": "Apr",
    "May": "May",
    ...
}
```
```
// lookup input JSON data
{
    "January": {
        "Rainy": "rainy",
        "Sunny": "sunny"
    },
    "February": {
        "Rainy": "rainy",
        "Sunny": "sunny"
    },
    ...
}
```
Note that even with incomplete keys on the lookup side of the JSON data, it is still valid. This means that if the key can't be found, the lookup input would be disabled

## State Management

This repository uses redux for its centralised state of the inputs. It occupies the data inside ```Input``` of ```globalState.Input```.

### Structure

When the fields are created based on the the edits to ```outline.json``` the inputs entered are stored as follows:

When the fields are created based on the the edits to ```outline.json``` the inputs entered are stored as follows:
```
// Global State > Input >
{
    "Some Platform":
        {
        basicInput: [null, "Some Entered inputs"],
        basicDropdown: ["January", "Jan"]
        },
        ...
    ...,
}
```

The key "Some platform" and the key of the inputs is referenced from each of the form key and the key of the field specified respectively from ```outline.json```. 

The stored value on the other hand, is actually the 2nd item within the array (first item being the key of the data such as from dropdown JSON data, otherwise it is null)

## Limitations

**Simple Form components**

As of now there are only 2 main type of form component - select and text input. Other field types, such as radio buttons, slider and multiple select could be developed if such need arises. 

**Dynamic Fields**

Advance inputs can only depend on **one** other input (although chaining inputs, one after another is possible).


