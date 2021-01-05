import * as Yup from "yup";

//I had to create seperate schema and insert them in an array
//so that the form will get validated on each step of the form instead
//of trying to validate the form entirely when clicking next.
export const step1Schema = Yup.object().shape({
  price: Yup.string().required("Must Select A Price Amount"),
});
export const step2Schema = Yup.object().shape({
  make: Yup.string().required("Must Select The Make Of Vehicle"),
});
export const step3Schema = Yup.object().shape({
  model: Yup.string().required("Must Select The Model Of Vehicle"),
});
export const step4Schema = Yup.object().shape({
  income: Yup.string().required("Must Select An Estimated Income"),
});
export const step5Schema = Yup.object().shape({
  creditScore: Yup.string().required("Must Select A Credit Score"),
});

export const schemaArray = [
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
];
