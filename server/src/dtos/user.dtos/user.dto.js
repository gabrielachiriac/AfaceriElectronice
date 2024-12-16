const { z } = require("zod");

const UserSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string()
    .min(8, "Parola trebuie sa aiba cel putin 8 caractere")
    .regex(/[A-Z]/, "Parola trebuie sa contina cel putin o litera mare")
    .regex(/[a-z]/, "Parola trebuie sa contina cel putin o litera mica")
    .regex(/[0-9]/, "Parola trebuie sa contina cel putin o cifra"),
});

module.exports = UserSchema;
