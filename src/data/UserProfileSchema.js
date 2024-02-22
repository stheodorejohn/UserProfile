import * as yup from "yup";

const profileSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Z\s]*$/, "Name should only contain letters and spaces"),
  age: yup.number()
    .typeError('Age must be a number') 
    .integer("Age must be an integer")
    .min(0, "Enter a valid Age"),
  gender: yup.string(),
  location: yup.string(),
  interest_1: yup.string(),
  interest_2: yup.string(),
  email: yup
    .string() 
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address"
    ),
  username: yup.string(),
  display_name: yup.string(),
});

export default profileSchema;
