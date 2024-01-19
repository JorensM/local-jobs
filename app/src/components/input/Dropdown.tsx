import { useField, useFormikContext } from 'formik'
import { useState } from 'react'
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown'

type DropdownValue = {
    label: string,
    value: string
}

type Props = {
    data: DropdownValue[],
    name: string,
    placeholder?: string
}

export default function Dropdown( { data, name, ...props }: Props ) {

    const [ field ] = useField(name);

    const handleChange = (item: DropdownValue) => {
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