import { Emotion } from './entities/emotion.entity';
import { Repository } from 'typeorm';

export async function seedEmotions(repo: Repository<Emotion>) {
  try {
    console.log('Comienza a seedear emociones');

    const allMyEmotions = [
      { name: 'Triste' },
      { name: 'Contento' },
      { name: 'Ansioso' },
      { name: 'Enojado' },
      { name: 'Relajado' },
      { name: 'Entusiasmado' },
      { name: 'Aburrido' },
      { name: 'Preocupado' },
      { name: 'Culpable' },
      { name: 'Agradecido' },
      { name: 'Orgulloso' },
      { name: 'Avergonzado' },
      { name: 'Frustrado' },
      { name: 'Esperanzado' },
      { name: 'Desanimado' },
      { name: 'Satisfecho' },
      { name: 'Decepcionado' },
      { name: 'Nervioso' },
      { name: 'Eufórico' },
      { name: 'Melancólico' },
      { name: 'Conectado' },
      { name: 'Solitario' },
      { name: 'Confundido' },
      { name: 'Inseguro' },
      { name: 'Seguro' },
      { name: 'Resentido' },
      { name: 'Valiente' },
      { name: 'Apático' },
      { name: 'Afectuoso' },
      { name: 'Curioso' },
    ];

    for (const emotion of allMyEmotions) {
      const exists = await repo.findOneBy({ name: emotion.name });
      if (!exists) {
        await repo.save(repo.create(emotion));
        console.log('Emoción cargada:', emotion.name);

      } else {
        console.log('Emoción ya existe:', emotion.name);
      }
    }

    console.log('Emociones precargadas');
  } catch (error) {
    console.error('Error en el seeder de emociones:', error);
  }
};