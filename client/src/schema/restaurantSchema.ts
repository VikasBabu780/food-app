import {z} from "zod"

export const restaurantFormSchema = z.object({
  restaurantName: z.string().nonempty("Restaurant Name is Required"),
  city: z.string().nonempty("City is Required"),
  country: z.string().nonempty("Country is Required"),
  deliveryTime: z.number().min(1, "Enter Valid Delivery Time"),
  cuisines: z.array(z.string().min(1)),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine(
      (file) => !file || file.size > 0,
      "Invalid image file"
    ),
});


export type RestaurantFormSchema = z.infer<typeof restaurantFormSchema>