import * as Yup from "yup";

export const locationAddSchema = Yup.object().shape({
  nickname: Yup.string().required("Takma ad gerekli"),
  locationCode: Yup.string().required("Konum kodu gerekli"),
});
