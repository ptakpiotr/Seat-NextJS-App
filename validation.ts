import * as yup from "yup";

export const newsSchema = yup.object({
  image: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  categories: yup.array(
    yup.object({
      id: yup.number().required(),
      name: yup.string().required(),
    })
  ),
});

export const eventSchema = yup.object({
  start: yup.date().required(),
  end: yup.date().required(),
  info: yup.string().required(),
});

export type AddNewsType = yup.InferType<typeof newsSchema>;
export type EventType = yup.InferType<typeof eventSchema>;
