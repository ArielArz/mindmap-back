import { Emotion } from './entities/emotion.entity';
import { Repository } from 'typeorm';

export async function seedEmotions(repo: Repository<Emotion>) {
  try {
    console.log('Comienza a seedear emociones');

    const allMyEmotions = [
      { name: 'Triste', significado: 'Estado de ánimo bajo o de pena ante una pérdida, decepción o situación dolorosa.' },
      { name: 'Contento', significado: 'Sensación de bienestar y alegría moderada, satisfacción con la situación actual.' },
      { name: 'Ansioso', significado: 'Sensación de inquietud o preocupación por algo que va a suceder o que no se puede controlar.' },
      { name: 'Enojado', significado: 'Emoción intensa provocada por una injusticia, frustración o molestia.' },
      { name: 'Relajado', significado: 'Estado de calma física y mental, libre de tensiones o estrés.' },
      { name: 'Entusiasmado', significado: 'Gran interés o motivación ante una idea, actividad o evento futuro.' },
      { name: 'Aburrido', significado: 'Sensación de falta de estímulo o interés, de estar desocupado o sin propósito.' },
      { name: 'Preocupado', significado: 'Intranquilidad o miedo ante una situación difícil o incierta.' },
      { name: 'Culpable', significado: 'Sentimiento de responsabilidad o remordimiento por haber hecho algo mal o haber dañado a otro.' },
      { name: 'Agradecido', significado: 'Reconocimiento y valoración de algo positivo recibido, ya sea material, emocional o espiritual.' },
      { name: 'Orgulloso', significado: 'Satisfacción personal por logros propios o ajenos, o por la identidad y valores que uno posee.' },
      { name: 'Avergonzado', significado: 'Incomodidad o pena por haber cometido un error, sentirse expuesto o fuera de lugar.' },
      { name: 'Frustrado', significado: 'Desilusión al no poder alcanzar una meta o deseo por obstáculos o limitaciones.' },
      { name: 'Esperanzado', significado: 'Expectativa positiva ante el futuro, confianza en que algo bueno ocurrirá.' },
      { name: 'Desanimado', significado: 'Falta de motivación o energía para continuar, especialmente tras una decepción o dificultad.' },
      { name: 'Satisfecho', significado: 'Plenitud emocional tras haber cumplido una necesidad, deseo o expectativa.' },
      { name: 'Decepcionado', significado: 'Desilusión causada cuando la realidad no cumple con lo que se esperaba.' },
      { name: 'Nervioso', significado: 'Tensión emocional por anticipación, miedo o presión ante un evento importante.' },
      { name: 'Eufórico', significado: 'Felicidad intensa y desbordante, sensación de alegría extrema y optimismo.' },
      { name: 'Melancólico', significado: 'Tristeza suave y reflexiva, muchas veces sin causa concreta, vinculada a recuerdos o pérdidas.' },
      { name: 'Conectado', significado: 'Sensación de cercanía emocional y comprensión con uno mismo, con otros o con el entorno.' },
      { name: 'Solitario', significado: 'Sentimiento de aislamiento emocional o físico, de no tener compañía o vínculos.' },
      { name: 'Confundido', significado: 'Falta de claridad mental o emocional, dificultad para tomar decisiones o entender situaciones.' },
      { name: 'Inseguro', significado: 'Falta de confianza en uno mismo o en los demás, duda sobre la propia valía o el entorno.' },
      { name: 'Seguro', significado: 'Confianza plena en uno mismo, en las decisiones tomadas o en el entorno.' },
      { name: 'Resentido', significado: 'Dolor o enojo prolongado hacia alguien que ha causado una ofensa o daño.' },
      { name: 'Valiente', significado: 'Capacidad de enfrentar el miedo o el peligro con decisión y coraje.' },
      { name: 'Apático', significado: 'Falta de interés o motivación, indiferencia ante situaciones que normalmente generan emoción.' },
      { name: 'Afectuoso', significado: 'Expresión de cariño, ternura y cercanía hacia otros.' },
      { name: 'Curioso', significado: 'Deseo de conocer o aprender cosas nuevas, motivado por el interés o la novedad.' }
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