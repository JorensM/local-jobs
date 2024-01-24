// Core
import * as Yup from 'yup';

export const usernameSchema = Yup.string().min(5).max(32).label('Name');
export const userRoleSchema = Yup.string().matches(/perfomer|recruiter/, 'Role must be either performer or recruiter').label('Role');
export const userPhoneCountryCodeSchema = Yup.string().matches(/^(|\d)+$/, "Country code must consist only of numbers").max(7).label('Country Code');
export const userPhoneNumberSchema = Yup.string().matches(/^(|\d)+$/, "Phone number must consist only of numbers").max(20).label('Phone number');

export const userSchemaPartial = Yup.object({
    id: Yup.string(),
    name: usernameSchema,
    role: userRoleSchema,
    phone_country_code: userPhoneCountryCodeSchema,
    phone_number: userPhoneNumberSchema
    //phone_number: Yup.string().matches(/^\d+$/, "Phone number must consist only of numbers").max(20).label('Phone number')
});