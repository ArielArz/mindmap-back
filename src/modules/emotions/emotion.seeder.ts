import { Emotion } from './entities/emotion.entity';
import { Repository } from 'typeorm';

export async function seedEmotions(repo: Repository<Emotion>) {
  try {
    console.log('Comienza a seedear emociones');

    const allMyEmotions = [
      {
        name: 'Triste',
        significado: 'Estado de ánimo bajo o de pena ante una pérdida, decepción o situación dolorosa.',
        emoji: '😢',
        clinicalValue: -2,
        reflexion: 'Está bien sentirse triste. Date permiso para sentirlo, y si lo necesitás, buscá apoyo en alguien de confianza.',
      },
      {
        name: 'Contento',
        significado: 'Sensación de bienestar y alegría moderada, satisfacción con la situación actual.',
        emoji: '😊',
        clinicalValue: 1,
        reflexion: 'Reconocé los momentos agradables y valorá lo que te genera esta sensación de calma.',
      },
      {
        name: 'Ansioso',
        significado: 'Sensación de inquietud o preocupación por algo que va a suceder o que no se puede controlar.',
        emoji: '😰',
        clinicalValue: -1,
        reflexion: 'Identificá qué pensamientos anticipatorios te generan ansiedad y tratá de volver al presente.',
      },
      {
        name: 'Enojado',
        significado: 'Emoción intensa provocada por una injusticia, frustración o molestia.',
        emoji: '😠',
        clinicalValue: -2,
        reflexion: 'Reconocé tu enojo y preguntate qué límites fueron cruzados. ¿Qué te está queriendo mostrar esta emoción?',
      },
      {
        name: 'Relajado',
        significado: 'Estado de calma física y mental, libre de tensiones o estrés.',
        emoji: '😌',
        clinicalValue: 2,
        reflexion: 'Disfrutá este momento de calma. ¿Qué cosas te ayudan a mantener esta sensación en tu día a día?',
      },
      {
        name: 'Entusiasmado',
        significado: 'Gran interés o motivación ante una idea, actividad o evento futuro.',
        emoji: '🤩',
        clinicalValue: 2,
        reflexion: 'El entusiasmo es motor de acción. Canalizalo hacia algo que te acerque a tus deseos.',
      },
      {
        name: 'Aburrido',
        significado: 'Sensación de falta de estímulo o interés, de estar desocupado o sin propósito.',
        emoji: '😐',
        clinicalValue: -1,
        reflexion: 'El aburrimiento puede ser una invitación a la creatividad. ¿Qué necesitás para sentirte más conectado?',
      },
      {
        name: 'Preocupado',
        significado: 'Intranquilidad o miedo ante una situación difícil o incierta.',
        emoji: '😟',
        clinicalValue: -1,
        reflexion: 'Preguntate: ¿esto que me preocupa tiene solución ahora? Si no, puedo soltarlo por un momento.',
      },
      {
        name: 'Culpable',
        significado: 'Sentimiento de responsabilidad o remordimiento por haber hecho algo mal o haber dañado a otro.',
        emoji: '😔',
        clinicalValue: -2,
        reflexion: 'Reconocer la culpa permite reparar. ¿Qué podés aprender de esto para avanzar en paz?',
      },
      {
        name: 'Agradecido',
        significado: 'Reconocimiento y valoración de algo positivo recibido, ya sea material, emocional o espiritual.',
        emoji: '🙏',
        clinicalValue: 2,
        reflexion: 'El agradecimiento conecta con lo valioso. ¿Qué querés honrar hoy con tu gratitud?',
      },
      {
        name: 'Orgulloso',
        significado: 'Satisfacción personal por logros propios o ajenos, o por la identidad y valores que uno posee.',
        emoji: '😎',
        clinicalValue: 1,
        reflexion: 'Celebrar los logros propios fortalece la autoestima. ¿De qué te sentís genuinamente orgulloso?',
      },
      {
        name: 'Avergonzado',
        significado: 'Incomodidad o pena por haber cometido un error, sentirse expuesto o fuera de lugar.',
        emoji: '😳',
        clinicalValue: -2,
        reflexion: 'La vergüenza puede ser dura. Tratate con compasión: sos más que tus errores.',
      },
      {
        name: 'Frustrado',
        significado: 'Desilusión al no poder alcanzar una meta o deseo por obstáculos o limitaciones.',
        emoji: '😤',
        clinicalValue: -2,
        reflexion: 'La frustración señala algo importante para vos. ¿Qué podés ajustar o soltar para avanzar?',
      },
      {
        name: 'Esperanzado',
        significado: 'Expectativa positiva ante el futuro, confianza en que algo bueno ocurrirá.',
        emoji: '🌈',
        clinicalValue: 2,
        reflexion: 'La esperanza es una guía interna. ¿Qué visión te sostiene y te invita a seguir?',
      },
      {
        name: 'Desanimado',
        significado: 'Falta de motivación o energía para continuar, especialmente tras una decepción o dificultad.',
        emoji: '😞',
        clinicalValue: -2,
        reflexion: 'Está bien pausar. Escuchá qué parte tuya necesita descanso y cuidado.',
      },
      {
        name: 'Satisfecho',
        significado: 'Plenitud emocional tras haber cumplido una necesidad, deseo o expectativa.',
        emoji: '😌',
        clinicalValue: 2,
        reflexion: 'Reconocé y celebrá tus logros y elecciones. ¿Qué te llevó a esta sensación de plenitud?',
      },
      {
        name: 'Decepcionado',
        significado: 'Desilusión causada cuando la realidad no cumple con lo que se esperaba.',
        emoji: '😞',
        clinicalValue: -1,
        reflexion: 'La decepción puede enseñarte sobre tus expectativas. ¿Cuáles eran y de dónde venían?',
      },
      {
        name: 'Nervioso',
        significado: 'Tensión emocional por anticipación, miedo o presión ante un evento importante.',
        emoji: '😬',
        clinicalValue: -1,
        reflexion: 'La tensión anticipatoria es normal. Respirar profundo y estar presente puede ayudarte.',
      },
      {
        name: 'Eufórico',
        significado: 'Felicidad intensa y desbordante, sensación de alegría extrema y optimismo.',
        emoji: '😄',
        clinicalValue: 2,
        reflexion: 'La euforia es energía vital. Canalizala de forma consciente hacia lo que te apasiona.',
      },
      {
        name: 'Melancólico',
        significado: 'Tristeza suave y reflexiva, muchas veces sin causa concreta, vinculada a recuerdos o pérdidas.',
        emoji: '🎵',
        clinicalValue: -1,
        reflexion: 'La melancolía puede ser una forma de conectar con lo que fue importante. Honrá esos recuerdos.',
      },
      {
        name: 'Conectado',
        significado: 'Sensación de cercanía emocional y comprensión con uno mismo, con otros o con el entorno.',
        emoji: '🤝',
        clinicalValue: 2,
        reflexion: 'Sentirse conectado nutre. ¿Qué vínculos te hacen sentir así y cómo podés cultivarlos?',
      },
      {
        name: 'Solitario',
        significado: 'Sentimiento de aislamiento emocional o físico, de no tener compañía o vínculos.',
        emoji: '🥺',
        clinicalValue: -1,
        reflexion: 'Estar solo no siempre es malo, pero si duele, buscá abrirte a compartir lo que sentís.',
      },
      {
        name: 'Confundido',
        significado: 'Falta de claridad mental o emocional, dificultad para tomar decisiones o entender situaciones.',
        emoji: '😕',
        clinicalValue: -1,
        reflexion: 'La confusión puede ser una señal de crecimiento. Permitite no saber por ahora.',
      },
      {
        name: 'Inseguro',
        significado: 'Falta de confianza en uno mismo o en los demás, duda sobre la propia valía o el entorno.',
        emoji: '😟',
        clinicalValue: -2,
        reflexion: 'Reconocer la inseguridad es el primer paso para fortalecer tu autoestima. Sos valioso tal como sos.',
      },
      {
        name: 'Seguro',
        significado: 'Confianza plena en uno mismo, en las decisiones tomadas o en el entorno.',
        emoji: '💪',
        clinicalValue: 2,
        reflexion: 'Sentirte seguro te impulsa. ¿Qué factores internos o externos te brindan esta sensación?',
      },
      {
        name: 'Resentido',
        significado: 'Dolor o enojo prolongado hacia alguien que ha causado una ofensa o daño.',
        emoji: '😒',
        clinicalValue: -2,
        reflexion: 'El resentimiento prolongado te lastima más a vos. ¿Qué necesitarías para soltarlo?',
      },
      {
        name: 'Valiente',
        significado: 'Capacidad de enfrentar el miedo o el peligro con decisión y coraje.',
        emoji: '🦁',
        clinicalValue: 2,
        reflexion: 'La valentía no es ausencia de miedo, sino avanzar a pesar de él. ¿Qué acto valiente hiciste hoy?',
      },
      {
        name: 'Apático',
        significado: 'Falta de interés o motivación, indiferencia ante situaciones que normalmente generan emoción.',
        emoji: '😑',
        clinicalValue: -2,
        reflexion: 'La apatía puede ocultar cansancio o dolor. Escuchá tu cuerpo y tus emociones con atención.',
      },
      {
        name: 'Afectuoso',
        significado: 'Expresión de cariño, ternura y cercanía hacia otros.',
        emoji: '🤗',
        clinicalValue: 2,
        reflexion: 'Dar y recibir afecto nos humaniza. ¿A quién te gustaría mostrarle tu cariño hoy?',
      },
      {
        name: 'Curioso',
        significado: 'Deseo de conocer o aprender cosas nuevas, motivado por el interés o la novedad.',
        emoji: '🧐',
        clinicalValue: 1,
        reflexion: 'La curiosidad abre puertas. Seguí explorando el mundo y también tu mundo interior.',
      }
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