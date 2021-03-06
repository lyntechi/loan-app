import * as Yup from "yup";

export const formSchema = Yup.object().shape({
  username: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^[A-Za-z\d@$!%*#?&]{8,}$/, "Must contain more than 8 Characters")
    .matches(/^.*[0-9].*$/, "Must contain atleast 1 number"),
  confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
