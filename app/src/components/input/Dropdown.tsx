import { useField, useFormikContext } from 'formik'
import { useState } from 'react'
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown'

type DropdownValue = {
    label: string,
    value: string
}

type Props = {
    /**
     * Dropdown values.
     */
    data: DropdownValue[],
    /**
     * The input name attribute
     */
    name: string,
    /**
     * Placeholder text when no value is selected
     */
    placeholder?: string
}

/**
 * Dropdown element
 */
export default function Dropdown( { data, name, ...props }: Props ) {

    // Hooks
    const [ field ] = useField(name);

    /**
     * On dropdown value change
     * @param item new value
     */
    const handleChange = (item: DropdownValue) => {
        // Call Formik field's onChange
        field.onChange(name)(item.value)
    }

    return (
        <NativeDropdown
            data={data}
            labelField='label'
            valueField='value'
            onChange={handleChange}
            value={field.value}
            {...props}
        />
    )
}