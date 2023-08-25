import { useState } from 'react'
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

type Props = {
    data: any[],
    formik: any,
    placeholder?: string
}

export default function Dropdown( { data, formik, ...props }: Props ) {

    const [value, setValue] = useState<any>(null)

    const handleChange = (item: any) => {
        setValue(item.value)
        formik.handleChange(item.value)
    }

    return (
        <NativeDropdown
            data={data}
            labelField='label'
            valueField='value'
            onChange={handleChange}
            value={value}
            {...props}
        />
    )
}