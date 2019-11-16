import React from 'react';
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Platform from './Platform';

let t1 = {
    data: {},
    name: "",
    show: false
}
let t2 = {
    data: {
        displayName: "Testing",
        fields:{
            basicInput: {
                "displayName": "Basic Input",
                "dependent": null,
                "placeholder": "Basic Input",
                "type": "manual",
                "regex": ".*",
                "prefix": "",
                "suffix": "",
                "width": 6
            }
        }
    },
    name: "",
    show: false
}
let t3 = {
    data: {
        displayName: "Testing",
        fields:{
            basicDropdown:{
                "displayName": "Basic Dropdown",
                "dependent": null,
                "placeholder": "Basic Dropdown",
                "type": "dropdown",
                "data": "month.json",
                "width": 6
            }
        }
    },
    name: "",
    show: false
}
test('Platform.js - Empty form', () => {
    const { getByLabelText } = render(<Platform />);
    expect(getByLabelText('')).toBeInTheDocument();
  });
