import { createSchema, Type, typedModel } from 'ts-mongoose';
 
const PizzaSchema = createSchema(
  {
    name: Type.string({ required: true }),
    preferences: Type.object().of({
      sugar: Type.boolean(),
      water: Type.boolean(),
      bread: Type.boolean()
    }),
    size : Type.object().of({
      default: Type.object().of({
        weight: Type.string(),
        price: Type.object().of({
          value: Type.number(),
          currency: Type.string()
        })
      }),
      medium: Type.object().of({
        weight: Type.string(),
        price: Type.object().of({
          value: Type.number(),
          currency: Type.string()
        })
      }),
      large: Type.object().of({
        weight: Type.string(),
        price: Type.object().of({
          value: Type.number(),
          currency: Type.string()
        })
      })
    }),
    image: Type.object().of({
      url: Type.string(),
    })
  },
  { timestamps: { createdAt: true } }
);
 
const PizzaModel = typedModel('Pizza', PizzaSchema);

export default PizzaModel;
