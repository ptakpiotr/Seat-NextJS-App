import * as yup from "yup";

export const newsSchema = yup.object({
  image: yup.string().url().required(),
  title: yup.string().required(),
  categories: yup.array(
    yup.object({
      id: yup.number().required(),
      name: yup.string().required(),
    })
  ),
});

export type AddNewsType = yup.InferType<typeof newsSchema>;
