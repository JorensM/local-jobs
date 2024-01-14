import { useField, useFormikContext } from 'formik'
import { useState } from 'react'
import { Dropdown as NativeDropdown } from 'react-native-element-dropdown'
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model'

type Props = {
    data: any[],
    name: string,
    formik: any,
    placeholder?: string
}

export default function Dropdown( { data, formik, name, ...props }: Props ) {

    const [value, setValue] = useState<any>(null)

    const [field] = useField(name)

    const { setFieldValue } = useFormikContext()

    const handleChange = (item: any) => {
        //const event: any = {}
        //event.target.name = name
        //event.target.value = item.value
        //setValue(item.value)
        setFieldValue(name, item.value)
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