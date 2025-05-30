export interface RangoIEG {
  min: number;
  max: number;
  interpretacion: string;
  consejos: string[];
  acciones: string[];
}
export const rangosIEG: RangoIEG[] = [
  {
    min: 13,
    max: 15,
    interpretacion: 'Estado óptimo, euforia o bienestar excepcional',
    consejos: [
      'Disfrutá este momento de plenitud. Reconocé lo que lo genera.',
      'Registrá tus emociones para recordarlas en otros momentos.',
      'Compartí tu alegría con alguien cercano.',
      'Usá esta energía para avanzar en proyectos personales.',
      'Celebrá tus logros, grandes o pequeños.',
      'Conectate con lo que te apasiona.',
      'Reflexioná sobre las cosas que están funcionando en tu vida.',
      'Aprovechá este impulso para cultivar hábitos positivos.',
      'Guardá este momento como ancla emocional.',
      'Permitite sentirte bien sin culpa.'
    ],
    acciones: [
      'Escribir una entrada positiva en tu diario',
      'Hacer algo creativo',
      'Disfrutar una salida',
      'Llamar a alguien que querés',
      'Crear una lista de gratitud',
      'Escuchar música alegre',
      'Hacer actividad física',
      'Tomar una foto de este momento',
      'Anotar ideas inspiradoras',
      'Hacer una pausa para saborear el presente'
    ]
  },
  {
    min: 11,
    max: 12.99,
    interpretacion: 'Muy positivo, energía emocional elevada',
    consejos: [
      'Canalizá esta energía hacia actividades significativas.',
      'Prestá atención a lo que alimenta este estado.',
      'Es un buen momento para iniciar algo nuevo.',
      'Aprovechá para conectar con otras personas desde lo positivo.',
      'Escuchá a tu cuerpo y descansá si lo necesitás.',
      'Celebrá este buen momento.',
      'Fijate si hay patrones que puedas repetir.',
      'Mantené tu bienestar con prácticas regulares.',
      'Permitite disfrutar sin exigencias.',
      'Registrá este estado para recordar qué lo genera.'
    ],
    acciones: [
      'Empezar una actividad nueva',
      'Compartir un momento con amigos',
      'Escribir ideas motivadoras',
      'Meditar unos minutos',
      'Hacer una lista de lo que disfrutás',
      'Mover el cuerpo con música',
      'Visualizar un objetivo personal',
      'Contarle a alguien cómo te sentís',
      'Revisar logros recientes',
      'Darte un premio simbólico'
    ]
  },
  {
    min: 9,
    max: 10.99,
    interpretacion: 'Bienestar alto, emociones muy favorables',
    consejos: [
      'Estás en un buen momento emocional, disfrutalo con conciencia.',
      'Reforzá las rutinas que te hacen bien.',
      'Identificá qué personas o espacios te hacen sentir así.',
      'Disfrutá lo simple.',
      'Hacé una pausa para reconocer tu estado.',
      'Registrá este bienestar para recordarlo.',
      'Mantené el foco en lo que funciona.',
      'Seguís consolidando tu estabilidad emocional.',
      'Es un buen momento para agradecer.',
      'Podés compartir este estado con quienes te rodean.'
    ],
    acciones: [
      'Registrar el día con una foto o nota',
      'Cocinar algo que te guste',
      'Salir al aire libre',
      'Escuchar una playlist favorita',
      'Hacer una llamada positiva',
      'Preparar un plan que te motive',
      'Tener un momento de autocuidado',
      'Desconectarte del celular 1 hora',
      'Disfrutar el presente sin planear tanto',
      'Leer algo inspirador'
    ]
  },
  {
    min: 7,
    max: 8.99,
    interpretacion: 'Positivo, emociones saludables estables',
    consejos: [
      'Estás en un buen punto de equilibrio emocional.',
      'Seguí reforzando las prácticas que te ayudan.',
      'Permitite reconocer tu esfuerzo.',
      'Notá qué cosas están equilibradas hoy.',
      'Mantené este estado con hábitos sostenibles.',
      'Podés pensar en un pequeño objetivo nuevo.',
      'Validá tu estabilidad emocional.',
      'Sumá una práctica que mejore tu día aún más.',
      'Estás gestionando bien tus emociones.',
      'Conectá con lo que te hace sentir en paz.'
    ],
    acciones: [
      'Revisar rutinas saludables',
      'Hacer journaling de gratitud',
      'Compartir un momento tranquilo',
      'Preparar tu día con calma',
      'Disfrutar una comida sin distracciones',
      'Escuchar un podcast de bienestar',
      'Cuidar tu descanso',
      'Reorganizar tu espacio personal',
      'Ver algo que te inspire',
      'Crear una playlist para este estado'
    ]
  },
  {
    min: 5,
    max: 6.99,
    interpretacion: 'Buen ánimo, tendencia emocional favorable',
    consejos: [
      'Estás en una etapa favorable, con espacio para seguir creciendo.',
      'Mantené hábitos que potencien este buen estado.',
      'Reflexioná sobre qué ayudó a que hoy estés así.',
      'Este es un buen momento para construir confianza.',
      'Date permiso para disfrutar sin exigencia.',
      'Podés invertir energía en vínculos o proyectos.',
      'Reforzá lo positivo con pequeños rituales.',
      'Elegí enfocarte en lo que te hace bien.',
      'Tu ánimo es estable y funcional, cuidalo.',
      'Chequeá si hay algo que puedas celebrar hoy.'
    ],
    acciones: [
      'Escribir una reflexión breve',
      'Elegir una acción placentera',
      'Tener un momento de silencio',
      'Desconectarte de redes sociales',
      'Cuidar tu alimentación',
      'Estirarte o moverte suavemente',
      'Hablar con alguien querido',
      'Escuchar música sin distracciones',
      'Crear algo con tus manos',
      'Apagar notificaciones por una hora'
    ]
  },
  {
    min: 3,
    max: 4.99,
    interpretacion: 'Leve positivo, salud emocional funcional',
    consejos: [
      'Tu estado es estable, aunque hay espacio para sentirte mejor.',
      'Buscá momentos pequeños de disfrute.',
      'Chequeá si algo puede estar restándote energía.',
      'Mantené el ritmo sin exigencias.',
      'Una pequeña mejora puede marcar la diferencia.',
      'Prestá atención a lo que estás necesitando hoy.',
      'Puede ser útil renovar una rutina o cambiar de ambiente.',
      'Registrá lo que te ayuda a mantener el equilibrio.',
      'Dale lugar a actividades que te conecten con vos.',
      'Revisá si podés soltar alguna presión.'
    ],
    acciones: [
      'Tomarte un recreo consciente',
      'Cuidar tu postura y respiración',
      'Caminar sin rumbo 10 minutos',
      'Escribir lo que te descarga',
      'Mirar por la ventana en silencio',
      'Hacer una pausa sin hacer nada',
      'Desconectarte 15 minutos',
      'Acomodar tu espacio personal',
      'Tomar agua con atención',
      'Pedir un abrazo o dar uno'
    ]
  },
  {
    min: 1,
    max: 2.99,
    interpretacion: 'Estado positivo leve, estable pero mejorable',
    consejos: [
      'Tu estado es funcional, pero podés sentirte mejor.',
      'Fijate si estás necesitando un cambio de ritmo.',
      'Una pequeña acción puede ayudarte a mejorar el día.',
      'Permitite revisar tus emociones sin juicio.',
      'No te exijas demasiado, pero mantenete en movimiento.',
      'Conectá con algo que te inspire o motive.',
      'Registrá lo que hoy te dio un poco de bienestar.',
      'Mirá con amabilidad lo que estás atravesando.',
      'Dale lugar a lo que sentís.',
      'Acompañate con prácticas de autocuidado.'
    ],
    acciones: [
      'Respirar profundo 3 veces',
      'Estirarte lentamente',
      'Anotar una cosa que te hizo bien hoy',
      'Tomar un té o mate con calma',
      'Escribir un microdiario',
      'Cerrar los ojos 1 minuto',
      'Poner una canción suave',
      'Moverte al ritmo de la música',
      'Tomar contacto con naturaleza',
      'Hacer una pausa sin celular'
    ]
  },
  {
    min: -1,
    max: 0.99,
    interpretacion: 'Neutro / estable',
    consejos: [
      'Estás en una zona neutra, donde podés tomar impulso.',
      'Podés observar sin juzgar cómo te sentís.',
      'Aprovechá este momento de calma para decidir cómo avanzar.',
      'El equilibrio también es valioso, aunque no sea intenso.',
      'Chequeá si necesitás activar algo que te motive.',
      'Este estado puede ser base para subir emocionalmente.',
      'Tomá conciencia de lo que te rodea sin presión.',
      'Explorá qué te gustaría mejorar sin urgencias.',
      'Mantené hábitos suaves pero constantes.',
      'Revisá si necesitás descansar o movilizarte.'
    ],
    acciones: [
      'Observar tu entorno con atención plena',
      'Meditar 2 minutos',
      'Escribir cómo te sentís sin filtros',
      'Moverte suavemente',
      'Estar en silencio 5 minutos',
      'Elegir una actividad simple',
      'Cuidar tu hidratación',
      'Estirar el cuerpo conscientemente',
      'Anotar pensamientos que aparecen',
      'Desconectar de pantallas un rato'
    ]
  },
  {
    min: -3,
    max: -1.01,
    interpretacion: 'Leve malestar, sin riesgo inmediato',
    consejos: [
      'Estás atravesando una leve incomodidad emocional. Observá sin juzgar.',
      'Chequeá si algo externo está afectando tu ánimo.',
      'Tomate un momento para registrar lo que sentís.',
      'Podés priorizar el descanso o el autocuidado.',
      'Buscá pequeñas cosas que puedan mejorar tu ánimo.',
      'No estás solo/a, podés pedir apoyo si lo necesitás.',
      'Reflexioná sobre lo que necesitás hoy.',
      'Permitite frenar sin sentir culpa.',
      'Podés poner límites suaves si algo te incomoda.',
      'Date permiso para bajar el ritmo.'
    ],
    acciones: [
      'Registrar la emoción dominante',
      'Escribir una frase de descarga emocional',
      'Tomar distancia de situaciones demandantes',
      'Practicar respiración consciente',
      'Tomarte una pausa sin obligaciones',
      'Hacer contacto con algo que te guste',
      'Hablar con alguien que te escuche',
      'Mover el cuerpo suavemente',
      'Descansar 10 minutos',
      'Escuchar música reconfortante'
    ]
  },
  {
    min: -5,
    max: -3.01,
    interpretacion: 'Malestar moderado, revisar emociones',
    consejos: [
      'Estás en un estado de malestar emocional, revisá tus necesidades.',
      'Podés registrar lo que sentís sin presionarte a resolverlo ya.',
      'El descanso y la contención son importantes ahora.',
      'No minimices cómo te sentís.',
      'Validá tus emociones y buscá maneras seguras de expresarlas.',
      'Tomate el tiempo necesario para cuidar tu bienestar.',
      'Evitá sobrecargas si es posible.',
      'Buscá apoyo si sentís que lo necesitás.',
      'Revisá si hay algo que puedas cambiar hoy.',
      'Permitite estar mal sin sentir culpa.'
    ],
    acciones: [
      'Pedir ayuda o hablar con alguien de confianza',
      'Anotar lo que te está pesando',
      'Tomar un descanso profundo',
      'Llorar si lo necesitás',
      'Respirar con una mano en el pecho',
      'Aislarte de lo que te sobrecarga',
      'Buscar una actividad que te calme',
      'Limitar estímulos digitales',
      'Estar en un espacio seguro',
      'Pedir compañía tranquila'
    ]
  },
  {
    min: -7,
    max: -5.01,
    interpretacion: 'Malestar notable, posible afectación emocional',
    consejos: [
      'Estás en un punto de malestar importante. Necesitás contención emocional.',
      'Buscá con quién hablar o descargarte con seguridad.',
      'No tenés que atravesar esto solo/a.',
      'Validá lo que estás sintiendo, sin juzgarte.',
      'Descansá, incluso emocionalmente.',
      'Organizá tu día con el mínimo de exigencia.',
      'Priorizá actividades que te den calma.',
      'Si podés, postergá decisiones importantes.',
      'Podés registrar cómo evoluciona este estado.',
      'Poné límites a lo que te haga mal ahora mismo.'
    ],
    acciones: [
      'Contactar a alguien de confianza',
      'Escribir sin censura',
      'Dormir una siesta',
      'Desconectarte del entorno',
      'Tomar contacto con naturaleza',
      'Llorar o respirar profundamente',
      'Consultar un profesional',
      'Dibujar lo que sentís',
      'Evitar pantallas por un rato',
      'Pedir compañía o silencio'
    ]
  },
  {
    min: -9,
    max: -7.01,
    interpretacion: 'Malestar importante, atención recomendada',
    consejos: [
      'Tu estado emocional requiere atención. Considerá hablar con alguien.',
      'No estás solo/a. Hay formas de transitar esto.',
      'Buscá espacios de calma o contención.',
      'Prioritizá tu cuidado emocional.',
      'Registrá pensamientos o emociones que te sobrepasan.',
      'Intentá hacer foco en lo que sí podés controlar.',
      'Limitá las exigencias por hoy.',
      'Permitite llorar, descargar o pausar.',
      'Revisá si este estado se repite frecuentemente.',
      'Dale prioridad a tu salud mental.'
    ],
    acciones: [
      'Contactar un profesional de salud mental',
      'Pedir ayuda concreta',
      'Llamar a un amigo',
      'Respirar conscientemente',
      'Desconectarte de lo urgente',
      'Descargar escribiendo',
      'Dormir o descansar',
      'Evitar decisiones impulsivas',
      'Hacer una lista de apoyo',
      'Mirar algo reconfortante'
    ]
  },
  {
    min: -11,
    max: -9.01,
    interpretacion: 'Malestar grave, posible desregulación emocional',
    consejos: [
      'Este nivel de malestar puede requerir apoyo profesional.',
      'No estás solo/a. Pedí ayuda.',
      'Validá este momento como difícil sin culpa.',
      'Es importante que te priorices hoy.',
      'Buscá contención con urgencia si sentís que no podés solo/a.',
      'Limitá lo que te genera sobrecarga.',
      'Tomate un respiro emocional.',
      'Identificá señales de agotamiento o desesperanza.',
      'No minimices cómo te sentís.',
      'Anotá o contale a alguien cómo estás.'
    ],
    acciones: [
      'Hablar con un terapeuta',
      'Avisar a alguien de confianza',
      'Hacer una lista de cosas mínimas por hacer',
      'Pedir ayuda para tareas básicas',
      'Aislarte de lo tóxico',
      'Llorar o respirar hondo con conciencia',
      'Apagar el celular si abruma',
      'Hacer una siesta larga',
      'Buscar atención profesional',
      'Anotar cómo evoluciona tu estado'
    ]
  },
  {
    min: -15,
    max: -11.01,
    interpretacion: 'Riesgo emocional severo, intervención urgente',
    consejos: [
      'Tu salud emocional está en riesgo. Buscá ayuda de inmediato.',
      'Pedí contención a un profesional o alguien de confianza.',
      'No estás solo/a, hay recursos para ayudarte.',
      'Este es un momento para priorizar tu vida y bienestar.',
      'Evitá el aislamiento. Hablá con alguien ahora.',
      'El primer paso puede ser solo contar lo que sentís.',
      'No tomes decisiones importantes en este estado.',
      'Cuidarte hoy puede cambiar todo.',
      'Permitite recibir ayuda sin sentir culpa.',
      'Tu vida importa. Pedí ayuda.'
    ],
    acciones: [
      'Llamar a una línea de ayuda (como el 135)',
      'Hablar con un profesional de salud mental',
      'Pedir compañía inmediata',
      'Evitar quedarte solo/a',
      'Desconectar de redes sociales',
      'No tomar decisiones drásticas',
      'Buscar un espacio seguro',
      'Pedir contención en tu entorno',
      'Hacer una consulta médica urgente',
      'Guardar objetos con los que podés lastimarte'
    ]
  }
];
