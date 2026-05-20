import { BlogPost, Pillar } from "./types";

export const CONSEJOS_DIARIOS = [
  "Hoy, intenta escuchar sin interrumpir. La escucha activa es el primer paso del amor.",
  "¿Cuándo fue la última vez que agradeciste un detalle pequeño? El agradecimiento fortalece el vínculo.",
  "El amor no es solo un sentimiento, es una decisión diaria de buscar el bien del otro.",
  "Dedica 10 minutos hoy a hablar de sueños futuros, no solo de tareas pendientes.",
  "Un lenguaje de amor diferente no significa falta de amor, significa una oportunidad de aprendizaje."
];

export const PILARES: Pillar[] = [
  { 
    id: 'comunicacion', 
    name: 'Comunicación Asertiva', 
    icon: 'MessageCircle', 
    color: 'bg-blue-500', 
    levels: 5,
    description: 'Aprende a expresar tus necesidades sin atacar.',
    challenges: [
      {
        prompt: 'Identifica un "obstáculo" en tu comunicación (celular, ruido, cansancio). ¿Cómo lo eliminarás hoy para escuchar mejor?',
        type: 'open'
      },
      {
        prompt: 'Completa la frase sobre la validación emocional:',
        type: 'fill-gap',
        sentenceTemplate: 'La validación emocional consiste en escuchar para comprender al otro en su realidad personal, en lugar de escuchar simplemente para [blank].',
        gapOptions: ['responder', 'juzgar', 'ignorar', 'vencer'],
        gapAnswer: 'responder'
      },
      {
        prompt: 'La fórmula de la petición asertiva sigue una secuencia estructurada y respetuosa. Ordena los pasos de manera secuencial (arrastra o haz clic para ordenar):',
        type: 'order-principles',
        items: [
          'Mencionar el hecho objetivo sin juzgar ("Cuando veo...")',
          'Expresar la emoción en primera persona ("Me siento...")',
          'Explicar la necesidad personal profunda ("Porque necesito...")',
          'Proponer una acción de mutuo acuerdo ("¿Qué te parece si...")'
        ],
        correctOrder: [
          'Mencionar el hecho objetivo sin juzgar ("Cuando veo...")',
          'Expresar la emoción en primera persona ("Me siento...")',
          'Explicar la necesidad personal profunda ("Porque necesito...")',
          'Proponer una acción de mutuo acuerdo ("¿Qué te parece si...")'
        ]
      },
      {
        prompt: 'Elige la opción que mejor represente la verdadera "Donación de sí mismo" frente a un desacuerdo:',
        type: 'multi-choice',
        options: [
          'Ceder siempre en todo de forma pasiva acumulando resentimiento.',
          'Buscar comprender el bien común y priorizar la felicidad y plenitud del otro de manera libre.',
          'Imponer mi postura sutilmente mediante silencios prolongados.',
          'Aceptar el desacuerdo sólo si mi pareja promete compensarme después.'
        ],
        correctOptionIndex: 1
      },
      {
        prompt: 'Reflexiona: ¿En qué momentos tu comunicación deja de ser un diálogo y se vuelve un monólogo para tener la razón?',
        type: 'open'
      }
    ]
  },
  { 
    id: 'confianza', 
    name: 'Confianza y Seguridad', 
    icon: 'Heart', 
    color: 'bg-rose-500', 
    levels: 4,
    description: 'La base sólida de toda relación duradera.',
    challenges: [
      {
        prompt: 'Define qué significa para ti la "lealtad" en los pequeños detalles cotidianos de la convivencia.',
        type: 'open'
      },
      {
        prompt: 'Completa la frase sobre el perdón verdadero:',
        type: 'fill-gap',
        sentenceTemplate: 'El perdón y la donación sincera no cambian el pasado, sino que sanan y liberan el [blank] de los dos.',
        gapOptions: ['presente', 'orgullo', 'olvido', 'comportamiento'],
        gapAnswer: 'presente'
      },
      {
        prompt: 'Ordena de manera lógica los pasos que facilitan reestablecer la confianza después de una falta:',
        type: 'order-principles',
        items: [
          'Reconocer el error u ofensa con total honestidad',
          'Validar el dolor o malestar causado en la pareja',
          'Ofrecer disculpas sinceras sin justificarse en factores externos',
          'Establecer compromisos o acuerdos de cambio concretos'
        ],
        correctOrder: [
          'Reconocer el error u ofensa con total honestidad',
          'Validar el dolor o malestar causado en la pareja',
          'Ofrecer disculpas sinceras sin justificarse en factores externos',
          'Establecer compromisos o acuerdos de cambio concretos'
        ]
      },
      {
        prompt: 'Comparte una vulnerabilidad o un miedo personal que no hayas contado antes para fortalecer la transparencia en el vínculo.',
        type: 'open'
      }
    ]
  },
  { 
    id: 'intimidad', 
    name: 'Intimidad Emocional', 
    icon: 'Sparkles', 
    color: 'bg-purple-500', 
    levels: 6,
    description: 'Conéctate a un nivel más profundo.',
    challenges: [
      {
        prompt: 'Menciona una cualidad de tu pareja que sea diferente a ti y que hoy decidas valorar en lugar de intentar amoldar.',
        type: 'open'
      },
      {
        prompt: 'Completa el principio sobre la intimidad y la corporeidad:',
        type: 'fill-gap',
        sentenceTemplate: 'En una relación auténtica y madura, el contacto corporal debe expresar la [blank] total y el respeto por el valor único del otro.',
        gapOptions: ['donación', 'posesión', 'separación', 'diversión'],
        gapAnswer: 'donación'
      },
      {
        prompt: 'Ordena los niveles de profundidad en la comunicación de pareja (del más superficial al más íntimo):',
        type: 'order-principles',
        items: [
          'Logística diaria ("¿A qué hora pasas por la compra?")',
          'Intercambio de opiniones ("¿Qué opinas sobre este libro?")',
          'Expresión de sentimientos ("Me asusta no ser suficiente...")',
          'Espiritualidad común ("Compartir el sentido del sufrimiento y la vida")'
        ],
        correctOrder: [
          'Logística diaria ("¿A qué hora pasas por la compra?")',
          'Intercambio de opiniones ("¿Qué opinas sobre este libro?")',
          'Expresión de sentimientos ("Me asusta no ser suficiente...")',
          'Espiritualidad común ("Compartir el sentido del sufrimiento y la vida")'
        ]
      },
      {
        prompt: '¿De qué manera tu lenguaje no verbal expresa amor sin necesidad de palabras (gestos, cercanía)?',
        type: 'open'
      },
      {
        prompt: 'Escribe de manera sincera 3 razones importantes por las que tu pareja es una persona única, sagrada e irrepetible en tu vida.',
        type: 'open'
      },
      {
        prompt: 'Elige la definición correcta de "Alteridad" en una relación personalista de pareja:',
        type: 'multi-choice',
        options: [
          'La tendencia a mimetizarse totalmente y perder la propia individualidad.',
          'El reconocimiento y acogida del otro como un "otro diferente" del cual no tengo derecho de posesión.',
          'La imposición sutil de mis gustos e ideales sobre la personalidad del otro.',
          'La desconexión afectiva mutua para no sufrir ante desacuerdos.'
        ],
        correctOptionIndex: 1
      }
    ]
  },
  { 
    id: 'proposito', 
    name: 'Proyecto de Vida', 
    icon: 'Trophy', 
    color: 'bg-amber-500', 
    levels: 3,
    description: 'Caminando hacia un mismo horizonte.',
    challenges: [
      {
        prompt: 'Horizonte común: ¿Dónde se ven como equipo cooperativo en 5 años a nivel personal, profesional y espiritual?',
        type: 'open'
      },
      {
        prompt: 'Completa la frase sobre el proyecto de vida compartido:',
        type: 'fill-gap',
        sentenceTemplate: 'Un auténtico proyecto de vida compartido y personalista respeta la vocación del otro y la [blank] en un bien mutuo.',
        gapOptions: ['potencia', 'disuelve', 'limita', 'ignora'],
        gapAnswer: 'potencia'
      },
      {
        prompt: 'Si hoy tuvieran que definir la "misión" de su relación, ¿cuál es el legado afectivo o social que desean regalar al mundo?',
        type: 'open'
      }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  { 
    id: "modern-bonds",
    title: "¿Amor real o amor líquido? Cómo construir relaciones sólidas en la era del \"hacer clic\"", 
    excerpt: "En un mundo de inmediatez y redes sociales, ¿por qué son tan volátiles los lazos humanos? De Zygmunt Bauman al Amor Real...", 
    category: "Cultura y Relaciones / Psicología Social",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop",
    content: `En un mundo gobernado por la inmediatez, las redes sociales y las aplicaciones de citas, la forma en que nos vinculamos ha cambiado drásticamente. El sociólogo Zygmunt Bauman acuñó el término "Modernidad Líquida" para describir una época caracterizada por la incertidumbre, donde las identidades y los lazos humanos se han vuelto volátiles y transitorios. Pero, ¿cómo está afectando esto a nuestra vida afectiva?

Hoy en día, el panorama relacional está fuertemente influenciado por fenómenos culturales que sabotean la estabilidad:

• El "Amor Líquido": Se manifiesta como un afecto flotante, sin responsabilidad real hacia el otro, alimentado por el miedo crónico al compromiso y a la pérdida de autonomía.

• El "Hombre Light": Descrito por el psiquiatra Enrique Rojas como un ser pragmático, superficial y permisivo, atrapado en el materialismo, el hedonismo y el consumismo, donde todo —incluso las personas— es desechable: se usa y se tira.

• La dictadura del FOMO y el FOBO: El miedo a perderse de algo (Fear of Missing Out) y el miedo a perderse de una opción mejor (Fear of Better Options) nos obligan a mantener siempre las "opciones abiertas", impidiéndonos echar raíces o disfrutar plenamente de la elección tomada.

Frente a este escenario desolador, la alternativa es pasar de las relaciones líquidas (basadas en una actitud utilizarista, egoísta y fragmentada en las emociones) hacia las relaciones sólidas.

El Amor Real adopta una actitud personalista. No reduce al otro a un objeto de placer o a lo que "puedo recibir" de él (amor pasivo). Al contrario, se fundamenta en la complementariedad, la inteligencia, el uso de la razón y la maduración a través del tiempo. Mientras que el amor inmanente de la posmodernidad dicta que "uno más uno es igual a dos", el amor sólido y trascendente demuestra que uno más uno es igual a un infinito crecimiento en virtudes.

¿Quieres dejar de flotar en la liquidez afectiva? Empieza por entender que el compromiso no es una cárcel, sino la máxima expresión de tu libertad para elegir construir un proyecto con propósito.

¿Te has sentido atrapado en una relación líquida alguna vez? ¡Déjanos tu comentario abajo y comparte tu experiencia!`,
    date: "Hoy" 
  },
  { 
    id: "science-of-love",
    title: "¿Qué es amar realmente? Las tres dimensiones del amor que debes conocer", 
    excerpt: "Solemos pensar que el amor simplemente \"pasa\". Pero el amor verdadero dista de ser una mera tormenta emocional...", 
    category: "Crecimiento Personal / Educación Sentimental",
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=600&auto=format&fit=crop",
    content: `Solemos pensar que el amor es algo que simplemente "nos pasa", una fuerza mística que nos atropella sin previo aviso. Sin embargo, los grandes filósofos y pensadores nos recuerdan que el amor verdadero dista mucho de ser una mera tormenta emocional. Como señalaba Yepes Stork, el amor no es un simple sentimiento, sino un acto libre de la voluntad.

Para construir un lazo duradero, es vital comprender que el amor es una dinámica afectiva integral donde conviven la razón, la voluntad, las emociones y los sentimientos. Según diversos autores y enfoques de la asesoría familiar, el amor se compone de tres grandes dimensiones que deben estar en perfecto equilibrio:

1. La Dimensión Biológica (La Química): Es el punto de partida. Traduce el deseo sensual y la atracción física. Es el clásico "me gustas", el flechazo y la emoción química inicial que enciende las alarmas de nuestro sistema nervioso. Es indispensable, pero totalmente insuficiente por sí sola.

2. La Dimensión Psico-afectiva (El Romance): Se traduce en la simpatía y el afecto mutuo. Aquí nace el "te quiero", el enamoramiento propiamente dicho, la pasión por descubrir al otro y el anhelo profundo de compartir tiempo a solas y espacios de intimidad.

3. La Dimensión Espiritual / Racional (La Benevolencia): Es la cumbre del amor maduro y se traduce en el "te amo". Está gobernada por la razón y el deseo voluntario de "querer el bien del otro en cuanto otro". Aquí el amor deja de ser pasivo (centrado en lo que yo siento o recibo) para volverse activo: una decisión consciente de buscar la felicidad de la pareja con las propias capacidades.

Un error frecuente en la cultura actual es el analfabetismo afectivo, que confunde la felicidad con el mero momento emotivo del enamoramiento. Cuando la química inicial baja, la gente asume que "el amor se acabó".

El secreto de una relación sólida radica en el Amor Integrado: saber que los aspectos pasivos del amor (la atracción física y el romanticismo) se deben cuidar, alimentar y sostener a través del amor activo y voluntario del don de sí.

Y tú, ¿en cuál de estas tres dimensiones sientes que se basa más tu relación actual? ¡Leemos tus opiniones en la sección de comentarios!`,
    date: "Ayer" 
  },
  { 
    id: "attachment-styles",
    title: "Estilos de apego: ¿Cómo influyen tus primeros años de vida en tus relaciones de pareja actuales?", 
    excerpt: "¿Por qué algunos buscan constante reafirmación y otros huyen del compromiso? Conoce los 4 estilos de apego básicos...", 
    category: "Psicología / Salud Mental",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=600&auto=format&fit=crop",
    content: `¿Te has preguntado por qué algunas personas necesitan reafirmación constante en el noviazgo mientras que otras huyen despavoridas en cuanto las cosas se ponen serias? La respuesta no está en la mala suerte, sino en la Teoría del Apego. Esta teoría sostiene que el fuerte vínculo físico y emocional que formamos con nuestros cuidadores primarios durante la infancia define nuestro mapa de ruta para relacionarnos en la adultez.

Si ese vínculo primario fue fuerte, desarrollamos un apego seguro; si fue inconsistente, frío o violento, crecemos bajo la sombra de un apego inseguro. A continuación, analizamos los 4 estilos de apego básicos y cómo impactan tu vida amorosa:

1. Apego Seguro – El ideal de las relaciones sólidas: Las personas con apego seguro crecieron con cuidadores que validaron sus emociones y atendieron sus necesidades con tranquilidad y afecto constante. En la pareja: Tienen una autoimagen positiva, confían en los demás y se les facilitan las relaciones incondicionales. No temen al abandono, saben dar tiempo y espacio, y no dependen de otros para validar su valor personal.

2. Apego Ansioso-Ambivalente – La montaña rusa del reclamo: Es el resultado de una crianza con estilos de autoridad incoherentes (a veces muy exigentes, a veces excesivamente permisivos). El niño aprendió a exagerar su estado emocional para lograr captar la atención de sus padres. En la pareja: Suelen ser adultos ansiosos e inestables que vigilan continuamente al otro. Les cuesta horrores dar espacio, necesitan aprobación constante y muestras de cariño repetitivas, recurriendo inconscientemente al chantaje emocional.

3. Apego Evitativo – La falsa autosuficiencia: Proviene de hogares con una educación autoritaria y estricta, donde se usaba el castigo como control y se enseñaba a ocultar las emociones. El niño asimiló que sus figuras de apoyo no estaban accesibles en momentos de dolor. En la pareja: Tienen serios problemas para entablar intimidad emocional. Se retraen en sí mismos ante situaciones difíciles, evitan el contacto emocional y actúan como si los sentimientos del otro no les importasen, confundiendo autonomía con aislamiento.

4. Apego Desorganizado – El conflicto del miedo y la seguridad: Se origina a partir de experiencias infantiles traumáticas de negligencia o abuso severo. La misma figura que debía proveer seguridad representa la fuente del peligro. En la pareja: Sienten una profunda ansiedad; se consideran indignos de ser amados y sufren constantes desbordes emocionales que no logran gestionar. Desean el amor pero intentan evitar toda interacción social por miedo a salir lastimados.

Identificar tu estilo de apego es el primer paso para no caer en relaciones tóxicas, aquellas atmósferas dañinas donde se pierde paulatinamente la autoestima y la libertad frente al otro. Las dinámicas tóxicas destruyen el crecimiento personal, distorsionan la percepción de la realidad mediante manipulaciones y aíslan a la persona de su red de apoyo social.

Aprender a transitar hacia un apego seguro es un entrenamiento en virtudes y autoconocimiento que transformará tu manera de amar.

¿Con cuál de estos cuatro estilos de apego te sientes más identificado? ¡Comparte tu reflexión en los comentarios!`,
    date: "Hace 4 días" 
  },
  { 
    id: "dating-mistakes",
    title: "Del enamoramiento a la ruptura: 5 errores fatales en el noviazgo y cómo superar una \"tusa\"", 
    excerpt: "El noviazgo es un laboratorio afectivo. Conoce los desaciertos más comunes y cómo recorrer el camino del contacto cero...", 
    category: "Bienestar Emocional / Superación de Rupturas",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=600&auto=format&fit=crop",
    content: `El noviazgo es, por definición, una etapa de conocimiento real, entendimiento mutuo y entrenamiento en virtudes. Es un laboratorio para revisar si la persona que tenemos al lado es la indicada para co-diseñar un proyecto de vida en común. Sin embargo, a menudo tropezamos con idealizaciones y falsas expectativas que terminan por sentenciar la relación al fracaso.

Para construir un lazo maduro, debemos evitar cometer estos desaciertos universales en la relación:

1. Equivocarse en las expectativas: Tratar de forzar al otro a encajar en nuestras ilusiones preconcebidas o referentes familiares idílicos, ignorando su realidad personal.

2. Divinizar y absolutizar el amor: Creer la falacia posmoderna de que "sin una relación no soy nada" o vivir enamorado únicamente de la bonita sensación de estar enamorado.

3. Hacer del otro un absoluto: Colocar a la pareja en un pedestal psicológico desproporcionado. Al idealizarla ciegamente, garantizamos un desplome doloroso cuando descubramos sus imperfecciones humanas.

4. Creer que basta con sentir: El enamoramiento es solo una fase afectiva inicial; pensar que una relación puede sobrevivir solo con sentimientos, sin meterle cabeza, voluntad ni compromiso, es un grave error.

5. El descuido de lo pequeño: Apagar la llama diaria olvidando los detalles mínimos de ternura, respeto y atención recíproca.

Si a pesar de los esfuerzos surgen diferencias irreconciliables superada la etapa inicial, suspender el noviazgo es la decisión más sana. La interrupción de un compromiso afectivo jamás debe catalogarse como un fracaso, sino como un acto de madurez y honestidad.

Aun así, sanar un corazón roto toma tiempo y requiere de herramientas específicas para no caer en la depresión por amor:

• Establece rutinas y respeta hábitos saludables: Mantener el orden en tus horas de sueño, alimentación y actividad física estabiliza tu química cerebral.

• No te precipites ni huyas: Evita saltar de inmediato a otra relación ("un clavo saca otro un clavo" es un mito dañino de las relaciones líquidas) ni intentes maquillar el dolor fingiendo que no pasa nada.

• No te aísles: Rodéate de tu círculo de confianza básico (familiares, amigos verdaderos) que te aporte contención afectiva sin juzgarte, y permítete llorar y desahogarte con total libertad.

• Limita estrictamente el contacto con tu ex: El famoso "contacto cero" es indispensable en las primeras fases para desintoxicar los hábitos emocionales y recuperar la perspectiva de tu individualidad.

Recuerda las palabras de Alessandro D’Avenia en la literatura afectiva actual: "A veces, el amor no es suficiente para quedarse. Pero siempre es suficiente para cambiarte". Utiliza este dolor como un trampolín hacia un autoconocimiento más profundo.

¿Qué estrategia te ha servido más para superar una ruptura amorosa en el pasado? ¡Déjanos tus consejos abajo en los comentarios!`,
    date: "Hace 1 semana" 
  },
  { 
    id: "persona-pareja",
    title: "El concepto de Persona en la Pareja", 
    excerpt: "Desde la antropología, cada miembro es una unidad irrepetible con una dignidad intrínseca...", 
    category: "Antropología Personalista",
    image: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?q=80&w=600&auto=format&fit=crop",
    content: `La antropología personalista nos enseña que cada ser humano es una "persona", lo cual implica ser un individuo único, irrepetible y con una dignidad intrínseca.

En la relación de pareja, este concepto es fundamental porque nos invita a no ver al otro como un objeto de satisfacción o una extensión de nuestros deseos, sino como un "tú" con el que entramos en un diálogo de amor.

Reconocer al otro como persona significa respetar su libertad, admirar su misterio y entender que el amor verdadero es la donación desinteresada hacia ese ser que es igual en dignidad pero distinto en su forma de ser.`,
    date: "Hace 2 semanas" 
  },
  { 
    id: "lenguajes-amor",
    title: "Los 5 lenguajes del amor: Resumen", 
    excerpt: "Entender cómo el otro recibe afecto cambia las reglas del juego de la convivencia diaria...", 
    category: "Comunicación y Afecto",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=600&auto=format&fit=crop",
    content: `No todos amamos de la misma manera ni nos sentimos amados con las mismas acciones. Gary Chapman identificó cinco "lenguajes" principales:

1. Palabras de Afirmación: Elogios, palabras de ánimo y gratitud.
2. Tiempo de Calidad: Atención indivisa y actividades compartidas.
3. Regalos: Símbolos visuales del amor y el pensamiento.
4. Actos de Servicio: Acciones que sabemos que alivian la carga del otro.
5. Contacto Físico: Caricias, abrazos y cercanía.

Descubrir el lenguaje primario de tu pareja y aprender a hablarlo es una de las mayores inversiones que puedes hacer en tu relación.`,
    date: "Hace 3 semanas" 
  },
  { 
    id: "manejo-conflictos",
    title: "Manejo de conflictos desde la razón", 
    excerpt: "Por qué explotamos emocionalmente y cómo volver a la calma cerebral utilizando técnicas de regulación...", 
    category: "Gestión Emocional",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=600&auto=format&fit=crop",
    content: `Cuando entramos en conflicto, a menudo nuestra "amígdala" toma el control, activando una respuesta de lucha o huida que anula nuestra capacidad de razonar. Esto es lo que conocemos como "secuestro emocional".

Para manejar los conflictos desde la afectividad madura, debemos:

• Pausa Táctica: Tomar 20 minutos para que el pulso baje y la corteza prefrontal vuelva a activarse.
• Hablar en primera persona: En lugar de "Tú siempre haces", decir "Yo me siento...".
• Buscar la solución, no la victoria: El objetivo no es ganar una discusión, sino proteger el vínculo y encontrar un camino común.`,
    date: "Hace 1 mes" 
  }
];
