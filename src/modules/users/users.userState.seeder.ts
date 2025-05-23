import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { UserState } from '../user-state/entities/user-state.entity';
import { Emotion } from '../emotions/entities/emotion.entity';
import { EmotionIntensity } from '../emotions/entities/intensidad.enum';

function randomDateWithinLastDays(days: number): Date {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - days);

  const randomTime = past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(randomTime);
}
export async function seedUsersAndUserStates(
  userRepo: Repository<User>,
  stateRepo: Repository<UserState>,
  emotionRepo: Repository<Emotion>,
) {
  try {
    console.log('Iniciando seeder de usuarios y estados de usuario');

    const usersData = [
      {
        name: 'María González',
        email: 'maria@example.com',
        password: 'ContraSegura123!',
        address: 'Calle Falsa 123, Córdoba',
        profileImage: 'https://miapp.com/images/perfil/maria.png',
      },
      {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        password: 'OtraSegura123!',
        address: 'Calle Verdadera 456, Córdoba',
        profileImage: 'https://miapp.com/images/perfil/juan.png',
      },
    ];

    for (const userData of usersData) {
      const existing = await userRepo.findOneBy({ email: userData.email });

      if (!existing) {
        const hash = await bcrypt.hash(userData.password, 10);
        const newUser = userRepo.create({ ...userData, password: hash });
        await userRepo.save(newUser);
        console.log(`Usuario creado en seeder: ${userData.email}`);
      } else {
        console.log(`Usuario ya existe: ${userData.email}`);
      }
    }

    const maria = await userRepo.findOneBy({ email: 'maria@example.com' });
    const emociones = await emotionRepo.find();

    if (!maria || emociones.length < 30) {
      throw new Error('Usuario o emociones no disponibles');
    }

    const intensidades = Object
      .values(EmotionIntensity)
      .filter(value => typeof value === 'number') as EmotionIntensity[];

    for (let i = 0; i < 30; i++) {
      const emocion = emociones[i % emociones.length];
      const intensidad = intensidades[i % intensidades.length];


      const userState = stateRepo.create({
        user: maria,
        emotion: emocion,
        intensidad: intensidad,
        comentario: `Comentario ${i + 1} sobre ${emocion.name}`,
        date: randomDateWithinLastDays(30),
      });

      await stateRepo.save(userState);
      console.log(`Estado creado: ${emocion.name} para María`);
    }

    console.log('Seeder de usuarios y estados completo');
  } catch (error) {
    console.error('Error al seedear usuarios y estados:', error);
  }
}
