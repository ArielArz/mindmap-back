import { DataSource } from 'typeorm';
import { Emotion } from './entities/emotion.entity';

export const seedEmotions = async (dataSource: DataSource) => {
  const emotionRepo = dataSource.getRepository(Emotion);

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
    const exists = await emotionRepo.findOneBy({ name: emotion.name });
    if (!exists) {
      await emotionRepo.save(emotionRepo.create(emotion));
    }
  }

  console.log('Emociones precargadas');
};

export const clearEmotions = async (dataSource: DataSource) => {
  const emotionRepo = dataSource.getRepository(Emotion);
  await emotionRepo.clear();
  console.log('Emociones eliminadas');
};