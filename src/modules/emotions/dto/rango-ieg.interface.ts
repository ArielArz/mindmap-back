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
      'Preguntate qué elementos internos y externos contribuyen a este bienestar, y cómo podés sostenerlos en el tiempo. No des por hecho esta sensación; comprendé su origen para fortalecerla.',
      'Observá cómo reacciona tu entorno a tu estado emocional positivo y qué te revela eso sobre tus vínculos. A veces, la alegría propia ilumina u opaca dinámicas importantes.',
      'Pensá cómo este estado puede convertirse en una guía emocional, no como meta constante, sino como referencia interna. Este momento puede enseñarte cómo se siente estar en sintonía con vos mismo.',

    ],
    acciones: [
      'Disfrutar plenamente del momento presente → Te permite saborear y consolidar esta experiencia de bienestar.',
      'Registrar qué situaciones o pensamientos generaron esta euforia → Ayuda a identificar patrones que puedas recrear en el futuro.',
      'Compartir tu alegría con alguien de confianza → Fortalece tus relaciones y amplifica el impacto positivo.',
      'Canalizar esta energía para avanzar en proyectos personales o metas → Convierte tu entusiasmo en progreso concreto y motivación sostenida.',
      'Practicar la autoconciencia para mantener el equilibrio emocional → Evita caer en excesos y favorece la estabilidad a largo plazo.',

    ]
  },
  {
    min: 11,
    max: 12.99,
    interpretacion: 'Muy positivo, energía emocional elevada',
    consejos: [
      'Reconocé cómo esta energía se manifiesta en tu cuerpo y mente, y qué la alimenta.Entender tu propio motor emocional te permite recargarlo conscientemente.',
      'Preguntate hacia dónde estás canalizando esta intensidad emocional: ¿es productiva, compartida o contenida? La dirección que le das a tu energía define su impacto. Reflexioná si este estado surge como resultado de una conexión interna o de factores externos.',
      'Reflexioná si este estado surge como resultado de una conexión interna o de factores externos. Saberlo te ayuda a distinguir qué depende de vos y qué no.',

    ],
    acciones: [
      'Canalizar tu energía en actividades creativas o productivas → Te ayuda a aprovechar al máximo este impulso y a generar resultados valiosos.',
      'Compartir tu entusiasmo con personas cercanas → Refuerza vínculos y contagia bienestar a tu entorno.',
      'Practicar la gratitud por este estado emocional → Aumenta tu resiliencia y capacidad para mantener emociones positivas.',
      'Tomarte momentos para respirar y mantener la estabilidad emocional → Previene posibles sobrecargas y ayuda a conservar el equilibrio.',
      'Reflexionar sobre las causas que te llevan a este estado → Facilita identificar y potenciar las fuentes de tu bienestar.',

    ]
  },
  {
    min: 9,
    max: 10.99,
    interpretacion: 'Bienestar alto, emociones muy favorables',
    consejos: [
      'Observá qué aspectos de tu vida están alineados para generar este bienestar. Identificar esos elementos te ayuda a mantenerlos y cultivarlos.',
      'Reflexioná si estás disfrutando el presente o proyectando esta sensación hacia el futuro. Valorar el ahora fortalece tu equilibrio emocional.',
      'Preguntate cómo podés extender este estado a otras áreas de tu vida o compartirlo con quienes te rodean. El bienestar compartido se multiplica y genera vínculos más profundos.',
    ],
    acciones: [
      'Disfrutar conscientemente del momento presente → Permite anclar esta sensación de bienestar para recurrir a ella cuando la necesites.',
      'Reconocer y agradecer las fuentes de tu bienestar → Fortalece la percepción positiva y genera un ciclo de emociones saludables.',
      'Compartir tu energía positiva con quienes te rodean → Multiplica el impacto positivo y fortalece relaciones afectivas.',
      'Aprovechar esta energía para avanzar en proyectos personales  Potencia tu crecimiento y la satisfacción personal.',
      'Reflexionar sobre lo que está funcionando bien en tu vida → Favorece la autoconciencia y el mantenimiento de hábitos positivos.',

    ]
  },
  {
    min: 7,
    max: 8.99,
    interpretacion: 'Positivo, emociones saludables estables',
    consejos: [
      'Reconocé la estabilidad emocional como un logro, no como algo dado.Estar bien de forma sostenida es fruto de hábitos, decisiones y autocuidado.',
      'Preguntate qué prácticas o relaciones están contribuyendo a este equilibrio.Ser consciente de ellas te permite fortalecerlas y priorizarlas.',
      'Reflexioná sobre cómo podés sostener esta armonía incluso en momentos de cambio.La estabilidad no es rigidez, sino adaptación consciente desde un lugar de bienestar.',
    ],
    acciones: [
      'Mantener hábitos que fomenten tu bienestar emocional → Esto ayuda a consolidar una base sólida para tu salud mental.',
      'Expresar gratitud regularmente → Potencia emociones positivas y fortalece tu resiliencia.',
      'Compartir tus emociones positivas con personas de confianza → Refuerza vínculos y amplifica la experiencia de bienestar.',
      'Practicar técnicas de relajación y mindfulness → Favorece la estabilidad emocional y reduce el estrés.',
      'Establecer pequeños retos personales para crecer → Mantiene la motivación y promueve un desarrollo emocional saludable.',
    ]
  },
  {
    min: 5,
    max: 6.99,
    interpretacion: 'Buen ánimo, tendencia emocional favorable',
    consejos: [
      'Observá qué pensamientos o acciones están alimentando este buen ánimo. Reconocer su origen te permite replicarlo con intención.',
      'Aprovechá esta energía emocional para avanzar en lo que venías postergando. El bienestar es una gran plataforma para la acción.',
      'Reflexioná sobre cómo responderías ante desafíos desde este estado positivo. Imaginarlo fortalece tu capacidad de afrontamiento futura.',

    ],
    acciones: [
      'Reconocer y agradecer los momentos positivos → Potencia la conciencia de bienestar y fortalece la estabilidad emocional.',
      'Seguir cultivando relaciones que te hagan sentir bien → Refuerza tu red de apoyo y mantiene el ánimo elevado.',
      'Dedicar tiempo a actividades que te apasionan → Favorece la motivación y alimenta emociones saludables.',
      'Practicar la autoobservación para detectar cambios emocionales → Ayuda a mantener el equilibrio y actuar a tiempo si surge algún malestar.',
      'Establecer metas realistas para mantener el impulso positivo → Canaliza tu energía hacia logros concretos que refuercen tu buen ánimo.',
    ]
  },
  {
    min: 3,
    max: 4.99,
    interpretacion: 'Leve positivo, salud emocional funcional',
    consejos: [
      'Reconocé que incluso la calma cotidiana es un signo de equilibrio interno. Apreciar lo sutil también es cultivar bienestar.',
      'Preguntate qué pequeños hábitos están favoreciendo este estado. A veces lo que funciona pasa desapercibido.',
      'Considerá cómo sostener esta estabilidad sin necesidad de euforia. El bienestar no siempre se siente intenso, pero sigue siendo valioso.',

    ],
    acciones: [
      'Celebrar pequeñas victorias del día → Refuerza tu bienestar y motiva a mantener un estado emocional saludable.',
      'Mantener contacto con personas que te apoyan → Fortalece tu red de soporte y ayuda a sostener emociones positivas.',
      'Incorporar hábitos simples de autocuidado → Promueve el equilibrio emocional y previene malestares futuros.',
      'Reflexionar sobre lo que te aporta satisfacción → Te ayuda a identificar fuentes de bienestar para potenciar.',
      'Permitir espacio para la expresión emocional sincera → Facilita la gestión emocional y mantiene la salud emocional funcional.',

    ]
  },
  {
    min: 1,
    max: 2.99,
    interpretacion: 'Estado positivo leve, estable pero mejorable',
    consejos: [
      'Observá qué áreas podrían sumar un poco más de entusiasmo o motivación. El crecimiento emocional empieza con una pregunta honesta.',
      'Valorá la estabilidad, pero no te conformes si sabés que podés sentirte mejor. Aceptar no es lo mismo que estancarse.',
      'Preguntate qué te impide dar un paso más hacia tu bienestar pleno. A veces la barrera es tan sutil como una duda no revisada.',
    ],
    acciones: [
      'Reconocer y valorar lo que está funcionando bien en tu día → Esto fortalece la sensación de bienestar y crea una base sólida para seguir mejorando.',
      'Plantear un pequeño objetivo emocional o personal para el día → Te invita a avanzar con intención, potenciando la estabilidad hacia un estado más positivo.',
      'Practicar una breve pausa consciente para conectar contigo mismo → Ayuda a mantener la estabilidad emocional y a identificar áreas de mejora.',
      'Buscar actividades que te generen placer o tranquilidad → Refuerza emociones positivas y mejora el ánimo sin exigencias.',
      'Observar tus pensamientos sin juzgarlos, permitiendo soltarlos si son negativos → Facilita la gestión emocional y evita que pequeños malestares crezcan.',
    ]
  },
  {
    min: -1,
    max: 0.99,
    interpretacion: 'Neutro / estable',
    consejos: [
      'Reconocé la calma como una base sólida para el cambio. Estar en equilibrio es un buen punto de partida, no un límite.',
      'Identificá si hay áreas donde te gustaría sentir más energía o alegría. La neutralidad puede ser la oportunidad para sembrar nuevas emociones.',
      'Permitite observar sin juzgar cómo te sentís realmente en este momento. La conciencia plena abre caminos hacia un bienestar más profundo.',
    ],
    acciones: [
      'Hacer un chequeo interno: “¿Cómo estoy realmente?” → Estar neutro puede ocultar emociones no reconocidas; revisarlas te permite mayor autoconciencia.',
      'Agradecer una pequeña cosa de tu día → Introduce una mirada positiva sin forzar la emoción, ayudando a elevar el estado anímico.',
      'Estar presente en una actividad simple (tomar algo, caminar, respirar) → Refuerza la conexión con el aquí y ahora, manteniendo la estabilidad emocional.',
      'Observar tu cuerpo: ¿hay tensión, cansancio o comodidad? → Identificar cómo se siente el cuerpo puede revelar señales emocionales sutiles.',
      'Elegir una acción que potencie tu bienestar, aunque sea mínima → Desde este estado, podés construir hacia emociones más positivas con decisiones pequeñas y conscientes.',

    ]
  },
  {
    min: -3,
    max: -1.01,
    interpretacion: 'Leve malestar, sin riesgo inmediato',
    consejos: [
      'Observá qué pequeños detalles pueden estar generando incomodidad. A veces, reconocer las señales leves nos permite actuar antes de que crezcan.',
      'Permitite sentir ese malestar sin evitarlo ni dramatizarlo. Aceptar la incomodidad es un paso para entender qué necesitás realmente.',
      'Pensá en acciones sencillas que puedan mejorar tu bienestar diario. Pequeños ajustes pueden tener un gran impacto en tu equilibrio emocional.',

    ],
    acciones: [
      'Tomarte unos minutos para respirar profundo y pausadamente → Ayuda a reducir la tensión y a reconectar con el momento presente.',
      'Detectar si hay alguna incomodidad ignorada o acumulada → El leve malestar puede ser una señal temprana de algo que merece atención.',
      'Anotar lo que sentís sin juzgarte → Poner en palabras tus emociones puede darte claridad y alivio.',
      'Moverte suavemente (estirarte, caminar, cambiar de ambiente) → El movimiento físico ayuda a desbloquear emociones leves retenidas.',
      'Hacer una pausa para escuchar música que te calme o inspire → Estimula estados emocionales más positivos sin forzar un cambio abrupto.',
    ]
  },
  {
    min: -5,
    max: -3.01,
    interpretacion: 'Malestar moderado, revisar emociones',
    consejos: [
      'Tomate un momento para identificar qué emociones están generando tensión. La conciencia es clave para entender lo que realmente te afecta.',
      'Cuestioná si hay pensamientos o creencias que intensifican ese malestar. A veces, nuestro diálogo interno puede amplificar emociones negativas.',
      'Considerá qué cambios o acciones podrían aliviar esta incomodidad emocional. Revisar y ajustar lo que está a tu alcance puede ayudarte a recuperar el equilibrio.',

    ],
    acciones: [
      'Identificar qué pensamiento o situación activó el malestar → Comprender el origen de la emoción te permite abordarla en lugar de evitarla.',
      'Nombrar la emoción específica que sentís (ej. frustración, tristeza, enojo) → Ponerle nombre reduce su intensidad y mejora tu capacidad para gestionarla.',
      'Evaluar si tus necesidades emocionales están siendo satisfechas → El malestar suele ser una señal de que algo importante para vos no está siendo atendido.',
      'Expresarte de forma creativa (escritura, dibujo, música) → Canalizar lo que sentís a través del arte puede transformar la emoción en algo más manejable.',
      'Agendar un momento para cuidar de vos mismo/a (descanso, paseo, charla) → Mostrarte cuidado es una forma concreta de regular tu estado emocional.',
    ]
  },
  {
    min: -7,
    max: -5.01,
    interpretacion: 'Malestar notable, posible afectación emocional',
    consejos: [
      'Reconocé y aceptá que el malestar es válido y merece atención.Ignorar las emociones puede profundizar el impacto; validarlas es el primer paso para sanarlas.',
      'Analizá qué situaciones o pensamientos están intensificando este malestar. Entender los detonantes te permitirá comenzar a manejar mejor tus emociones.',
      'Reflexioná sobre qué apoyos o recursos podés buscar para atravesar este momento. Pedir ayuda o buscar herramientas adecuadas no es signo de debilidad, sino de autocuidado.',


    ],
    acciones: [
      'Escribir lo que estás sintiendo, sin juzgarte → Poner en palabras tus emociones ayuda a liberar tensión y a clarificar tu estado interno.',
      'Evitar tomar decisiones importantes en este momento → Cuando hay malestar emocional, la percepción puede distorsionarse. Esperar te protege de arrepentimientos.',
      'Realizar una pausa consciente (respiración profunda o meditación breve) → Frenar el ritmo permite que el sistema nervioso se regule y te devuelva algo de claridad.',
      'Contactar a alguien que pueda escucharte sin apurar ni minimizar lo que sentís → Sentirse escuchado valida tu experiencia y puede aliviar la carga emocional.',
      'Observar si este malestar es parte de un patrón que se repite → Reconocer ciclos emocionales es el primer paso para intervenirlos con más conciencia.',

    ]
  },
  {
    min: -9,
    max: -7.01,
    interpretacion: 'Malestar importante, atención recomendada',
    consejos: [
      'Reconocé que este estado emocional requiere cuidado activo. No minimizar lo que sentís es un acto de responsabilidad hacia vos mismo.',
      'Preguntate con honestidad: ¿Qué parte de mi vida está pidiendo ser escuchada? A veces el malestar es una señal clara de necesidades no atendidas.',
      'Considerá la posibilidad de apoyarte en alguien de confianza o un profesional. Pedir ayuda es una forma valiente de comenzar a sanar.',

    ],
    acciones: [
      'Registrar lo que estás sintiendo y cuándo comenzó → Identificar patrones o detonantes te ayuda a entender mejor el origen del malestar y cómo manejarlo.',
      'Limitar la exposición a estímulos que te alteren (noticias, redes, discusiones) → Proteger tu mente de sobrecargas emocionales favorece la autorregulación.',
      'Elegir una actividad tranquila que te ayude a calmarte (leer, escuchar música suave, respirar profundo) → Conectar con algo que te brinde serenidad puede estabilizar tu estado emocional.',
      'Contarle a una persona de confianza lo que estás atravesando → Compartir lo que sentís permite descargar la tensión interna y recibir contención.',
      'Agendar un espacio de ayuda profesional o comunitaria con Sentia → Reconocer que necesitás apoyo es un paso clave para recuperar tu bienestar.',
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
      'Reconocé que estás atravesando un momento crítico y que eso merece atención inmediata. No estás solo; validar tu dolor es el primer paso hacia el alivio.',
      'Observá si tus emociones están afectando tu forma de pensar, actuar o vincularte. Identificar estos patrones puede ayudarte a recuperar el equilibrio.',
      'Dale prioridad a tu bienestar: hablá con alguien, pedí ayuda o frená lo que te sobrecarga. Buscar contención es una decisión sabia, no una debilidad.',

    ],
    acciones: [
      'Escribir lo que estás sintiendo → Poner en palabras tus emociones ayuda a ordenar tus pensamientos y a identificar qué te está afectando realmente.',
      'Contactar a alguien de confianza → Hablar con una persona cercana puede aliviar la carga emocional y darte una perspectiva más clara y contenida.',
      'Evitar el aislamiento → Permanecer en contacto con otros previene que el malestar se intensifique y promueve una sensación de pertenencia.',
      'Realizar una actividad que te conecte con el cuerpo (caminar, respirar profundo, estirarte) → Te ayuda a volver al presente y regular emociones intensas bajando la activación física.',
      'Planificar una consulta con un profesional de salud mental con Sentia → Buscar apoyo terapéutico te brinda herramientas concretas para recuperar estabilidad emocional de forma segura.',
    ]
  },
  {
    min: -15,
    max: -11.01,
    interpretacion: 'Riesgo emocional severo, intervención urgente',
    consejos: [
      'Este es un llamado urgente a cuidarte: lo que sentís importa y necesita atención inmediata. Reconocer la gravedad de tu estado es un acto de valentía y amor propio.',
      'Buscá ayuda profesional o apoyo cercano sin demora. No estás solo, y merecés que alguien te escuche y te acompañe con respeto.',
      'Enfocate en lo esencial: detener el daño, respirar y permitirte ser contenido. A veces el primer paso es simplemente sostenerte hasta que vuelva la calma.',

    ],
    acciones: [
      'Llamar a una línea de ayuda (Centros de Apoyo) → Te conecta con personas capacitadas para escucharte y asistirte en momentos críticos, ofreciéndote contención inmediata y profesional.',
      'Hablar con un profesional de salud mental → Un terapeuta o psiquiatra puede ayudarte a entender lo que estás sintiendo, contener el malestar y construir un plan para salir del estado de crisis.',
      'Pedir compañía inmediata → Estar con alguien de confianza puede brindarte calma, seguridad y evitar que tomes decisiones impulsivas en soledad.',
      'Evitar quedarte solo/a → La compañía física reduce la sensación de vacío y permite que tu mente tenga un ancla emocional concreta en el presente.',
      'Guardar objetos con los que podés lastimarte → Eliminar accesos a medios de autolesión protege tu integridad física mientras se estabiliza tu estado emocional.',
    ]
  }
];
