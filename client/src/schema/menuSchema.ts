import { z } from "zod";

export const menuSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),

  description: z
    .string()
    .nonempty({ message: "Description is required" }),

  price: z.number().min(0, { message: "Enter Valid Price" }),

  image: z
    .union([
      z.instanceof(File),
      z.string(), 
    ])
    .optional(),
});

export type MenuFormSchema = z.infer<typeof menuSchema>;
