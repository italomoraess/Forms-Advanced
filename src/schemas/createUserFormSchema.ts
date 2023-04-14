import { z } from 'zod';

export const createUserFormSchema = z.object({
  name: z.string()
  .nonempty('O nome é obrigatório')
  .transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleLowerCase().concat(word.substring(1))
    }).join(' ');
  }),
  email: z.string()
  .nonempty('O e-mail é obrigatorio')
  .email('Formato de e-mail invalido'),
  password: z.string()
  .nonempty('A senha é obrigatória')
  .min(6, 'A senha precisa de no mínimo 6 caracteres'),
  techs: z.array(z.object({
    title: z.string().nonempty('O título é obrigatorio'),
    knowledge: z.coerce.number().min(1).max(10),
  })).min(2, 'Insira pelo menos 2 tecnologias')
})

export type CreateUserFormData = z.infer<typeof createUserFormSchema>;