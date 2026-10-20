# Auditoría revela una clínica invisible y legalmente expuesta

La clínica que el cliente llama "One Medical" es **One Source Medical Center** (onesourcemvc.com, 1972 W 5400 S, Suite #2, Taylorsville, UT 84129). Todo indica que no es un negocio independiente, sino la marca médica de la misma operación que **AVA Injury Clinic**, una clínica quiropráctica hispana de accidentes de auto en la misma dirección: el NPI de organización de esa dirección (ONE SOURCE CARE LLC) tiene como dueño al quiropráctico **Daniel Lafontaine, DC**, que figura en el equipo de AVA. En internet, One Source casi no existe: tiene **tres URLs indexadas**, todo su contenido está en inglés aunque anuncia "personal bilingüe", usa tres nombres de marca (uno choca con Amazon One Medical), dos teléfonos y un **Gmail gratuito**, y su página "Schedule Now" solo pide que la llamen. Abre **16.5 horas por semana** y no tiene **ninguna reseña** propia; la reputación de la dirección (**4.9 estrellas con 223 reseñas** en Birdeye) está a nombre de AVA. El proceso de construcción que se reportó ya no puede funcionar como se describió: **OpenAI apagó ChatGPT Atlas el 9 de agosto de 2026**, el sitio en vivo tiene la huella de GoDaddy y no existe ningún repositorio público en GitHub. Los riesgos legales más urgentes son tres: datos de pacientes que llegan a un Gmail sin acuerdo de socio comercial (BAA), la falta aparente de avisos de privacidad, accesibilidad y asistencia de idiomas, y el posible uso de un navegador con IA conectado a cuentas críticas. La oportunidad es grande: unos **120,000 residentes hispanos** viven a pocos minutos, **hasta 19% de los menores de 65 años no tiene seguro** en West Valley City y casi nadie compite en serio en las búsquedas en español. RootBiz puede ofrecer un plan de 90 días con una regla de diseño que ordena todo lo demás: sus herramientas quedan **libres de información médica protegida (PHI)**, y todo lo que la toque pasa a proveedores con BAA que contrata la clínica. Limitación clave: el sitio no se pudo abrir desde este entorno; todo sale de fragmentos de buscadores y hay que verificarlo en el sitio en vivo.

## Todo sale de fragmentos de buscador, no del sitio en vivo

No se pudo abrir ninguna página completa. La herramienta de descarga devolvió `getaddrinfo ENOTFOUND` para onesourcemvc.com y para todos los demás dominios probados. Es un límite de este entorno, no una prueba de que el sitio esté caído. Las conexiones HTTP directas también estaban bloqueadas. Por eso cada hallazgo sobre la clínica sale de títulos y fragmentos devueltos por un buscador, que a menudo parafrasea en lugar de citar textualmente, y de fichas de terceros: registros NPI, directorios y plataformas de reseñas. Quedaron fuera de alcance:

- el código fuente, las etiquetas meta y los píxeles de seguimiento;
- el destino real del formulario;
- robots.txt, el sitemap y la velocidad de carga;
- el perfil de Google Business y Google Maps;
- la Biblioteca de Anuncios de Meta y el Centro de Transparencia de Google Ads;
- el registro de empresas de Utah, que exige iniciar sesión.

Este informe usa tres etiquetas:

- **[Confirmado]**: una fuente citada lo dice directamente. Incluye los fragmentos indexados del propio sitio.
- **[Inferencia]**: razonamiento a partir de fuentes citadas.
- **[Sin verificar]**: la única fuente es débil o contradice a otra.

Las notas de investigación se contradecían en tres puntos, y se resolvieron así:

- El horario publicado suma **16.5 horas** semanales. Una nota decía 13.5 por un error de suma.
- Las calificaciones de AVA que una nota no encontró sí aparecen en Birdeye y Wheree.
- La mención de un proveedor llamado Carlos Vasquez queda como contradictoria.

El primer entregable de la propuesta, en la semana 1, es precisamente verificar en vivo todo lo que aquí está marcado. Este informe no es asesoría legal: los puntos de cumplimiento necesitan la revisión de un abogado de salud.

## Una sola operación, cuatro marcas y un dueño quiropráctico

La única entidad legal identificable es **ONE SOURCE CARE LLC** [Confirmado] ([NPI Profile](https://npiprofile.com/npi/1518786698)):

- es una organización con **NPI 1518786698**, asignado el 7 de octubre de 2024;
- su dirección de práctica es 1972 W 5400 S, con el teléfono (385) 497-5590 y dirección postal en Orem;
- su funcionario autorizado es "Daniel Lafontaine Dc (Owner)";
- su taxonomía principal es quiropráctica de rehabilitación (111NR0400X) y la secundaria es enfermera practicante de familia (363LF0000X);
- el registro declara que acepta **Molina Healthcare**.

Las búsquedas en Bizapedia, OpenCorporates, D&B y otros agregadores no encontraron ninguna LLC de Utah llamada "One Source Care", "One Source Medical Center" ni "AVA Injury Clinic". El portal de la Utah Division of Corporations exige iniciar sesión ([Utah Division of Corporations](https://db.corporations.utah.gov/moraa)). Siguen sin confirmar la fecha de registro, el agente registrado y si existe un DBA (nombre comercial registrado) para "One Medical Clinic". Una entidad de unos dos años encaja con una huella digital casi vacía [Inferencia].

Los vínculos con AVA son varios y apuntan todos en la misma dirección:

- La página "Nosotros" de AVA nombra al Dr. Lafontaine y al Dr. Youngberg, describe la práctica como "physician-owned and operated" y presenta a **Diana Corín Martínez como CEO** [Confirmado] ([AVA Nosotros](https://avainjuryclinic.com/en/nosotros/)).
- La agenda en línea de AVA en Jane App asigna al Dr. Clinton Youngberg a la sede de Taylorsville [Confirmado] ([Jane App AVA](https://avainjuryclinic.janeapp.com/)).
- La sede de AVA en Orem está en 1704 S State St, la misma dirección de Spinal Rehab Specialists, la práctica de Lafontaine ([Healthgrades](https://www.healthgrades.com/providers/daniel-lafontaine-2f3wl); [AVA](https://avainjuryclinic.com/en/)).
- El directorio hispano Mexicanas en Utah & Amigas, cuya fundadora se presenta como "Fundadora y CEO de Ava Injury Clinic", publica una ficha de One Source Medical Center de alrededor de septiembre de 2025 [Confirmado] ([Mexicanas en Utah, Nosotras](https://mexicanasenutah.com/nosotras/); [ficha de One Source](https://mexicanasenutah.com/listing/one-source-medical-center/)).

La lectura más probable es **una sola operación con tres etiquetas** [Inferencia]: AVA es la marca que ve el paciente, en español; One Source Care LLC es la entidad de facturación; y One Source Medical Center / "One Medical Clinic" es la marca médica. Ninguna fuente primaria une las tres de forma explícita, así que es la primera pregunta para el dueño. El dominio "onesourcemvc" casi seguro significa "motor vehicle collision" (choque de vehículo motorizado), y el sitio nunca lo explica [Inferencia].

Los únicos clínicos con nombre vinculados públicamente a la operación son quiroprácticos. No apareció ningún MD, DO ni PA, aunque el sitio ofrece "family medicine for patients of all ages" ([onesourcemvc.com/home](https://onesourcemvc.com/home)). La taxonomía secundaria de enfermera practicante sugiere que una NP factura la parte médica bajo la LLC [Inferencia]. La evidencia sobre quién es esa persona se contradice [Sin verificar]:

- Un resumen de búsqueda atribuye al sitio una página de proveedor de "Carlos Vasquez" con "20+ years experience as a family medicine healthcare provider" ([onesourcemvc.com](https://onesourcemvc.com/)).
- Otras consultas restringidas al dominio indicaron que el sitio no nombra proveedores.
- Doximity lista a un Carlos A. Vasquez, NP, enfermero de familia en West Jordan con University of Utah Health, sin prueba de que sea la misma persona ([Doximity](https://www.doximity.com/pub/carlos-vasquez-np-f1d617bb)).

En cuanto a pagadores, además de Molina, Lafontaine acepta MultiPlan ([Healthgrades](https://www.healthgrades.com/providers/daniel-lafontaine-2f3wl)). AVA, por su parte, ofrece conectar al paciente con "trusted legal partners" para recuperar gastos médicos y salarios perdidos [Confirmado] ([Facebook AVA](https://www.facebook.com/avainjuryclinic/)). Es el modelo típico de clínica de lesiones personales [Inferencia]: pacientes hispanohablantes después de un accidente, cobro por el PIP del seguro de auto o por el caso legal, y derivaciones con abogados. No se encontró evidencia de exámenes DOT, de inmigración ni de compensación laboral.

El edificio tiene varios inquilinos o mucha rotación. En 1972 W 5400 S también aparecen:

- **Utah Pain Relief Institute (UPRI)**, con un NPI de 2012 en la Suite 100 que no se ha actualizado desde entonces y una ficha de WebMD que dice "not accepting new patients" ([Stedi NPI UPRI](https://www.stedi.com/npi-registry/npis/1528327137); [WebMD UPRI](https://doctor.webmd.com/practice/utah-pain-relief-institute-c203d966-7951-4d0a-88bc-697f674dd97c));
- Health Quest of Taylorsville ([MapQuest](https://www.mapquest.com/us/utah/health-quest-of-taylorsville-419297953));
- Mind And Body Integration;
- Watts Chiropractic;
- el Dr. Roman Hentish, DC ([eHealthScores](https://www.ehealthscores.com/care-lwslfswwcl-roman-hentish-taylorsville.html)).

UPRI opera hoy en Murray, con 2.4 estrellas en Yelp, y nada lo conecta con Lafontaine ([Yelp UPRI](https://www.yelp.com/biz/utah-pain-relief-institute-murray)). Aun así, su ficha obsoleta compite por la misma dirección y puede asociar calificaciones bajas al edificio [Inferencia]. Hay además un riesgo de reputación aparte: el dominio en plural **avainjuryclinics.com** usa la marca AVA para alojar páginas de spam de citas ("Mygirlfund Review", "Flingster App Review 2021") [Confirmado] ([avainjuryclinics.com](https://www.avainjuryclinics.com/)).

| Dato | Variantes encontradas para una misma puerta | Fuentes |
|---|---|---|
| Nombre | "One Medical Clinic" (títulos), "One Source Medical Center" (pie y datos estructurados), "One Medical" (texto), "One Source Medical Clinic", "ONE SOURCE CARE LLC" (NPI). En la misma dirección: "AVA Injury Clinic" y "AVA Injury Clinic car Accident" | [onesourcemvc.com](https://onesourcemvc.com/); [NPI](https://npiprofile.com/npi/1518786698); [Fresha](https://www.fresha.com/lvp/ava-injury-clinic-car-accident-west-5400-south-taylorsville-a28Vw2) |
| Dirección | Con y sin "Suite #2"; "Suite 100" en el NPI de UPRI; código postal 84129 en la web, Yelp y MapQuest, pero **84123** en Fresha y Birdeye | [onesourcemvc.com](https://onesourcemvc.com/); [Stedi](https://www.stedi.com/npi-registry/npis/1528327137); [Birdeye](https://reviews.birdeye.com/ava-injury-clinic-car-accident-176991446990500) |
| Teléfono | (801) 645-0286, el principal de la web, **sin ninguna mención externa**; (385) 497-5590 en /schedule-now y en el NPI; AVA usa (801) 890-1036 y una línea de texto (801) 512-1813; UPRI usa (801) 281-0555 | [Schedule Now](https://onesourcemvc.com/schedule-now); [Threads AVA](https://www.threads.com/@avainjuryclinic/post/DUmSaOfkepm/reviews-de-nuestros-pacientes-en-nuestra-clinica-de-ava-en-ogden-tu-feedback-es); [Stedi](https://www.stedi.com/npi-registry/npis/1528327137) |
| Correo | onesourcemvc@gmail.com (Gmail gratuito, no un correo con dominio propio) | [Schedule Now](https://onesourcemvc.com/schedule-now) |
| Horario | One Source: lunes 3:00–6:30 pm; miércoles y viernes 9–12 y 3:00–6:30 pm. AVA en Yelp: lunes, miércoles y viernes 2–7 pm. AVA en Fresha: horario partido y tardes de martes y jueves. UPRI en WebMD: 8–6 entre semana | [/home](https://onesourcemvc.com/home); [Yelp AVA](https://www.yelp.com/biz/ava-injury-clinic-taylorsville); [Fresha](https://www.fresha.com/lvp/ava-injury-clinic-car-accident-west-5400-south-taylorsville-a28Vw2); [WebMD UPRI](https://doctor.webmd.com/practice/utah-pain-relief-institute-c203d966-7951-4d0a-88bc-697f674dd97c) |

Una sola puerta tiene al menos cinco nombres, cinco teléfonos, dos códigos postales y cuatro horarios. Con eso, Google no puede consolidar las señales locales, y un paciente puede llegar y encontrar la clínica cerrada [Inferencia].

## Tres páginas en inglés para una clínica que promete español

En unas 20 búsquedas restringidas al dominio, en inglés y en español, solo aparecieron tres URLs: `/`, `/home` y `/schedule-now` [Confirmado] ([One Source Medical Center](https://onesourcemvc.com/); [/home](https://onesourcemvc.com/home); [Schedule Now](https://onesourcemvc.com/schedule-now)). La raíz está indexada con dos títulos distintos, "One Source Medical Center" y "One Medical Clinic", lo que indica un cambio de nombre entre rastreos [Inferencia]. `/home` repite el contenido de la raíz, y eso divide las señales de posicionamiento si no hay una etiqueta canonical o una redirección. Ningún título contiene "Taylorsville", "chiropractor", "car accident" ni "clínica". No hay indexadas páginas de servicios, proveedores, seguros, blog, privacidad ni ninguna versión en español. Cómo aparece en las búsquedas [Confirmado] ([One Medical Clinic](https://onesourcemvc.com/)):

- Con "One Medical Clinic Taylorsville Utah", el sitio sale en las posiciones 7 y 8, detrás de varias fichas de Intermountain.
- Con "One Medical Clinic" Taylorsville 5400 S, no aparece.
- El teléfono principal no aparece en ningún directorio externo.

Al buscar el dominio solo, "mvc" choca con el framework ASP.NET MVC de Microsoft.

Los servicios indexados son estos [Confirmado] ([/home](https://onesourcemvc.com/home); [onesourcemvc.com](https://onesourcemvc.com/)):

- "Comprehensive Chiropractic & Medical Care";
- evaluación y atención de lesiones personales, con una sección "Injuries Overlooked After Car Accidents";
- evaluaciones médicas y derivaciones;
- fisioterapia;
- dolor articular tratado "with the latest techniques";
- medicina familiar con "preventive care, routine check-ups, and treatment for a wide range of health issues".

Los bloques de beneficios se titulan "Expert Care", "Personalized Treatment" y "Bilingual Staff". Es texto genérico de plantilla, sin seguros, precios, condiciones concretas ni credenciales [Inferencia]. En salud, que Google clasifica como YMYL ("your money or your life"), eso pesa: las pautas para evaluadores de calidad de septiembre de 2025 asignan la calificación más baja cuando todo o casi todo el contenido principal es automático o generado por IA "with little or no added value" ([iPullRank](https://ipullrank.com/eeat-ymyl-ai-search); [Semrush](https://www.semrush.com/blog/google-expands-rules-on-low-value-content)). Un sitio médico sin proveedores con nombre ni credenciales no transmite la experiencia y la autoridad que Google busca (E-E-A-T).

El horario confirma que el negocio vive de turnos parciales: lunes de 3:00 a 6:30 pm, miércoles y viernes de 9 a 12 y de 3:00 a 6:30 pm, y martes, jueves y fines de semana cerrado [Confirmado] ([/home](https://onesourcemvc.com/home)). Suma **16.5 horas semanales**, escritas con formatos distintos ("9 am-12 pm" frente a "9am-12:00pm"). En la misma zona, las urgencias de U of U Westridge abren 7 días hasta las 8:30 pm ([U of U urgent care](https://healthcare.utah.edu/primary-care/urgent)), e Intermountain ofrece telemedicina 24/7 por $79 en efectivo ([Intermountain](https://intermountainhealthcare.org/blogs/expanding-virtual-visits-with-connect-care-now-available-in-colorado-and-montana)). La propia AVA promete "same-day appointments, flexible hours" ([AVA](https://avainjuryclinic.com/en/)), lo que no cuadra con el horario publicado. El horario sugiere que el personal rota entre Taylorsville, Ogden y Orem [Inferencia].

La "agenda" no es una agenda. La página /schedule-now pide llamar al (801) 645-0286 o escribir a onesourcemvc@gmail.com. Su formulario, protegido con reCAPTCHA, pide nombre completo, teléfono, correo y una preferencia de mañana o tarde [Confirmado] ([Schedule Now](https://onesourcemvc.com/schedule-now); [onesourcemvc.com](https://onesourcemvc.com/)). Una búsqueda con los nombres de Calendly, Zocdoc, Jane, Tebra y Square no encontró ningún proveedor de reservas. Es una solicitud de devolución de llamada, y el título "Schedule Now" promete más de lo que cumple [Inferencia]. La paradoja es que AVA, en la misma dirección, ya ofrece reservas en tiempo real con Jane App ("View available times and book online instantly") ([Jane App AVA](https://avainjuryclinic.janeapp.com/); [appointmentfind](https://www.appointmentfind.com/business/avainjuryclinic-j-1)).

No se sabe si el formulario tiene un campo libre de "motivo de consulta" ni adónde van los envíos. El patrón visible sí es un riesgo: un formulario que recoge datos de contacto para un proveedor de salud genera PHI, y un Gmail gratuito no está cubierto por ningún BAA de Google ([AccountableHQ: Gmail](https://www.accountablehq.com/post/can-i-use-gmail-for-hipaa-compliance-requirements-risks-and-alternatives)). El único texto de privacidad encontrado es el aviso estándar de reCAPTCHA. Las búsquedas no encontraron política de privacidad, Aviso de Prácticas de Privacidad (NPP), términos, declaración de accesibilidad ni aviso de asistencia de idiomas [Confirmado como ausencia en el índice]. Falta confirmarlo en vivo, porque un enlace en el pie de página podría existir sin estar indexado.

El sitio anuncia que su "bilingual staff" atiende en inglés y en español, pero todo el contenido indexado está en inglés. Una búsqueda en español restringida al dominio ("Llámenos hoy horario lunes miércoles viernes cerrado") no devolvió nada [Confirmado] ([/home](https://onesourcemvc.com/home)). La única visibilidad en español viene del directorio Mexicanas en Utah ([ficha](https://mexicanasenutah.com/listing/one-source-medical-center/)).

Sobre la plataforma, el pie "Copyright © 2026 One Source Medical Center - All Rights Reserved." y un formulario con reCAPTCHA y selector de horario coinciden con el patrón por defecto de **GoDaddy Websites + Marketing** ([onesourcemvc.com](https://onesourcemvc.com/)). Es una inferencia de confianza moderada a alta: para confirmarla hay que ver el CDN de imágenes (img1.wsimg.com) o la etiqueta "generator". La búsqueda en la API de GitHub del 20 de octubre de 2026 devolvió **cero repositorios y cero resultados de código** para "onesourcemvc" [Confirmado]. GitHub no indexa repositorios privados, así que esto no descarta uno privado.

## Atlas cerró el 9 de agosto y el proceso quedó huérfano

ChatGPT Atlas fue el navegador con IA de OpenAI:

- Se lanzó solo para macOS el 21 de octubre de 2025, con un modo agente en vista previa limitado a los planes Plus, Pro y Business ([OpenAI](https://openai.com/blog/introducing-chatgpt-atlas)).
- Nunca salió para Windows, iOS ni Android ([Wikipedia](https://en.wikipedia.org/wiki/ChatGPT_Atlas)).
- OpenAI anunció su retiro en julio de 2026, y **dejó de funcionar el 9 de agosto de 2026**, 292 días después del lanzamiento [Confirmado] ([OpenAI Help](https://help.openai.com/en/articles/20001371); [9to5Mac](https://9to5mac.com/2026/08/04/openai-explains-what-will-happen-when-chatgpt-atlas-shuts-down-this-weekend/)).
- Sus funciones pasaron a la app de escritorio de ChatGPT, con un navegador integrado en el modo "Work", a una extensión para Chrome y otros navegadores, y a Codex ([AI Weekly](https://aiweekly.co/alerts/openai-sunsets-chatgpt-atlas-folds-browser-into-desktop-app)).
- Marcadores, historial, cookies y contraseñas había que exportarlos a mano; lo que no se exportó se perdió ([TechRepublic](https://www.techrepublic.com/article/news-chatgpt-atlas-shutdown-migration/)).

Si la clínica sigue describiendo su proceso como "GitHub + ChatGPT Atlas", ese proceso está detenido o migró en silencio a una de esas herramientas sucesoras, que tienen el mismo perfil de riesgo [Inferencia].

Incluso en su mejor momento, Atlas no podía construir un sitio. La ayuda oficial de OpenAI dice que el modo agente **no podía ejecutar código, descargar archivos, instalar extensiones ni acceder al sistema de archivos** [Confirmado] ([OpenAI Help: agent mode](https://help.openai.com/en/articles/12628199-chatgpt-atlas-agent-mode)). En GitHub solo podía editar archivos en el editor web, hacer commits y cambiar configuración haciendo clic. No podía compilar, ni probar, ni revisar accesibilidad o enlaces rotos. Cada cambio se "probaba" al publicarse [Inferencia].

Eso cuadra con la evidencia. El sitio en vivo tiene la huella de GoDaddy y no hay repositorio público. Caben tres explicaciones [Inferencia]:

- hay una reconstrucción en un repositorio privado que todavía no está publicada;
- la mención de GitHub se refiere a otro proyecto;
- se usó Atlas para manejar el editor de GoDaddy, de Google Business Profile u otros paneles con la sesión iniciada.

El cambio de título de "One Source Medical Center" a "One Medical Clinic" es compatible con una reconstrucción en curso.

El riesgo real de un agente así es que actúa con las sesiones abiertas del usuario. A los pocos días del lanzamiento, varios grupos independientes demostraron ataques:

- LayerX mostró cómo una página maliciosa podía escribir instrucciones ocultas en la memoria de ChatGPT. También reportó que Atlas bloqueó solo el **5.8%** de las páginas maliciosas en sus pruebas, una cifra del propio proveedor ([The Hacker News](https://thehackernews.com/2025/10/new-chatgpt-atlas-browser-exploit-lets.html)).
- NeuralTrust coló órdenes disfrazadas de URL en la barra de direcciones ([ITPro](https://itpro.com/security/cyber-researchers-have-already-identified-several-big-security-vulnerabilities-on-openais-atlas-browser)).
- Brave describió la inyección indirecta de instrucciones como un problema "sistémico" de toda la categoría de navegadores con IA ([Brave](https://brave.com/blog/unseeable-prompt-injections/)).

En diciembre de 2025, OpenAI admitió que la inyección de instrucciones es "unlikely to ever be fully 'solved'" ([Fortune](https://www.fortune.com/2025/12/23/openai-ai-browser-prompt-injections-cybersecurity-hackers)), y Gartner recomendó a las empresas **bloquear los navegadores con IA** "for the foreseeable future" ([The Register](https://www.theregister.com/2025/12/08/gartner_recommends_ai_browser_ban/)). El propio jefe de seguridad de OpenAI aconsejó usar el modo sin sesión, y reservar el modo con sesión para "well-scoped actions on very trusted sites" ([Simon Willison](https://simonwillison.net/2025/Oct/22/openai-ciso-on-atlas/)).

Para esta clínica, eso significa que una sola página maliciosa podría [Inferencia]:

- meter un script en el repositorio;
- cambiar los servidores de nombres del dominio;
- desviar el teléfono del perfil de Google;
- sacar datos de pacientes de la pantalla del EHR.

El cierre de Atlas no elimina el riesgo, solo lo traslada a la app de escritorio y a la extensión [Inferencia].

La parte de privacidad es más grave. Según varias fuentes de cumplimiento, OpenAI **no firma BAA** para ChatGPT Free, Plus, Pro ni Business ([AccountableHQ](https://www.accountablehq.com/post/is-chatgpt-hipaa-compliant-what-you-need-to-know-about-phi-and-baas)). En los planes personales, el entrenamiento con las conversaciones está activado por defecto ([OpenAI Help](https://help.openai.com/en/articles/8983130-how-do-i-disable-model-training)). La página de Atlas para empresas advertía tres cosas [Confirmado] ([OpenAI Help: Atlas for Enterprise](https://help.openai.com/en/articles/12603091-chatgpt-atlas-for-enterprise); [versión en alemán](https://help.openai.com/de-de/articles/12603091-chatgpt-atlas-for-enterprise)):

- Atlas quedaba **fuera del alcance de las certificaciones SOC 2 e ISO** de OpenAI;
- la navegación, las memorias y la actividad del agente podían no seguir los controles de retención empresariales;
- Atlas venía **activado por defecto en los espacios Business**, sin que un administrador tuviera que habilitarlo.

Si alguien en la clínica abrió el EHR, un portal de seguros o la agenda en Atlas con la barra lateral, las memorias o el agente activos, el contenido de esas pantallas pudo llegar a un proveedor sin BAA. Eso sería probablemente una divulgación no permitida bajo HIPAA, que necesita una evaluación del responsable de privacidad [Inferencia].

GitHub, por su lado, tiene trampas conocidas para un sitio hecho por cuenta propia:

- Sus normas dicen que GitHub Pages "is not intended for or allowed to be used as a free web-hosting service to run your online business" y que no debe usarse para transacciones sensibles ([GitHub Docs: Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)).
- La protección de ramas en repositorios **privados** exige un plan de pago (Pro, Team o Enterprise) ([GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches)). En un repositorio privado gratuito, lo que el agente empuje a `main` se publica sin revisión.
- La protección contra secretos que viene activada por defecto solo detecta formatos de token conocidos ([GitHub Docs](https://docs.github.com/en/code-security/concepts/secret-security/push-protection)).
- GitGuardian contó **28.65 millones de secretos nuevos** filtrados en commits públicos de GitHub durante 2025, un 34% más que el año anterior ([The Hacker News](https://thehackernews.com/2026/03/the-state-of-secrets-sprawl-2026-9.html)).

| Área | Proceso actual "GitHub + Atlas" o sus sucesores | Proceso RootBiz propuesto |
|---|---|---|
| Estado de la herramienta | Atlas apagado el 9 de agosto de 2026; solo existió en macOS | Astro, GitHub y Cloudflare: cadena estable con versiones fijadas |
| Quién publica | Un agente con IA en un navegador con sesión abierta, a menudo directo a `main` | Cambios en ramas, revisión humana en un pull request, rama `main` protegida |
| Pruebas | Ninguna: el agente no podía compilar | Vista previa por rama en Cloudflare Pages, tras Cloudflare Access; revisión automática de compilación, enlaces y accesibilidad |
| Cuentas | El agente tiene las sesiones de GitHub, del registrador de dominio, de Google Business Profile y quizá del EHR | 2FA obligatorio, mínimo privilegio, bóveda compartida (Vaultwarden), ningún agente de IA en sesiones de administración |
| Datos de pacientes | Sin BAA en ChatGPT de consumo ni Business | Arquitectura sin PHI en RootBiz; la PHI solo en proveedores con BAA |
| Monitoreo y respaldo | Ninguno; datos de Atlas perdidos al cierre | Uptime Kuma, espejo del código en Forgejo, bitácora de cambios en Docmost |

## Las 223 reseñas de la dirección pertenecen a AVA, no a One Source

La marca One Source / "One Medical Clinic" **no tiene ninguna reseña** en Google, Yelp, Facebook, Healthgrades ni Zocdoc que se haya podido encontrar. Al buscar "One Medical Clinic Taylorsville google reviews" solo aparecieron fichas de Yelp de Amazon One Medical en Seattle, Washington y Nueva York [Confirmado] ([Yelp One Medical Seattle](https://www.yelp.com/biz/one-medical-downtown-seattle-seattle)). Ese choque de nombres no es solo un problema de búsqueda: sugiere un riesgo de marca registrada que debe revisar un abogado [Inferencia].

La reputación de la dirección está toda a nombre de AVA [Confirmado]:

| Plataforma | Calificación | Detalle | Fuente |
|---|---|---|---|
| Birdeye ("AVA Injury Clinic Car Accident") | **4.9 / 223 reseñas** | Suele agregar reseñas de Google | [Birdeye](https://reviews.birdeye.com/ava-injury-clinic-car-accident-176991446990500) |
| Wheree | 4.9 / 24 | — | [Wheree](https://ava-injury-clinic-car-accident.wheree.com/) |
| Yelp | 5.0 / 1 | Reseña de octubre de 2025 | [Yelp](https://www.yelp.com/biz/ava-injury-clinic-taylorsville) |
| AllUS Injury Lawyers | 4.9 / 203 | Clasifica a AVA, por error, como bufete de abogados | [AllUS](https://www.allusinjurylawyers.com/personal-injury-lawyers/utah/taylorsville/ava-injury-clinic-car-accident) |

El tema que domina es la calidez del personal: "treated me like family since the moment i first stepped in their facility", "muy amables con los pacientes", "The staff here is very friendly and welcoming". Varias reseñas están en español. El resumen automático de Wheree menciona que la clínica ofrece bebidas, arregla traslados en Uber a las citas y a veces tiene esperas largas en horas pico. No se vio ninguna reseña negativa ni ninguna respuesta del dueño.

En redes sociales pasa lo mismo: todo es de AVA y nada de One Source [Confirmado]:

- **Facebook**: unos **804 seguidores** ([Facebook AVA](https://www.facebook.com/avainjuryclinic/)). Hay publicaciones en español que ofrecen atención médica y ayuda legal "sin importar el estatus migratorio".
- **TikTok** (@ava.injury.clinic.utah): la publicación más reciente es del 5 de octubre de 2026, con entre 4 y 52 "me gusta" por video ([TikTok](https://www.tiktok.com/discover/best-chiropractor-in-utah)).
- **Threads**: una publicación de alrededor del 11 de febrero de 2026 reutiliza reseñas de Google y promete "Tu cita es totalmente GRATIS" ([Threads AVA](https://www.threads.com/@avainjuryclinic/post/DUmSaOfkepm/reviews-de-nuestros-pacientes-en-nuestra-clinica-de-ava-en-ogden-tu-feedback-es)). La fecha se calculó a partir del identificador de la publicación.
- **Otros canales**: el sitio de AVA enlaza a Instagram, YouTube y WhatsApp ([Contacto AVA](https://avainjuryclinic.com/en/contacto/)).

Todas las búsquedas de "One Source Medical" en redes devolvieron empresas sin relación en Texas, Florida y Arizona. La plataforma de adquisición propia de la operación es la red de la fundadora: el directorio Mexicanas en Utah, que lista tanto a One Source como a AVA [Inferencia].

Hay señales que merecen revisión, aunque ninguna prueba nada [Inferencia]:

- el número de reseñas cambia mucho entre plataformas (1, 24, 203 y 223);
- la calificación es casi siempre 4.9, sin ninguna negativa visible;
- se ofrecen beneficios (bebidas, Uber, "cita gratis");
- las reseñas se reutilizan como publicidad.

Ninguna de estas señales demuestra que las reseñas sean falsas, pero las tres normas siguientes hacen que valga la pena revisar:

- La norma de la FTC sobre reseñas y testimonios (16 CFR 465), vigente desde el 21 de octubre de 2024, prohíbe las reseñas falsas o generadas con IA y condicionar incentivos a reseñas positivas. Las multas reportadas llegan a $51,744 por infracción, cifra de 2024 ([Hogan Lovells](https://www.hoganlovells.com/en/publications/ftc-publishes-final-rule-banning-fake-consumer-reviews-and-testimonials)).
- Elite Dental pagó **$10,000** en un acuerdo con la OCR (Oficina de Derechos Civiles del HHS), y una práctica dental de Carolina del Norte recibió una multa civil de **$50,000**; ambas habían revelado datos de pacientes al responder reseñas ([Thomson Reuters](https://tax.thomsonreuters.com/blog/covered-entity-pays-10000-hipaa-settlement-after-disclosing-phi-in-response-to-social-media-review); [DLA Piper](https://dlapiper.com/insights/publications/2023/01/hipaa-settlement-highlights-the-importance-of-caution-in-responding-to-negative-online-reviews)).
- El NPI declara Molina Healthcare, que presumiblemente es una aseguradora de Medicaid en Utah [Inferencia]. Ofrecer traslados gratis o "citas gratis" a pacientes de Medicaid puede atraer escrutinio por incentivos a beneficiarios. Esa pregunta es para el abogado, no para la agencia.

## 120,000 hispanos a minutos y competidores que ya hablan su idioma

El área de influencia es justo el público que la clínica dice atender:

- **Taylorsville** tiene 58,678 habitantes. El **26.1% es hispano**, el 25.7% habla en casa un idioma distinto del inglés y el **13.8% de los menores de 65 años no tiene seguro**, frente al 9.6% nacional ([Census QuickFacts](https://www.census.gov/quickfacts/fact/table/taylorsvillecityutah,US/PST045222); [Census Reporter](http://censusreporter.org/profiles/16000US4975360-taylorsville-ut/)).
- **West Valley City**, al lado, tiene 138,144 habitantes. El **43.3% es hispano**, el **42.8%** habla en casa otro idioma y el **19.1%** de los menores de 65 no tiene seguro ([Census QuickFacts WVC](https://www.census.gov/quickfacts/westvalleycitycityutah); [QuickFacts idiomas](https://www.census.gov/quickfacts/fact/table/westvalleycitycityutah/POP815222)).
- En la zona censal (PUMA) de West Valley, el 33.1% de los hogares usa el español como idioma principal ([Data USA](https://datausa.io/profile/geo/salt-lake-county-west-valley-city-puma-ut)).
- Kearns es 42.4% hispano y West Jordan 25.4% ([Census Kearns](https://www.census.gov/quickfacts/kearnsmetrotownshiputah); [Census West Jordan](https://www.census.gov/quickfacts/westjordancityutah)).

Sumando esas cuatro ciudades salen unos **120,000 residentes hispanos** a pocos minutos de 5400 S. Es un cálculo propio a partir de las cifras citadas [Inferencia]. El ingreso medio de los hogares en Taylorsville es de $86,413 ([Census](https://www.census.gov/quickfacts/fact/table/taylorsvillecityutah/PST045223)), así que el mercado son familias trabajadoras de ingreso medio, muchas sin seguro o con deducibles altos, más que población de muy bajos ingresos [Inferencia].

La competencia ya cubre lo básico que One Source no ofrece:

| Competidor | Modelo | Lo que ya ofrece en digital | Señal de reputación |
|---|---|---|---|
| AVA Injury Clinic (mismo edificio) | Quiropráctica de accidentes; Taylorsville, Ogden y Orem | Sitio en español, reservas en Jane App, Facebook, TikTok, Threads, WhatsApp ([AVA](https://avainjuryclinic.com/en/)) | 4.9 / 223 en Birdeye |
| Car Injury Clinic (2997 W 4700 S) | Accidentes: quiropráctica, fisioterapia, médico | Español, inglés y portugués; evaluación gratis; rayos X el mismo día; transporte gratis; noticia en la web municipal y miembro de ChamberWest ([Car Injury Clinic](https://carinjuryclinics.com/en/); [Taylorsville](https://www.taylorsvilleut.gov/Home/Components/News/News/720/265)) | Google 5.0 / 44 ([Nursa](https://nursa.com/facilities/car-injury-clinic-taylorsville-taylorsville-ut)); Instagram ~10,000 ([Instagram](https://www.instagram.com/car.injuryclinic/)) |
| Dr. Calvin's Clinic (WVC) | Accidentes y rehabilitación | Factura directamente al PIP ([Lantern](https://lantern.llc/b/dr-calvins-clinic-west-valley-city)) | 4.9 / 1,053, cifra de la propia clínica ([drcalvinsclinic.com](https://drcalvinsclinic.com/)) |
| Axcess Accident Center (WVC y otras 3 sedes) | Cadena de accidentes | TikTok activo; Instagram principal con 784 seguidores y 806 publicaciones ([Instagram](https://www.instagram.com/axcessac/)) | "3,000+ Google reviews", según su perfil ([TikTok](https://www.tiktok.com/@axcessac/video/7455930326578318638)) |
| Utah Accident Clinic (3123 W 5400 S) | Accidentes | Consulta gratis, rayos X digitales ([sitio](https://utahaccidentclinic.com/taylorsville/)) | 4.9 / 38 ([BestProsInTown](https://www.bestprosintown.com/ut/taylorsville/chiropractors/)) |
| Vamos Health (WVC) | Membresía de atención primaria para latinos y personas sin seguro | **$84.99 al mes** por adulto, todos los proveedores bilingües, página en español ([Herald Extra](https://www.heraldextra.com/news/2026/mar/18/a-better-way-ribbon-cutting-held-at-vamos-health-in-orem/); [Vamos ES](https://www.vamoshealth.com/westvalleycityutahespan)) | Yelp **3.0 / 8**, con quejas de cancelación ([Yelp](https://www.yelp.com/biz/vamos-health-west-valley-city); [Apple Maps](https://maps.apple.com/place?place-id=I4A9D7E2D817F7106)) |
| Intermountain Taylorsville + InstaCare | Sistema de salud | Telemedicina 24/7 a $79; proveedores con español filtrables ([Dra. Guerra](https://intermountainhealthcare.org/find-a-doctor/paula-a-guerra-md-1902883721)); consulta base en InstaCare a $170 según Solv ([Solv](https://www.solvhealth.com/company/instacare)) | Pocas reseñas de clínica |
| CHC Oquirrh View (4745 S 3200 W) | Centro de salud comunitario con fondos federales (FQHC) | Tarifa según ingreso, español, atención sin importar el estatus migratorio ([findhelp](https://www.findhelp.org/health/primary-care--west-valley-city-ut)) | No encontrada |
| **One Source (auditada)** | Accidentes + medicina familiar | Formulario de devolución de llamada, solo en inglés | **Ninguna** |

Los datos de expectativas de pacientes muestran qué se considera básico en 2026:

- Experian Health encontró que el **80%** de los pacientes quiere agendar a cualquier hora desde casa o desde el celular ([Experian](https://www.experianplc.com/newsroom/press-releases/2025/-improving-patient-access--experian-health-survey-highlights-pro)). Aun así, en el 71% de las prácticas menos de una cuarta parte de los pacientes agenda por su cuenta ([MGMA](https://www.mgma.com/mgma-stat/meeting-pressure-on-patient-digital-self-scheduling)). La reserva en línea complementa al teléfono y al WhatsApp, no los reemplaza.
- El **84%** de los pacientes revisa reseñas antes de elegir proveedor ([Medical Economics](https://www.medicaleconomics.com/view/patients-trust-online-reviews-but-they-don-t-leave-them)).
- El 48% prefiere los recordatorios por texto, frente al 29% por teléfono ([Phreesia](https://www.phreesia.com/blog-appointment-reminders-which-methods-do-patient-prefer/)).
- Entre los inmigrantes hispanos, el **58%** prefiere un proveedor que hable español ([Pew](https://pewresearch.org/short-reads/2023/10/30/5-facts-about-hispanic-americans-and-health-care/)).
- El 69% de los adultos hispanos que hablan español usa redes sociales cada semana para informarse sobre salud, y usan WhatsApp mucho más que los hispanos que hablan principalmente inglés ([KFF](https://www.kff.org/health-information-trust/poll-finding/addressing-misinformation-among-hispanic-adults-snapshot-from-the-kff-health-misinformation-tracking-poll-pilot/)).

Para pacientes sin seguro, la Ley No Surprises obliga a todo proveedor con licencia a entregar un **Estimado de Buena Fe** (GFE) y a publicar que ese estimado está disponible ([CMS](https://CMS.gov/cciio/resources/regulations-and-guidance/downloads/good-faith-estimate-patient-provider-dispute-resolution-process-for-uninsured-or-self-pay-individuals.pdf); [Spencer Fane](https://www.spencerfane.com/insight/no-surprises-act-good-faith-estimate-for-self-pay-patients/)).

En la línea de accidentes, Utah es un estado "no-fault" (sin culpa):

- Toda póliza de auto incluye PIP con al menos **$3,000 por persona** para gastos médicos ([Utah Code §31A-22-307](https://le.utah.gov/xcode/Title31a/Chapter22/C31A-22-S307_2023050320230503.pdf)).
- El paciente puede elegir proveedor, incluso quiropráctico ([BAM Injury Law](https://baminjurylaw.com/blog/choose-doctor-pip-insurance-utah/)).
- El pago tiene un tope fijado por el Estudio de Valor Relativo del Departamento de Seguros de Utah, regla R590-267 ([Utah Insurance Dept](https://insurance.utah.gov/consumers/rvs/)).
- Si las facturas médicas pasan de $3,000, el paciente puede demandar al conductor culpable ([BAM Injury Law](https://baminjurylaw.com/blog/utah-serious-injury-threshold-lawsuit/)). Por eso clínicas y abogados trabajan tan de cerca.

Como la tarifa la fija el estado, el crecimiento sale del volumen de pacientes y de la calidad de la documentación, no del precio [Inferencia]. Las palabras clave de lesiones personales cuestan entre $15 y $35 por clic, porque los bufetes pujan por las mismas búsquedas. Son cifras de blogs de agencias, con atribución exacta incierta ([Stackmatix](https://www.stackmatix.com/blog/google-ads-for-chiropractors); [Valley Marketing Group](https://thevalleymarketinggroup.com/blog/chiropractor-google-ads-cost-per-lead-2026/)).

En español, los resultados de búsqueda están poco disputados. En "clínica hispana Taylorsville" dominan una guía estatal, la página en español de Vamos y las fichas de Intermountain y Optum. En "accidente de carro" solo aparecen directorios de abogados ([abogado.com](https://www.abogado.com/accidente-de-automovil/utah/west-valley/)). One Source no apareció en ninguna búsqueda genérica.

La lectura estratégica es que hay **dos mercados distintos** bajo un mismo techo [Inferencia]:

- **Accidentes con PIP.** AVA ya compite ahí con buena reputación, contra rivales con más alcance (Car Injury Clinic, Dr. Calvin's).
- **Medicina familiar bilingüe para personas sin seguro.** El competidor más directo, Vamos Health, tiene reseñas débiles. Una marca con proveedores identificados, precios publicados y reseñas reales podría destacar rápido.

## Tres datos sin confirmar deciden qué leyes aplican

Qué normas aplican depende de tres hechos que el dueño debe confirmar [Inferencia]:

- **¿Es entidad cubierta por HIPAA?** Lo es si transmite reclamaciones de forma electrónica, que es conocimiento general del marco HIPAA. Con un NPI de organización y aseguradoras como Molina y MultiPlan, es prácticamente seguro.
- **¿Recibe asistencia financiera federal?** La recibe si factura Medicaid (Molina, según el NPI) o Medicare Parte B. Desde 2024, HHS cuenta Medicare Parte B como asistencia federal, y con ella se activan la Sección 504 y la Sección 1557 ([McDermott](https://www.mwe.com/?p=277219)).
- **¿Cuántos empleados tiene?** Ese número fija el plazo de accesibilidad de la Sección 504.

Seguimiento web y HIPAA:

- El 20 de junio de 2024, el caso *AHA v. Becerra* anuló solo la parte del boletín de la OCR que consideraba PHI la combinación de dirección IP y visita a una página pública. HHS retiró su apelación el 29 de agosto de 2024 ([Norton Rose Fulbright](https://www.nortonrosefulbright.com/en-us/knowledge/publications/77cf7f04/applying-hipaa-to-online-tracking-technologies); [Quarles](https://www.quarles.com/newsroom/publications/hhs-ocr-withdraws-tracking-technologies-appeal-in-aha-v-becerra)).
- Los rastreadores en formularios, portales y cualquier campo donde el usuario escriba datos de salud **siguen bajo HIPAA** ([ConsentPixel](https://consentpixel.com/blogs/hhs-ocr-tracking-guidance/)).
- Google no firma BAA para Analytics, e indica que no se use "in any way that implicates Google's access to, or collection of, PHI" ([Google Analytics Help](https://support.google.com/analytics/answer/13297105?hl=en)).
- Desde el 1 de enero de 2025, Meta bloquea los eventos de conversión intermedios y finales de los anunciantes de salud ([Ours Privacy](https://oursprivacy.com/blog/meta-changes-to-data-policy)). Un píxel de Meta ya aporta poco beneficio publicitario y conserva todo el riesgo.
- El riesgo hoy son las demandas colectivas: cinco proveedores alcanzaron acuerdos colectivos propuestos en agosto de 2026, entre ellos uno de $777,000, y CVS y Criteo acordaron pagar **$20.5 millones** en conjunto ([Paubox](https://www.paubox.com/blog/five-healthcare-providers-reach-tracking-pixel-settlements); [HIPAA Journal](https://www.hipaajournal.com/cvs-health-criteo-american-wellness-corp-data-breach-settlements/)).

No sabemos qué etiquetas tiene hoy onesourcemvc.com: es lo primero que hay que revisar.

Formularios, proveedores y la Regla de Seguridad:

- Todo proveedor que guarde o procese PHI necesita un BAA. Google lo firma solo para Workspace de pago, aceptado por el administrador, y nunca para el Gmail gratuito ([Google Cloud](https://docs.cloud.google.com/docs/security/compliance/hipaa); [AccountableHQ](https://www.accountablehq.com/post/can-i-use-gmail-for-hipaa-compliance-requirements-risks-and-alternatives)).
- El análisis de riesgos es una especificación **obligatoria** de la Regla de Seguridad ([AccountableHQ](https://www.accountablehq.com/post/hipaa-security-rule-encryption-and-risk-analysis-for-small-covered-employers)).
- Su ausencia es lo que convierte un incidente de ransomware en acuerdos de **$75,000 a $175,000** para entidades pequeñas, más dos años de plan correctivo ([Brach Eichler](https://www.bracheichler.com/insights/ocr-settles-13th-ransomware-enforcement-action?print=pdf); [AccountableHQ agosto 2025](https://www.accountablehq.com/post/ocr-hipaa-settlement-august-2025-key-findings-penalties-and-compliance-lessons)).
- Las multas máximas de 2026 son **$73,011 por infracción** y $2,190,294 al año por cada disposición ([Mercer](https://www.mercer.com/insights/law-and-policy/hhs-adjusts-2026-hipaa-certain-aca-and-msp-monetary-penalties/)).
- La reforma propuesta de la Regla de Seguridad (enero de 2025) sigue sin ser definitiva y ahora apunta a julio de 2027. La regla actual se aplica completa ([Pact-One](https://www.pact-one.com/2026/09/hipaa-security-rule-2026-status/)).
- Las entidades cubiertas debían actualizar su NPP antes del **16 de febrero de 2026** por los cambios de la norma Part 2, la de registros de tratamiento por uso de sustancias ([Proskauer](https://www.proskauer.com/blog/upcoming-hipaa-compliance-deadline-hipaa-notice-of-privacy-practices-updates-required-by-february-16)).
- Una entidad cubierta que tiene sitio web debe publicar en él su NPP, según 45 CFR 164.520(c)(3)(i). Es conocimiento previo, no verificado en esta investigación.

Accesibilidad:

- La norma de la Sección 504 de HHS exige sitios, apps y formularios que cumplan **WCAG 2.1 AA**.
- Una norma provisional del 11 de mayo de 2026 movió los plazos al **11 de mayo de 2027** para quienes tienen 15 empleados o más, y al **10 de mayo de 2028** para quienes tienen menos ([Federal Register](https://www.federalregister.gov/documents/2026/05/11/2026-09266/extension-of-compliance-dates-for-nondiscrimination-on-the-basis-of-disability-accessibility-of-web)). El estándar no cambió, y la obligación general de no discriminar ya está vigente ([Pivotal Accessibility](https://www.pivotalaccessibility.com/2026/06/hhs-section-504-web-accessibility-deadline-extended/)).
- Por separado, en 2025 hubo **3,117 demandas federales** por accesibilidad web bajo el Título III de la ADA, un 27% más que el año anterior ([Level Access](https://www.levelaccess.com/blog/web-accessibility-lawsuits)).
- Los sitios hechos con IA salen mal parados: en una prueba patrocinada por un proveedor, los 15 sitios construidos con cinco herramientas de IA fallaron el nivel A, con un promedio de 55 problemas por página ([VentureBeat](https://venturebeat.com/ai/we-asked-five-ai-tools-to-build-accessible-websites-all-15-sites-failed)).

Acceso por idioma (Sección 1557):

- Desde el **5 de julio de 2025**, una entidad cubierta debe publicar cada año un **Aviso de Disponibilidad** de asistencia de idiomas y ayudas auxiliares gratuitas, de forma visible en la clínica y en el sitio, en inglés y en al menos los **15 idiomas** más comunes entre las personas con dominio limitado del inglés en Utah ([Morgan Lewis](https://www.morganlewis.com/blogs/healthlawscan/2025/01/affordable-care-act-section-1557-new-language-accessibility-requirements)).
- Toda traducción automática de contenido crítico (derechos, consentimiento, instrucciones clínicas) debe revisarla un traductor humano calificado, según 45 CFR 92.201(c)(3) ([eCFR](https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-A/part-92/subpart-C/section-92.201)).
- El aviso de anulación del 2 de junio de 2026 eliminó solo las disposiciones sobre identidad de género. Las de idioma siguen vigentes ([Federal Register](https://www.federalregister.gov/documents/2026/06/02/2026-11015/notice-of-vacatur-regarding-certain-provisions-of-the-2024-nondiscrimination-in-health-programs-and)).

No se verificó cómo afecta la Orden Ejecutiva 14224 a la aplicación de estas reglas. La lista de los 15 idiomas de Utah hay que sacarla de lep.gov.

Mensajería:

- Los recordatorios de cita por texto pueden usar la exención de salud de la TCPA, la ley federal de llamadas y mensajes al consumidor ([LeadCompliant](https://leadcompliant.com/articles/tcpa-basics/tcpa-healthcare-exemption)). Las condiciones son: 160 caracteres o menos, como máximo uno al día y tres a la semana, sin contenido de cobro ni de marketing, y baja inmediata con STOP.
- Los textos de marketing necesitan consentimiento previo, expreso y por escrito. La regla de consentimiento "uno a uno" fue anulada en enero de 2025 ([MoFo](https://mofo.com/resources/insights/250130-eleventh-circuit-vacates-fcc-s-tcpa-one-to-one-consent-rule)).
- Una orden de la FCC del 1 de octubre de 2026 permite que una baja aplique solo a una categoría de mensajes, como los recordatorios de cita ([Nixon Peabody](https://www.nixonpeabody.com/insights/alerts/2026/10/07/fcc-scraps-revoke-all-and-lets-businesses-pick-how-consumers-opt-out)).
- WhatsApp no tiene BAA en ningún plan, según varias fuentes secundarias ([LuxSci](https://www.luxsci.com/blog/is-whatsapp-hipaa-compliant/)).
- Twilio solo admite PHI con Security Edition o Enterprise Edition más un BAA, y únicamente en sus productos elegibles ([Twilio Docs](https://www.twilio.com/docs/iam/twilio-editions/hippa)). WhatsApp vía Twilio no está entre ellos ([Patient Protect](https://patient-protect.com/post/is-twilio-hipaa-compliant)).

En Google Ads, la salud es una categoría sensible: no se puede hacer remarketing basado en condiciones ni en tratamientos ([Accelerated Digital Media](https://www.accelerateddigitalmedia.com/insights/how-create-compliant-google-healthcare-ads)).

Leyes de Utah:

- **Privacidad del consumidor.** La Ley de Privacidad del Consumidor de Utah no aplica a la clínica: exime por completo a las entidades cubiertas por HIPAA y exige además $25 millones de ingresos ([Privacy Rights Clearinghouse](https://www.privacyrights.org/resources-tools/law-overviews/utah-consumer-privacy-act); [AccountableHQ](https://www.accountablehq.com/post/utah-consumer-privacy-act-hipaa-covered-entity-exemption-requirements-explained)).
- **Brechas de datos.** La ley de brechas (Utah Code 13-44-202) sí aplica: exige avisar a los residentes afectados, al Procurador General y al Utah Cyber Center si hay 500 afectados o más, y a las agencias de crédito si hay 1,000 o más ([Utah Code 13-44-202](https://le.utah.gov/xcode/Title13/Chapter44/C13-44-S202_2024050120240501.pdf); [Utah Cyber Center](https://cybercenter.utah.gov/Report-a-Breach)).
- **Inteligencia artificial.** La Ley de Política de IA, reformada por SB 226 (vigente desde el 7 de mayo de 2025), obliga a los proveedores de salud con licencia a avisar **al inicio** cuando el paciente habla con IA generativa en interacciones de "alto riesgo", como recoger datos de salud o dar consejo médico ([Perkins Coie](https://perkinscoie.com/insights/update/new-utah-ai-laws-change-disclosure-requirements-and-identity-protections-target)).
- **Captación de pacientes de accidentes.** La Ley de Fraude de Seguros define como acto fraudulento usar "runners, cappers or steerers" (captadores) para reclamaciones fraudulentas ([Justia 31A-31-103](https://law.justia.com/codes/utah/title-31a/chapter-31/section-103/)).
- **Reportes de accidentes.** Son confidenciales y su acceso está restringido ([Utah Code 41-6a-404](https://le.utah.gov/xcode/Title41/Chapter6A/C41-6a-S404_2025050720250507.pdf)).

| Obligación | Aplica si… | Plazo | Lo observado en One Source |
|---|---|---|---|
| HIPAA: BAA, análisis de riesgos, NPP en el sitio | Es entidad cubierta (casi seguro) | Vigente; NPP actualizado por Part 2 desde el 16 feb 2026 | Gmail gratuito; no se encontró NPP |
| Seguimiento web | Hay formularios o portal | Vigente | Etiquetas desconocidas; verificar |
| Sección 504 (WCAG 2.1 AA) | Factura Medicaid o Medicare | 10 may 2028 (<15 empleados) o 11 may 2027 (15+) | No se encontró declaración de accesibilidad |
| ADA Título III | Siempre | Riesgo actual | — |
| Sección 1557 (aviso en 15 idiomas, revisión humana de traducciones) | Recibe fondos de HHS | Desde el 5 jul 2025 | Sitio solo en inglés |
| TCPA | Envía textos | Vigente; orden de la FCC de octubre de 2026 | AVA usa una línea de texto |
| FTC: reseñas (16 CFR 465) | Siempre | Desde el 21 oct 2024 | Señales que revisar |
| No Surprises Act (GFE) | Atiende pacientes sin seguro o que pagan por su cuenta | Vigente | Sin precios ni aviso de GFE |
| Utah: aviso de IA (SB 226) | Usa un chatbot con pacientes | Desde el 7 may 2025 | — |
| Utah: brechas y captadores | Siempre / capta pacientes de accidentes | Vigente | Modelo de lesiones personales con abogados |

## Ninguna herramienta de RootBiz debería tocar datos de pacientes en esta fase

La regla de diseño que proponemos es una **agencia sin PHI**: todo lo que RootBiz opera queda libre de información médica protegida, y la PHI vive solo en proveedores con BAA contratados directamente por la clínica. Cuatro razones la sustentan.

La primera es **Cloudflare**, la base del stack de RootBiz. Solo firma BAA "with its enterprise customers" ([Cloudflare Trust Hub](https://www.cloudflare.com/trust-hub/us-privacy-compliance/); [Cloudflare HIPAA FAQ](https://www.cloudflare.com/trust-hub/compliance-resources/hipaa/)). Ni siquiera en Enterprise está claro si Workers, D1 o R2 están cubiertos ([Cloudflare Community](https://community.cloudflare.com/t/support-hipaa-without-an-enterprise-agreement/436612)). Cuando Cloudflare actúa como proxy de un sitio, termina el cifrado TLS y puede ver en claro los formularios enviados [Inferencia]. Por la misma lógica, el tráfico de un servicio del homelab expuesto con **Cloudflare Tunnel** también pasa descifrado por el borde de Cloudflare [Inferencia]. Montar Chatwoot o n8n en el homelab y exponerlos por Tunnel, por lo tanto, no aísla la PHI: la hace pasar por un proveedor sin BAA.

La segunda es **GitHub**: no firma BAA, según varios análisis ([RapidDevelopers](https://www.rapidevelopers.com/md/compliance/is-github-copilot-hipaa-compliant)).

La tercera es la **automatización y la mensajería**:

- n8n Cloud no ofrece BAA, y n8n autoalojado traslada al operador toda la responsabilidad: cifrado, registros de auditoría, controles de acceso y BAA con cada servicio conectado ([AccountableHQ: n8n](https://www.accountablehq.com/post/is-n8n-hipaa-compliant-baa-self-hosting-best-practices)).
- Para Chatwoot no se encontró ningún BAA del proveedor, solo una etiqueta de directorio que dice "HIPAA Eligible" ([GTM Directory](https://thegtmdirectory.com/tools/chatwoot/md)).
- Para Twenty no se encontró información sobre HIPAA ([Formable](https://formable.app/twenty-crm/)).

La cuarta es la responsabilidad de RootBiz. Si guardara PHI en su homelab, se convertiría en socio comercial (business associate) de la clínica. Según la guía de HHS de 2016 sobre la nube, que es conocimiento previo, eso le obligaría a firmar un BAA y a cumplir la Regla de Seguridad completa: análisis de riesgos, cifrado, auditoría, respaldos probados y seguridad física. Los acuerdos de la OCR por falta de análisis de riesgos muestran lo caro que resulta hacerlo a medias.

El punto incómodo es el canal que el mercado prefiere. Los pacientes hispanohablantes usan WhatsApp mucho más que otros grupos ([KFF](https://www.kff.org/health-information-trust/poll-finding/addressing-misinformation-among-hispanic-adults-snapshot-from-the-kff-health-misinformation-tracking-poll-pilot/)), y AVA ya lo enlaza. Prohibirlo sería desconectarse del paciente. Usarlo para datos clínicos no se puede, porque Meta no firma BAA. La salida razonable es dejar WhatsApp para logística (horarios, dirección, enlace a la agenda) con un aviso bilingüe de no compartir información médica, y pasar todo lo clínico a un canal con BAA. Las preguntas frecuentes de HHS permiten mensajes sin cifrar cuando el paciente, ya informado del riesgo, prefiere ese canal (conocimiento previo, no verificado aquí). Esa política la decide el responsable de privacidad de la clínica, no la agencia.

| Herramienta RootBiz | Uso recomendado para la clínica | ¿Puede tocar PHI? | Condición o alternativa con BAA |
|---|---|---|---|
| Astro + Cloudflare Pages | Sitio público bilingüe | **No** | Los formularios con PHI se incrustan desde el dominio del proveedor con BAA (iframe), para que no pasen por el proxy |
| Cloudflare Workers | Redirecciones y formularios no clínicos (contacto de abogados, empleo) | **No** | BAA solo en Enterprise y cobertura de Workers dudosa |
| Cloudflare Tunnel / Access | Proteger vistas previas (Access incluye 50 usuarios gratis según material antiguo; verificar) y herramientas internas | **No**, para tráfico con PHI | El tráfico pasa por el borde de Cloudflare [Inferencia] ([Cloudflare](https://blog.cloudflare.com/cloudflare-pages-ga); [vistas previas permanentes](https://israynotarray.com/en/misc/2026/05/13/cloudflare-pages-preview-urls-stay-forever-lock-with-access/)) |
| GitHub / Forgejo | Código y su espejo | **No** | Nunca datos reales de pacientes en repositorios, issues o registros |
| n8n (autoalojado) | Alertas, reportes mensuales, publicación, revisión de consistencia de fichas | **No** en esta fase | Solo con Regla de Seguridad completa más BAA entre RootBiz y la clínica |
| Twenty CRM | Abogados, aseguradoras, socios comunitarios, campañas | **No** | Los expedientes de pacientes van al EHR con BAA |
| Chatwoot (web, WhatsApp, Instagram) | "Recepción digital": horarios, ubicación, enlace a la agenda | **No** por diseño | Aviso bilingüe y desvío a un canal con BAA; Meta no firma BAA |
| Umami | Analítica sin cookies en páginas públicas ([ConsentStack](https://www.consentstack.io/vendors/umami)) | **No** | Excluir las páginas de agenda; nada de PHI en las URLs |
| Uptime Kuma | Monitoreo del sitio, la agenda, el SSL y el dominio; página de estado | No aplica | Seguro |
| Vaultwarden | Credenciales compartidas con 2FA | Credenciales, no PHI | La clínica es dueña de las cuentas; el acceso de RootBiz se puede revocar |
| Nextcloud / Docmost | Archivos de marca, contratos, políticas, procedimientos, bitácora, inventario de BAA | **No** | Nunca formularios de admisión ni documentos clínicos |
| Ollama + Open WebUI | Borradores de textos, primera traducción, textos alternativos de imágenes | **No** | Revisión humana calificada de lo crítico (92.201(c)(3)); aviso de IA en Utah si atiende pacientes |

Los proveedores que la clínica debe contratar directamente para la PHI son:

- **Google Workspace** de pago, plan Business Standard o superior, con el BAA aceptado en la consola de administración. No se confirmó si Business Starter está cubierto.
- **Agenda y admisión con BAA**: el EHR o sistema de agenda (si es Jane App, que AVA ya usa, hay que verificar que tenga BAA firmado), o **Jotform** Gold o Enterprise con cuenta HIPAA, que según fuentes que se contradicen cuesta entre $99 y $129 al mes ([Jotform](https://www.jotform.com/answers/441335-Is-Jot-Form-HIPAA-compliant); [Paubox](https://paubox.com/blog/is-jotform-hipaa-compliant/)).
- **SMS**: Twilio Security Edition o Enterprise Edition, o el envío de textos integrado del EHR con BAA.
- **IA con datos de pacientes**, si algún día se necesita: OpenAI for Healthcare ([OpenAI](https://openai.com/index/openai-for-healthcare/)) o la API de Anthropic configurada para HIPAA ([Anthropic](https://privacy.claude.com/en/articles/8956058-is-anthropic-willing-to-sign-a-business-associate-agreement-baa-with-customers-handling-protected-health-information-phi)).

## Propuesta RootBiz: de invisible a confiable en 90 días

La propuesta para el dueño se organiza en cuatro fases y un mantenimiento continuo. Parte de tres compromisos: RootBiz nunca guarda PHI, la clínica es dueña de todas sus cuentas, y ningún agente de IA toca sesiones de administración. Los honorarios se definen después del diagnóstico de la semana 1, porque el alcance depende de las respuestas del dueño. Los costos de los proveedores con BAA los paga la clínica directamente.

### Ganancias rápidas en dos semanas, sin tocar datos clínicos

La primera fase cierra los riesgos que cuestan poco y pueden costar mucho, y deja preparado el terreno para la reconstrucción.

| # | Acción | Herramienta o responsable | Por qué ahora |
|---|---|---|---|
| 1 | Verificar en vivo: código fuente, píxeles o Google Tag Manager, campos y destino del formulario, plataforma (¿GoDaddy?), robots.txt, sitemap, velocidad | RootBiz, con un navegador normal y sin agente de IA | Cierra la limitación de este informe y fija la urgencia del punto 2 |
| 2 | Sacar los datos de pacientes del Gmail gratuito: notificaciones a Workspace con BAA, o, mientras tanto, reducir el formulario a nombre, teléfono y horario con el aviso "no incluya información médica" | La clínica contrata y RootBiz configura | Gmail gratuito no tiene BAA |
| 3 | Quitar cualquier Meta Pixel, Google Analytics o Google Tag Manager de /schedule-now y de las páginas con formulario | RootBiz | Demandas por píxeles; Meta ya bloquea los eventos de salud |
| 4 | Inventariar cuentas y titularidad (registrador, DNS, GoDaddy, GitHub, Google Business Profile, Meta, Workspace); pasarlas a Vaultwarden con 2FA; bloquear el dominio en el registrador | RootBiz y el dueño | El dominio y el perfil de Google no pueden depender de una cuenta personal |
| 5 | Política escrita: ningún navegador o agente de IA conectado al registrador, GitHub, el perfil de Google, el EHR o el banco; nada de PHI en ChatGPT de consumo o Business | Docmost, con la firma del dueño | Inyección de instrucciones; no hay BAA |
| 6 | Si alguien abrió el EHR o portales de seguros en Atlas o ChatGPT, escalarlo al responsable de privacidad y al abogado | La clínica; RootBiz solo lo señala | Posible divulgación no permitida |
| 7 | Monitorear el sitio actual, el formulario, el certificado SSL y el vencimiento del dominio | Uptime Kuma con alertas por n8n | Hoy un fallo pasa inadvertido |
| 8 | Dejar de usar "One Medical Clinic" hasta la revisión legal; usar un nombre, un teléfono y un formato de dirección en el sitio actual | Decide el dueño y RootBiz edita | Choque con Amazon One Medical; datos de contacto inconsistentes |
| 9 | Plantilla bilingüe de respuesta a reseñas sin PHI y política de redes sociales | Docmost | Multas de la OCR de $10,000 a $50,000 por responder reseñas con datos de pacientes |
| 10 | Un solo horario en el sitio, Yelp, Fresha, Wheree y el perfil de Google | RootBiz | Hoy circulan cuatro horarios para la misma puerta |

### A los 30 días: marca decidida y sitio bilingüe con agenda real

La segunda fase arranca con un taller para decidir la arquitectura de marca. Hay dos opciones defendibles:

- **One Source como marca de medicina familiar separada.** Puede ocupar el hueco que deja Vamos Health, pero empieza con cero reseñas.
- **Medicina familiar dentro de AVA.** Aprovecha las 223 reseñas, pero ata la atención primaria a la imagen de clínica de accidentes.

En cualquiera de los dos casos, conviene evaluar un dominio sin "mvc", con redirecciones 301 desde las URLs actuales.

| Acción | Herramienta | Resultado para la clínica |
|---|---|---|
| Nuevo sitio en Astro con rutas /es/ y /en/, etiquetas `hreflang` y `lang`, una página por servicio, proveedores con credenciales y NPI, seguros aceptados, PIP explicado, precios sin seguro con aviso de GFE, ubicación y horario, privacidad, NPP, accesibilidad y avisos de la Sección 1557 | Astro + Cloudflare Pages; organización de GitHub a nombre de la clínica con rama protegida (un repositorio privado necesita Pro o Team); vistas previas tras Cloudflare Access; revisión automática de compilación, enlaces y WCAG; espejo en Forgejo | Un sitio que cumple la ley y posiciona en español |
| Agenda y admisión con proveedor con BAA, incrustadas desde el dominio del proveedor | Jane App (si tiene BAA) o Jotform HIPAA; enlace para llamar con un toque; WhatsApp solo para logística | "Schedule Now" pasa a ser una agenda real |
| Datos estructurados MedicalClinic / LocalBusiness con horario (OpeningHoursSpecification) y NPI ([Ulement](https://ulement.com/medical-schema-markup/)) | Astro | Google entiende quién, dónde y cuándo |
| Redirecciones 301 de /home y /schedule-now; alta en Search Console | Cloudflare | Sin contenido duplicado |
| Umami solo en páginas públicas | Umami | Medición sin cookies y sin PHI |
| Correo con dominio propio (por ejemplo, citas@…) en Workspace con BAA | Workspace | Más confianza, con cumplimiento |
| Traducción: borrador con Ollama, revisión humana calificada de lo crítico y registro de qué se revisó y cuándo | Ollama, un traductor y Docmost | Cumple 92.201(c)(3) |

### A los 60 días: visibilidad local, reseñas y canales

La tercera fase convierte el sitio en tráfico, con los canales que de verdad usa el paciente hispano y sin cruzar la línea de la PHI.

| Acción | Herramienta | Resultado |
|---|---|---|
| Reclamar o verificar el perfil de Google de One Source, o consolidarlo con AVA según la decisión de marca: categorías, servicios, descripción en español, fotos con autorización; cambiar "AVA Injury Clinic car Accident" por el nombre real | Google Business Profile | Aparecer en el mapa sin riesgo de suspensión por relleno de palabras clave en el nombre [Inferencia] |
| Limpiar menciones en Yelp, Healthgrades, WebMD, Fresha, Wheree, Birdeye, MapQuest, Yahoo y Mexicanas en Utah; actualizar el teléfono en NPPES; corregir el código postal a 84129; reportar la ficha obsoleta de UPRI | Lista de control en n8n y trabajo manual | Nombre, dirección y teléfono iguales en todas partes |
| Programa de reseñas: pedirlas a **todos** los pacientes, sin incentivos, por un canal con BAA | Envío de textos del EHR o Twilio con BAA | Primeras reseñas propias, dentro de la norma de la FTC |
| Chatwoot como recepción digital sin PHI, con aviso bilingüe; si hay un bot, aviso de IA al inicio de la conversación | Chatwoot | Respuesta rápida en web, WhatsApp e Instagram |
| Recordatorios de cita por SMS dentro de la exención de la TCPA | EHR o Twilio con BAA | Menos ausencias |
| CRM para relaciones con abogados, aseguradoras y socios comunitarios, sin expedientes de pacientes ni pagos por referidos | Twenty | Seguimiento de las fuentes de pacientes dentro de las reglas sobre captadores |
| Contenido en español: "¿Qué cubre el PIP en Utah?", "Qué hacer después de un choque", "Médico familiar sin seguro"; los datos médicos y legales los firma la clínica | Astro, con borradores de Ollama | Posicionamiento en búsquedas poco disputadas |

### A los 90 días: crecimiento medible y cumplimiento sostenido

La cuarta fase añade publicidad y prepara la auditoría de accesibilidad mucho antes de los plazos de 2027 y 2028.

| Acción | Herramienta | Resultado |
|---|---|---|
| Google Ads solo de búsqueda, sin remarketing por salud ni Customer Match; conversiones sin PHI (clic en "llamar") | Google Ads y Umami | Captación de pacientes dentro de las políticas de Google |
| Redes: decidir si One Source tiene canales propios; calendario en español; testimonios solo con autorización HIPAA escrita | Calendario en Docmost | Contenido sin reseñas falsas ni hechas con IA |
| Auditoría WCAG 2.1 AA manual y automática, incluidos los widgets de terceros; declaración de accesibilidad; nada de overlays como estrategia | RootBiz | Lista para la Sección 504 y defensa frente a la ADA |
| Apoyo al análisis de riesgos HIPAA, que hace un consultor calificado; RootBiz aporta el inventario de proveedores, los flujos de datos y los BAA | Docmost | La clínica cumple el requisito obligatorio |
| Página de estado pública e informe mensual automático (Umami, disponibilidad, perfil de Google) | Uptime Kuma y n8n | Transparencia para el dueño |
| Evaluar ampliar horario o añadir telemedicina con datos de demanda (llamadas, visitas, búsquedas) | Umami y registros de llamadas | Decisión basada en evidencia |

El mantenimiento continuo sigue una cadencia fija:

- **Cada mes:** actualizaciones de dependencias probadas en vista previa, revisión de accesibilidad y Lighthouse, informe de disponibilidad y SSL, resumen de Umami y revisión del perfil de Google, incluidos los horarios de días festivos.
- **Cada trimestre:** revisión de accesos (dar de baja a exempleados, rotar claves), prueba de restauración de respaldos y revisión con la clínica de que siguen siendo correctos los proveedores, los seguros aceptados y los precios.
- **Cada año:** renovación del dominio y revisión de la política de privacidad, del NPP y de los avisos de la Sección 1557.

Esta cadencia es práctica habitual de la industria, no sale de una fuente concreta [Inferencia].

| Indicador | Línea de base hoy | Meta propuesta a 90 días [Inferencia] |
|---|---|---|
| URLs indexadas | 3, solo en inglés | Más de 20, con versión en español equivalente |
| Nombres de marca en uso | 3 o más | 1 (más AVA, si se decide así) |
| Reseñas propias de One Source | 0 | Primeras reseñas reales en Google, sin incentivos |
| Agenda | Devolución de llamada por Gmail | Reserva en tiempo real con BAA |
| Avisos legales en el sitio | Ninguno encontrado | NPP, privacidad, accesibilidad, Sección 1557, GFE |
| PHI en sistemas sin BAA | Probable (Gmail) | Cero, verificado con el inventario |

Hay cosas que RootBiz **no hará**, y conviene dejarlas por escrito en la propuesta:

- redactar sola los avisos legales: aporta la estructura y el abogado los aprueba;
- hacer el análisis de riesgos HIPAA como autoridad de cumplimiento;
- comprar, inventar o generar con IA reseñas o testimonios;
- montar programas de pago por referidos;
- usar agentes de IA en sesiones de administración;
- guardar PHI.

Estos límites protegen a la agencia y, a la vez, son un argumento de venta frente a un proceso DIY que no tenía ninguno.

## Veintidós preguntas que el dueño debe responder antes de empezar

| # | Pregunta | Por qué importa | Qué decide |
|---|---|---|---|
| 1 | ¿One Source Care LLC, One Source Medical Center y AVA Injury Clinic son la misma empresa, empresas hermanas o inquilinos independientes? ¿Quién es el dueño de cada una? | Ninguna fuente primaria las une | Arquitectura de marca, quién firma el contrato y los BAA |
| 2 | ¿Existe un DBA registrado en Utah para "One Medical Clinic" o "One Source Medical Center"? | No se pudo consultar el registro | Qué nombre se puede usar legalmente |
| 3 | ¿Saben del choque con Amazon One Medical? ¿Qué nombre quieren usar? | Riesgo de marca registrada y de confusión | Cambio de marca y de dominio |
| 4 | ¿Qué significa "MVC"? ¿El negocio es sobre todo de accidentes o de medicina familiar? | El sitio mezcla las dos cosas sin jerarquía | Posicionamiento y estructura del sitio |
| 5 | ¿Quién presta la medicina familiar (nombre, credencial, licencia de DOPL, NPI)? ¿Es Carlos Vasquez, NP? | La evidencia se contradice | Páginas de proveedores, datos estructurados, confianza |
| 6 | ¿Facturan Medicaid (Molina), Medicare, PIP, cartas de protección o gravámenes con abogados, MultiPlan, pago propio? | Activa la Sección 504, la 1557 y el GFE | Avisos, contenido y páginas de precios |
| 7 | ¿Tienen 15 empleados o más? | Plazo de la Sección 504: 2027 o 2028 | Calendario de accesibilidad y coordinador de la Sección 1557 |
| 8 | ¿Qué EHR o sistema de agenda usan? ¿Firma BAA? ¿Comparten Jane App con AVA? | La agenda real depende de eso | Integración de la agenda |
| 9 | ¿Cuál es el teléfono principal? ¿Para qué sirven (385) 497-5590 y (801) 645-0286? ¿Hay línea de texto o de WhatsApp? | Cinco teléfonos en circulación | Datos de contacto únicos |
| 10 | ¿Quién hizo el sitio actual y en qué plataforma? ¿Quién controla el dominio, el DNS, el hosting, el perfil de Google y GitHub, y con qué cuentas personales? | Titularidad y continuidad | Plan de migración de cuentas |
| 11 | ¿Qué herramienta de IA usan desde que cerró Atlas, y en qué plan? ¿Alguna vez abrieron el EHR, un portal de seguros o datos de pacientes en Atlas o ChatGPT? | Posible divulgación sin BAA | Escalarlo al responsable de privacidad |
| 12 | ¿Existe un repositorio de GitHub privado? ¿Contiene claves, formularios o datos reales? | No se encontró ninguno público | Revisión de secretos y limpieza del historial |
| 13 | ¿Qué píxeles o etiquetas tiene el sitio? ¿Hacen publicidad en Meta o Google? | Riesgo de demandas por píxeles | Limpieza de etiquetas |
| 14 | ¿Tienen NPP actualizado por Part 2, responsable de privacidad y análisis de riesgos documentado? | Son obligatorios | Alcance del apoyo de cumplimiento |
| 15 | ¿Existen perfiles de Google para One Source y para AVA? ¿Quién los administra? ¿Por qué se llama "AVA Injury Clinic car Accident"? | Riesgo de suspensión | Estrategia del perfil de Google |
| 16 | ¿Cómo llegan hoy los pacientes (abogados, referidos, redes, Mexicanas en Utah, radio)? ¿Se paga algo por referidos? | Reglas sobre captadores | Diseño del CRM y de la publicidad |
| 17 | ¿Las bebidas, los traslados en Uber y la "cita gratis" se ofrecen a pacientes de Medicaid? | Posible incentivo a beneficiarios | Revisión del abogado |
| 18 | ¿Cómo piden reseñas? ¿Dan algo a cambio? | Norma de la FTC | Programa de reseñas |
| 19 | ¿Piensan ampliar el horario (tardes, sábados) o añadir telemedicina? | Hoy abren 16.5 horas por semana | Mensajes y funciones del sitio |
| 20 | ¿Prefieren que RootBiz nunca toque PHI, o aceptarían que firme un BAA para alguna función? | Define toda la arquitectura | Alcance técnico y contractual |
| 21 | ¿Saben quién controla avainjuryclinics.com (en plural)? | Dominio con spam bajo la marca AVA | Recuperación o defensa de la marca |
| 22 | ¿Tienen precios para pacientes sin seguro y un proceso de GFE? | Es obligatorio y además vende | Página de precios |

## Conclusión

El problema de "One Medical" no es un mal sitio web: es una **arquitectura de marcas que nadie decidió**. La operación ya tiene lo que muchas clínicas pequeñas no logran: 223 reseñas casi perfectas, reservas en línea en Jane App, presencia social en español y una red comunitaria hispana. Todo eso está a nombre de AVA, mientras One Source, que es la marca que debería sostener la medicina familiar, empieza de cero y con un nombre que choca con Amazon. Por eso la primera venta de RootBiz no es un sitio en Astro, sino un taller de decisión de marca. El sitio, el perfil de Google y el programa de reseñas solo rinden cuando esa decisión está tomada.

El cumplimiento, que suele presentarse como freno, aquí es el diferenciador. Una agencia que promete por contrato no tocar nunca la PHI, mantener las cuentas a nombre de la clínica y no dejar a ningún agente de IA con las llaves reduce su propia responsabilidad. También le vende al dueño algo que el proceso DIY no podía darle: continuidad. Atlas desapareció en agosto, y con él cualquier memoria o sesión que no se exportó. En un mercado donde los rivales compiten con traslados gratis y promesas de "100% cubierto", una clínica bilingüe con proveedores identificados, precios publicados y avisos en regla puede ser la opción más confiable de la zona. El hueco que deja Vamos Health en reseñas indica que ese espacio sigue libre.
