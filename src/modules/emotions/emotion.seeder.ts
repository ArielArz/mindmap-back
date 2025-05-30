import { Emotion } from './entities/emotion.entity';
import { Repository } from 'typeorm';

export async function seedEmotions(repo: Repository<Emotion>) {
  try {
    console.log('Comienza a seedear emociones');

    const allMyEmotions = [
      {
        "name": "Tristeza",
        "significado": "Es una emoción que aparece cuando algo importante se pierde, se transforma o no resulta como esperábamos. La tristeza nos invita a detenernos, a llorar lo que duele, y a sanar poco a poco lo que quedó herido. Aunque no es cómoda, tiene un propósito: cuidar lo que amamos.",
        "emoji": "😢",
        "clinicalValue": -2,
        "reflexion": "Sentirte triste no te hace débil, te hace humano. Permitite llorar, escribir, hablar o simplemente estar en silencio. No apures este momento. A veces, la oscuridad también nutre. Recordá que no estás solo: hay personas, lugares o recuerdos que pueden sostenerte mientras el dolor se calma."
      },
      {
        "name": "Alegría",
        "significado": "Es una emoción expansiva que nace cuando algo nos conecta con lo bueno, con lo vivido desde el placer, el amor o la risa. La alegría no siempre grita, a veces es una brisa suave que nos recuerda que estar vivos puede ser hermoso.",
        "emoji": "😊",
        "clinicalValue": 2,
        "reflexion": "Dejate habitar por esta emoción. No importa si es por algo grande o por un detalle mínimo: la alegría es medicina. Compartila, bailala, escribila o simplemente reconocela. Guardá este momento en tu memoria para cuando lo necesites. La alegría es también un acto de resistencia."
      },
      {
        "name": "Ansiedad",
        "significado": "Es una emoción que surge de la anticipación y la incertidumbre. La ansiedad nos avisa que hay algo que nos preocupa o que creemos que no podemos controlar, manifestándose como inquietud mental o física. Nos empuja a prepararnos, aunque a veces nos paraliza.",
        "emoji": "😰",
        "clinicalValue": -1,
        "reflexion": "Observá qué pensamientos están detrás de tu ansiedad. ¿Hay algo que puedas hacer ahora? Si no, intentá traer tu atención al presente con una respiración profunda o conectando con tus sentidos. A veces, solo reconocerla y permitirla es el primer paso para que disminuya."
      },
      {
        "name": "Enojo",
        "significado": "Es una emoción intensa que aparece cuando percibimos una injusticia, un límite cruzado o una frustración. El enojo nos carga de energía para defendernos o para cambiar lo que nos molesta. Aunque puede sentirse explosivo, bien gestionado, es una fuerza para el cambio.",
        "emoji": "😠",
        "clinicalValue": -2,
        "reflexion": "¿Qué te está mostrando tu enojo? ¿Hay un límite que necesitás establecer o una necesidad que no está siendo cubierta? Date permiso para sentirlo sin juzgarte, y luego buscá una forma constructiva de expresarlo o transformarlo."
      },
      {
        "name": "Relajo",
        "significado": "Es un estado de calma y equilibrio, donde el cuerpo y la mente se liberan de tensiones y estrés. El relajo nos permite recargar energías y conectar con una sensación de paz interior. Es un momento para simplemente ser, sin la presión de hacer.",
        "emoji": "😌",
        "clinicalValue": 2,
        "reflexion": "Disfrutá profundamente este momento de calma. Identificá qué acciones o situaciones te llevaron a sentirte así y buscá integrarlas más en tu día a día. El relajo es esencial para tu bienestar. ¿Cómo podés nutrir más esta sensación?"
      },
      {
        "name": "Entusiasmo",
        "significado": "Es una emoción de gran interés y motivación, que nos impulsa hacia nuevas ideas, actividades o eventos futuros con una energía vibrante. El entusiasmo es un motor que nos conecta con nuestros deseos y nos llena de optimismo y ganas de actuar.",
        "emoji": "🤩",
        "clinicalValue": 2,
        "reflexion": "El entusiasmo es una chispa vital. Canalizalo hacia proyectos o metas que resuenen con vos. Compartí tu energía, creá, innová. Esta emoción te muestra el camino hacia lo que te apasiona y te conecta con tu propósito. ¡Dejate llevar por ella!"
      },
      {
        "name": "Aburrimiento",
        "significado": "Es una sensación de falta de estímulo, interés o propósito. El aburrimiento puede aparecer cuando nos sentimos desocupados o cuando las actividades no nos generan conexión. A veces, es una invitación a la creatividad y a la búsqueda de algo nuevo.",
        "emoji": "😐",
        "clinicalValue": -1,
        "reflexion": "Si el aburrimiento te visita, escuchalo. ¿Qué te está pidiendo? Puede ser una señal para explorar nuevos intereses, para conectar con tu mundo interior, o para encontrar una actividad que te genere curiosidad. Date la oportunidad de crear algo nuevo desde este espacio."
      },
      {
        "name": "Preocupación",
        "significado": "Es una emoción que surge de la intranquilidad o el miedo ante una situación incierta o desafiante. La preocupación es la mente tratando de resolver un problema futuro, a veces de manera excesiva, generando tensión y ansiedad.",
        "emoji": "😟",
        "clinicalValue": -1,
        "reflexion": "Preguntate: ¿esto que me preocupa tiene una solución que puedo implementar ahora mismo? Si la respuesta es sí, actuá. Si no, intentá soltarlo por un momento. La preocupación excesiva consume tu energía. Practicá llevar tu mente al presente, donde tenés más control."
      },
      {
        "name": "Culpa",
        "significado": "Es un sentimiento de responsabilidad o remordimiento por haber actuado de una manera que consideramos incorrecta, o por haber dañado a otros. La culpa nos invita a reflexionar sobre nuestras acciones y, si es necesario, a reparar el daño causado.",
        "emoji": "😔",
        "clinicalValue": -2,
        "reflexion": "Reconocer la culpa es el primer paso hacia la reparación y el aprendizaje. ¿Qué podés hacer para enmendar lo sucedido? ¿Qué lección te deja esta experiencia? Liberarte de la culpa no es justificar el error, sino aprender de él para avanzar en paz."
      },
      {
        "name": "Gratitud",
        "significado": "Es el reconocimiento y la valoración profunda de algo positivo recibido, ya sea material, emocional o espiritual. La gratitud nos conecta con la abundancia y nos permite apreciar lo que tenemos, fortaleciendo nuestro bienestar y nuestras relaciones.",
        "emoji": "🙏",
        "clinicalValue": 2,
        "reflexion": "Cultivá la gratitud en tu día a día. Tomate un momento para identificar aquello por lo que te sentís agradecido, por pequeño que sea. Expresarla, ya sea en voz alta o en silencio, te conecta con la belleza de la vida y te llena de una profunda paz."
      },
      {
        "name": "Orgullo",
        "significado": "Es una satisfacción personal que nace de los logros propios o ajenos, o del reconocimiento de nuestra identidad y valores. El orgullo, en su justa medida, fortalece la autoestima y nos impulsa a seguir creciendo y confiando en nuestras capacidades.",
        "emoji": "😎",
        "clinicalValue": 1,
        "reflexion": "Celebrá tus logros y los de quienes te rodean. Reconocé tu esfuerzo y valor. El orgullo sano te impulsa a seguir adelante y a confiar en lo que sos capaz de hacer. ¿De qué te sentís genuinamente orgulloso hoy?"
      },
      {
        "name": "Vergüenza",
        "significado": "Es una incomodidad o pena profunda por haber cometido un error, por sentirse expuesto o fuera de lugar. La vergüenza nos hace querer escondernos, pero también puede ser una señal para reflexionar sobre nuestras acciones y cómo nos relacionamos con los demás.",
        "emoji": "😳",
        "clinicalValue": -2,
        "reflexion": "La vergüenza puede ser muy limitante. Recordá que sos más grande que tus errores. Tratáte con compasión, como tratarías a un amigo. Todos cometemos errores. ¿Qué necesitás para liberarte de esta carga y aceptarte tal como sos?"
      },
      {
        "name": "Frustración",
        "significado": "Es la desilusión que sentimos cuando no podemos alcanzar una meta o deseo debido a obstáculos o limitaciones. La frustración nos indica que algo no está funcionando como esperábamos y nos invita a reevaluar nuestras estrategias o a soltar lo que no es posible.",
        "emoji": "😤",
        "clinicalValue": -2,
        "reflexion": "La frustración es una señal de que algo importante para vos no se está dando. ¿Hay algo que puedas ajustar en tus expectativas o en tu enfoque? ¿O quizás es momento de soltar esa meta y redirigir tu energía? Escuchá lo que esta emoción te está queriendo mostrar."
      },
      {
        "name": "Esperanza",
        "significado": "Es una expectativa positiva ante el futuro, una confianza en que algo bueno ocurrirá, incluso en medio de la adversidad. La esperanza es una fuerza que nos impulsa a seguir adelante, a creer en las posibilidades y a mantenernos firmes en nuestros sueños.",
        "emoji": "🌈",
        "clinicalValue": 2,
        "reflexion": "La esperanza es una brújula interna que te guía. ¿Qué visión o sueño te mantiene firme y te invita a avanzar? Nutrí esa esperanza con acciones, por pequeñas que sean. Ella es el puente entre el presente y un futuro mejor."
      },
      {
        "name": "Desánimo",
        "significado": "Es una falta de motivación o energía para continuar, especialmente después de una decepción o dificultad. El desánimo nos invita a pausar, a escuchar qué parte de nosotros necesita descanso y a buscar nuevas fuentes de inspiración.",
        "emoji": "😞",
        "clinicalValue": -2,
        "reflexion": "Está bien sentirse desanimado. Es una señal para pausar y atenderte. ¿Qué necesitas para recargar tu energía? ¿Descanso, apoyo, un cambio de perspectiva? Date permiso para cuidar de vos y recordá que esta emoción es temporal. Habrá nuevos amaneceres."
      },
      {
        "name": "Satisfacción",
        "significado": "Es una plenitud emocional que surge al haber cumplido una necesidad, un deseo o una expectativa. La satisfacción nos conecta con la sensación de haber logrado algo, de haber tomado buenas decisiones o de haber encontrado lo que buscábamos.",
        "emoji": "😌",
        "clinicalValue": 2,
        "reflexion": "Reconocé y celebrá los momentos de satisfacción. Identificá qué acciones o elecciones te llevaron a esta sensación de plenitud. Guardá esta experiencia en tu memoria como un recordatorio de tu capacidad para crear lo que deseas y para sentirte realizado."
      },
      {
        "name": "Decepción",
        "significado": "Es la desilusión que experimentamos cuando la realidad no cumple con nuestras expectativas. La decepción nos invita a revisar lo que esperábamos, de dónde venían esas expectativas, y a aceptar lo que es, para poder soltar y seguir adelante.",
        "emoji": "😞",
        "clinicalValue": -1,
        "reflexion": "La decepción puede ser dolorosa, pero también es una gran maestra. Te invita a reflexionar sobre tus expectativas: ¿eran realistas? ¿De dónde venían? Permitite sentir el dolor, aprendé lo que necesites, y luego soltá para hacer espacio a nuevas posibilidades."
      },
      {
        "name": "Nerviosismo",
        "significado": "Es una tensión emocional que surge por anticipación, miedo o presión ante un evento importante o una situación incierta. El nerviosismo es el cuerpo preparándose, pero a veces puede generar inquietud y dificultad para concentrarse.",
        "emoji": "😬",
        "clinicalValue": -1,
        "reflexion": "Es normal sentir nerviosismo ante lo desconocido o lo importante. Respirá profundamente y tratá de anclarte en el presente. Recordá que estás preparado para lo que venga, y que esta tensión es una energía que podés canalizar si la observás sin juicio."
      },
      {
        "name": "Euforia",
        "significado": "Es una felicidad intensa y desbordante, una sensación de alegría extrema y optimismo. La euforia nos llena de energía vital, nos hace sentir poderosos y nos invita a celebrar la vida en su máxima expresión.",
        "emoji": "😄",
        "clinicalValue": 2,
        "reflexion": "Dejate llevar por la euforia, es una energía poderosa. Compartila, bailala, disfrutala. Esta emoción te conecta con la expansión y la alegría pura. Recordá este sentimiento y volvé a él cuando necesites un impulso. ¡Es un regalo de la vida!"
      },
      {
        "name": "Melancolía",
        "significado": "Es una tristeza suave y reflexiva, muchas veces sin una causa concreta, vinculada a recuerdos, a la nostalgia o a la conciencia de la impermanencia. La melancolía nos invita a conectar con nuestra profundidad y a honrar lo que fue importante.",
        "emoji": "🎵",
        "clinicalValue": -1,
        "reflexion": "Permitite sentir la melancolía. Es una emoción que te conecta con tu interior y con la belleza de lo que fue. Honrá esos recuerdos, esas sensaciones. No siempre se necesita una razón para sentirla, a veces es solo la vida invitándote a la introspección."
      },
      {
        "name": "Conexión",
        "significado": "Es una sensación de cercanía emocional y comprensión con uno mismo, con otros o con el entorno. La conexión nos nutre, nos da sentido de pertenencia y nos hace sentir parte de algo más grande. Es un estado de armonía y reciprocidad.",
        "emoji": "🤝",
        "clinicalValue": 2,
        "reflexion": "Valorá y cultivá los vínculos que te hacen sentir conectado. ¿Qué personas, lugares o actividades te brindan esta sensación de cercanía y comprensión? Nutrir estas conexiones es fundamental para tu bienestar y para sentirte parte de la vida."
      },
      {
        "name": "Soledad",
        "significado": "Es un sentimiento de aislamiento emocional o físico, de no tener compañía o vínculos significativos. La soledad puede ser una oportunidad para la introspección, pero cuando duele, nos invita a buscar abrirnos y a compartir lo que sentimos.",
        "emoji": "🥺",
        "clinicalValue": -1,
        "reflexion": "Estar solo no siempre es sinónimo de soledad. Si te duele, reconocé ese sentimiento. ¿Necesitas conectar con alguien? ¿Hay algo que puedas hacer para sentirte más acompañado? Abrirte y compartir lo que sentís es un acto de valentía."
      },
      {
        "name": "Confusión",
        "significado": "Es una falta de claridad mental o emocional, una dificultad para tomar decisiones o entender situaciones. La confusión es una señal de que algo se está moviendo en tu interior y puede ser un paso previo a un nuevo entendimiento o un cambio.",
        "emoji": "😕",
        "clinicalValue": -1,
        "reflexion": "La confusión puede ser incómoda, pero es una etapa. Permitite no saber todas las respuestas ahora. Explora las diferentes opciones, buscá información, o simplemente esperá. A veces, la claridad llega cuando menos la buscás. Confiá en el proceso."
      },
      {
        "name": "Inseguridad",
        "significado": "Es una falta de confianza en uno mismo o en los demás, una duda sobre la propia valía o sobre el entorno. La inseguridad nos limita, pero también puede ser una invitación a trabajar en nuestra autoestima y a reconocer nuestro valor intrínseco.",
        "emoji": "😟",
        "clinicalValue": -2,
        "reflexion": "Reconocer la inseguridad es el primer paso para fortalecer tu confianza. Recordá que sos valioso tal como sos, con tus fortalezas y tus áreas de crecimiento. Identificá qué pensamientos te generan inseguridad y desafíalos. Date permiso para confiar más en vos."
      },
      {
        "name": "Seguridad",
        "significado": "Es una confianza plena en uno mismo, en las decisiones tomadas o en el entorno. La seguridad nos permite actuar con aplomo, tomar riesgos calculados y sentirnos en control de nuestra vida. Es un estado de firmeza y confianza interior.",
        "emoji": "💪",
        "clinicalValue": 2,
        "reflexion": "Sentirte seguro te impulsa a ir por más. ¿Qué factores internos o externos contribuyen a esta sensación de confianza? Nutrí esas fuentes de seguridad y permitite actuar desde un lugar de fortaleza. Esta emoción te empodera y te ayuda a manifestar tus deseos."
      },
      {
        "name": "Resentimiento",
        "significado": "Es un dolor o enojo prolongado hacia alguien que ha causado una ofensa o daño. El resentimiento puede ser una carga pesada, ya que nos mantiene anclados al pasado y nos impide avanzar. Nos invita a reflexionar sobre el perdón y la liberación.",
        "emoji": "😒",
        "clinicalValue": -2,
        "reflexion": "El resentimiento te lastima más a vos que a la otra persona. ¿Qué necesitarías para soltarlo? A veces, perdonar no es justificar, sino liberarte de la carga. Date permiso para procesar esa emoción y buscar la paz que te mereces."
      },
      {
        "name": "Valentía",
        "significado": "Es la capacidad de enfrentar el miedo o el peligro con decisión y coraje. La valentía no es la ausencia de miedo, sino la elección de actuar a pesar de él. Nos impulsa a superar obstáculos y a defender lo que creemos.",
        "emoji": "🦁",
        "clinicalValue": 2,
        "reflexion": "Reconocé tus actos de valentía, por pequeños que sean. Cada vez que te atrevés a algo a pesar del miedo, estás expandiendo tu potencial. ¿Qué acto valiente hiciste hoy? Honrá esa fuerza interna que te impulsa a crecer."
      },
      {
        "name": "Apatía",
        "significado": "Es una falta de interés o motivación, una indiferencia ante situaciones que normalmente generarían emoción. La apatía puede ser una señal de cansancio profundo, de dolor no expresado o de una necesidad de introspección para reconectar con lo que te importa.",
        "emoji": "😑",
        "clinicalValue": -2,
        "reflexion": "Si la apatía te acompaña, escuchá lo que te está queriendo decir. Puede ser una invitación a descansar, a explorar qué te desconectó de tu propósito, o a buscar apoyo. No la ignores; es una señal para atender tus necesidades más profundas."
      },
      {
        "name": "Afecto",
        "significado": "Es la expresión de cariño, ternura y cercanía hacia otros. El afecto nos conecta, nos nutre y fortalece nuestros vínculos. Es una emoción que nos humaniza y nos permite dar y recibir amor de manera genuina.",
        "emoji": "🤗",
        "clinicalValue": 2,
        "reflexion": "Date permiso para dar y recibir afecto. Es una fuente inagotable de bienestar. ¿A quién te gustaría mostrarle tu cariño hoy? Un abrazo, una palabra amable o un gesto de apoyo pueden transformar el día de alguien y el tuyo propio."
      },
      {
        "name": "Curiosidad",
        "significado": "Es el deseo de conocer o aprender cosas nuevas, motivado por el interés, la novedad o la necesidad de comprender. La curiosidad nos impulsa a explorar, a cuestionar y a expandir nuestros horizontes, tanto en el mundo exterior como en nuestro interior.",
        "emoji": "🧐",
        "clinicalValue": 1,
        "reflexion": "Cultivá tu curiosidad. Ella te abre puertas a nuevos conocimientos, experiencias y perspectivas. ¿Qué te intriga hoy? Seguí explorando, preguntando y aprendiendo. La curiosidad es un motor para el crecimiento y el descubrimiento constante."
      },
      {
        "name": "Éxtasis",
        "significado": "Es un estado de alegría y euforia extremas, una experiencia de felicidad desbordante y trascendente que inunda todo el ser. El éxtasis nos eleva por encima de lo cotidiano y nos conecta con una sensación de plenitud y maravilla.",
        "emoji": "🤩",
        "clinicalValue": 3,
        "reflexion": "Dejate llevar por esta emoción sublime. Es un recordatorio de la inmensidad de la vida y de la capacidad de tu ser para experimentar una felicidad sin límites. Guardá este momento en tu corazón para cuando necesites recordar la magia de existir."
      },
      {
        "name": "Terror",
        "significado": "Es un miedo extremo e intenso que paraliza el cuerpo y la mente ante una amenaza inminente o percibida. El terror nos arrebata la capacidad de pensar con claridad y nos sumerge en una sensación de vulnerabilidad y peligro inminente.",
        "emoji": "😱",
        "clinicalValue": -3,
        "reflexion": "¿Qué te está aterrorizando? Si la amenaza es real, buscá refugio y ayuda. Si es percibida, intentá anclarte en el presente con una respiración profunda. Reconocé tu miedo, pero no dejes que te consuma. Buscá apoyo para procesar esta emoción tan intensa."
      },
      {
        "name": "Serenidad",
        "significado": "Es un estado de calma profunda y paz interior, libre de perturbaciones y preocupaciones. La serenidad nos permite mantenernos ecuánimes ante las circunstancias, conectando con un oasis de tranquilidad en nuestro interior.",
        "emoji": "🧘‍♀️",
        "clinicalValue": 3,
        "reflexion": "La serenidad es un tesoro. Cultivala a través de la meditación, la naturaleza o cualquier práctica que te conecte con tu centro. Es un recordatorio de que, incluso en el caos, puedes encontrar un lugar de paz dentro de vos."
      },
      {
        "name": "Compasión",
        "significado": "Es una profunda empatía y deseo de aliviar el sufrimiento propio o ajeno, acompañada de una acción bondadosa. La compasión nos conecta con nuestra humanidad y nos impulsa a extender una mano, a comprender y a sanar.",
        "emoji": "💖",
        "clinicalValue": 3,
        "reflexion": "Cultivá la compasión, tanto hacia los demás como hacia vos mismo. Es un acto de amor que te conecta con lo más profundo de tu ser y te permite sanar heridas. Un gesto compasivo puede transformar una vida, empezando por la tuya."
      },
      {
        "name": "Desesperación",
        "significado": "Es un estado de pérdida total de esperanza y convicción, donde la persona siente que no hay solución ni salida a una situación difícil. La desesperación puede llevar a la inacción y a una profunda sensación de vacío y angustia.",
        "emoji": "🖤",
        "clinicalValue": -3,
        "reflexion": "Si sentís desesperación, es crucial buscar ayuda de inmediato. No tenés que cargar con esto solo. Hablá con alguien de confianza, un profesional o una línea de ayuda. Incluso en la oscuridad más profunda, siempre hay una pequeña chispa de esperanza que puede encenderse."
      },
      {
        "name": "Gratificación",
        "significado": "Es la satisfacción y el placer que se experimentan al recibir una recompensa o al cumplir un deseo esperado. La gratificación nos llena de un bienestar inmediato y nos confirma que nuestros esfuerzos han valido la pena.",
        "emoji": "🎁",
        "clinicalValue": 3,
        "reflexion": "Disfrutá este momento de gratificación. Es el fruto de tu esfuerzo y un recordatorio de que eres capaz de lograr lo que te propones. Celebrá tus victorias, grandes o pequeñas, y permitite sentir el placer de haber alcanzado lo que deseabas."
      },
      {
        "name": "Indiferencia",
        "significado": "Es la falta total de interés o preocupación hacia algo o alguien, una ausencia de respuesta emocional. La indiferencia puede ser una forma de desconexión que nos aísla, impidiendo el contacto y la empatía con el entorno.",
        "emoji": "😑",
        "clinicalValue": -3,
        "reflexion": "La indiferencia puede ser una señal de que algo te ha desconectado o te ha herido profundamente. Es importante explorar la raíz de esta emoción. ¿Qué te llevó a dejar de sentir? Reconocerla es el primer paso para volver a conectar con el mundo y contigo mismo."
      },
      {
        "name": "Éxito",
        "significado": "Es la consecución de una meta, un logro o un resultado deseado que genera una profunda satisfacción y orgullo. El éxito nos impulsa a seguir creciendo y nos confirma nuestra capacidad de manifestar nuestros propósitos en la vida.",
        "emoji": "🏆",
        "clinicalValue": 3,
        "reflexion": "Celebrá tu éxito con gratitud y alegría. Es el resultado de tu esfuerzo, dedicación y talento. No olvides el camino que te trajo hasta aquí y usá esta energía para inspirarte a nuevos desafíos. ¡Disfrutá este momento de triunfo!"
      },
      {
        "name": "Amargura",
        "significado": "Es un resentimiento y dolor persistente que surge de una injusticia o decepción no resuelta, dejando un sabor agrio en el alma. La amargura nos atrapa en el pasado, impidiendo el perdón y la liberación emocional.",
        "emoji": "🍋",
        "clinicalValue": -3,
        "reflexion": "La amargura puede ser una carga muy pesada. Te está diciendo que hay algo que no fue sanado. Explorá la posibilidad del perdón, no para la otra persona, sino para liberarte a vos mismo. Buscá maneras de soltar el pasado para poder vivir plenamente el presente."
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