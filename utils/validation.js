import * as Yup from "yup";

export const locationAddSchema = Yup.object().shape({
  nickname: Yup.string().required("Takma ad gerekli"),
  code: Yup.string().required("Konum kodu gerekli"),
});
