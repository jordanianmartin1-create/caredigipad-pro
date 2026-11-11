window.CDU_LANGS = {};
const _G1 =
['setup','sub','disclaimer','proTitle','proSub','proPlaceholder','unlock','getPro','prefs','theme','thTeal'
,'thBlue','thGreen','thBerry','thSlate','thCoral','shiftHrs','dayShift','nightShift','bmUnit','tempUnit','sa
vedLay','noLay','addBed','bedHelper','noBedsYet','selectAtLeastOne','add','del','save','activeMod
s','saveLay','toggleSettings','start','startEmpty','returnShift','bedSingular','bedPlural','share','endS
hift','edit','hide','dark','hiddenTitle','hiddenSub'];
const _G2 =
['delConfirm','manageBed','renameBed','transferBed','transferPrompt','swapConfirm','clearBed','c
learBedConfirm','removeBed','removeBedConfirm','updLayout','layoutSaved','quickAddBedTitle','
savedWardBeds','summary','obs','bm','bp','fluid','bowel','amy','food','turn','mh','events','reminders'
,'admit','done','markDone','markBed','pending','showAll','keepOn','byBed','byMod'];
const _G3 =
['time','dueTime','air','context','rrLbl','spo2Lbl','o2Lbl','bpLbl','hrLbl','tempLbl','acvpuLbl','pain','pain
Lbl','o2Nasal','o2Mask','o2Venturi','bmValLbl','bmPreB','bmPostB','bmPreL','bmPostL','bmPreD','
bmPostD','bmBed','bmNight','bmRandom','bmRepeat','preMeal','postMeal','night','hypoTreated','
ketones','escRn','lying','standing','noSym','dizzy','unableStand'];
const _G4 =
['flIn','flOut','flNet','flTotal','flClr','wetPad','srcPu','srcCath','srcBowel','srcVomit','amt','type','bno','bn
oFull','method','small','medium','large','smear','type1','type2','type3','type4','type5','type6','type7','
mToilet','mCommode','mBedpan','mPad'];
const _G5 =
['sacrum','groin','heels','elbows','intact','blanching','nonBlanch','moisture','broken','tear','drySkin','
markIntact','addSite','siteHip','siteAnkle','siteShin','siteFoot','siteArm','siteSpine','siteShoulder','sit
eEar','siteOther','sideL','sideR','sideBoth','cBarrier','cOffload','cBoots','dressing','locNotes','dueIn',
'date','today','due','selectDate','day1','day2','day3','day5','day7','drIntact','drChanged','drLeak','drL
ift','b','l','d','supp','taken','refused','nbm','dIndep','dAssist','dPrompt','dThick'];
const _G6 =
['turnFreqLbl','tf2h','tf3h','tf4h','tfComfort','tfIndep','posLbl','back','left','right','chair','walking','turnNo
w','tBell','tRails','tMattress','obsLevel','lvl1','lvl2','lvl3','lvl4','mood','calm','anxious','agitated','low','c
onfused','vocal','elevated','hostile','rest','asleep','settled','mhChair','restless','mhBath','mhCommu
nal','mhVisit','outOfBed','mhRationaleLbl','mhRatRoutine','mhRatEngage','mhRatDeesc','mhRat
Reorient','mhRatEnv','mhRatFluids','mhRatPrn','mhRatEsc','mhNoteLbl','outcome','weight','heigh
t','wristband','locPt','locSafe','locHome'];
function _regLang(code, d) {
const out = {};
const mapGrp = (keys, str) => {
const arr = str.split('|');
keys.forEach((k, i) => { if (arr[i] !== undefined && arr[i] !== '') out[k] = arr[i]; });
};
mapGrp(_G1, d.g1);
mapGrp(_G2, d.g2); mapGrp(_G3, d.g3);
mapGrp(_G4, d.g4);
mapGrp(_G5, d.g5);
mapGrp(_G6, d.g6);
out.acvpu = d.acvpu.split('|');
out.phrases = d.phrases.split('|');
out.tasks = d.tasks.split('|');
out.admits = d.admits.split('|');
out.drSites = d.drSites.split('|');
window.CDU_LANGS[code] = out;
}
// 1. Español (es)
_regLang('es', {
g1: "Configuración de Turno|Bloc de notas de turno 100% sin conexión. Los datos nunca salen
de su dispositivo.|Solo bloc de notas personal de turno. No ofrece consejo clínico, diagnóstico
ni soporte de decisiones.|Desbloquear Care Digipad Pro (£9.99 Vitalicio)|Desbloquea camas
ilimitadas, diseños guardados, temas, alarmas de tareas y todos los módulos.|Introducir clave
de licencia|Desbloquear|Obtener clave de licencia vitalicia →|Preferencias y
Unidades|Tema|Verde Clínico|Azul Sanitario|Verde Quirófano|Ciruela y Frambuesa|Pizarra
Noche|Coral Cálido|Horario de Turno|Día (07:00)|Noche (19:00)|Unidad de Glucosa|Unidad de
Temp|Diseños de Planta Guardados|Seleccionar diseño guardado...|Sus Camas de Pacientes
(Máx 4 car.)|Toque una cama abajo para seleccionarla (✓) o desmarcarla hoy:|Aún no hay
camas. Escriba un número o iniciales arriba y toque + Añadir.|Por favor toque al menos una
cama para seleccionarla (✓) hoy.|+ Añadir|Borrar|+ Guardar Nuevo|Módulos Activos (Marque
para mostrar • Toque ▲ ▼ para ordenar)|O guardar como nuevo diseño (ej. Noche)|⚙ Horario,
Unidades y Módulos Activos ▾|Iniciar Turno|Seleccione Camas para Iniciar|Guardar y Volver al
Turno|Cama|Camas|Compartir Care Digipad con un Colega|Fin de Turno / Borrar
Datos|Editar|Ocultar|Oscuro|Pantalla Oculta|Toque en cualquier lugar para volver a las notas",
g2: "¿Eliminar esta entrada?|Gestionar Cama|Renombrar Cama|Transferir / Intercambiar
Paciente|Introduzca cama de destino (máx 4 car.):|está ocupada. ¿Intercambiar pacientes?
(Cancelar = Sobrescribir destino)|Limpiar Cama (Alta)|¿Borrar todos los datos de turno de esta
cama?|Quitar Cama del Turno|¿Quitar esta cama y sus datos del turno?|Guardar en|Guardado
en diseño|Añadir Cama al Turno|Camas Guardadas (Toque para
añadir):|Resumen|Constantes|Glucosa|PA Tumbado/De Pie|Líquidos|Deposiciones|Piel y
Apósitos|Dieta|Cambios Posturales|Salud Mental|Notas|Tareas|Ingresos|Hecho|Marcar
Hecho|Cama Hecha|Solo Pendientes|Mostrar Todo|Pantalla Activa|Por Cama|Por Módulo",
g3: "Hora|Hora Prevista|Aire|Momento / Contexto|Respiración (FR)|Saturación O2
(SpO2%)|Aire / Oxígeno (O2)|Presión Arterial (Sis / Dia)|Pulso / Frecuencia Cardíaca
(FC)|Temperatura|Nivel de Alerta (ACVPU)|Dolor|Escala de Dolor (0-10)|Gafas
Nasales|Mascarilla|Venturi|Glucemia Capilar|Pre-Desayuno (Ayunas)|Post-Desayuno
(2h)|Pre-Almuerzo|Post-Almuerzo (2h)|Pre-Cena|Post-Cena (2h)|Antes de Dormir|Noche (02:00
- 04:00)|Aleatorio / Sintomático|Repetición (Post-Hipoglucemia)|Pre-Comida|Post-Comida|Noche|Hipo Tratada|Cetonas Miradas|Avisado a
Enfermería|Tumbado|De Pie|Sin Síntomas|Mareado / Aturdido|Incapaz de Ponerse de Pie",
g4: "Ingesta|Diuresis / Salida|Balance|Total|Limpiar|Pañal Húmedo|Orina (Micción)|Sonda
Vesical|Deposición|Vómito|Cantidad|Consistencia / Tipo de Heces (1-7)|Sin Deposición
(BNO)|Sin Deposición (BNO)|Método|Pequeña|Media|Grande|Manchado|Dura — Tipo 1
(Trozos duros separados)|Dura — Tipo 2 (Forma de salchicha grumosa)|Normal — Tipo 3
(Salchicha con grietas)|Normal — Tipo 4 (Suave y blanda)|Blanda — Tipo 5 (Trozos
blandos)|Suelta — Tipo 6 (Pastosa)|Líquida — Tipo 7 (Acuosa)|Inodoro|Silla con
Orinal|Cuña|Pañal (Incontinente)",
g5: "Sacro|Ingle|Talones|Codos|Íntegra|Roja (Blanqueable)|Roja (No Blanqueable)|Lesión por
Humedad / Excoriada|Abierta / Cavidad|Desgarro Cutáneo / Hematoma|Seca / Frágil|Marcar
Todo Íntegro|+ Añadir Zona Corporal|Cadera|Tobillo|Espinilla / Pierna|Pie / Dedos|Brazo /
Antebrazo|Espalda / Columna|Hombro|Oreja|Otra Zona|Izquierda|Derecha|Ambos|Crema
Barrera|Reposicionado / Descargado|Taloneras / Almohadas|Apósito|Ubicación / Notas|Próximo
Cambio|Fecha de Aplicación / Revisión|Hoy|Vence|Seleccionar Fecha|1 Día|2 Días|3 Días|5
Días|7 Días|Íntegro y Seco|Cambiado Hoy|Exudado /
Fuga|Despegado|Desayuno|Almuerzo|Cena|Suplementos / Snacks|Tomado|Rechazado|Dieta
Absoluta (NBM)|Independiente|Con Ayuda|Con Estímulo|Líquidos Espesados",
g6: "Plan de Cambios Posturales|Giros cada 2 Horas|Giros cada 3 Horas|Giros cada 4
Horas|Según Necesidad / Confort|Independiente (Se gira solo)|Posición|Espalda (Supino)|Lado
Izquierdo|Lado Derecho|Sentado en Sillón|Caminando / Movilizando|+ Registrar Giro /
Posición|Timbre al Alcance|Barandillas Subidas|Colchón de Aire Revisado|Nivel de
Observación|Nivel 1: General|Nivel 2: Intermitente|Nivel 3: A la Vista|Nivel 4: Al Alcance del
Brazo|Ánimo / Presentación|Tranquilo y Colaborador|Ansioso / Angustiado|Agitado /
Inquieto|Bajo de Ánimo / Retraído|Confuso / Desorientado|Vocal / Llamando|Eufórico /
Elevado|Hostil / Agresivo|Ubicación / Actividad|Dormido en Cama|Descansando en
Cama|Sentado en Sillón|Caminando / Deambulando|En el Baño / Aseo Personal|En Zona
Común|Con Visitas|Intentando Salir (Riesgo de Fuga)|Intervención / Justificación
Clínica|Revisión Rutinaria — Seguro y Tranquilo|Apoyo 1:1 y Tranquilización|Desescalada
Verbal / Redirección|Reorientado en Tiempo y Espacio|Entorno Revisado y Seguro|Alimentos y
Líquidos Fomentados|Medicación PRN Administrada|Avisado a Enfermera / Médico|Notas
Adicionales (Opcional)|Resultado / Acción|Peso (kg)|Altura (cm)|Pulsera Identificativa
Revisada|Con el Paciente|En Caja Fuerte|Enviado a Casa",
acvpu: "A (Alerta)|C (Nueva Confusión)|V (Responde a la Voz)|P (Responde al Dolor)|U (No
Responde)",
phrases: "Aseo personal realizado|Lavado y vestido|Zonas de presión íntegras|Movilizado al
sillón|Avisado a enfermería|Familia informada",
tasks: "Analítica|ECG|Repetir Constantes|Glucemia (BM)|Ecografía Vesical|Revisión de Vía",
admits: "Prótesis Dental|Gafas|Audífono|Andador / Bastón|Teléfono y
Cargador|Llaves|Efectivo / Cartera",
drSites: "Sacro|Talón Izquierdo|Talón Derecho|Pierna Izquierda|Pierna Derecha|Abdomen"
});
// 2. Français (fr) _regLang('fr', {
g1: "Configuration de Garde|Carnet de garde numérique 100% hors ligne. Les données restent
sur votre appareil.|Carnet de notes personnel uniquement. Ne fournit aucun avis médical,
diagnostic ni aide à la décision.|Débloquer Care Digipad Pro (9,99 £ à vie)|Débloque lits
illimités, plans de service, thèmes, alarmes de tâches et tous les modules spécialisés.|Entrer la
clé de licence|Débloquer|Obtenir une clé de licence à vie →|Préférences et
Unités|Thème|Sarcelle Clinique|Bleu Soignant|Vert Chirurgical|Prune et Baie|Ardoise Nuit|Corail
Chaud|Horaires de Garde|Jour (07:00)|Nuit (19:00)|Unité de Glycémie|Unité de Temp.|Plans de
Service Enregistrés|Choisir un plan enregistré...|Vos Lits Patients (Max 4 car.)|Touchez un lit
ci-dessous pour le sélectionner (✓) ou le désélectionner :|Aucun lit ajouté. Tapez un numéro ou
des initiales ci-dessus et touchez + Ajouter.|Veuillez toucher au moins un lit pour le sélectionner
(✓) pour la garde.|+ Ajouter|Suppr.|+ Enregistrer Nouveau|Modules Actifs (Cocher pour afficher
• Toucher ▲ ▼ pour trier)|Ou enregistrer un nouveau plan (ex. Nuit)|⚙ Horaires, Unités et
Modules Actifs ▾|Démarrer la Garde|Sélectionner des Lits pour Démarrer|Enregistrer et
Retourner à la Garde|Lit|Lits|Partager Care Digipad avec un Collègue|Fin de Garde / Effacer les
Données|Modifier|Masquer|Sombre|Écran Masqué|Touchez n'importe où pour revenir aux
notes",
g2: "Supprimer cette entrée ?|Gérer le Lit|Renommer le Lit|Transférer / Échanger
Patient|Entrer le lit de destination (max 4 car.) :|est occupé. Échanger les patients ? (Annuler =
Écraser la destination)|Vider le Lit (Sortie)|Effacer toutes les données de ce lit ?|Retirer le Lit de
la Garde|Retirer ce lit et ses données de la garde ?|Enregistrer dans|Enregistré dans le
plan|Ajouter un Lit à la Garde|Lits du Service Enregistrés (Toucher pour ajouter)
:|Résumé|Constantes|Glycémie|TA Couché/Debout|Bilan Hydrique|Selles|Peau et
Pansements|Alimentation|Positionnement|Santé
Mentale|Notes|Tâches|Admissions|Fait|Marquer Fait|Lit Terminé|En Attente Seul.|Tout
Afficher|Écran Allumé|Par Lit|Par Module",
g3: "Heure|Heure Prévue|Air|Moment / Contexte|Fréquence Resp. (FR)|Saturation O2
(SpO2%)|Air / Oxygène (O2)|Tension Artérielle (Sys / Dia)|Pouls / Fréquence Cardiaque
(FC)|Température|Vigilance (ACVPU)|Douleur|Score de Douleur (0-10)|Lunettes
Nasales|Masque|Venturi|Glycémie Capillaire|Avant Petit-Déjeuner (À jeun)|Après Petit-Déjeuner
(2h)|Avant Déjeuner|Après Déjeuner (2h)|Avant Dîner|Après Dîner (2h)|Au Coucher|Nuit (02:00
- 04:00)|Aléatoire / Symptomatique|Contrôle
(Post-Hypoglycémie)|Pré-Repas|Post-Repas|Nuit|Hypo Traitée|Cétones Vérifiées|Transmis à
l'IDE|Couché|Debout|Aucun Symptôme|Étourdi / Vertiges|Incapable de se Lever",
g4: "Entrées|Sorties|Bilan|Total|Effacer|Protection Humide|Urines (Miction)|Sonde
Urinaire|Selles|Vomissements|Quantité|Consistance / Type de Selles (1-7)|Pas de Selles
(BNO)|Pas de Selles (BNO)|Méthode|Petite|Moyenne|Abondante|Traces|Dures — Type 1 (Billes
dures séparées)|Dures — Type 2 (Saucisse grumeleuse)|Normales — Type 3 (Saucisse
craquelée)|Normales — Type 4 (Lisse et molle)|Molles — Type 5 (Morceaux mous)|Mâteuses —
Type 6 (Pâteuse)|Liquides — Type 7 (Aqueuse)|Toilettes|Chaise Percée|Bassin|Protection
(Incontinence)",
g5: "Sacrum|Pli Inguinal|Talons|Coudes|Intacte|Rougeur (Blanchissable)|Rougeur (Non
Blanchissable)|Lésion d'Humidité / Excoriée|Rompue / Cavité|Déchirure Cutanée /
Ecchymose|Sèche / Fragile|Tout Marquer Intact|+ Ajouter Zone Corporelle|Hanche|Cheville|Tibia / Jambe|Pied / Orteils|Bras / Avant-bras|Dos /
Colonne|Épaule|Oreille|Autre Zone|Gauche|Droite|Les Deux|Crème Barrière|Repositionné /
Déchargé|Bottes de Décharge / Coussins|Pansement|Localisation / Notes|Prochain
Changement|Date de Pose / Contrôle|Aujourd'hui|Échéance|Choisir la Date|1 Jour|2 Jours|3
Jours|5 Jours|7 Jours|Propre et Sec|Refait Aujourd'hui|Souillé /
Fuite|Décollé|Petit-Déjeuner|Déjeuner|Dîner|Compléments / Collations|Pris|Refusé|À Jeun Strict
(NBM)|Autonome|Avec Aide|Stimulé|Boissons Épaissies",
g6: "Plan de Repositionnement|Changement toutes les 2h|Changement toutes les
3h|Changement toutes les 4h|Si Besoin / Confort Uniquement|Autonome (Se tourne
seul)|Position|Dos (Décubitus Dorsal)|Côté Gauche|Côté Droit|Assis au Fauteuil|Marche /
Mobilisation|+ Noter Changement / Position|Sonnette à Portée|Barrières de Lit
Relevées|Matelas à Air Vérifié|Niveau d'Observation|Niveau 1 : Général|Niveau 2 :
Intermittent|Niveau 3 : À Vue|Niveau 4 : À Portée de Bras|Humeur / Présentation|Calme et
Coopérant|Anxieux / En Détresse|Agité / Nerveux|Triste / Replié|Confus / Désorienté|Vocal /
Appelle|Exalté / Euphorique|Hostile / Agressif|Lieu / Activité|Endormi au Lit|Au Repos au
Lit|Assis au Fauteuil|Déambule / Marche|Salle de Bain / Soins d'Hygiène|En Salle
Commune|Avec des Visiteurs|Tentative de Sortie (Fugue)|Intervention / Justification
Clinique|Contrôle de Routine — Calme et en Sécurité|Entretien 1:1 et
Réassurance|Désescalade Verbale / Redirection|Réorienté dans le Temps et
l'Espace|Environnement Vérifié et Sûr|Hydratation et Repas Encouragés|Médicament Si Besoin
Administré|Transmis à l'Infirmier / Médecin|Notes Complémentaires (Optionnel)|Résultat /
Action|Poids (kg)|Taille (cm)|Bracelet d'Identité Vérifié|Avec le Patient|Au Coffre du
Service|Rendu à la Famille",
acvpu: "A (Alerte)|C (Confusion Nouvelle)|V (Répond à la Voix)|P (Répond à la Douleur)|U
(Inconscient)",
phrases: "Soins d'hygiène effectués|Lavé et habillé|Points d'appui intacts|Installé au
fauteuil|Transmis à l'IDE|Famille informée",
tasks: "Bilan Sanguin|ECG|Contrôler Constantes|Glycémie (BM)|Bladder Scan|Contrôle
Cathéter",
admits: "Prothèse Dentaire|Lunettes|Appareil Auditif|Déambulateur / Canne|Téléphone et
Chargeur|Clés|Espèces / Portefeuille",
drSites: "Sacrum|Talon Gauche|Talon Droit|Jambe Gauche|Jambe Droite|Abdomen"
});
// 3. Deutsch (de)
_regLang('de', {
g1: "Schicht-Einrichtung|100% Offline-Schichtnotizbuch. Daten verlassen niemals Ihr
Gerät.|Nur persönliches Schichtnotizbuch. Keine medizinische Beratung, Diagnose oder
Entscheidungshilfe.|Care Digipad Pro freischalten (£9.99 Lebenslang)|Schaltet unbegrenzte
Betten, Stationslayouts, Themen, Aufgabenalarme und alle Fachmodule frei.|Lizenzschlüssel
eingeben|Freischalten|Lebenslangen Lizenzschlüssel erhalten →|Einstellungen &
Einheiten|Farbschema|Klinik-Türkis|Pflege-Blau|OP-Grün|Pflaume &
Beere|Nacht-Schiefer|Warmes Korall|Schichtzeiten|Tagdienst (07:00)|Nachtdienst
(19:00)|Glukose-Einheit|Temp.-Einheit|Gespeicherte Stationslayouts|Gespeichertes Layout wählen...|Ihre Patientenbetten (Max. 4 Zeichen)|Tippen Sie unten auf ein Bett, um es für heute
auszuwählen (✓) oder abzuwählen:|Noch keine Betten hinzugefügt. Oben Bettnummer oder
Initialen eingeben und + Hinzuf. tippen.|Bitte wählen Sie mindestens ein Bett (✓) für die heutige
Schicht aus.|+ Hinzuf.|Lösch.|+ Neu Speichern|Aktive Module (Ankreuzen zum Anzeigen • ▲ ▼
zum Sortieren)|Oder als neues Layout speichern (z.B. Nacht)|⚙ Schichtzeiten, Einheiten &
Aktive Module ▾|Schicht Starten|Betten zum Starten wählen|Speichern & Zurück zur
Schicht|Bett|Betten|Care Digipad mit Kollegen teilen|Schicht Beenden / Daten
Löschen|Bearb.|Ausblenden|Dunkel|Bildschirm Ausgeblendet|Überall tippen, um zu den
Schichtnotizen zurückzukehren",
g2: "Diesen Eintrag löschen?|Bett Verwalten|Bett Umbenennen|Patient Verlegen /
Tauschen|Zielbett eingeben (max. 4 Zeichen):|ist belegt. Patienten tauschen? (Abbrechen =
Zielbett überschreiben)|Bett Leeren (Entlassung)|Alle Schichtdaten für dieses Bett löschen?|Bett
aus Schicht Entfernen|Dieses Bett und seine Daten aus der Schicht entfernen?|Speichern in|Im
Layout gespeichert|Bett zur Schicht Hinzufügen|Gespeicherte Stationsbetten (Tippen zum
Hinzufügen):|Übersicht|Vitalwerte|Blutzucker|RR Liegend/Stehend|Bilanz|Stuhlgang|Haut &
Verbände|Kost|Lagerung|Psychiatrie|Notizen|Aufgaben|Aufnahme|Erledigt|Als Erledigt
Mark.|Bett Erledigt|Nur Offene|Alle Zeigen|Display Anlassen|Nach Bett|Nach Modul",
g3: "Uhrzeit|Fällig um|Raumluft|Zeitpunkt / Kontext|Atemfrequenz (AF)|Sauerstoffsättigung
(SpO2%)|Raumluft / Sauerstoff (O2)|Blutdruck (Sys / Dia)|Puls / Herzfrequenz
(HF)|Temperatur|Bewusstsein (ACVPU)|Schmerz|Schmerzskala
(0-10)|Nasenbrille|Maske|Venturi-Maske|Blutzucker (BZ)|Vor dem Frühstück (Nüchtern)|Nach
dem Frühstück (2 Std.)|Vor dem Mittagessen|Nach dem Mittagessen (2 Std.)|Vor dem
Abendessen|Nach dem Abendessen (2 Std.)|Vor dem Schlafen|Nachts (02:00 - 04:00)|Spontan
/ Symptomatisch|Kontrolle (Nach Hypo-Behandlung)|Vor dem Essen|Nach dem
Essen|Nachts|Hypo Behandelt|Ketone Geprüft|An Pflegekraft Gemeldet|Liegend|Stehend|Keine
Symptome|Schwindelig / Benommen|Stehen Nicht Möglich",
g4: "Einfuhr|Ausfuhr|Bilanz|Gesamt|Leeren|Nasse Vorlage|Urin
(Miktion)|Katheter|Stuhlgang|Erbrechen|Menge|Konsistenz / Stuhltyp (1-7)|Kein Stuhlgang
(BNO)|Kein Stuhlgang (BNO)|Methode|Wenig|Mittel|Viel|Schmierstuhl|Hart — Typ 1 (Einzelne
harte Klumpen)|Hart — Typ 2 (Klumpige Wurstform)|Normal — Typ 3 (Wurstform mit
Rissen)|Normal — Typ 4 (Glatt und weich)|Weich — Typ 5 (Weiche Klümpchen)|Breiig — Typ 6
(Lockerer Brei)|Flüssig — Typ 7 (Wässrig)|Toilette|Toilettenstuhl|Steckbecken|Vorlage /
Inkontinenz",
g5: "Sakrum|Leiste|Fersen|Ellbogen|Intakt|Rot (Wegdrückbar)|Rot (Nicht
Wegdrückbar)|Feuchtigkeitsläsion / Exkoriiert|Offen / Defekt|Hauteinriss / Hämatom|Trocken /
Fragil|Alle Intakt Markieren|+ Körperstelle Hinzufügen|Hüfte|Knöchel|Schienbein / Bein|Fuß /
Zehen|Arm / Unterarm|Rücken / Wirbelsäule|Schulter|Ohr|Andere
Stelle|Links|Rechts|Beide|Hautschutzcreme|Gelagert / Entlastet|Fersenschoner /
Kissen|Verband|Stelle / Notizen|Nächster Wechsel|Datum Anlage / Kontrolle|Heute|Fällig|Datum
Wählen|1 Tag|2 Tage|3 Tage|5 Tage|7 Tage|Intakt & Trocken|Heute
Gewechselt|Durchgeschlagen / Undicht|Löst sich
ab|Frühstück|Mittagessen|Abendessen|Trinknahrung /
Snacks|Eingenommen|Abgelehnt|Nüchtern (NBM)|Selbstständig|Mit Hilfe|Mit
Anleitung|Andickungsmittel", g6: "Lagerungsplan|2-stündliche Lagerung|3-stündliche Lagerung|4-stündliche Lagerung|Bei
Bedarf / Komfortlagerung|Selbstständig (Dreht sich selbst)|Position|Rückenlage|Linke
Seite|Rechte Seite|Sitzt im Stuhl|Mobilisation / Gehen|+ Lagerung / Position Erfassen|Rufglocke
in Reichweite|Bettgitter Oben|Wechseldruckmatratze Geprüft|Beobachtungsstufe|Stufe 1:
Allgemein|Stufe 2: Intermittierend|Stufe 3: In Sichtweite|Stufe 4: In Reichweite|Stimmung /
Verhalten|Ruhig & Kooperativ|Ängstlich / Belastet|Unruhig / Agitiert|Niedergeschlagen /
Zurückgezogen|Verwirrt / Desorientiert|Laut / Ruft|Gehoben / Euphorisch|Feindselig /
Aggressiv|Aufenthaltsort / Aktivität|Schläft im Bett|Ruht im Bett|Sitzt im Stuhl|Geht umher /
Unruhig|Im Bad / Körperpflege|Im Gemeinschaftsraum|Hat Besuch|Drängt nach draußen
(Weglauftendenz)|Intervention / Begründung|Routinekontrolle — Sicher & Ruhig|1:1 Betreuung
& Beruhigung|Verbale Deeskalation / Ablenkung|Zeitlich & Örtlich Orientiert|Umgebung Geprüft
& Sicher|Essen & Trinken Angeboten|Bedarfsmedikation Verabreicht|An Schichtleitung / Arzt
Gemeldet|Zusätzliche Notizen (Optional)|Ergebnis / Maßnahme|Gewicht (kg)|Größe
(cm)|Patientenarmband Geprüft|Beim Patienten|Im Stationssafe|Nach Hause Mitgegeben",
acvpu: "A (Wach / Alert)|C (Neue Verwirrtheit)|V (Reagiert auf Ansprache)|P (Reagiert auf
Schmerz)|U (Nicht Ansprechbar)",
phrases: "Körperpflege durchgeführt|Gewaschen & angekleidet|Druckstellen intakt|In den Stuhl
mobilisiert|An Pflegefachkraft gemeldet|Angehörige informiert",
tasks: "Blutabnahme|EKG|Vitalwerte Wiederholen|Blutzucker (BZ)|Blasenscan|Viggokontrolle",
admits: "Zahnprothese|Brille|Hörgerät|Rollator / Gehstock|Telefon &
Ladegerät|Schlüssel|Bargeld / Geldbörse",
drSites: "Sakrum|Ferse Links|Ferse Rechts|Bein Links|Bein Rechts|Abdomen"
});
// 4. Português (pt)
_regLang('pt', {
g1: "Configuração do Turno|Bloco de notas de turno 100% offline. Os dados nunca saem do
seu dispositivo.|Apenas bloco de notas pessoal de turno. Não fornece aconselhamento clínico,
diagnóstico ou apoio à decisão.|Desbloquear Care Digipad Pro (£9.99 Vitalício)|Desbloqueia
camas ilimitadas, layouts guardados, temas, alarmes de tarefas e todos os módulos.|Introduzir
chave de licença|Desbloquear|Obter Chave de Licença Vitalícia →|Preferências e
Unidades|Tema|Verde Clínico|Azul Saúde|Verde Cirúrgico|Ameixa e Framboesa|Ardósia
Noite|Coral Quente|Horário do Turno|Dia (07:00)|Noite (19:00)|Unidade de Glicemia|Unidade de
Temp.|Layouts de Enfermaria Guardados|Selecionar layout guardado...|As Suas Camas (Máx.
4 car.)|Toque numa cama abaixo para a selecionar (✓) ou desmarcar para o turno de
hoje:|Nenhuma cama adicionada. Digite um número ou iniciais acima e toque em +
Adicionar.|Por favor toque em pelo menos uma cama para a selecionar (✓) hoje.|+
Adicionar|Apagar|+ Guardar Novo|Módulos Ativos (Marque para mostrar • Toque em ▲ ▼ para
ordenar)|Ou guardar como novo layout (ex. Noite)|⚙ Horário, Unidades e Módulos Ativos
▾|Iniciar Turno|Selecionar Camas para Iniciar|Guardar e Voltar ao Turno|Cama|Camas|Partilhar
Care Digipad com um Colega|Fim de Turno / Limpar Dados|Editar|Ocultar|Escuro|Ecrã
Oculto|Toque em qualquer lugar para voltar às notas",
g2: "Eliminar este registo?|Gerir Cama|Renomear Cama|Transferir / Trocar Doente|Introduza
cama de destino (máx. 4 car.):|está ocupada. Trocar doentes? (Cancelar = Substituir destino)|Limpar Cama (Alta)|Limpar todos os dados de turno desta cama?|Remover Cama do
Turno|Remover esta cama e os seus dados do turno?|Guardar em|Guardado no
layout|Adicionar Cama ao Turno|Camas Guardadas (Toque para adicionar):|Resumo|Sinais
Vitais|Glicemia|PA Deitado/Em Pé|Balanço Hídrico|Dejeções|Pele e
Pensos|Dieta|Posicionamentos|Saúde Mental|Notas|Tarefas|Admissões|Feito|Marcar
Feito|Cama Concluída|Só Pendentes|Mostrar Tudo|Manter Ecrã Ligado|Por Cama|Por Módulo",
g3: "Hora|Hora Prevista|Ar Ambiente|Momento / Contexto|Frequência Resp. (FR)|Saturação
O2 (SpO2%)|Ar / Oxigénio (O2)|Pressão Arterial (Sis / Dia)|Pulso / Frequência Cardíaca
(FC)|Temperatura|Nível de Consciência (ACVPU)|Dor|Escala de Dor (0-10)|Óculos
Nasais|Máscara|Venturi|Glicemia Capilar|Pré-Pequeno-Almoço (Jejum)|Pós-Pequeno-Almoço
(2h)|Pré-Almoço|Pós-Almoço (2h)|Pré-Jantar|Pós-Jantar (2h)|Ao Deitar|Noite (02:00 -
04:00)|Ocasional / Sintomático|Repetição
(Pós-Hipoglicemia)|Pré-Refeição|Pós-Refeição|Noite|Hipo Tratada|Cetonas
Verificadas|Reportado ao Enfermeiro|Deitado|Em Pé|Sem Sintomas|Tonturas /
Vertigens|Incapaz de Ficar em Pé",
g4: "Entrada|Saída|Balanço|Total|Limpar|Fralda Molhada|Urina
(Micção)|Algaliação|Dejeções|Vómito|Quantidade|Consistência / Tipo de Fezes (1-7)|Sem
Dejeções (BNO)|Sem Dejeções (BNO)|Método|Pequena|Média|Grande|Vestígios|Dura — Tipo
1 (Pedaços duros separados)|Dura — Tipo 2 (Forma de salsicha grumosa)|Normal — Tipo 3
(Salsicha com fissuras)|Normal — Tipo 4 (Lisa e macia)|Mole — Tipo 5 (Pedaços
moles)|Pastosa — Tipo 6 (Mole / pastosa)|Líquida — Tipo 7 (Aquosa)|Sanita|Cadeira
Sanitária|Arrastadeira|Fralda (Incontinente)",
g5: "Sacro|Virilha|Calcâneos|Cotovelos|Íntegra|Rubor (Branqueável)|Rubor (Não
Branqueável)|Lesão por Humidade / Escoriada|Aberta / Cavidade|Laceração Cutânea /
Equimose|Seca / Frágil|Marcar Tudo Íntegro|+ Adicionar Zona Corporal|Anca|Tornozelo|Canela
/ Perna|Pé / Dedos|Braço / Antebraço|Costas / Coluna|Ombro|Orelha|Outra
Zona|Esquerda|Direita|Ambos|Creme Barreira|Reposicionado / Aliviado|Botas de Descarga /
Almofadas|Penso|Localização / Notas|Próxima Mudança|Data de Execução /
Verificação|Hoje|Previsto|Selecionar Data|1 Dia|2 Dias|3 Dias|5 Dias|7 Dias|Íntegro e
Seco|Feito Hoje|Repassado / Fuga|Descolado|Pequeno-Almoço|Almoço|Jantar|Suplementos /
Lanches|Tomado|Recusado|Dieta Zero (NBM)|Independente|Com Ajuda|Incentivado|Líquidos
Espessados",
g6: "Plano de Posicionamentos|Posicionamento 2/2h|Posicionamento 3/3h|Posicionamento
4/4h|Se Necessário / Apenas Conforto|Independente (Mobiliza-se sozinho)|Posição|Decúbito
Dorsal (Costas)|Decúbito Lateral Esquerdo|Decúbito Lateral Direito|Sentado no Cadeirão|A
Caminhar / Mobilizar|+ Registar Posicionamento|Campainha ao Alcance|Grades da Cama
Subidas|Colchão de Pressão Alternada Verificado|Nível de Observação|Nível 1: Geral|Nível 2:
Intermitente|Nível 3: Contacto Visual|Nível 4: Ao Alcance do Braço|Humor /
Apresentação|Calmo e Colaborante|Ansioso / Angustiado|Agitado / Inquieto|Deprimido /
Retraído|Confuso / Desorientado|Vocal / A Chamar|Eufórico / Exaltado|Hostil / Agressivo|Local /
Atividade|A Dormir na Cama|A Descansar na Cama|Sentado no Cadeirão|A Deambular /
Inquieto|Na Casa de Banho / Higiene|Na Sala de Convívio|Com Visitas|Tentativa de Saída
(Risco de Fuga)|Intervenção / Justificação Clínica|Verificação de Rotina — Seguro e
Calmo|Apoio 1:1 e Tranquilização|Desescalada Verbal / Redirecionamento|Reorientado no Tempo e Espaço|Ambiente Verificado e Seguro|Incentivada Dieta e Hidratação|Medicação SOS
Administrada|Reportado ao Enfermeiro / Médico|Notas Adicionais (Opcional)|Resultado /
Ação|Peso (kg)|Altura (cm)|Pulseira de Identificação Verificada|Com o Doente|No Cofre da
Enfermaria|Entregue à Família",
acvpu: "A (Alerta)|C (Confusão Nova)|V (Responde à Voz)|P (Responde à Dor)|U (Sem
Resposta)",
phrases: "Cuidados de higiene prestados|Lavado e vestido|Zonas de pressão
íntegras|Levante para o cadeirão|Reportado ao enfermeiro|Família atualizada",
tasks: "Colheita de Sangue|ECG|Repetir Sinais Vitais|Glicemia Capilar (BM)|Eco Vesical|Vigiar
Cateter Venoso",
admits: "Prótese Dentária|Óculos|Aparelho Auditivo|Andarilho / Bengala|Telemóvel e
Carregador|Chaves|Dinheiro / Carteira",
drSites: "Sacro|Calcâneo Esquerdo|Calcâneo Direito|Perna Esquerda|Perna Direita|Abdómen"
});
// 5. Italiano (it)
_regLang('it', {
g1: "Impostazione Turno|Taccuino di turno digitale 100% offline. I dati non lasciano mai il
dispositivo.|Solo taccuino personale di turno. Non fornisce pareri clinici, diagnosi o supporto
decisionale.|Sblocca Care Digipad Pro (£9.99 A Vita)|Sblocca letti illimitati, reparti salvati, temi,
sveglie attività e tutti i moduli specialistici.|Inserisci chiave di licenza|Sblocca|Ottieni una Chiave
di Licenza a Vita →|Preferenze e Unità|Tema|Ottanio Clinico|Blu Sanitario|Verde Sala|Prugna e
Bacca|Ardesia Notte|Corallo Caldo|Orario Turno|Giorno (07:00)|Notte (19:00)|Unità
Glicemia|Unità Temp.|Mappe Reparto Salvate|Seleziona reparto salvato...|I Tuoi Letti Paziente
(Max 4 car.)|Tocca un letto qui sotto per selezionarlo (✓) o deselezionarlo per il turno:|Nessun
letto aggiunto. Digita numero o iniziali sopra e tocca + Aggiungi.|Tocca almeno un letto per
selezionarlo (✓) per il turno di oggi.|+ Aggiungi|Elim.|+ Salva Nuovo|Moduli Attivi (Spunta per
mostrare • Tocca ▲ ▼ per riordinare)|O salva come nuovo reparto (es. Notte)|⚙ Orario Turno,
Unità e Moduli Attivi ▾|Inizia Turno|Seleziona Letti per Iniziare|Salva e Torna al
Turno|Letto|Letti|Condividi Care Digipad con un Collega|Fine Turno / Cancella
Dati|Modifica|Nascondi|Scuro|Schermo Nascosto|Tocca ovunque per tornare alle note di turno",
g2: "Eliminare questa voce?|Gestisci Letto|Rinomina Letto|Trasferisci / Scambia
Paziente|Inserisci letto di destinazione (max 4 car.):|è occupato. Scambiare i pazienti? (Annulla
= Sovrascrivi destinazione)|Svuota Letto (Dimissione)|Cancellare tutti i dati del turno per questo
letto?|Rimuovi Letto dal Turno|Rimuovere questo letto e i suoi dati dal turno?|Salva in|Salvato
nel reparto|Aggiungi Letto al Turno|Letti Reparto Salvati (Tocca per
aggiungere):|Riepilogo|Parametri|Glicemia|PA Sdraiato/In Piedi|Bilancio Idrico|Alvo|Cute e
Medicazioni|Dieta|Mobilizzazione|Salute Mentale|Note|Attività|Accettazione|Fatto|Segna
Fatto|Letto Completato|Solo In Sospeso|Mostra Tutto|Schermo Acceso|Per Letto|Per Modulo",
g3: "Ora|Ora Prevista|Aria Ambiente|Momento / Contesto|Freq. Respiratoria (FR)|Saturazione
O2 (SpO2%)|Aria / Ossigeno (O2)|Pressione Arteriosa (Sis / Dia)|Polso / Freq. Cardiaca
(FC)|Temperatura|Stato di Coscienza (ACVPU)|Dolore|Scala del Dolore (0-10)|Occhialini
Nasali|Maschera|Venturi|Glicemia Capillare|Pre-Colazione (Digiuno)|Post-Colazione (2
ore)|Pre-Pranzo|Post-Pranzo (2 ore)|Pre-Cena|Post-Cena (2 ore)|Prima di Coricarsi|Notte (02:00 - 04:00)|Estemporanea / Sintomatica|Controllo (Post-Trattamento
Ipo)|Pre-Pasto|Post-Pasto|Notte|Ipo Trattata|Chetoni Controllati|Segnalato
all'Infermiere|Sdraiato|In Piedi|Nessun Sintomo|Capogiri / Vertigini|Incapace di Stare in Piedi",
g4: "Entrate|Uscite|Bilancio|Totale|Cancella|Pannolone Bagnato|Urine
(Minzione)|Catetere|Alvo|Vomito|Quantità|Consistenza / Tipo Feci (1-7)|Alvo Chiuso (BNO)|Alvo
Chiuso (BNO)|Modalità|Piccola|Media|Abbondante|Tracce|Dure — Tipo 1 (Grumi duri
separati)|Dure — Tipo 2 (Salsiccia bernoccoluta)|Normali — Tipo 3 (Salsiccia con
crepe)|Normali — Tipo 4 (Liscia e morbida)|Morbide — Tipo 5 (Frammenti morbidi)|Molli — Tipo
6 (Pastosa / poltigliosa)|Liquide — Tipo 7 (Acquosa)|Bagno / WC|Comoda|Padella|Pannolone
(Incontinente)",
g5: "Sacro|Inguine|Talloni|Gomiti|Integra|Arrossata (Sbiancabile)|Arrossata (Non
Sbiancabile)|Lesione da Umidità / Escoriata|Lesa / Cavità|Lacerazione Cutanea /
Ecchimosi|Secca / Fragile|Segna Tutto Integro|+ Aggiungi Sede Corporea|Anca|Caviglia|Stinco /
Gamba|Piede / Dita|Braccio / Avambraccio|Schiena / Colonna|Spalla|Orecchio|Altra
Sede|Sinistra|Destra|Entrambi|Crema Barriera|Riposizionato / Scaricato|Talloniere /
Cuscini|Medicazione|Sede / Note|Prossimo Cambio|Data Applicazione /
Controllo|Oggi|Scadenza|Seleziona Data|1 Giorno|2 Giorni|3 Giorni|5 Giorni|7 Giorni|Integra e
Asciutta|Cambiata Oggi|Perdita / Essudato|Scollata|Colazione|Pranzo|Cena|Integratori /
Spuntini|Assunto|Rifiutato|Digiuno Assoluto (NBM)|Autonomo|Assistito|Stimolato|Liquidi
Addensati",
g6: "Piano di Riposizionamento|Cambi Posturali ogni 2 ore|Cambi Posturali ogni 3 ore|Cambi
Posturali ogni 4 ore|Al Bisogno / Solo Comfort|Autonomo (Si gira da solo)|Posizione|Supino
(Schiena)|Fianco Sinistro|Fianco Destro|Seduto in Poltrona|Deambulazione / Cammino|+
Registra Cambio / Posizione|Campanello a Portata|Spondine Alzate|Materasso Antidecubito
Controllato|Livello di Osservazione|Livello 1: Generale|Livello 2: Intermittente|Livello 3: A
Vista|Livello 4: A Portata di Braccio|Umore / Presentazione|Calmo e Collaborante|Ansioso /
Sofferente|Agitato / Irrequieto|Umore Basso / Ritirato|Confuso / Disorientato|Vocale /
Chiama|Euforico / Esaltato|Ostile / Aggressivo|Luogo / Attività|Addormentato a Letto|Riposa a
Letto|Seduto in Poltrona|Cammina / Irrequieto|In Bagno / Igiene Personale|In Sala Comune|Con
Visitatori|Tenta di Uscire (Rischio Allontanamento)|Intervento / Motivazione Clinica|Controllo di
Routine — Sicuro e Tranquillo|Colloquio 1:1 e Rassicurazione|De-escalation Verbale /
Riorientamento|Riorientato nel Tempo e nello Spazio|Ambiente Controllato e Sicuro|Incoraggiati
Cibo e Liquidi|Terapia al Bisogno Somministrata|Segnalato a Infermiere / Medico|Note
Aggiuntive (Opzionale)|Esito / Azione|Peso (kg)|Altezza (cm)|Braccialetto Identificativo
Controllato|Con il Paziente|In Cassaforte Reparto|Consegnato a Casa",
acvpu: "A (Vigile / Alert)|C (Nuova Confusione)|V (Risponde alla Voce)|P (Risponde al
Dolore)|U (Non Risponde)",
phrases: "Igiene personale eseguita|Lavato e vestito|Punti di pressione integri|Mobilizzato in
poltrona|Segnalato all'infermiere|Famiglia aggiornata",
tasks: "Prelievo Ematico|ECG|Ripetere Parametri|Glicemia (BM)|Bladder Scan|Controllo CVP",
admits: "Protesi Dentaria|Occhiali|Apparecchio Acustico|Deambulatore / Bastone|Telefono e
Caricabatterie|Chiavi|Contanti / Portafoglio",
drSites: "Sacro|Tallone Sinistro|Tallone Destro|Gamba Sinistra|Gamba Destra|Addome"
}); // 6. Nederlands (nl)
_regLang('nl', {
g1: "Dienst Instellen|100% offline digitaal dienstnotitieblok. Gegevens verlaten uw toestel
nooit.|Enkel persoonlijk dienstnotitieblok. Biedt geen medisch advies, diagnose of
beslissingsondersteuning.|Ontgrendel Care Digipad Pro (£9.99 Levenslang)|Ontgrendelt
onbeperkte bedden, afdelingsindelingen, thema's, taakalarmen en alle specialistische
modules.|Voer licentiesleutel in|Ontgrendel|Verkrijg een Levenslange Licentiesleutel
→|Voorkeuren & Eenheden|Thema|Klinisch Groenblauw|Zorgblauw|OK-Groen|Pruim &
Bes|Nachtleisteen|Warm Koraal|Diensttijden|Dag (07:00)|Nacht
(19:00)|Glucose-eenheid|Temp.-eenheid|Opgeslagen Afdelingsindelingen|Kies een opgeslagen
indeling...|Uw Patiëntenbedden (Max. 4 tekens)|Tik hieronder op een bed om het te selecteren
(✓) of deselecteren voor vandaag:|Nog geen bedden toegevoegd. Typ hierboven een
bednummer of initialen en tik op + Toevoegen.|Tik op minstens één bed om het te selecteren
(✓) voor de dienst van vandaag.|+ Toevoegen|Verw.|+ Nieuw Opslaan|Actieve Modules (Vink
aan om te tonen • Tik op ▲ ▼ om te sorteren)|Of sla op als nieuwe indeling (bijv. Nacht)|⚙
Diensttijden, Eenheden & Actieve Modules ▾|Dienst Starten|Selecteer Bedden om te
Starten|Opslaan & Terug naar Dienst|Bed|Bedden|Deel Care Digipad met een Collega|Dienst
Beëindigen / Gegevens Wissen|Wijzig|Verberg|Donker|Scherm Verborgen|Tik ergens om terug
te keren naar uw notities",
g2: "Dit item verwijderen?|Bed Beheren|Bed Hernoemen|Patiënt Overplaatsen / Wisselen|Voer
bestemmingsbed in (max. 4 tekens):|is bezet. Patiënten wisselen? (Annuleren = Bestemming
overschrijven)|Bed Wissen (Ontslag)|Alle dienstgegevens voor dit bed wissen?|Bed uit Dienst
Verwijderen|Dit bed en alle gegevens uit de dienst verwijderen?|Opslaan in|Opgeslagen in
indeling|Bed Toevoegen aan Dienst|Opgeslagen Afdelingsbedden (Tik om toe te
voegen):|Overzicht|Controles|Glucose|RR Liggend/Staand|Vochtbalans|Ontlasting|Huid &
Verband|Voeding|Wisselligging|GGZ / Mentale Zorg|Notities|Taken|Opname|Klaar|Markeer
Klaar|Bed Klaar|Alleen Openstaand|Toon Alles|Scherm Aanhouden|Per Bed|Per Module",
g3: "Tijd|Eindtijd|Kamerlucht|Moment / Context|Ademhaling (AH)|Zuurstofsaturatie
(SpO2%)|Kamerlucht / Zuurstof (O2)|Bloeddruk (Sys / Dia)|Pols / Hartslag
(HR)|Temperatuur|Bewustzijn (ACVPU)|Pijn|Pijnscore
(0-10)|Neusbril|Masker|Venturi-masker|Bloedglucose|Voor Ontbijt (Nuchter)|Na Ontbijt (2
uur)|Voor Lunch|Na Lunch (2 uur)|Voor Avondeten|Na Avondeten (2 uur)|Voor het Slapen|Nacht
(02:00 - 04:00)|Willekeurig / Bij Klachten|Herhaling (Na Hypo-behandeling)|Voor Maaltijd|Na
Maaltijd|Nacht|Hypo Behandeld|Ketonen Gecontroleerd|Gemeld aan
Verpleegkundige|Liggend|Staand|Geen Klachten|Duizelig / Licht in het Hoofd|Kan Niet Staan",
g4: "In|Uit|Balans|Totaal|Wissen|Nat Incontinentiemateriaal|Urine
(Mictie)|Katheter|Ontlasting|Braken|Hoeveelheid|Consistentie / Stoelgangtype (1-7)|Geen
Ontlasting (BNO)|Geen Ontlasting (BNO)|Methode|Weinig|Matig|Veel|Spoortje|Hard — Type 1
(Losse harde keutels)|Hard — Type 2 (Klonterige worstvorm)|Normaal — Type 3 (Worstvorm
met barstjes)|Normaal — Type 4 (Glad en zacht)|Zacht — Type 5 (Zachte stukjes)|Brijig — Type
6 (Zachte brij)|Vloeibaar — Type 7 (Waterig)|Toilet|Postoel|Ondersteek|Incontinentiemateriaal",
g5: "Stuit|Lies|Hielen|Elleboog|Intact|Rood (Wegdrukbare roodheid)|Rood
(Niet-wegdrukbaar)|Vochtletsel / Ontveld|Open / Defect|Skin Tear / Blauwe Plek|Droog / Kwetsbaar|Markeer Alles Intact|+ Lichaamsplaats Toevoegen|Heup|Enkel|Scheenbeen /
Been|Voet / Tenen|Arm / Onderarm|Rug / Wervelkolom|Schouder|Oor|Andere
Plaats|Links|Rechts|Beide|Barrièrecrème|Gewisseld / Drukvrij Gelegd|Hielbeschermers /
Kussens|Verband|Locatie / Notities|Volgende Wissel|Datum Aangebracht /
Gecontroleerd|Vandaag|Vervalt|Kies Datum|1 Dag|2 Dagen|3 Dagen|5 Dagen|7 Dagen|Intact &
Droog|Vandaag Verwisseld|Doorgelekt|Laat Los|Ontbijt|Lunch|Avondeten|Bijvoeding /
Tussendoortjes|Genomen|Geweigerd|Niets Per Os (NBM)|Zelfstandig|Met
Hulp|Aangespoord|Verdikte Dranken",
g6: "Wisselliggingsschema|Elke 2 Uur Draaien|Elke 3 Uur Draaien|Elke 4 Uur Draaien|Zo
Nodig / Comfort|Zelfstandig (Draait zelf)|Houding|Rugligging|Linkerzij|Rechterzij|Zittend in
Stoel|Mobiliseren / Lopen|+ Wisselligging / Houding Loggen|Bel Binnen Handbereik|Bedhekken
Omhoog|Luchtmatras Gecontroleerd|Observatieniveau|Niveau 1: Algemeen|Niveau 2:
Intermitterend|Niveau 3: Binnen Zicht|Niveau 4: Binnen Handbereik|Stemming /
Presentatie|Kalm & Coöperatief|Angstig / Gespannen|Geagiteerd / Onrustig|Somber /
Teruggetrokken|Verward / Gedesoriënteerd|Roepend / Vocaal|Uitgelaten / Verhoogd|Vijandig /
Agressief|Locatie / Activiteit|Slaapt in Bed|Rust op Bed|Zit in Stoel|Loopt Rond / Onrustig|In
Badkamer / ADL-zorg|In Huiskamer|Met Bezoek|Probeert Weg te Gaan
(Dwaalgedrag)|Interventie / Klinische Reden|Routinecontrole — Veilig & Rustig|1:1 Aandacht &
Geruststelling|Verbale De-escalatie / Afleiding|Geheroriënteerd in Tijd & Plaats|Omgeving
Gecontroleerd & Veilig|Eten & Drinken Aangemoedigd|Zo-nodig Medicatie Gegeven|Gemeld
aan Verpleegkundige / Arts|Extra Notities (Optioneel)|Resultaat / Actie|Gewicht (kg)|Lengte
(cm)|Polsbandje Gecontroleerd|Bij Patiënt|In Afdelingskluis|Mee naar Huis",
acvpu: "A (Alert)|C (Nieuwe Verwardheid)|V (Reageert op Stem)|P (Reageert op Pijn)|U
(Reageert Niet)",
phrases: "ADL-zorg verleend|Gewassen & aangekleed|Drukplekken intact|Gemobiliseerd naar
stoel|Gemeld aan verpleegkundige|Familie bijgepraat",
tasks: "Bloedprikken|ECG|Controles Herhalen|Bloedglucose
(BM)|Bladderscan|Infuuscontrole",
admits: "Gebitsprothese|Bril|Gehoorapparaat|Rollator / Wandelstok|Telefoon &
Oplader|Sleutels|Contant Geld / Portemonnee",
drSites: "Stuit|Linkerhiel|Rechterhiel|Linkerbeen|Rechterbeen|Buik"
});
// 7. Svenska (sv)
_regLang('sv', {
g1: "Passinställning|100% offline digitalt passanteckningsblock. Data lämnar aldrig din
enhet.|Endast personligt anteckningsblock. Ger inte medicinsk rådgivning, diagnos eller
beslutsstöd.|Lås upp Care Digipad Pro (£9.99 Livstid)|Låser upp obegränsade sängar, sparade
avdelningsvyer, teman, uppgiftslarm och alla moduler.|Ange licensnyckel|Lås upp|Skaffa en
livstids licensnyckel →|Inställningar & Enheter|Tema|Klinisk
Turkos|Vårdblå|Operationsgrön|Plommon & Bär|Midnattsskiffer|Varm Korall|Passtider|Dag
(07:00)|Natt (19:00)|Glukosenhet|Temp-enhet|Sparade Avdelningslayouter|Välj en sparad
layout...|Dina Patientsängar (Max 4 tecken)|Tryck på en säng nedan för att välja (✓) eller
avmarkera för dagens pass:|Inga sängar tillagda än. Skriv sängnummer eller initialer ovan och tryck + Lägg till.|Tryck på minst en säng för att välja (✓) den för dagens pass.|+ Lägg
till|Radera|+ Spara Ny|Aktiva Moduler (Kryssa i för att visa • Tryck ▲ ▼ för att ändra
ordning)|Eller spara som ny layout (t.ex. Natt)|⚙ Passtider, Enheter & Aktiva Moduler ▾|Starta
Pass|Välj Sängar för att Starta|Spara & Återgå till Passet|Säng|Sängar|Dela Care Digipad med
en Kollega|Avsluta Pass / Rensa Data|Ändra|Dölj|Mörkt|Skärm Dold|Tryck var som helst för att
återgå till anteckningarna",
g2: "Ta bort denna post?|Hantera Säng|Byt Namn på Säng|Flytta / Byt Patient|Ange målsäng
(max 4 tecken):|är upptagen. Byta plats på patienter? (Avbryt = Skriv över målsäng)|Rensa
Säng (Utskrivning)|Rensa all passdata för denna säng?|Ta Bort Säng från Passet|Ta bort denna
säng och dess data från passet?|Spara till|Sparad i layout|Lägg till Säng under Passet|Sparade
Avdelningssängar (Tryck för att lägga till):|Översikt|Vitalparametrar|Blodsocker|BT
Liggande/Stående|Vätskelista|Avföring|Hud &
Förband|Kost|Vändschema|Psykiatri|Anteckningar|Uppgifter|Inskrivning|Klar|Markera Klar|Säng
Klar|Endast Väntande|Visa Alla|Håll Skärmen På|Per Säng|Per Modul",
g3: "Tid|Förfallotid|Luft|Tillfälle / Kontext|Andningsfrekvens (AF)|Syremättnad (SpO2%)|Luft /
Syrgas (O2)|Blodtryck (Sys / Dia)|Puls / Hjärtfrekvens (HF)|Temperatur|Vakenhet
(ACVPU)|Smärta|Smärtskala (0-10)|Näsgrimma|Mask|Venturimask|Blodsocker (P-Glukos)|Före
Frukost (Fastande)|Efter Frukost (2 tim)|Före Lunch|Efter Lunch (2 tim)|Före Middag|Efter
Middag (2 tim)|Vid Sänggående|Natt (02:00 - 04:00)|Slumpmässigt / Vid Symtom|Kontroll (Efter
Hypo-behandling)|Före Måltid|Efter Måltid|Natt|Hypo Behandlad|Ketoner
Kontrollerade|Rapporterat till SSK|Liggande|Stående|Inga Symtom|Yr / Svimmel|Kan Ej Stå",
g4: "Tillfört|Förluster|Balans|Totalt|Rensa|Våt Blöja / Skydd|Urin|Kateter
(KAD)|Avföring|Kräkning|Mängd|Konsistens / Avföringstyp (1-7)|Ingen Avföring (BNO)|Ingen
Avföring (BNO)|Metod|Liten|Måttlig|Stor|Spår|Hård — Typ 1 (Hårda separata klumpar)|Hård —
Typ 2 (Klumpig korvform)|Normal — Typ 3 (Korvform med sprickor)|Normal — Typ 4 (Slät och
mjuk)|Mjuk — Typ 5 (Mjuka klumpar)|Lös — Typ 6 (Grötig / mosig)|Flytande — Typ 7
(Vattnig)|Toalett|Toalettstol|Bäcken|Inkontinensskydd",
g5: "Sakrum|Ljumske|Hälar|Armbågar|Hel Hud|Röd (Avblekbar)|Röd (Ej Avblekbar)|Fuktskada
/ Exkorierad|Sår / Kavitet|Hudflikssår / Blåmärke|Torr / Skör|Markera Allt Helt|+ Lägg till
Kroppsdel|Höft|Fotled|Smalben / Ben|Fot / Tår|Arm / Underarm|Rygg / Ryggrad|Axel|Öra|Annan
Plats|Vänster|Höger|Båda|Barriärkräm|Lägesändrad / Avlastad|Hälavlastare /
Kuddar|Förband|Plats / Anteckningar|Nästa Byte|Datum Omlagt / Kontrollerat|Idag|Förfaller|Välj
Datum|1 Dag|2 Dagar|3 Dagar|5 Dagar|7 Dagar|Helt & Torrt|Bytt Idag|Genomslag /
Läckage|Lossnar|Frukost|Lunch|Middag|Näringsdryck / Mellanmål|Intagit|Avböjt|Fasta
(NBM)|Självständig|Med Hjälp|Uppmuntrad|Förtjockad Vätska",
g6: "Vändningsplan|Vändning var 2:a timme|Vändning var 3:e timme|Vändning var 4:e
timme|Vid Behov / Komfort|Självständig (Vänder sig själv)|Position|Ryggläge|Vänster
Sida|Höger Sida|Sitter i Fåtölj|Mobiliserar / Går|+ Logga Vändning / Position|Larmklocka inom
Räckhåll|Sänggrindar Uppe|Luftmadrass Kontrollerad|Tillsynsgrad|Grad 1: Allmän|Grad 2:
Intermittent|Grad 3: Inom Synhåll|Grad 4: Inom Armlängds Avstånd|Stämningsläge /
Beteende|Lugn & Samarbetsvillig|Orolig / Ångestfylld|Agiterad / Rastlös|Nedstämd /
Tillbakadragen|Förvirrad / Desorienterad|Högljudd / Ropar|Upprymd / Förhöjd|Fientlig /
Aggressiv|Plats / Aktivitet|Sover i Sängen|Vilar på Sängen|Sitter i Fåtölj|Vandrar / Går omkring|I
Badrum / Personlig Omvårdnad|I Dagrum|Har Besök|Försöker Lämna Avdelningen|Åtgärd / Klinisk Motivering|Rutinkontroll — Trygg & Lugn|1:1 Samtal & Lugnande Besked|Verbal
Deeskalering / Avledning|Återorienterad till Tid & Plats|Miljö Kontrollerad & Säker|Mat & Dryck
Uppmuntrad|Vid-behovs-läkemedel Givet|Rapporterat till SSK / Läkare|Övriga Anteckningar
(Valfritt)|Resultat / Åtgärd|Vikt (kg)|Längd (cm)|ID-band Kontrollerat|Hos Patienten|I
Avdelningsskåp|Skickat Hem",
acvpu: "A (Alert / Vaken)|C (Nyuppkommen Förvirring)|V (Reagerar på Tilltal)|P (Reagerar på
Smärta)|U (Reagerar Ej)",
phrases: "Personlig omvårdnad utförd|Tvättad & påklädd|Tryckpunkter hela|Mobiliserad till
fåtölj|Rapporterat till SSK|Anhöriga uppdaterade",
tasks: "Blodprov|EKG|Ta om Vitalparametrar|Blodsocker
(P-Glukos)|Bladderscan|PVK-kontroll",
admits: "Tandprotes|Glasögon|Hörapparat|Rollator / Käpp|Telefon &
Laddare|Nycklar|Kontanter / Plånbok",
drSites: "Sakrum|Vänster Häl|Höger Häl|Vänster Ben|Höger Ben|Buk"
});
// 8. Polski (pl)
_regLang('pl', {
g1: "Konfiguracja Dyżuru|W 100% offline'owy notatnik dyżurowy. Dane nigdy nie opuszczają
Twojego urządzenia.|Wyłącznie osobisty notatnik dyżurowy. Nie stanowi porady medycznej,
diagnozy ani wsparcia decyzji.|Odblokuj Care Digipad Pro (£9.99 Bezterminowo)|Odblokowuje
nielimitowane łóżka, układy oddziału, motywy, alarmy zadań i wszystkie moduły.|Wpisz klucz
licencyjny|Odblokuj|Uzyskaj bezterminowy klucz licencyjny →|Preferencje i
Jednostki|Motyw|Kliniczny Turkus|Medyczny Błękit|Szpitalna Zieleń|Śliwka i Jagoda|Nocny
Łupek|Ciepły Koral|Godziny Dyżuru|Dzień (07:00)|Noc (19:00)|Jednostka Glukozy|Jednostka
Temp.|Zapisane Układy Oddziału|Wybierz zapisany układ...|Twoje Łóżka Pacjentów (Maks. 4
znaki)|Dotknij łóżka poniżej, aby zaznaczyć (✓) lub odznaczyć na dzisiejszy dyżur:|Brak
dodanych łóżek. Wpisz numer łóżka lub inicjały powyżej i dotknij + Dodaj.|Dotknij co najmniej
jednego łóżka, aby zaznaczyć (✓) je na dzisiejszy dyżur.|+ Dodaj|Usuń|+ Zapisz Nowy|Aktywne
Moduły (Zaznacz, aby pokazać • Dotknij ▲ ▼, aby zmienić kolejność)|Lub zapisz jako nowy
układ (np. Noc)|⚙ Godziny Dyżuru, Jednostki i Moduły ▾|Rozpocznij Dyżur|Wybierz Łóżka, aby
Rozpocząć|Zapisz i Wróć do Dyżuru|Łóżko|Łóżka|Udostępnij Care Digipad
Współpracownikowi|Zakończ Dyżur / Wyczyść Dane|Edytuj|Ukryj|Ciemny|Ekran Ukryty|Dotknij
w dowolnym miejscu, aby wrócić do notatek",
g2: "Usunąć ten wpis?|Zarządzaj Łóżkiem|Zmień Nazwę Łóżka|Przenieś / Zamień
Pacjenta|Wpisz docelowe łóżko (maks. 4 znaki):|jest zajęte. Zamienić pacjentów? (Anuluj =
Nadpisz docelowe)|Wyczyść Łóżko (Wypis)|Wyczyścić wszystkie dane dyżurowe dla tego
łóżka?|Usuń Łóżko z Dyżuru|Usunąć to łóżko i jego dane z bieżącego dyżuru?|Zapisz
w|Zapisano w układzie|Dodaj Łóżko w Trakcie Dyżuru|Zapisane Łóżka Oddziału (Dotknij, aby
dodać):|Podsumowanie|Parametry|Glikemia|RR Leżąc/Stojąc|Bilans
Płynów|Wypróżnienia|Skóra i Opatrunki|Dieta|Zmiana Pozycji|Zdrowie
Psychiczne|Notatki|Zadania|Przyjęcia|Gotowe|Oznacz Gotowe|Łóżko Gotowe|Tylko
Oczekujące|Pokaż Wszystko|Nie Wygaszaj Ekranu|Wg Łóżka|Wg Modułu", g3: "Czas|Termin|Powietrze|Moment / Kontekst|Oddechy (RR)|Saturacja O2
(SpO2%)|Powietrze / Tlen (O2)|Ciśnienie Tętnicze (Sys / Dia)|Tętno / Akcja Serca
(HR)|Temperatura|Przytomność (ACVPU)|Ból|Skala Bólu (0-10)|Wąsy Tlenowe|Maska|Maska
Venturiego|Poziom Glukozy|Przed Śniadaniem (Na czczo)|Po Śniadaniu (2 godz.)|Przed
Obiadem|Po Obiedzie (2 godz.)|Przed Kolacją|Po Kolacji (2 godz.)|Przed Snem|W Nocy (02:00
- 04:00)|Przygodny / Objawowy|Kontrola (Po Hipoglikemii)|Przed Posiłkiem|Po Posiłku|W
Nocy|Hipo Zaopatrzona|Ketony Sprawdzone|Zgłoszono Pielęgniarce|Leżąc|Stojąc|Brak
Objawów|Zawroty Głowy|Nie Może Stać",
g4: "Przyjęte|Wydalone|Bilans|Razem|Wyczyść|Mokra Pielucha|Mocz
(Mikcja)|Cewnik|Stolec|Wymioty|Ilość|Konsystencja / Typ Stolca (1-7)|Brak Stolca (BNO)|Brak
Stolca (BNO)|Sposób|Mała|Średnia|Duża|Ślad|Twardy — Typ 1 (Oddzielne twarde
grudki)|Twardy — Typ 2 (Grudkowaty uformowany)|Prawidłowy — Typ 3 (Uformowany z
pęknięciami)|Prawidłowy — Typ 4 (Gładki i miękki)|Miękki — Typ 5 (Miękkie kawałki)|Luźny —
Typ 6 (Papkowaty)|Płynny — Typ 7 (Wodnisty)|Toaleta|Krzesło
Toaletowe|Basen|Pieluchomajtki",
g5: "Kość Krzyżowa|Pachwina|Pięty|Łokcie|Nieuszkodzona|Zaczerwienienie
(Blednące)|Zaczerwienienie (Nieblednące)|Uszkodzenie Wilgocią / Otarcie|Rana /
Ubytek|Rozdarcie Skóry / Zasiniaczenie|Sucha / Wrażliwa|Oznacz Wszystkie Nieuszkodzone|+
Dodaj Miejsce na Ciele|Biodro|Kostka|Podudzie / Noga|Stopa / Palce|Ramię / Przedramię|Plecy
/ Kręgosłup|Bark|Ucho|Inne Miejsce|Lewa|Prawa|Obie|Krem Barierowy|Zmieniono Pozycję /
Odciążono|Krążki na Pięty / Poduszki|Opatrunek|Lokalizacja / Uwagi|Następna Zmiana|Data
Założenia / Kontroli|Dzisiaj|Termin|Wybierz Datę|1 Dzień|2 Dni|3 Dni|5 Dni|7 Dni|Czysty i
Suchy|Zmieniony Dzisiaj|Przemoczony / Wyciek|Odkleja
się|Śniadanie|Obiad|Kolacja|Suplementy / Przekąski|Przyjęto|Odmowa|Na Czczo
(NBM)|Samodzielnie|Z Pomocą|Z Zachętą|Zagęszczone Płyny",
g6: "Plan Zmiany Pozycji|Zmiana Pozycji co 2 godz.|Zmiana Pozycji co 3 godz.|Zmiana Pozycji
co 4 godz.|W Razie Potrzeby / Dla Komfortu|Samodzielny (Obraca się sam)|Pozycja|Na
Plecach|Lewy Bok|Prawy Bok|W Fotelu|Chodzenie / Mobilizacja|+ Zapisz Zmianę
Pozycji|Dzwonek w Zasięgu Ręki|Barierki Podniesione|Materac Przeciwodleżynowy
Sprawdzony|Poziom Obserwacji|Poziom 1: Ogólny|Poziom 2: Okresowy|Poziom 3: W Zasięgu
Wzroku|Poziom 4: Na Wyciągnięcie Ręki|Nastrój / Zachowanie|Spokojny i
Współpracujący|Lękowy / Zaniepokojony|Pobudzony / Niespokojny|Obniżony /
Wycofany|Splątany / Zdezorientowany|Głośny / Wołający|Podwyższony / Euforyczny|Wrogi /
Agresywny|Miejsce / Aktywność|Śpi w Łóżku|Odpoczywa w Łóżku|Siedzi w Fotelu|Chodzi po
Oddziale|W Łazience / Toaleta Ciała|W Sali Dziennej|U Odwiedzających|Próbuje Wyjść z
Oddziału|Interwencja / Uzasadnienie Kliniczne|Rutynowa Kontrola — Bezpieczny i
Spokojny|Rozmowa 1:1 i Uspokojenie|Słowna Deeskalacja / Przekierowanie
Uwagi|Zorientowany co do Czasu i Miejsca|Otoczenie Sprawdzone i Bezpieczne|Zachęcono do
Jedzenia i Picia|Podano Leki Doraźne (PRN)|Zgłoszono Pielęgniarce / Lekarzowi|Dodatkowe
Notatki (Opcjonalnie)|Wynik / Działanie|Masa Ciała (kg)|Wzrost (cm)|Opaska Identyfikacyjna
Sprawdzona|Przy Pacjencie|W Depozycie Oddziałowym|Oddano do Domu",
acvpu: "A (Przytomny / Alert)|C (Nowe Splątanie)|V (Reaguje na Głos)|P (Reaguje na Ból)|U
(Nieprzytomny)", phrases: "Wykonano toaletę ciała|Umyty i przebrany|Miejsca ucisku bez zmian|Posadzony w
fotelu|Zgłoszono pielęgniarce|Rodzina poinformowana",
tasks: "Pobranie Krwi|EKG|Powtórzyć Parametry|Glikemia (BM)|USG Pęcherza|Kontrola
Wenflonu",
admits: "Proteza Zębowa|Okulary|Aparat Słuchowy|Chodzik / Laska|Telefon i
Ładowarka|Klucze|Gotówka / Portfel",
drSites: "Kość Krzyżowa|Lewa Pięta|Prawa Pięta|Lewa Noga|Prawa Noga|Brzuch"
});
// 9. Română (ro)
_regLang('ro', {
g1: "Configurare Tură|Carnet digital de tură 100% offline. Datele nu părăsesc niciodată
dispozitivul.|Doar carnet personal de notițe. Nu oferă sfaturi medicale, diagnostic sau suport
decizional.|Deblocare Care Digipad Pro (£9.99 Pe Viață)|Deblochează paturi nelimitate,
configurații de secție, teme, alarme și toate modulele.|Introduceți cheia de
licență|Deblocare|Obțineți o Cheie de Licență pe Viață →|Preferințe și Unități|Temă|Turcoaz
Clinic|Albastru Medical|Verde Chirurgical|Prună și Fructe de Pădure|Ardezie de Noapte|Coral
Cald|Program Tură|Zi (07:00)|Noapte (19:00)|Unitate Glicemie|Unitate Temp.|Configurații Secție
Salvate|Selectați o configurație...|Paturile Pacienților Dvs. (Max 4 car.)|Atingeți un pat mai jos
pentru a-l selecta (✓) sau deselecta pentru tura de azi:|Niciun pat adăugat. Scrieți numărul sau
inițialele mai sus și atingeți + Adaugă.|Vă rugăm să atingeți cel puțin un pat pentru a-l selecta
(✓) pentru tura de azi.|+ Adaugă|Șterge|+ Salvează Nou|Module Active (Bifați pentru afișare •
Atingeți ▲ ▼ pentru reordonare)|Sau salvați ca aspect nou (ex. Noapte)|⚙ Program Tură,
Unități și Module Active ▾|Începe Tura|Selectați Paturi pentru a Începe|Salvează și Revino la
Tură|Pat|Paturi|Distribuie Care Digipad unui Coleg|Sfârșit de Tură / Șterge
Datele|Editează|Ascunde|Întunecat|Ecran Ascuns|Atingeți oriunde pentru a reveni la notițele de
tură",
g2: "Ștergeți această înregistrare?|Gestionare Pat|Redenumire Pat|Transfer / Schimb de
Pacienți|Introduceți patul destinație (max 4 car.):|este ocupat. Schimbați pacienții între ei?
(Anulare = Suprascrie destinația)|Eliberare Pat (Externare)|Ștergeți toate datele din tură pentru
acest pat?|Elimină Patul din Tură|Eliminați acest pat și datele sale din tură?|Salvează în|Salvat
în configurație|Adaugă Pat în Tură|Paturi Salvate pe Secție (Atingeți pentru
adăugare):|Sumar|Funcții Vitale|Glicemie|TA Culcat/În Picioare|Bilanț Hidric|Scaun|Tegumente
și Pansamente|Dietă|Mobilizare|Sănătate Mintală|Notițe|Sarcini|Internări|Gata|Marchează
Gata|Pat Finalizat|Doar în Așteptare|Arată Tot|Ecran Pornit|După Pat|După Modul",
g3: "Ora|Ora Scadentă|Aer Ambiental|Moment / Context|Respirație (FR)|Saturație O2
(SpO2%)|Aer / Oxigen (O2)|Tensiune Arterială (Sis / Dia)|Puls / Alură Ventriculară
(AV)|Temperatură|Stare de Conștiență (ACVPU)|Durere|Scor Durere (0-10)|Canulă
Nazală|Mască|Venturi|Glicemie Capilară|Înainte de Micul Dejun (À jeun)|După Micul Dejun
(2h)|Înainte de Prânz|După Prânz (2h)|Înainte de Cină|După Cină (2h)|La Culcare|Noaptea
(02:00 - 04:00)|Aleatoriu / Simptomatic|Repetare (Post-Hipoglicemie)|Înainte de Masă|După
Masă|Noaptea|Hipo Tratată|Cetone Verificate|Anunțat Asistentul (RN)|Culcat|În Picioare|Fără
Simptome|Amețit / Vertij|Nu Poate Sta în Picioare",
g4: "Intrări|Ieșiri|Bilanț|Total|Șterge|Pampers Ud|Urină (Micțiune)|Sondă
Urinară|Scaun|Vărsături|Cantitate|Consistență / Tip Scaun (1-7)|Fără Scaun (BNO)|Fără Scaun (BNO)|Metodă|Mică|Medie|Mare|Urme|Tare — Tip 1 (Fragmente tari separate)|Tare — Tip 2
(Formă de cârnat nodular)|Normal — Tip 3 (Formă de cârnat cu fisuri)|Normal — Tip 4 (Neted și
moale)|Moale — Tip 5 (Fragmente moi)|Semiconsistent — Tip 6 (Păstos)|Lichid — Tip 7
(Apos)|Toaletă|Comodă|Ploscă / Bazinet|Pampers (Incontinent)",
g5: "Sacru|Inghinal|Călcâie|Coate|Intact|Roșu (Albire la presiune)|Roșu (Fără albire la
presiune)|Leziune de Umiditate / Excoriație|Leziune Deschisă / Cavitate|Dilacerare Cutanată /
Echimoze|Uscat / Fragil|Marchează Tot Intact|+ Adaugă Zonă Corporală|Șold|Gleznă|Gambă /
Picior|Picior / Degete|Braț / Antebraț|Spate / Coloană|Umăr|Ureche|Altă
Zonă|Stânga|Dreapta|Ambele|Cremă Barieră|Repoziționat / Descărcat de Presiune|Botoși
Protecție / Perne|Pansament|Localizare / Notițe|Următorul Schimb|Data Aplicării /
Verificării|Azi|Scadent|Selectează Data|1 Zi|2 Zile|3 Zile|5 Zile|7 Zile|Intact și Uscat|Schimbat
Azi|Pătat / Scurgeri|Dezlipit|Mic Dejun|Prânz|Cină|Suplimente /
Gustări|Consumate|Refuzat|Repaus Alimentar (NBM)|Independent|Asistat|Încurajat|Lichide
Îngroșate",
g6: "Plan de Repoziționare|Repoziționare la 2 Ore|Repoziționare la 3 Ore|Repoziționare la 4
Ore|La Nevoie / Doar Confort|Independent (Se întoarce singur)|Poziție|Spate (Decubit
Dorsal)|Partea Stângă|Partea Dreaptă|Așezat în Fotoliu|Mobilizare / Mers|+ Înregistrează
Poziția|Sonerie la Îndemână|Laterale Pat Ridicate|Saltea Antiescare Verificată|Nivel de
Observație|Nivel 1: General|Nivel 2: Intermitent|Nivel 3: În Câmpul Vizual|Nivel 4: La o Lungime
de Braț|Dispoziție / Prezentare|Calm și Cooperant|Anxios / Neliniștit|Agitat|Apathic /
Retras|Confuz / Dezorientat|Vocal / Strigă|Euforic / Exaltat|Ostil / Agresiv|Locație /
Activitate|Doarme în Pat|Se Odihnește în Pat|Stă în Fotoliu|Se Plimbă / Agitat|În Baie / Îngrijire
Personală|În Spațiul Comun|Cu Vizitatori|Încearcă să Plece|Intervenție / Justificare
Clinică|Verificare de Rutină — Sigur și Liniștit|Discuție 1:1 și Liniștire|Dezescaladare Verbală /
Redirecționare|Reorientat în Timp și Spațiu|Mediu Verificat și Sigur|Încurajat Consumul de
Alimente și Lichide|Medicație La Nevoie (PRN) Administrată|Anunțat Asistentul Șef /
Medicul|Notițe Suplimentare (Opțional)|Rezultat / Acțiune|Greutate (kg)|Înălțime (cm)|Brățară de
Identificare Verificată|La Pacient|În Seiful Secției|Trimis Acasă",
acvpu: "A (Alert)|C (Confuzie Nouă)|V (Răspunde la Voce)|P (Răspunde la Durere)|U
(Inconștient)",
phrases: "Îngrijiri igienice efectuate|Spălat și îmbrăcat|Zone de presiune intacte|Mobilizat în
fotoliu|Anunțat asistentul medical|Familia informată",
tasks: "Analize de Sânge|ECG|Repetare Funcții Vitale|Glicemie (BM)|Ecografie
Vezicală|Verificare Branulă",
admits: "Proteză Dentară|Ochelari|Aparat Auditiv|Cadru de Mers / Baston|Telefon și
Încărcător|Chei|Bani / Portofel",
drSites: "Sacru|Călcâi Stâng|Călcâi Drept|Picior Stâng|Picior Drept|Abdomen"
});
// 10. Українська (uk)
_regLang('uk', {
g1: "Налаштування Зміни|100% автономний цифровий блокнот зміни. Дані ніколи не
залишають ваш пристрій.|Лише особистий блокнот. Не надає клінічних порад, діагнозів чи
підтримки рішень.|Розблокувати Care Digipad Pro (£9.99 Назавжди)|Розблоковує необмежені ліжка, збережені палати, теми, будильники завдань та всі модулі.|Введіть
ліцензійний ключ|Розблокувати|Отримати довічний ключ ліцензії →|Налаштування та
Одиниці|Тема|Клінічний Бірюзовий|Медичний Синій|Хірургічний Зелений|Слива та
Ягода|Нічний Сланець|Теплий Корал|Години Зміни|День (07:00)|Ніч (19:00)|Одиниця
Глюкози|Одиниця Темп.|Збережені Схеми Відділення|Оберіть збережену схему...|Ліжка
Пацієнтів (Макс. 4 симв.)|Натисніть на ліжко нижче, щоб вибрати (✓) або скасувати вибір
на сьогодні:|Ліжка ще не додані. Введіть номер або ініціали вище та натисніть +
Додати.|Будь ласка, виберіть (✓) принаймні одне ліжко для сьогоднішньої зміни.|+
Додати|Вид.|+ Зберегти Нову|Активні Модулі (Позначте для показу • ▲ ▼ для
сортування)|Або зберегти як нову схему (напр. Ніч)|⚙ Години Зміни, Одиниці та Активні
Модулі ▾|Почати Зміну|Оберіть Ліжка для Початку|Зберегти та
Повернутися|Ліжко|Ліжка|Поділитися Care Digipad з Колегою|Завершити Зміну / Очистити
Дані|Редаг.|Сховати|Темна|Екран Приховано|Натисніть будь-де, щоб повернутися до
записів",
g2: "Видалити цей запис?|Керування Ліжком|Перейменувати Ліжко|Перевести / Обміняти
Пацієнта|Введіть цільове ліжко (макс. 4 симв.):|зайняте. Поміняти пацієнтів місцями?
(Скасувати = Перезаписати)|Очистити Ліжко (Виписка)|Очистити всі дані зміни для цього
ліжка?|Видалити Ліжко зі Зміни|Видалити це ліжко та його дані зі зміни?|Зберегти
у|Збережено у схемі|Додати Ліжко у Зміну|Збережені Ліжка Відділення (Натисніть для
додавання):|Підсумок|Показники|Глюкоза|АТ
Лежачи/Стоячи|Гідробаланс|Випорожнення|Шкіра та Пов'язки|Дієта|Повороти|Психічний
Стан|Нотатки|Завдання|Надходження|Готово|Позначити Готово|Ліжко Готово|Лише
Очікуючі|Показати Все|Не Вимикати Екран|За Ліжком|За Модулем",
g3: "Час|Час Виконання|Повітря|Коли Взято / Контекст|Дихання (ЧД)|Сатурація O2
(SpO2%)|Повітря / Кисень (O2)|Артеріальний Тиск (Сис / Діа)|Пульс / ЧСС
(HR)|Температура|Свідомість (ACVPU)|Біль|Шкала Болю (0-10)|Носова
Канюля|Маска|Маска Вентурі|Глюкоза Крові|До Сніданку (Натще)|Після Сніданку (через 2
год)|До Обіду|Після Обіду (через 2 год)|До Вечері|Після Вечері (через 2 год)|Перед
Сном|Вночі (02:00 - 04:00)|Випадковий / При Симптомах|Повторно (Після Гіпоглікемії)|До
Їжі|Після Їжі|Ніч|Гіпо Купірувано|Кетони Перевірено|Повідомлено
Медсестру|Лежачи|Стоячи|Без Симптомів|Запаморочення|Не Може Стояти",
g4: "Введено|Виділено|Баланс|Всього|Очистити|Мокрий
Підгузок|Сеча|Катетер|Випорожнення|Блювання|Кількість|Консистенція / Тип Калу
(1-7)|Випорожнень Не Було (BNO)|Випорожнень Не Було
(BNO)|Метод|Мала|Середня|Велика|Мазок|Твердий — Тип 1 (Окремі тверді
грудки)|Твердий — Тип 2 (Грудкуватий)|Нормальний — Тип 3 (З тріщинами на
поверхні)|Нормальний — Тип 4 (Гладкий і м'який)|М'який — Тип 5 (М'які
шматочки)|Кашкоподібний — Тип 6 (Неоформлений)|Рідкий — Тип 7
(Водянистий)|Туалет|Крісло-туалет|Судно|Підгузок (Нетримання)",
g5: "Крижі|Пах|П'яти|Лікті|Цілісна|Почервоніння (Блідне при натисканні)|Почервоніння (Не
блідне)|Вологісне Ураження / Мацерація|Пошкоджена / Порожнина|Розрив Шкіри /
Гематома|Суха / Вразлива|Позначити Все Цілісним|+ Додати Ділянку
Тіла|Стегно|Кісточка|Гомілка / Нога|Стопа / Пальці|Рука / Передпліччя|Спина /
Хребет|Плече|Вухо|Інша Ділянка|Ліва|Права|Обидві|Бар'єрний Крем|Змінено Положення / Розвантажено|Протипролежневі Чобітки / Подушки|Пов'язка|Місце / Нотатки|Наступна
Заміна|Дата Накладання / Огляду|Сьогодні|Термін|Оберіть Дату|1 День|2 Дні|3 Дні|5 Днів|7
Днів|Ціла та Суха|Змінено Сьогодні|Протікання /
Промокання|Відклеюється|Сніданок|Обід|Вечеря|Додаткове Харчування /
Перекус|Прийнято|Відмова|Нічого Через Рот (NBM)|Самостійно|З Допомогою|З
Підказкою|Загущені Рідини",
g6: "План Зміни Положення|Повороти Кожні 2 Години|Повороти Кожні 3 Години|Повороти
Кожні 4 Години|За Потреби / Для Комфорту|Самостійно (Повертається сам)|Положення|На
Спині|Лівий Бік|Правий Бік|Сидить у Кріслі|Ходьба / Мобілізація|+ Записати Поворот /
Положення|Кнопка Виклику Доступна|Бортики Ліжка Підняті|Протипролежневий Матрац
Перевірено|Рівень Спостереження|Рівень 1: Загальний|Рівень 2: Періодичний|Рівень 3: У
Полі Зору|Рівень 4: На Відстані Витягнутої Руки|Настрій / Поведінка|Спокійний та
Контактний|Тривожний / Схвильований|Збуджений / Неспокійний|Пригнічений /
Замкнений|Сплутаний / Дезорієнтований|Голосний / Кличе|Піднесений|Ворожий /
Агресивний|Місце / Активність|Спить у Ліжку|Відпочиває у Ліжку|Сидить у Кріслі|Ходить по
Палаті|У Ванній / Гігієна|У Загальній Кімнаті|З Відвідувачами|Намагається Піти з
Відділення|Втручання / Клінічне Обґрунтування|Планова Перевірка — Безпечно і
Спокійно|Індивідуальна Бесіда та Заспокоєння|Вербальна Деескалація / Переключення
Уваги|Зорієнтовано у Часі та Просторі|Оточення Перевірено та Безпечне|Заохочено до Їжі
та Пиття|Введено Препарат За Потреби (PRN)|Повідомлено Старшу Медсестру /
Лікаря|Додаткові Нотатки (Необов'язково)|Результат / Дія|Вага (кг)|Зріст
(см)|Ідентифікаційний Браслет Перевірено|У Пацієнта|У Сейфі Відділення|Відправлено
Додому",
acvpu: "A (Притомний / Alert)|C (Нова Сплутаність)|V (Реагує на Голос)|P (Реагує на
Біль)|U (Не Реагує)",
phrases: "Проведено особисту гігієну|Умитий та одягнений|Точки тиску
неушкоджені|Пересаджений у крісло|Повідомлено медсестру|Родину поінформовано",
tasks: "Аналіз Крові|ЕКГ|Повторити Показники|Глюкоза Крові (BM)|УЗД Сечового
Міхура|Перевірка Катетера",
admits: "Зубні Протези|Окуляри|Слуховий Апарат|Ходунки / Тростина|Телефон і
Зарядка|Ключі|Готівка / Гаманець",
drSites: "Крижі|Ліва П'ята|Права П'ята|Ліва Нога|Права Нога|Живіт"
});
// 11. Русский (ru)
_regLang('ru', {
g1: "Настройка Смены|100% автономный цифровой блокнот смены. Данные никогда не
покидают ваше устройство.|Только личный блокнот для записей. Не дает клинических
советов, диагнозов или поддержки решений.|Разблокировать Care Digipad Pro (£9.99
Навсегда)|Открывает безлимит коек, сохраненные палаты, темы, сигналы задач и все
спецмодули.|Введите лицензионный ключ|Разблокировать|Получить пожизненный ключ
лицензии →|Настройки и Единицы|Тема|Клинический Бирюзовый|Медицинский
Синий|Хирургический Зеленый|Слива и Ягода|Ночной Сланец|Теплый Коралл|Часы
Смены|День (07:00)|Ночь (19:00)|Единица Глюкозы|Единица Темп.|Сохраненные Схемы Отделения|Выберите сохраненную схему...|Койки Пациентов (Макс. 4 симв.)|Нажмите на
койку ниже, чтобы выбрать (✓) или отменить выбор на смену:|Койки еще не добавлены.
Введите номер или инициалы выше и нажмите + Добавить.|Пожалуйста, выберите (✓)
хотя бы одну койку для сегодняшней смены.|+ Добавить|Удал.|+ Сохранить
Новую|Активные Модули (Отметьте для показа • ▲ ▼ для сортировки)|Или сохранить как
новую схему (напр. Ночь)|⚙ Часы Смены, Единицы и Активные Модули ▾|Начать
Смену|Выберите Койки для Начала|Сохранить и Вернуться|Койка|Койки|Поделиться Care
Digipad с Коллегой|Завершить Смену / Очистить Данные|Изменить|Скрыть|Темная|Экран
Скрыт|Нажмите в любом месте, чтобы вернуться к записям",
g2: "Удалить эту запись?|Управление Койкой|Переименовать Койку|Перевести /
Поменять Пациента|Введите целевую койку (макс. 4 симв.):|занята. Поменять пациентов
местами? (Отмена = Перезаписать)|Очистить Койку (Выписка)|Очистить все данные
смены для этой койки?|Удалить Койку из Смены|Удалить эту койку и её данные из
текущей смены?|Сохранить в|Сохранено в схеме|Добавить Койку в Смену|Сохраненные
Койки Отделения (Нажмите для добавления):|Сводка|Показатели|Глюкоза|АД
Лежа/Стоя|Гидробаланс|Стул|Кожа и Повязки|Питание|Повороты|Психическое
Состояние|Заметки|Задачи|Поступление|Готово|Отметить Готово|Койка Готова|Только
Ожидающие|Показать Все|Не Гасить Экран|По Койкам|По Модулям",
g3: "Время|Срок|Воздух|Время Забора / Контекст|Дыхание (ЧДД)|Сатурация O2
(SpO2%)|Воздух / Кислород (O2)|Артериальное Давление (Сис / Диа)|Пульс / ЧСС
(HR)|Температура|Сознание (ACVPU)|Боль|Шкала Боли (0-10)|Носовая
Канюля|Маска|Маска Вентури|Глюкоза Крови|До Завтрака (Натощак)|После Завтрака
(через 2 ч)|До Обеда|После Обеда (через 2 ч)|До Ужина|После Ужина (через 2 ч)|Перед
Сном|Ночью (02:00 - 04:00)|Случайный / При Симптомах|Повторно (После
Гипогликемии)|До Еды|После Еды|Ночь|Гипо Купирована|Кетоны Проверены|Сообщено
Медсестре|Лежа|Стоя|Без Симптомов|Головокружение|Не Может Стоять",
g4: "Введено|Выделено|Баланс|Всего|Очистить|Мокрый
Подгузник|Моча|Катетер|Стул|Рвота|Количество|Консистенция / Тип Стула (1-7)|Стула Не
Было (BNO)|Стула Не Было (BNO)|Метод|Малое|Среднее|Большое|Мазок|Твердый — Тип
1 (Отдельные твердые комки)|Твердый — Тип 2 (Комковатый оформленный)|Нормальный
— Тип 3 (С трещинами на поверхности)|Нормальный — Тип 4 (Гладкий и мягкий)|Мягкий
— Тип 5 (Мягкие комочки)|Кашицеобразный — Тип 6 (Неоформленный)|Жидкий — Тип 7
(Водянистый)|Туалет|Кресло-туалет|Судно|Подгузник (Недержание)",
g5: "Крестец|Пах|Пятки|Локти|Целостная|Покраснение (Бледнеющее)|Покраснение
(Небледнеющее)|Влажностное Повреждение / Мацерация|Повреждена / Полость|Разрыв
Кожи / Гематома|Сухая / Хрупкая|Отметить Все Целостным|+ Добавить Участок
Тела|Бедро|Лодыжка|Голень / Нога|Стопа / Пальцы|Рука / Предплечье|Спина /
Позвоночник|Плечо|Ухо|Другой Участок|Левая|Правая|Обе|Барьерный Крем|Повернут /
Разгружен|Защита Пяток / Подушки|Повязка|Место / Заметки|Следующая Смена|Дата
Наложения / Осмотра|Сегодня|Срок|Выберите Дату|1 День|2 Дня|3 Дня|5 Дней|7
Дней|Целая и Сухая|Сменена Сегодня|Протекание /
Промокание|Отклеивается|Завтрак|Обед|Ужин|Доп. Питание /
Перекус|Принято|Отказ|Голод / Ничего Через Рот (NBM)|Самостоятельно|С Помощью|С
Побуждением|Загущенные Жидкости", g6: "План Смены Положения|Повороты Каждые 2 Часа|Повороты Каждые 3
Часа|Повороты Каждые 4 Часа|По Необходимости / Для Комфорта|Самостоятельно
(Поворачивается сам)|Положение|На Спине|Левый Бок|Правый Бок|Сидит в
Кресле|Ходьба / Мобилизация|+ Записать Поворот / Положение|Кнопка Вызова в
Доступе|Бортики Кровати Подняты|Противопролежневый Матрас Проверен|Уровень
Наблюдения|Уровень 1: Общий|Уровень 2: Периодический|Уровень 3: В Поле
Зрения|Уровень 4: На Расстоянии Вытянутой Руки|Настроение / Поведение|Спокойный и
Контактный|Тревожный / Обеспокоенный|Возбужденный / Беспокойный|Подавленный /
Замкнутый|Спутанный / Дезориентированный|Голосистый / Зовет|Приподнятый /
Эйфоричный|Враждебный / Агрессивный|Место / Активность|Спит в Кровати|Отдыхает в
Кровати|Сидит в Кресле|Ходит по Палате|В Ванной / Гигиена|В Общей Зоне|С
Посетителями|Пытается Уйти из Отделения|Вмешательство / Клиническое
Обоснование|Плановая Проверка — Безопасно и Спокойно|Индивидуальная Беседа и
Успокоение|Вербальная Деэскалация / Переключение Внимания|Ориентирован во
Времени и Месте|Окружение Проверено и Безопасно|Поощрены Прием Пищи и
Жидкости|Даны Препараты По Необходимости (PRN)|Сообщено Старшей Медсестре /
Врачу|Дополнительные Заметки (Необязательно)|Результат / Действие|Вес (кг)|Рост
(см)|Идентификационный Браслет Проверен|У Пациента|В Сейфе Отделения|Отправлено
Домой",
acvpu: "A (Ясное / Alert)|C (Новая Спутанность)|V (Реагирует на Голос)|P (Реагирует на
Боль)|U (Не Реагирует)",
phrases: "Проведена личная гигиена|Умыт и одет|Точки давления без
изменений|Пересажен в кресло|Сообщено медсестре|Семья проинформирована",
tasks: "Анализ Крови|ЭКГ|Повторить Показатели|Глюкоза Крови (BM)|УЗИ Мочевого
Пузыря|Проверка Катетера",
admits: "Зубные Протезы|Очки|Слуховой Апарат|Ходунки / Трость|Телефон и
Зарядка|Ключи|Наличные / Кошелек",
drSites: "Крестец|Левая Пятка|Правая Пятка|Левая Нога|Правая Нога|Живот"
});
// 12. Ελληνικά (el)
_regLang('el', {
g1: "Ρύθμιση Βάρδιας|100% offline ψηφιακό σημειωματάριο βάρδιας. Τα δεδομένα δεν
φεύγουν ποτέ από τη συσκευή σας.|Μόνο προσωπικό σημειωματάριο βάρδιας. Δεν παρέχει
ιατρικές συμβουλές, διάγνωση ή υποστήριξη αποφάσεων.|Ξεκλείδωμα Care Digipad Pro (£9.99
Εφ' όρου ζωής)|Ξεκλειδώνει απεριόριστες κλίνες, διατάξεις θαλάμων, θέματα, ειδοποιήσεις και
όλες τις ενότητες.|Εισάγετε κωδικό άδειας|Ξεκλείδωμα|Αποκτήστε Κωδικό Άδειας Εφ' όρου ζωής
→|Προτιμήσεις & Μονάδες|Θέμα|Κλινικό Πετρόλ|Νοσηλευτικό Μπλε|Χειρουργικό
Πράσινο|Δαμάσκηνο & Μούρο|Νυχτερινό Γκρι|Θερμό Κοραλλί|Ωράριο Βάρδιας|Ημέρα
(07:00)|Νύχτα (19:00)|Μονάδα Γλυκόζης|Μονάδα Θερμ.|Αποθηκευμένες Διατάξεις
Κλινικής|Επιλέξτε αποθηκευμένη διάταξη...|Οι Κλίνες Ασθενών Σας (Μέγ. 4 χαρ.)|Πατήστε μια
κλίνη παρακάτω για επιλογή (✓) ή αποεπιλογή για τη σημερινή βάρδια:|Δεν προστέθηκαν
κλίνες. Πληκτρολογήστε αριθμό ή αρχικά πάνω και πατήστε + Προσθήκη.|Πατήστε τουλάχιστον
μία κλίνη για να την επιλέξετε (✓) για τη σημερινή βάρδια.|+ Προσθήκη|Διαγρ.|+ Αποθήκευση Νέας|Ενεργές Ενότητες (Επιλέξτε για εμφάνιση • Πατήστε ▲ ▼ για σειρά)|Ή αποθήκευση ως
νέα διάταξη (π.χ. Νύχτα)|⚙ Ωράριο, Μονάδες & Ενεργές Ενότητες ▾|Έναρξη Βάρδιας|Επιλέξτε
Κλίνες για Έναρξη|Αποθήκευση & Επιστροφή στη Βάρδια|Κλίνη|Κλίνες|Κοινοποίηση Care
Digipad σε Συνάδελφο|Τέλος Βάρδιας / Διαγραφή Δεδομένων|Επεξ.|Απόκρυψη|Σκούρο|Οθόνη
Κρυφή|Πατήστε οπουδήποτε για επιστροφή στις σημειώσεις",
g2: "Διαγραφή αυτής της εγγραφής;|Διαχείριση Κλίνης|Μετονομασία Κλίνης|Μεταφορά /
Ανταλλαγή Ασθενούς|Εισάγετε κλίνη προορισμού (μέγ. 4 χαρ.):|είναι κατειλημμένη. Ανταλλαγή
ασθενών; (Ακύρωση = Αντικατάσταση προορισμού)|Καθαρισμός Κλίνης (Εξιτήριο)|Διαγραφή
όλων των δεδομένων βάρδιας για αυτή την κλίνη;|Αφαίρεση Κλίνης από τη Βάρδια|Αφαίρεση
αυτής της κλίνης και των δεδομένων της από τη βάρδια;|Αποθήκευση σε|Αποθηκεύτηκε στη
διάταξη|Προσθήκη Κλίνης στη Βάρδια|Αποθηκευμένες Κλίνες (Πατήστε για
προσθήκη):|Σύνοψη|Ζωτικά|Γλυκόζη|ΑΠ Ύπτια/Όρθια|Ισοζύγιο Υγρών|Κενώσεις|Δέρμα &
Επιθέματα|Δίαιτα|Αλλαγή Θέσης|Ψυχική Υγεία|Σημειώσεις|Εργασίες|Εισαγωγές|Έγινε|Σήμανση
Έγινε|Κλίνη Έτοιμη|Μόνο Εκκρεμή|Εμφάνιση Όλων|Οθόνη Ανοιχτή|Ανά Κλίνη|Ανά Ενότητα",
g3: "Ώρα|Ώρα Εκτέλεσης|Αέρας|Πότε Λήφθηκε / Πλαίσιο|Αναπνοές (RR)|Κορεσμός Οξυγόνου
(SpO2%)|Αέρας / Οξυγόνο (O2)|Αρτηριακή Πίεση (Συσ / Δια)|Σφύξεις / Καρδιακός Ρυθμός
(HR)|Θερμοκρασία|Εγρήγορση (ACVPU)|Πόνος|Κλίμακα Πόνου (0-10)|Ρινική
Κάνουλα|Μάσκα|Μάσκα Venturi|Γλυκόζη Αίματος|Πριν το Πρωινό (Νηστείας)|Μετά το Πρωινό (2
ώρες)|Πριν το Μεσημεριανό|Μετά το Μεσημεριανό (2 ώρες)|Πριν το Βραδινό|Μετά το Βραδινό (2
ώρες)|Πριν τον Ύπνο|Νύχτα (02:00 - 04:00)|Τυχαία / Συμπτωματική|Επανάληψη (Μετά από
Υπογλυκαιμία)|Πριν το Γεύμα|Μετά το Γεύμα|Νύχτα|Υπογλυκαιμία Αντιμετωπίστηκε|Κετόνες
Ελέγχθηκαν|Ενημερώθηκε Νοσηλευτής|Ύπτια|Όρθια|Χωρίς Συμπτώματα|Ζάλη /
Αστάθεια|Αδυναμία Ορθοστάτησης",
g4: "Προσλαμβανόμενα|Αποβαλλόμενα|Ισοζύγιο|Σύνολο|Καθαρισμός|Βρεγμένη Πάνα|Ούρα
(Ούρηση)|Καθετήρας|Κενώσεις|Έμετος|Ποσότητα|Σύσταση / Τύπος Κοπράνων (1-7)|Χωρίς
Κένωση (BNO)|Χωρίς Κένωση (BNO)|Μέθοδος|Μικρή|Μέτρια|Μεγάλη|Ίχνη|Σκληρά — Τύπος 1
(Ξεχωριστοί σκληροί σβώλοι)|Σκληρά — Τύπος 2 (Σβωλιαστό λουκάνικο)|Φυσιολογικά — Τύπος
3 (Με ρωγμές στην επιφάνεια)|Φυσιολογικά — Τύπος 4 (Λεία και μαλακά)|Μαλακά — Τύπος 5
(Μαλακά κομμάτια)|Χαλαρά — Τύπος 6 (Πολτώδη)|Υγρά — Τύπος 7 (Υδαρή)|Τουαλέτα|Καρέκλα
Κομοδίνο|Σκωραμίδα|Πάνα (Ακράτεια)",
g5: "Ιερό Οστό|Βουβωνική Χώρα|Πτέρνες|Αγκώνες|Ακέραιο|Ερυθρό (Λευκάζει στην
πίεση)|Ερυθρό (Δεν λευκάζει)|Βλάβη Υγρασίας / Εξελκωμένο|Λύση Συνεχείας / Κοιλότητα|Σχάση
Δέρματος / Εκχύμωση|Ξηρό / Εύθραυστο|Σήμανση Όλων Ακέραια|+ Προσθήκη Σημείου
Σώματος|Ισχίο|Αστράγαλος|Κνήμη / Πόδι|Άκρος Πούς / Δάκτυλα|Βραχίονας / Αντιβράχιο|Πλάτη /
Σπονδυλική Στήλη|Ώμος|Αυτί|Άλλο Σημείο|Αριστερά|Δεξιά|Και τα Δύο|Κρέμα Φραγμού|Αλλαγή
Θέσης / Αποφόρτιση|Προστατευτικά Πτέρνας / Μαξιλάρια|Επίθεμα|Θέση / Σημειώσεις|Επόμενη
Αλλαγή|Ημερομηνία Εφαρμογής / Ελέγχου|Σήμερα|Λήξη|Επιλογή Ημερομηνίας|1 Ημέρα|2
Ημέρες|3 Ημέρες|5 Ημέρες|7 Ημέρες|Ακέραιο & Στεγνό|Αλλάχθηκε Σήμερα|Διαρροή /
Εξίδρωμα|Ξεκολλάει|Πρωινό|Μεσημεριανό|Βραδινό|Συμπληρώματα /
Σνακ|Λήφθηκε|Αρνήθηκε|Τίποτα από το Στόμα (NBM)|Αυτόνομα|Με Βοήθεια|Με
Προτροπή|Πυκνωμένα Υγρά",
g6: "Πλάνο Αλλαγής Θέσεων|Αλλαγή Θέσης ανά 2 Ώρες|Αλλαγή Θέσης ανά 3 Ώρες|Αλλαγή
Θέσης ανά 4 Ώρες|Κατά περίπτωση / Μόνο για Άνεση|Αυτόνομος (Γυρίζει μόνος
του)|Θέση|Ύπτια (Πλάτη)|Αριστερό Πλάι|Δεξί Πλάι|Καθιστός σε Πολυθρόνα|Κινητοποίηση / Βάδιση|+ Καταγραφή Στροφής / Θέσης|Κουδούνι Κλήσης Προσβάσιμο|Κάγκελα Κλίνης
Ανεβασμένα|Αερόστρωμα Ελεγμένο|Επίπεδο Παρακολούθησης|Επίπεδο 1: Γενικό|Επίπεδο 2:
Διαλείπον|Επίπεδο 3: Εντός Οπτικού Πεδίου|Επίπεδο 4: Σε Απόσταση Βολής|Διάθεση /
Εικόνα|Ήρεμος & Συνεργάσιμος|Αγχώδης / Σε Δυσφορία|Διεγερτικός / Ανήσυχος|Καταθλιπτικός
/ Αποσυρμένος|Συγχυτικός / Αποπροσανατολισμένος|Φωνάζει / Καλεί|Ευφορικός /
Διεγερμένος|Εχθρικός / Επιθετικός|Τοποθεσία / Δραστηριότητα|Κοιμάται στο
Κρεβάτι|Ξεκουράζεται στο Κρεβάτι|Κάθεται σε Πολυθρόνα|Περπατάει / Κινείται|Στο Μπάνιο /
Ατομική Υγιεινή|Στον Κοινόχρηστο Χώρο|Με Επισκέπτες|Προσπαθεί να Φύγει|Παρέμβαση /
Κλινική Αιτιολόγηση|Έλεγχος Ρουτίνας — Ασφαλής & Ήρεμος|Εξατομικευμένη Υποστήριξη &
Καθησυχασμός|Λεκτική Αποκλιμάκωση / Ανακατεύθυνση|Επαναπροσανατολισμός σε Χρόνο &
Χώρο|Περιβάλλον Ελεγμένο & Ασφαλές|Ενθάρρυνση Λήψης Τροφής & Υγρών|Χορήγηση
Φαρμάκου Κατά Περίπτωση (PRN)|Ενημέρωση Υπεύθυνου Νοσηλευτή / Ιατρού|Επιπλέον
Σημειώσεις (Προαιρετικό)|Αποτέλεσμα / Ενέργεια|Βάρος (kg)|Ύψος (cm)|Βραχιολάκι
Ταυτοποίησης Ελεγμένο|Στον Ασθενή|Στο Χρηματοκιβώτιο Κλινικής|Στάλθηκε στο Σπίτι",
acvpu: "A (Σε Εγρήγορση)|C (Νέα Σύγχυση)|V (Αντιδρά στη Φωνή)|P (Αντιδρά στον Πόνο)|U
(Δεν Αντιδρά)",
phrases: "Έγινε ατομική υγιεινή|Πλύθηκε & ντύθηκε|Σημεία πίεσης ακέραια|Κινητοποιήθηκε
στην πολυθρόνα|Ενημερώθηκε ο νοσηλευτής|Ενημερώθηκε η οικογένεια",
tasks: "Αιμοληψία|ΗΚΓ|Επανάληψη Ζωτικών|Σάκχαρο Αίματος (BM)|Υπέρηχος
Κύστης|Έλεγχος Φλεβοκαθετήρα",
admits: "Οδοντοστοιχία|Γυαλιά|Ακουστικό Βαρηκοΐας|Περιπατητήρας / Μπαστούνι|Τηλέφωνο &
Φορτιστής|Κλειδιά|Μετρητά / Πορτοφόλι",
drSites: "Ιερό Οστό|Αριστερή Πτέρνα|Δεξιά Πτέρνα|Αριστερό Πόδι|Δεξί Πόδι|Κοιλιά"
});
// 13. हि न्दी (hi)
_regLang('hi', {
g1: "शि फ्ट सेटअप|100% ऑफ़लाइन डि जि टल शि फ्ट नोटपडै । डटे ा कभी भी आपके डि वाइस सेबाहर नहींजाता
है।|केवल व्यक्ति गत शि फ्ट नोटपडै । यह कोई डॉक्टरी सलाह, नि दान या नि र्णयर्ण सहायता प्रदान नहींकरता
है।|Care Digipad Pro अनलॉक करें(£9.99 आजीवन)|असीमि त बेड, सहेजेगए वार्ड लेआउट, थीम, टास्क
अलार्म और सभी वि शषे ज्ञ मॉड्यलू अनलॉक करता है।|लाइससें कंुजी दर्ज करें|अनलॉक करें|आजीवन लाइससें
कंुजी प्राप्त करें→|ऐप प्राथमि कताएंऔर इकाइयां|थीम|क्लि नि कल टील|हेल्थकेयर ब्ल|ूस्क्रब ग्रीन|प्लम और
बेरी|मि डनाइट स्लेट|वार्म कोरल|शि फ्ट का समय|दि न (07:00)|रात (19:00)|ग्लकू ोज इकाई|तापमान इकाई|सहेजे
गए वार्ड लेआउट|सहेजा गया लेआउट चनु ें...|आपके मरीज़ के बेड (अधि कतम 4 अक्षर)|आज की शि फ्ट के लि ए बेड
चनु ने(✓) या हटानेके लि ए नीचेटैप करें:|अभी तक कोई बेड नहींजोड़ा गया। ऊपर बेड नबं र या नाम के
आद्याक्षर लि खेंऔर + जोड़ेंदबाएं।|कृपया आज की शि फ्ट के लि ए कम सेकम एक बेड चनु ें(✓)।|+ जोड़ें|हटाएं|+
नया सहेजें|सक्रि य मॉड्यलू (दि खानेके लि ए टि क करें• क्रम बदलनेके लि ए ▲ ▼ दबाएं)|या नए लेआउट के रूप
मेंसहेजें(जसै ेरात)|⚙ शि फ्ट समय, इकाइयांऔर सक्रि य मॉड्यलू ▾|शि फ्ट शरूु करें|शरूु करनेके लि ए बेड
चनु ें|सहेजेंऔर शि फ्ट पर लौटें|बेड|बेड|सहकर्मी के साथ Care Digipad साझा करें|शि फ्ट समाप्त करें/ डटे ा
मि टाएं|बदलें|छि पाएं|डार्क|स्क्रीन छि पी हुई है|शि फ्ट नोट्स पर वापस जानेके लि ए कहींभी टैप करें",
g2: "क्या यह प्रवि ष्टि हटाएं ?|बडे प्रबं धन|बडे का नाम बदलें|मरीज़ ट्रांसफर / अदला-बदली करें|गं तव्य बडे
दर्ज करें(अधि कतम 4 अक्षर):|पहलेसेभरा ह।ै क्या मरीज़ों की अदला-बदली करें? (रद्द करें= गं तव्य डटे ा बदलें)|बडे खाली करें(डि स्चार्ज)|क्या इस बडे का सारा शि फ्ट डटे ा मि टा दें?|शि फ्ट सेबडे हटाएं |क्या इस बडे
और इसकेडटे ा को शि फ्ट सेहटा दें?|इसमेंसहजे ें|लआे उट मेंसहजे ा गया|शि फ्ट मेंबडे जोड़|ेंसहजे ेगए वार्ड
बडे (जोड़नेकेलि ए टैप करें):|सारांश|वाइटल्स|ग्लकू ोज|लटे कर/खड़ेहोकर BP|तरल पदार्थ (Fluids)|मल
त्याग (Bowels)|त्वचा और ड्रसिंेसिंग|आहार (Diet)|करवट (Turning)|मानसि क स्वास्थ्य|नोट्स|कार्य
(Tasks)|भर्ती (Admissions)|पर्णू र्ण|पर्णू र्णचि ह्नि त करें|बडे पर्णू र्ण|केवल बाकी|सभी दि खाएं |स्क्रीन चालूरखें|बडे
अनसु ार|मॉड्यूल अनसु ार",
g3: "समय|नि यत समय|सामान्य हवा|कब लि या / सं दर्भ|श्वसन दर (RR)|ऑक्सीजन स्तर (SpO2%)|हवा /
ऑक्सीजन (O2)|रक्तचाप (Sys / Dia)|पल्स / हृदय गति (HR)|तापमान|सतर्कता (ACVPU)|दर्द|दर्द स्कोर
(0-10)|नज़े ल कैनलु ा|मास्क|वेंचरुी मास्क|ब्लड शगु र (Glucose)|नाश्तेसेपहले(खाली पटे )|नाश्तेकेबाद (2
घं टे)|दोपहर केभोजन सेपहल|ेदोपहर केभोजन केबाद (2 घं टे)|रात केखानेसेपहल|ेरात केखानेकेबाद (2
घं टे)|सोतेसमय|रात (02:00 - 04:00)|रैंडम / लक्षण होनेपर|दोबारा जांच (हाइपो उपचार केबाद)|भोजन से
पहल|ेभोजन केबाद|रात|हाइपो का उपचार कि या|कीटोन्स जांचेगए|नर्स (RN) को सचिूचित कि या|लटे कर|खड़े
होकर|कोई लक्षण नहीं|चक्कर आना|खड़ेहोनेमेंअसमर्थ",
g4: "इनपटु (Input)|आउटपटु (Output)|सं तलु न (Balance)|कुल|साफ़ करें|गीला पडै|मत्रू
(Urine)|कैथटे र|मल|उल्टी|मात्रा|मल का प्रकार / गाढ़ापन (1-7)|मल त्याग नहीं हुआ (BNO)|मल त्याग नहीं
हुआ (BNO)|तरीका|कम|मध्यम|अधि क|हल्का दाग|कठोर — प्रकार 1 (अलग-अलग सख्त गांठें)|कठोर —
प्रकार 2 (गांठदार आकार)|सामान्य — प्रकार 3 (दरार वाला आकार)|सामान्य — प्रकार 4 (चि कना और
नरम)|नरम — प्रकार 5 (नरम टुकड़)े|ढीला — प्रकार 6 (दलि येजसै ा)|तरल — प्रकार 7 (पानी
जसै ा)|शौचालय|कमोड चये र|बडेपनै |पडै (इनकॉन्टि नेंस)",
g5: "त्रि कास्थि (Sacrum)|ग्रोइन (Groin)|एड़ि यां|कोहनि यां|सामान्य / सरुक्षि त|लाल (दबानेपर सफेद
होना)|लाल (दबानेपर सफेद न होना)|नमी सेघाव / छि लना|टूटी त्वचा / गहरा घाव|त्वचा फटना / नील
पड़ना|सखू ी / नाजकु त्वचा|सभी को सरुक्षि त चि ह्नि त करें|+ शरीर का अन्य भाग जोड़|ेंकूल्हा (Hip)|टखना
(Ankle)|पिं डली / परै|परै / उं गलि यां|बांह / अग्रबाहु|पीठ / रीढ़|कं धा|कान|अन्य
स्थान|बायां|दायां|दोनों|बरिैरियर क्रीम|करवट बदली / दबाव हटाया|हील बट्ू स / तकि ए|ड्रसिंेसिंग (पट्टी)|स्थान /
नोट्स|अगला बदलाव कब|पट्टी लगाने/ जांच की तारीख|आज|देय ति थि |तारीख चनु ें|1 दि न|2 दि न|3 दि न|5
दि न|7 दि न|साबतु और सखू ी|आज बदली गई|रि साव / गीलापन|उखड़ रही ह|ैनाश्ता|दोपहर का भोजन|रात
का खाना|सप्लीमेंट / स्नक्सै |लि या गया|मना कि या|मं हु सेकुछ नहीं (NBM)|स्वयं (Independent)|सहायता
स|ेप्ररिेरित करनेपर|गाढ़ा तरल पदार्थ", g6: "करवट / स्थि ति बदलनेकी योजना|हर 2 घं टेमेंकरवट|हर 3 घं टेमेंकरवट|हर 4 घं टेमें
करवट|आवश्यकतानसु ार / केवल आराम केलि ए|स्वतं त्र (स्वयं करवट लते ेह)ैं|स्थि ति (Position)|पीठ के
बल (Back)|बाईं करवट|दाईं करवट|कुर्सी पर बठै ेह|ैंचलना-फि रना (Mobilising)|+ करवट / स्थि ति दर्ज
करें|कॉल बले पहुं च मेंह|ैबडे रले ऊपर ह|ैंएयर मट्रै ेस जांचा गया|नि गरानी स्तर|स्तर 1: सामान्य|स्तर 2: रुक-रुक
कर|स्तर 3: नज़र केसामन|ेस्तर 4: हाथ की दूरी केभीतर|मडू / व्यवहार|शांत और सहयोगी|चिं ति त /
परशे ान|उत्तजिेजित / बचे नै |उदास / चपु चाप|भ्रमि त (Confused)|आवाज़ लगाना / चि ल्लाना|अति
उत्साहि त|आक्रामक / वि रोधी|स्थान / गति वि धि |बि स्तर पर सो रहेह|ैंबि स्तर पर आराम कर रहेह|ैंकुर्सी पर
बठै ेह|ैंटहल रहेहैं/ बचे नै |बाथरूम में/ व्यक्ति गत देखभाल|साझा कक्ष (Communal Area) में|मि लनेवालों के
साथ|बाहर जानेकी कोशि श|हस्तक्षपे / क्लि नि कल कारण|नि यमि त जांच — सरुक्षि त और शांत|1:1 बातचीत
और आश्वासन दि या|समझाकर शांत कि या / ध्यान बं टाया|समय और वार्ड की जानकारी दी|आसपास की
सरुक्षा जांची गई|भोजन और तरल केलि ए प्रोत्साहि त कि या|आवश्यकतानसु ार (PRN) दवा दी गई|इं चार्ज
नर्स / डॉक्टर को सचिूचित कि या|अति रि क्त नोट्स (वकै ल्पि क)|परि णाम / कार्रवाई|वज़न (kg)|लं बाई (cm)|ID
कलाई बैंड जांचा गया|मरीज़ केपास|वार्ड की ति जोरी में|घर भजे दि या गया",
acvpu: "A (सतर्क / Alert)|C (नया भ्रम / Confusion)|V (आवाज़ पर प्रति क्रि या)|P (दर्द पर प्रति क्रि या)|U
(अचते / कोई प्रति क्रि या नहीं)",
phrases: "व्यक्ति गत स्वच्छता देखभाल दी गई|नहलाया और कपड़ेपहनाए|दबाव वालेहि स्सेसरुक्षि त
ह|ैंकुर्सी पर बि ठाया गया|नर्स (RN) को सचिूचित कि या|परि वार को जानकारी दी गई",
tasks: "ब्लड टेस्ट (Bloods)|ECG|वाइटल्स दोबारा लें|ब्लड शगु र (BM)|ब्लडै र स्कैन|कैनलु ा जांच",
admits: "नकली दांत (Dentures)|चश्मा|सनु नेकी मशीन|वॉकिं ग फ्रेम / छड़ी|फ़ोन और
चार्जर|चाबि यां|नकद / बटुआ",
drSites: "सक्रै म (Sacrum)|बाईं एड़ी|दाईं एड़ी|बायां परै|दायां परै|पटे (Abdomen)"
});
// 14. বাংলা (bn)
_regLang('bn', {
g1: "শি ফট সে টআপ|১০০% অফলাইন ডি জি টাল শি ফট ন োটপ্যাড। তথ্য কখন োই আপনার ডি ভাইসে র বাইরে যায়
না।|শুধুমাত্র ব্যক্তি গত শি ফট ন োটপ্যাড। ক োন ো চি কি ৎসা পরামর্শ, র োগ নি র্ণয়র্ণ বা সি দ্ধান্ত সহায়তা দে য় না।|Care
Digipad Pro আনলক করুন (£9.99 আজীবন)|আনলি মি টে ড বে ড, সে ভ করা ওয়ার্ড লে আউট, থি ম, টাস্ক অ্যালার্ম
এবং সব মডি উল আনলক করে ।|লাইসে ন্স কী দি ন|আনলক|আজীবন লাইসে ন্স কী সংগ্রহ করুন →|অ্যাপ পছন্দ ও
একক|থি ম|ক্লি নি ক্যাল টিল|হে লথকে য়ার ব্লু|স্ক্রাব গ্রি ন|প্লাম ও বে রি |মি ডনাইট স্লে ট|ওয়ার্ম ক োরাল|শি ফটে র সময়|দি ন
(07:00)|রাত (19:00)|গ্লুক োজ একক|তাপমাত্রা একক|সে ভ করা ওয়ার্ড লে আউট|সে ভ করা লে আউট বে ছে
নি ন...|আপনার র োগীর বে ড (সর্ব োচ্চ ৪ অক্ষর)|আজকে র শি ফটে র জন্য বে ড নি র্বাচন (✓) বা বাতি ল করতে নি চে ট্যাপ করুন:|এখন ো ক োন ো বে ড য োগ করা হয়নি । উপরে বে ড নম্বর বা আদ্যক্ষর লি খে + য োগ করুন ট্যাপ করুন।|আজকে র
শি ফটে র জন্য অন্তত একটি বে ড নি র্বাচন (✓) করুন।|+ য োগ করুন|মছুুন|+ নতুন সে ভ|সক্রি য় মডি উল (দে খাতে টিক
দি ন • ক্রম বদলাতে ▲ ▼ ট্যাপ করুন)|অথবা নতুন লে আউট হি সে বে সে ভ করুন (যে মন রাত)|⚙ শি ফটে র সময়,
একক ও সক্রি য় মডি উল ▾|শি ফট শুরু করুন|শুরু করতে বে ড নি র্বাচন করুন|সে ভ করে শি ফটে
ফি রুন|বে ড|বে ড|সহকর্মী র সাথে Care Digipad শে য়ার করুন|শি ফট শে ষ / তথ্য মছুুন|এডি ট|লকু ান|ডার্ক|স্ক্রি ন
লকু ান ো আছে |শি ফট ন োটে ফি রে যে তে যে ক োন ো জায়গায় ট্যাপ করুন",
g2: "এই তথ্যটি মছেুছে ফে লবে ন?|বে ড পরি চালনা|বে ডে র নাম পরি বর্তন|র োগী স্থানান্তর / অদলবদল|গন্তব্য বে ড লি খুন
(সর্ব োচ্চ ৪ অক্ষর):|খালি নে ই। র োগী অদলবদল করবে ন? (বাতি ল = গন্তব্যে প্রতি স্থাপন)|বে ড খালি করুন (ছুটি)|এই
বে ডে র সব শি ফট তথ্য মছেুছে ফে লবে ন?|শি ফট থে কে বে ড সরান|এই বে ড এবং এর তথ্য শি ফট থে কে সরি য়ে
ফে লবে ন?|সে ভ করুন|লে আউটে সে ভ হয়ে ছে |শি ফটে বে ড য োগ করুন|সে ভ করা ওয়ার্ড বে ড (য োগ করতে ট্যাপ
করুন):|সারাংশ|ভাইটালস|গ্লুক োজ|শ োয়া/দাঁড়ান ো BP|তরল (Fluids)|মলত্যাগ (Bowels)|ত্বক ও ড্রে সি ং|খাবার
(Diet)|পাশ ফে রান ো|মানসি ক স্বাস্থ্য|ন োটস|কাজ (Tasks)|ভর্তি (Admissions)|সম্পন্ন|সম্পন্ন চি হ্নি ত করুন|বে ড
সম্পন্ন|শুধুবাকি গুল ো|সব দে খান|স্ক্রি ন চালুরাখুন|বে ড অনযুায়ী|মডি উল অনযুায়ী",
g3: "সময়|নি র্ধারি ত সময়|স্বাভাবি ক বাতাস|কখন নে ওয়া / প্রসঙ্গ|শ্বাসপ্রশ্বাস (RR)|অক্সি জে ন
স্যাচুরে শন (SpO2%)|বাতাস / অক্সি জে ন (O2)|রক্তচাপ (Sys / Dia)|পালস / হৃদস্পন্দন
(HR)|তাপমাত্রা|সতর্কতা (ACVPU)|ব্যথা|ব্যথার মাত্রা (0-10)|ন্যাজাল ক্যানলুা|মাস্ক|ভে ঞ্চুরি মাস্ক|ব্লাড
সুগার (Glucose)|সকালে র নাস্তার আগে (খালি পে টে )|নাস্তার পরে (২ ঘণ্টা)|দপুুরে র খাবারে র
আগে |দপুুরে র খাবারে র পরে (২ ঘণ্টা)|রাতে র খাবারে র আগে |রাতে র খাবারে র পরে (২ ঘণ্টা)|ঘুমান োর
আগে |রাত (02:00 - 04:00)|র্যান্ডম / উপসর্গ থাকলে |পুনঃপরীক্ষা (হাইপ ো চি কি ৎসার পর)|খাবারে র
আগে |খাবারে র পরে |রাত|হাইপ ো চি কি ৎসা দে ওয়া হয়ে ছে |কি ট োন পরীক্ষা করা হয়ে ছে |নার্সকে (RN) জানান ো
হয়ে ছে |শ োয়া অবস্থায়|দাঁড়ান ো অবস্থায়|ক োন ো উপসর্গ নে ই|মাথা ঘ োরা|দাঁড়াতে অক্ষম",
g4: "গ্রহণ (Input)|নি র্গমর্গ ন (Output)|ব্যালে ন্স|ম োট|মছুুন|ভে জা প্যাড|প্রস্রাব
(PU)|ক্যাথে টার|মলত্যাগ|বমি |পরি মাণ|মলে র ধরন / ঘনত্ব (1-7)|মলত্যাগ হয়নি (BNO)|মলত্যাগ
হয়নি (BNO)|পদ্ধতি |অল্প|মাঝারি |বে শি |সামান্য দাগ|শক্ত — টাইপ ১ (আলাদা শক্ত গুটি)|শক্ত — টাইপ
২ (দলা পাকান ো)|স্বাভাবি ক — টাইপ ৩ (ফাটলযুক্ত)|স্বাভাবি ক — টাইপ ৪ (মসৃণ ও নরম)|নরম —
টাইপ ৫ (নরম টুকর ো)|পাতলা — টাইপ ৬ (কাদার মত ো নরম)|তরল — টাইপ ৭ (পানি র
মত ো)|টয়লে ট|কম োড চে য়ার|বে ডপ্যান|প্যাড (ইনকন্টি নে ন্স)",
g5: "স্যাক্রাম (Sacrum)|কুঁচকি (Groin)|গ োড়ালি |কনইু|অক্ষত (Intact)|লাল (চাপ দি লে সাদা
হয়)|লাল (চাপ দি লে সাদা হয় না)|আর্দ্রতাজনি ত ক্ষত / ছুলে যাওয়া|ভাঙা চামড়া / গভীর ক্ষত|চামড়া
ছে ঁড়া / কালশি টে |শুষ্ক / নাজকু ত্বক|সব অক্ষত চি হ্নি ত করুন|+ শরীরে র অন্য অংশ য োগ করুন|নি তম্ব
(Hip)|পায়ে র গাঁট (Ankle)|পায়ে র নলা / পা|পায়ে র পাতা / আঙুল|বাহু / হাত|পি ঠ /
মে রুদণ্ড|কাঁধ|কান|অন্যান্য স্থান|বাম|ডান|উভয়|ব্যারি য়ার ক্রি ম|অবস্থান পরি বর্তন / চাপমক্তু করা
হয়ে ছে |হি ল বটু / বালি শ|ড্রে সি ং|স্থান / ন োটস|পরবর্তী পরি বর্তনে র সময়|ড্রে সি ং লাগান ো / পরীক্ষার
তারি খ|আজ|দে য় তারি খ|তারি খ নি র্বাচন করুন|১ দি ন|২ দি ন|৩ দি ন|৫ দি ন|৭ দি ন|অক্ষত ও শুষ্ক|আজ
পরি বর্তন করা হয়ে ছে |রস চুঁইয়ে পড়া / লি ক|উঠে যাচ্ছে |সকালে র নাস্তা|দপুুরে র খাবার|রাতে র
খাবার|সাপ্লি মে ন্ট / স্ন্যাকস|খে য়ে ছে |প্রত্যাখ্যান করে ছে |মখেুখে খাওয়া নি ষে ধ (NBM)|নি জে খে য়ে ছে |সাহায্য
নি য়ে |উৎসাহ দি য়ে |ঘন তরল খাবার",
g6: "পাশ ফে রান ো / পজি শনি ং প্ল্যান|২ ঘণ্টা পরপর পাশ ফে রান ো|৩ ঘণ্টা পরপর পাশ ফে রান ো|৪
ঘণ্টা পরপর পাশ ফে রান ো|প্রয় োজন অনযুায়ী / শুধুআরামে র জন্য|স্বাবলম্বী (নি জে পাশ ফে রে ন)|অবস্থান
(Position)|চি ত হয়ে (Back)|বাম কাত|ডান কাত|চে য়ারে বসা|হাঁটাচলা করছে ন|+ পাশ ফে রান ো /
অবস্থান লগ করুন|কল বে ল নাগালে র মধ্যে |বে ড রে ইল ত োলা আছে |এয়ার ম্যাট্রে স পরীক্ষা করা
হয়ে ছে |পর্যবে ক্ষণ স্তর|স্তর ১: সাধারণ|স্তর ২: নি র্দি ষ্ট সময় অন্তর|স্তর ৩: চ োখে র সামনে |স্তর ৪: হাতে র
নাগালে র মধ্যে |মে জাজ / আচরণ|শান্ত ও সহয োগি তাপূর্ণ|র্ণ উদ্বি গ্ন / বি চলি ত|উত্তে জি ত / অস্থি র|মনমরা / চুপচাপ|বি ভ্রান্ত (Confused)|ডাকাডাকি / চি ৎকার করছে ন|অতি উতফুল্ল|প্রতি কূল / আক্রমণাত্মক|অবস্থান
/ কার্যকলাপ|বি ছানায় ঘুমাচ্ছে ন|বি ছানায় বি শ্রাম নি চ্ছে ন|চে য়ারে বসে আছে ন|হাঁটাহাঁটি করছে ন|বাথরুমে /
ব্যক্তি গত পরি চ্ছন্নতা|কমন রুমে |দর্শনার্থী দে র সাথে |ওয়ার্ড ছে ড়ে যাওয়ার চে ষ্টা|পদক্ষে প / ক্লি নি ক্যাল
কারণ|রুটিন পরীক্ষা — নি রাপদ ও শান্ত|১:১ কথা বলা ও আশ্বস্ত করা হয়ে ছে |ম ৌখি কভাবে শান্ত করা /
মন োয োগ ঘ োরান ো|সময় ও ওয়ার্ড সম্পর্কে ধারণা দে ওয়া হয়ে ছে |চারপাশ পরীক্ষা করা হয়ে ছে ও
নি রাপদ|খাবার ও পানীয় গ্রহণে উৎসাহ দে ওয়া হয়ে ছে |প্রয় োজনীয় (PRN) ওষুধ দে ওয়া হয়ে ছে |ইনচার্জ নার্স
/ ডাক্তারকে জানান ো হয়ে ছে |অতি রি ক্ত ন োট (ঐচ্ছি ক)|ফলাফল / পদক্ষে প|ওজন (kg)|উচ্চতা
(cm)|আইডি রি স্টব্যান্ড পরীক্ষা করা হয়ে ছে |র োগীর কাছে |ওয়ার্ডে র লকারে |বাড়ি তে পাঠান ো হয়ে ছে ",
acvpu: "A (সতর্ক / Alert)|C (নতুন বি ভ্রান্তি )|V (ডাকে সাড়া দে ন)|P (ব্যথায় সাড়া দে ন)|U
(অচে তন / সাড়া নে ই)",
phrases: "ব্যক্তি গত পরি চ্ছন্নতা সম্পন্ন|ধ োয়ান ো ও প োশাক পরান ো হয়ে ছে |চাপ পড়ার স্থানগুল ো অক্ষত
আছে |চে য়ারে বসান ো হয়ে ছে |নার্সকে (RN) জানান ো হয়ে ছে |পরি বারকে জানান ো হয়ে ছে ",
tasks: "রক্ত পরীক্ষা (Bloods)|ECG|পুনরায় ভাইটালস নে ওয়া|ব্লাড সুগার (BM)|ব্লাডার
স্ক্যান|ক্যানলুা পরীক্ষা",
admits: "বাঁধান ো দাঁত (Dentures)|চশমা|শ্রবণযন্ত্র (Hearing Aid)|ওয়াকি ং ফ্রে ম / লাঠি|ফ োন ও
চার্জার|চাবি |নগদ টাকা / মানি ব্যাগ",
drSites: "স্যাক্রাম (Sacrum)|বাম গ োড়ালি |ডান গ োড়ালি |বাম পা|ডান পা|পে ট (Abdomen)"
});
// 15. ਪੰਜਾਬੀ (pa)
_regLang('pa', {
g1: "ਸ਼ਿ ਫਟ ਸੈੱਟਅੱਪ|100% ਆਫ਼ਲਾਈਨ ਡਿ ਜੀਟਲ ਸ਼ਿ ਫਟ ਨੋਟਪੈਡ। ਡੇਟਾ ਕਦੇਵੀ ਤੁਹਾਡੇਫ਼ੋਨ ਤੋਂਬਾਹਰ ਨਹੀਂ
ਜਾਂਦਾ।|ਸਿ ਰਫ਼ ਨਿ ੱਜੀ ਸ਼ਿ ਫਟ ਨੋਟਪੈਡ। ਇਹ ਕੋਈ ਡਾਕਟਰੀ ਸਲਾਹ, ਨਿ ਦਾਨ ਜਾਂ ਫੈਸਲਾ ਸਹਾਇਤਾ ਨਹੀਂ ਦਿ ੰਦਾ।|Care
Digipad Pro ਅਨਲੌਕ ਕਰੋ(£9.99 ਲਾਈਫਟਾਈਮ)|ਅਣਗਿ ਣਤ ਬੈੱਡ, ਸੇਵ ਕੀਤੇਵਾਰਡ ਲੇਆਉਟ, ਥੀਮ, ਟਾਸਕ ਅਲਾਰਮ
ਅਤੇਸਾਰੇਮੋਡੀਊਲ ਅਨਲੌਕ ਕਰਦਾ ਹੈ।|ਲਾਈਸੈਂਸ ਕੰੁਜੀ ਭਰੋ|ਅਨਲੌਕ ਕਰੋ|ਲਾਈਫਟਾਈਮ ਲਾਈਸੈਂਸ ਕੰੁਜੀ ਪ੍ਰਾਪਤ ਕਰੋ→|ਐਪ
ਪਸੰਦਾਂ ਅਤੇਇਕਾਈਆਂ|ਥੀਮ|ਕਲੀਨਿ ਕਲ ਟੀਲ|ਹੈਲਥਕੇਅਰ ਬਲੂ|ਸਕਬ੍ਰ ਗ੍ਰੀਨ|ਪਲੱਮ ਅਤੇਬੇਰੀ|ਮਿ ਡਨਾਈਟ ਸਲੇਟ|ਵਾਰਮ
ਕੋਰਲ|ਸ਼ਿ ਫਟ ਦਾ ਸਮਾਂ|ਦਿ ਨ (07:00)|ਰਾਤ (19:00)|ਗਲੂਕੋਜ਼ ਇਕਾਈ|ਤਾਪਮਾਨ ਇਕਾਈ|ਸੇਵ ਕੀਤੇਵਾਰਡ ਲੇਆਉਟ|ਸੇਵ
ਕੀਤਾ ਲੇਆਉਟ ਚੁਣੋ...|ਤੁਹਾਡੇਮਰੀਜ਼ਾਂ ਦੇਬੈੱਡ (ਵੱਧ ਤੋਂਵੱਧ 4 ਅੱਖਰ)|ਅੱਜ ਦੀ ਸ਼ਿ ਫਟ ਲਈ ਬੈੱਡ ਚੁਣਨ (✓) ਜਾਂ ਹਟਾਉਣ
ਲਈ ਹੇਠਾਂ ਟੈਪ ਕਰੋ:|ਅਜੇਕੋਈ ਬੈੱਡ ਨਹੀਂ ਜੋੜਿ ਆ ਗਿ ਆ। ਉੱਪਰ ਬੈੱਡ ਨੰਬਰ ਜਾਂ ਨਾਮ ਦੇਪਹਿ ਲੇਅੱਖਰ ਲਿ ਖੋਅਤੇ+ ਜੋੜੋ
ਦਬਾਓ।|ਕਿ ਰਪਾ ਕਰਕੇਅੱਜ ਦੀ ਸ਼ਿ ਫਟ ਲਈ ਘੱਟੋ-ਘੱਟ ਇੱਕ ਬੈੱਡ ਚੁਣੋ(✓)।|+ ਜੋੜੋ|ਮਿ ਟਾਓ|+ ਨਵਾਂ ਸੇਵ ਕਰੋ|ਸਰਗਰਮ
ਮੋਡੀਊਲ (ਦਿ ਖਾਉਣ ਲਈ ਟਿ ੱਕ ਕਰੋ• ਕਮ੍ਰ ਬਦਲਣ ਲਈ ▲ ▼ ਦਬਾਓ)|ਜਾਂ ਨਵੇਂਲੇਆਉਟ ਵਜੋਂਸੇਵ ਕਰੋ(ਜਿ ਵੇਂਰਾਤ)|⚙
ਸ਼ਿ ਫਟ ਸਮਾਂ, ਇਕਾਈਆਂ ਅਤੇਸਰਗਰਮ ਮੋਡੀਊਲ ▾|ਸ਼ਿ ਫਟ ਸ਼ੁਰੂਕਰੋ|ਸ਼ੁਰੂਕਰਨ ਲਈ ਬੈੱਡ ਚੁਣੋ|ਸੇਵ ਕਰੋਅਤੇਸ਼ਿ ਫਟ ਤੇ
ਵਾਪਸ ਜਾਓ|ਬੈੱਡ|ਬੈੱਡ|ਸਹਿ ਕਰਮੀ ਨਾਲ Care Digipad ਸਾਂਝਾ ਕਰੋ|ਸ਼ਿ ਫਟ ਖਤਮ ਕਰੋ/ ਡੇਟਾ
ਮਿ ਟਾਓ|ਬਦਲੋ|ਲੁਕਾਓ|ਡਾਰਕ|ਸਕੀ੍ਰਨ ਲੁਕਵੀਂ ਹੈ|ਸ਼ਿ ਫਟ ਨੋਟਸ ਤੇਵਾਪਸ ਜਾਣ ਲਈ ਕਿ ਤੇਵੀ ਟੈਪ ਕਰੋ",
g2: "ਕੀ ਇਹ ਐਟਂ ਰੀ ਮਿ ਟਾਉਣੀ ਹੈ?|ਬੈੱਡ ਪ੍ਰਬੰਧਨ|ਬੈੱਡ ਦਾ ਨਾਮ ਬਦਲੋ|ਮਰੀਜ਼ ਟਾਂ੍ਰਸਫਰ / ਅਦਲਾ-ਬਦਲੀ ਕਰੋ|ਮੰਜ਼ਿ ਲ ਬੈੱਡ
ਭਰੋ(ਵੱਧ ਤੋਂਵੱਧ 4 ਅੱਖਰ):|ਪਹਿ ਲਾਂ ਹੀ ਭਰਿ ਆ ਹੈ। ਕੀ ਮਰੀਜ਼ਾਂ ਦੀ ਅਦਲਾ-ਬਦਲੀ ਕਰਨੀ ਹੈ? (ਰੱਦ ਕਰੋ= ਮੰਜ਼ਿ ਲ ਡੇਟਾ
ਬਦਲੋ)|ਬੈੱਡ ਖਾਲੀ ਕਰੋ(ਛੱੁਟੀ)|ਕੀ ਇਸ ਬੈੱਡ ਦਾ ਸਾਰਾ ਸ਼ਿ ਫਟ ਡੇਟਾ ਮਿ ਟਾ ਦੇਣਾ ਹੈ?|ਸ਼ਿ ਫਟ ਤੋਂਬੈੱਡ ਹਟਾਓ|ਕੀ ਇਸ ਬੈੱਡ ਅਤੇ
ਇਸਦੇਡੇਟਾ ਨੰ ੂਸ਼ਿ ਫਟ ਤੋਂਹਟਾਉਣਾ ਹੈ?|ਇਸ ਵਿ ੱਚ ਸੇਵ ਕਰੋ|ਲੇਆਉਟ ਵਿ ੱਚ ਸੇਵ ਕੀਤਾ ਗਿ ਆ|ਸ਼ਿ ਫਟ ਵਿ ੱਚ ਬੈੱਡ ਜੋੜੋ|ਸੇਵ ਕੀਤੇ
ਵਾਰਡ ਬੈੱਡ (ਜੋੜਨ ਲਈ ਟੈਪ ਕਰੋ):|ਸਾਰਾਂਸ਼|ਵਾਈਟਲਸ|ਗਲੂਕੋਜ਼|ਲੇਟ ਕੇ/ਖੜੇ੍ਹਹੋਕੇBP|ਤਰਲ ਪਦਾਰਥ (Fluids)|ਟੱਟੀ
(Bowels)|ਚਮੜੀ ਅਤੇਪੱਟੀਆਂ|ਖੁਰਾਕ (Diet)|ਪਾਸਾ ਪਰਤਣਾ (Turning)|ਮਾਨਸਿ ਕ ਸਿ ਹਤ|ਨੋਟਸ|ਕੰਮ (Tasks)|ਦਾਖਲਾ
(Admissions)|ਪੂਰਾ ਹੋਇਆ|ਪੂਰਾ ਚਿ ੰਨ੍ਹਿ ਤ ਕਰੋ|ਬੈੱਡ ਪੂਰਾ|ਸਿ ਰਫ਼ ਬਾਕੀ|ਸਭ ਦਿ ਖਾਓ|ਸਕੀ੍ਰਨ ਚਾਲੂਰੱਖੋ|ਬੈੱਡ
ਅਨੁਸਾਰ|ਮੋਡੀਊਲ ਅਨੁਸਾਰ", g3: "ਸਮਾਂ|ਨਿ ਰਧਾਰਤ ਸਮਾਂ|ਹਵਾ (Air)|ਕਦੋਂਲਿ ਆ / ਸੰਦਰਭ|ਸਾਹ ਦੀ ਗਤੀ (RR)|ਆਕਸੀਜਨ ਪੱਧਰ (SpO2%)|ਹਵਾ
/ ਆਕਸੀਜਨ (O2)|ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ (Sys / Dia)|ਨਬਜ਼ / ਦਿ ਲ ਦੀ ਧੜਕਣ (HR)|ਤਾਪਮਾਨ|ਚੌਕਸੀ
(ACVPU)|ਦਰਦ|ਦਰਦ ਸਕੋਰ (0-10)|ਨੇਜ਼ਲ ਕੈਨੁਲਾ|ਮਾਸਕ|ਵੈਂਚੁਰੀ ਮਾਸਕ|ਬਲੱਡ ਸ਼ੂਗਰ (Glucose)|ਨਾਸ਼ਤੇਤੋਂ
ਪਹਿ ਲਾਂ (ਖਾਲੀ ਪੇਟ)|ਨਾਸ਼ਤੇਤੋਂਬਾਅਦ (2 ਘੰਟੇ)|ਦੁਪਹਿ ਰ ਦੇਖਾਣੇਤੋਂਪਹਿ ਲਾਂ|ਦੁਪਹਿ ਰ ਦੇਖਾਣੇਤੋਂਬਾਅਦ (2 ਘੰਟੇ)|ਰਾਤ
ਦੇਖਾਣੇਤੋਂਪਹਿ ਲਾਂ|ਰਾਤ ਦੇਖਾਣੇਤੋਂਬਾਅਦ (2 ਘੰਟੇ)|ਸੌਣ ਵੇਲੇ|ਰਾਤ (02:00 - 04:00)|ਰੈਂਡਮ / ਲੱਛਣ ਹੋਣ ਤੇ|ਦੁਬਾਰਾ
ਜਾਂਚ (ਹਾਈਪੋਇਲਾਜ ਤੋਂਬਾਅਦ)|ਖਾਣੇਤੋਂਪਹਿ ਲਾਂ|ਖਾਣੇਤੋਂਬਾਅਦ|ਰਾਤ|ਹਾਈਪੋਦਾ ਇਲਾਜ ਕੀਤਾ|ਕੀਟੋਨਸ ਚੈੱਕ
ਕੀਤੇ|ਨਰਸ (RN) ਨੰ ੂਦੱਸਿ ਆ|ਲੇਟ ਕੇ|ਖੜੇ੍ਹਹੋਕੇ|ਕੋਈ ਲੱਛਣ ਨਹੀਂ|ਚੱਕਰ ਆਉਣਾ|ਖੜੇ੍ਹਹੋਣ ਵਿ ੱਚ ਅਸਮਰੱਥ",
g4: "ਇਨਪੱੁਟ (Input)|ਆਊਟਪੱੁਟ (Output)|ਸੰਤੁਲਨ (Balance)|ਕੱੁਲ|ਸਾਫ਼ ਕਰੋ|ਗਿ ੱਲਾ ਪੈਡ|ਪਿ ਸ਼ਾਬ
(Urine)|ਕੈਥੇਟਰ|ਟੱਟੀ|ਉਲਟੀ|ਮਾਤਰਾ|ਟੱਟੀ ਦੀ ਕਿ ਸਮ / ਗਾੜਾ੍ਹਪਣ (1-7)|ਟੱਟੀ ਨਹੀਂ ਆਈ (BNO)|ਟੱਟੀ ਨਹੀਂ ਆਈ
(BNO)|ਤਰੀਕਾ|ਥੋੜਾ੍ਹ|ਦਰਮਿ ਆਨਾ|ਜ਼ਿ ਆਦਾ|ਹਲਕਾ ਦਾਗ|ਸਖ਼ਤ — ਕਿ ਸਮ 1 (ਵੱਖ-ਵੱਖ ਸਖ਼ਤ ਗੰਢਾਂ)|ਸਖ਼ਤ — ਕਿ ਸਮ 2
(ਗੰਢਾਂ ਵਾਲਾ ਆਕਾਰ)|ਸਧਾਰਨ — ਕਿ ਸਮ 3 (ਤਰੇੜਾਂ ਵਾਲਾ ਆਕਾਰ)|ਸਧਾਰਨ — ਕਿ ਸਮ 4 (ਮੁਲਾਇਮ ਅਤੇਨਰਮ)|ਨਰਮ
— ਕਿ ਸਮ 5 (ਨਰਮ ਟੁਕੜੇ)|ਢਿ ੱਲਾ — ਕਿ ਸਮ 6 (ਦਲੀਏ ਵਰਗਾ)|ਤਰਲ — ਕਿ ਸਮ 7 (ਪਾਣੀ ਵਰਗਾ)|ਟਾਇਲਟ|ਕਮੋਡ
ਚੇਅਰ|ਬੈੱਡਪੈਨ|ਪੈਡ (ਇਨਕੌਂਟੀਨੈਂਸ)",
g5: "ਸੈਕਰਮ (Sacrum)|ਚੱਡੇ(Groin)|ਅੱਡੀਆਂ|ਕੂਹਣੀਆਂ|ਠੀਕ / ਸੁਰੱਖਿ ਅਤ|ਲਾਲ (ਦਬਾਉਣ ਤੇਚਿ ੱਟਾ ਹੋਣਾ)|ਲਾਲ
(ਦਬਾਉਣ ਤੇਚਿ ੱਟਾ ਨਾ ਹੋਣਾ)|ਨਮੀ ਕਾਰਨ ਜ਼ਖ਼ਮ / ਛਿ ੱਲਿ ਆ ਹੋਇਆ|ਟੱੁਟੀ ਚਮੜੀ / ਡੰੂਘਾ ਜ਼ਖ਼ਮ|ਚਮੜੀ ਫਟਣਾ / ਨੀਲ
ਪੈਣਾ|ਸੱੁਕੀ / ਨਾਜ਼ਕੁ ਚਮੜੀ|ਸਭ ਨੰ ੂਸੁਰੱਖਿ ਅਤ ਚਿ ੰਨ੍ਹਿ ਤ ਕਰੋ|+ ਸਰੀਰ ਦਾ ਹੋਰ ਹਿ ੱਸਾ ਜੋੜੋ|ਚੂਲਾ੍ਹ (Hip)|ਗਿ ੱਟਾ
(Ankle)|ਪਿ ੰਜਣੀ / ਲੱਤ|ਪੈਰ / ਉਂਗਲਾਂ|ਬਾਂਹ|ਪਿ ੱਠ / ਰੀੜ੍ਹਦੀ ਹੱਡੀ|ਮੋਢਾ|ਕੰਨ|ਹੋਰ ਥਾਂ|ਖੱਬਾ|ਸੱਜਾ|ਦੋਵੇਂ|ਬੈਰੀਅਰ
ਕੀ੍ਰਮ|ਪਾਸਾ ਬਦਲਿ ਆ / ਦਬਾਅ ਹਟਾਇਆ|ਹੀਲ ਬੂਟ / ਸਿ ਰਹਾਣੇ|ਪੱਟੀ (Dressing)|ਥਾਂ / ਨੋਟਸ|ਅਗਲੀ ਪੱਟੀ ਕਦੋਂ|ਪੱਟੀ
ਕਰਨ / ਚੈੱਕ ਕਰਨ ਦੀ ਤਾਰੀਖ|ਅੱਜ|ਦੇਣ ਯੋਗ ਤਾਰੀਖ|ਤਾਰੀਖ ਚੁਣੋ|1 ਦਿ ਨ|2 ਦਿ ਨ|3 ਦਿ ਨ|5 ਦਿ ਨ|7 ਦਿ ਨ|ਠੀਕ ਅਤੇ
ਸੱੁਕੀ|ਅੱਜ ਬਦਲੀ ਗਈ|ਰਿ ਸਾਅ / ਗਿ ੱਲੀ|ਉੱਖੜ ਰਹੀ ਹੈ|ਨਾਸ਼ਤਾ|ਦੁਪਹਿ ਰ ਦਾ ਖਾਣਾ|ਰਾਤ ਦਾ ਖਾਣਾ|ਸਪਲੀਮੈਂਟ /
ਸਨੈਕਸ|ਲਿ ਆ ਗਿ ਆ|ਮਨ੍ਹਾ ਕੀਤਾ|ਮੰੂਹ ਰਾਹੀਂ ਕੁਝ ਨਹੀਂ (NBM)|ਆਪਣੇਆਪ|ਮਦਦ ਨਾਲ|ਉਤਸ਼ਾਹਿ ਤ ਕਰਨ ਤੇ|ਗਾੜਾ੍ਹ
ਤਰਲ ਪਦਾਰਥ",
g6: "ਪਾਸਾ ਪਰਤਣ ਦੀ ਯੋਜਨਾ|ਹਰ 2 ਘੰਟੇਬਾਅਦ ਪਾਸਾ|ਹਰ 3 ਘੰਟੇਬਾਅਦ ਪਾਸਾ|ਹਰ 4 ਘੰਟੇਬਾਅਦ ਪਾਸਾ|ਲੋੜ
ਅਨੁਸਾਰ / ਸਿ ਰਫ਼ ਆਰਾਮ ਲਈ|ਆਪਣੇਆਪ (ਖੁਦ ਪਾਸਾ ਲੈਂਦੇਹਨ)|ਸਥਿ ਤੀ (Position)|ਪਿ ੱਠ ਦੇਭਾਰ (Back)|ਖੱਬਾ
ਪਾਸਾ|ਸੱਜਾ ਪਾਸਾ|ਕੁਰਸੀ ਤੇਬੈਠੇ ਹਨ|ਤੁਰਨਾ-ਫਿ ਰਨਾ (Mobilising)|+ ਪਾਸਾ / ਸਥਿ ਤੀ ਦਰਜ ਕਰੋ|ਕਾਲ ਬੈੱਲ ਪਹੰੁਚ ਵਿ ੱਚ
ਹੈ|ਬੈੱਡ ਦੀਆਂ ਰੇਲਾਂ ਉੱਪਰ ਹਨ|ਏਅਰ ਮੈਟੈਸ੍ਰ ਚੈੱਕ ਕੀਤਾ ਗਿ ਆ|ਨਿ ਗਰਾਨੀ ਪੱਧਰ|ਪੱਧਰ 1: ਸਧਾਰਨ|ਪੱਧਰ 2: ਰੁਕ-ਰੁਕ
ਕੇ|ਪੱਧਰ 3: ਨਜ਼ਰ ਦੇਸਾਹਮਣੇ|ਪੱਧਰ 4: ਬਾਂਹ ਦੀ ਦੂਰੀ ਦੇਅੰਦਰ|ਮੂਡ / ਵਿ ਵਹਾਰ|ਸ਼ਾਂਤ ਅਤੇਸਹਿ ਯੋਗੀ|ਚਿ ੰਤਤ /
ਪਰੇਸ਼ਾਨ|ਉਤੇਜਿ ਤ / ਬੇਚੈਨ|ਉਦਾਸ / ਚੱੁਪਚਾਪ|ਉਲਝਿ ਆ ਹੋਇਆ (Confused)|ਆਵਾਜ਼ਾਂ ਮਾਰਨਾ|ਬਹੁਤ ਖੁਸ਼ /
ਉਤਸ਼ਾਹਿ ਤ|ਗੱੁਸੇਖੋਰ / ਹਮਲਾਵਰ|ਥਾਂ / ਗਤੀਵਿ ਧੀ|ਬਿ ਸਤਰੇਤੇਸੌਂਰਹੇਹਨ|ਬਿ ਸਤਰੇਤੇਆਰਾਮ ਕਰ ਰਹੇਹਨ|ਕੁਰਸੀ ਤੇ
ਬੈਠੇ ਹਨ|ਟਹਿ ਲ ਰਹੇਹਨ / ਬੇਚੈਨ|ਬਾਥਰੂਮ ਵਿ ੱਚ / ਨਿ ੱਜੀ ਸਫਾਈ|ਸਾਂਝੇਕਮਰੇਵਿ ੱਚ|ਮਿ ਲਣ ਵਾਲਿ ਆਂ ਨਾਲ|ਬਾਹਰ ਜਾਣ
ਦੀ ਕੋਸ਼ਿ ਸ਼|ਦਖਲਅੰਦਾਜ਼ੀ / ਕਲੀਨਿ ਕਲ ਕਾਰਨ|ਰੁਟੀਨ ਜਾਂਚ — ਸੁਰੱਖਿ ਅਤ ਅਤੇਸ਼ਾਂਤ|1:1 ਗੱਲਬਾਤ ਅਤੇਭਰੋਸਾ
ਦਿ ੱਤਾ|ਗੱਲਬਾਤ ਰਾਹੀਂ ਸ਼ਾਂਤ ਕੀਤਾ / ਧਿ ਆਨ ਵੰਡਾਇਆ|ਸਮਾਂ ਅਤੇਵਾਰਡ ਬਾਰੇਜਾਣਕਾਰੀ ਦਿ ੱਤੀ|ਆਲੇ-ਦੁਆਲੇਦੀ ਸੁਰੱਖਿ ਆ
ਚੈੱਕ ਕੀਤੀ|ਖਾਣ-ਪੀਣ ਲਈ ਉਤਸ਼ਾਹਿ ਤ ਕੀਤਾ|ਲੋੜ ਅਨੁਸਾਰ (PRN) ਦਵਾਈ ਦਿ ੱਤੀ ਗਈ|ਇੰਚਾਰਜ ਨਰਸ / ਡਾਕਟਰ ਨੰ ੂ
ਦੱਸਿ ਆ|ਵਾਧੂਨੋਟਸ (ਵਿ ਕਲਪਿ ਕ)|ਨਤੀਜਾ / ਕਾਰਵਾਈ|ਭਾਰ (kg)|ਕੱਦ (cm)|ID ਗੱੁਟ ਬੈਂਡ ਚੈੱਕ ਕੀਤਾ ਗਿ ਆ|ਮਰੀਜ਼
ਕੋਲ|ਵਾਰਡ ਦੇਲਾਕਰ ਵਿ ੱਚ|ਘਰ ਭੇਜ ਦਿ ੱਤਾ ਗਿ ਆ",
acvpu: "A (ਚੌਕਸ / Alert)|C (ਨਵੀਂ ਉਲਝਣ / Confusion)|V (ਆਵਾਜ਼ ਤੇਪ੍ਰਤੀਕਿ ਰਿ ਆ)|P (ਦਰਦ ਤੇ
ਪ੍ਰਤੀਕਿ ਰਿ ਆ)|U (ਬੇਹੋਸ਼ / ਕੋਈ ਪ੍ਰਤੀਕਿ ਰਿ ਆ ਨਹੀਂ)",
phrases: "ਨਿ ੱਜੀ ਸਫਾਈ ਕੀਤੀ ਗਈ|ਨਹਾਇਆ ਅਤੇਕੱਪੜੇਪੁਆਏ|ਦਬਾਅ ਵਾਲੇਹਿ ੱਸੇਠੀਕ ਹਨ|ਕੁਰਸੀ ਤੇਬਿ ਠਾਇਆ
ਗਿ ਆ|ਨਰਸ (RN) ਨੰ ੂਸੂਚਿ ਤ ਕੀਤਾ|ਪਰਿ ਵਾਰ ਨੰ ੂਜਾਣਕਾਰੀ ਦਿ ੱਤੀ ਗਈ",
tasks: "ਖੂਨ ਦੀ ਜਾਂਚ (Bloods)|ECG|ਵਾਈਟਲਸ ਦੁਬਾਰਾ ਲਓ|ਬਲੱਡ ਸ਼ੂਗਰ (BM)|ਬਲੈਡਰ ਸਕੈਨ|ਕੈਨੁਲਾ ਜਾਂਚ",
admits: "ਨਕਲੀ ਦੰਦ (Dentures)|ਐਨਕਾਂ|ਸੁਣਨ ਵਾਲੀ ਮਸ਼ੀਨ|ਵਾਕਿ ੰਗ ਫਰੇਮ / ਸੋਟੀ|ਫ਼ੋਨ ਅਤੇ
ਚਾਰਜਰ|ਚਾਬੀਆਂ|ਨਕਦੀ / ਬਟੂਆ", drSites: "ਸੈਕਰਮ (Sacrum)|ਖੱਬੀ ਅੱਡੀ|ਸੱਜੀ ਅੱਡੀ|ਖੱਬੀ ਲੱਤ|ਸੱਜੀ ਲੱਤ|ਪੇਟ (Abdomen)"
});
(ur (اردو 16. //
_regLang('ur', {
شفٹ سیٹ اپ|%100 آف الئن ڈیجیٹل شفٹ نوٹ پیڈ۔ ڈیٹا کبھی بھی آپ کے آلے سے باہر نہیں جاتا۔|صرف ذاتی شفٹ" 1:g
ان الک کریں )9.99£ الئف Pro Digipad Care|نوٹ پیڈ۔ یہ کوئی طبی مشورہ، تشخیص یا فیصلے کی مدد فراہم نہیں کرتا۔
ٹائم(|المحدود بیڈز، محفوظ وارڈ لے آؤٹ، تھیمز، ٹاسک االرم اور تمام ماڈیولز ان الک کرتا ہے۔|الئسنس کی درج کریں|ان الک
کریں|الئف ٹائم الئسنس کی حاصل کریں ←|ایپ کی ترجیحات اور اکائیاں|تھیم|کلینیکل ٹیل|ہیلتھ کیئر بلیو|اسکرب گرین|پلم اور
بیری|مڈنائٹ سلیٹ|وارم کورل|شفٹ کے اوقات|دن )07:00(|رات )19:00(|گلوکوز کی اکائی|درجہ حرارت کی اکائی|محفوظ شدہ
وارڈ لے آؤٹ|محفوظ لے آؤٹ منتخب کریں...|آپ کے مریضوں کے بیڈز )زیادہ سے زیادہ 4 حروف(|آج کی شفٹ کے لیے بیڈ
منتخب کرنے )✓( ی ( ہٹہٹا کے لیل نینی ٹیٹ کرکر:|ں|:اب تک کوکو بیب شاشا نہنہ کیک گیگی اواو بیب نمنم یا ابابتدا حرحر لکلکھ
اوا + ش +شا کرکر دبدبائی|بربر کرک آج کی شفش کے لیل کم از کم ایا بیب منمنت ( ب) کری (ک|+ شام + کریں|حذف کریں|+ نیا
محفوم کریں|فعال ماڈیماڈ (ولز) دک کے ےیے ٹک ےریں • ترتیت بدلنب کے ےیے ل ▼ دبائدب)|ئی نئے لے ےؤٹ کے ٹور پر
رحفوم کریں (ری) ںم رات) ر شفٹ کے اوقکے، وقات،اں ائی فعاو مفعاللز ڈ|ولز ولزع کشفٹ شروع کریں شر لیک بیڈک ملیےب
تھC ar D adipig شیئ خکر کرشف / ختما ریں pad Dig Car یڈزں|نتخبظ ریںں حفو شکر پر واپش جاپرں|اپس جائی|سبیڈی یڈ سسات
," /ڈیٹ|تصافم|ریںائیں|مارک|ائیںین رکشیده ین پوش نوٹہ پش وانو جاپر وا لیج کہیک بلی ٹکہ کربھ
کیا یہ اندراج حذف کریں؟|بیڈ کا انتظام|بیڈ کا نام بدلیں|مریض منتقل / تبدیل کریں|منزل کا بیڈ درج کریں )زیادہ سے زیادہ" 2:g
4 حروف(:|پہلے سے زیر استعمال ہے۔ کیا مریضوں کا تبادلہ کریں؟ )منسوخ = منزل پر اوور رائٹ کریں(|بیڈ خالی کریں
)ڈسچارج(|کیا اس بیڈ کا تمام شفٹ ڈیٹا صاف کر دیں؟|شفٹ سے بیڈ ہٹائیں|کیا اس بیڈ اور اس کے ڈیٹا کو شفٹ سے ہٹا دیں؟|اس
میں محفوظ کریں|لے آؤٹ میں محفوظ ہو گیا|شفٹ میں بیڈ شامل کریں|محفوظ وارڈ بیڈز )شامل کرنے کے لیے ٹیپ
جلد اور پٹیاں|خوراک|(Bowels (پاخانہ|(Fluids (مائعات|BP کریں(:|خالصہ|وائیٹلز|گلوکوز|لیٹ کر/کھڑے ہو کر
مکمل|مکمل نشان زد کریں|بیڈ مکمل|صرف بقایا|سب|(Admissions (داخلہ|(Tasks (کروٹ بدلنا|ذہنی صحت|نوٹس|کام|(Diet(
,"دکھائیں|اسکرین آن رکھیں|بیڈ کے لحاظ سے|ماڈیول کے لحاظ سے
ہوا /|(2%SpO (آکسیجن سیچوریشن|(RR (کب لیا گیا / سیاق و سباق|سانس کی رفتار|(Air (وقت|مقررہ وقت|ہوا" 3:g
درد|درد کا اسکور|(ACVPU (درجہ حرارت|چوکسی|(HR (نبض / دل کی دھڑکن|(Dia / Sys (بلڈ پریشر|(2O (آکسیجن
ناشتے سے پہلے )نہار منہ(|ناشتے کے بعد )2|(Glucose( (10-0|)نیزل کینوال|ماسک|وینچوری ماسک|بلڈ شوگر
گھنٹے(|دوپہر کے کھانے سے پہلے|دوپہر کے کھانے کے بعد )2 گھنٹے(|رات کے کھانے سے پہلے|رات کے کھانے کے بعد
)2 گھنٹے(|سونے سے پہلے|رات )02:00 - 04:00(|رینڈم / عالمات ہونے پر|دوبارہ چیک )ہائپو عالج کے بعد(|کھانے سے
کو اطالع دی گئی|لیٹ کر|کھڑے ہو کر|کوئی (RN (پہلے|کھانے کے بعد|رات|ہائپو کا عالج کیا گیا|کیٹونز چیک کیے گئے|نرس
,"عالمات نہیں|چکر آنا / سر گھومنا|کھڑے ہونے کے قابل نہیں
کیتھیٹر|پاخانہ|قے /|(Urine (کل|صاف کریں|گیال پیڈ|پیشاب|(Balance (توازن|(Output (آؤٹ پٹ|(Input (ان پٹ" 4:g
طریقہ|کم|درمیانہ|زیادہ|ہلکا|(BNO (پاخانہ نہیں آیا|(BNO (الٹی|مقدار|پاخانے کی قسم / گاڑھا پن )7-1(|پاخانہ نہیں آیا
نشان|سخت — قسم 1 )الگ الگ سخت گلٹیاں(|سخت — قسم 2 )گلٹی دار شکل(|نارمل — قسم 3 )دراڑوں والی شکل(|نارمل —
قسم 4 )ہموار اور نرم(|نرم — قسم 5 )نرم ٹکڑے(|پتال — قسم 6 )دلیے جیسا نرم(|مائع — قسم 7 )پانی جیسا(|ٹوائلٹ|کموڈ
,"(چیئر|بیڈ پین|پیڈ )انکونٹیننس
ایڑیاں|کہنیاں|محفوظ / درست|سرخ )دبانے سے سفید ہونا(|سرخ )دبانے سے سفید نہ|(Groin (جانگھ|(Sacrum (سیکرم" 5:g
ہونا(|نمی کا زخم / چھال ہوا|پھٹی ہوئی جلد / گہرا زخم|جلد کا پھٹنا / نیل پڑنا|خشک / نازک جلد|سب کو محفوظ نشان زد کریں|+
پنڈلی / ٹانگ|پاؤں / انگلیاں|بازو|کمر / ریڑھ کی ہڈی|کندھا|کان|دیگر|(Ankle (ٹخنہ|(Hip (جسم کا دیگر حصہ شامل کریں|کولہا
مقام / نوٹس|اگلی تبدیلی کب|پٹی|(Dressing (مقام|بایاں|دایاں|دونوں|بیریئر کریم|پوزیشن بدلی / دباؤ ہٹایا|ہیل بوٹس / تکیے|پٹی
لگانے / چیک کرنے کی تاریخ|آج|واجب االدا|تاریخ منتخب کریں|1 دن|2 دن|3 دن|5 دن|7 دن|درست اور خشک|آج بدلی
گئی|رساؤ / لیک ہورہی ہے|اکھڑ رہی ہے|ناشتہ|دوپہر کا کھانا|رات کا کھانا|سپلیمنٹس / اسنیکس|لے لیا|انکار کر دیا|منہ سے کچھ
,"خود مختار|مدد کے ساتھ|یاد دہانی کے ساتھ|گاڑھے مائعات|(NBM (نہیں
کروٹ / پوزیشن بدلنے کا پالن|ہر 2 گھنٹے بعد کروٹ|ہر 3 گھنٹے بعد کروٹ|ہر 4 گھنٹے بعد کروٹ|ضرورت کے" 6:g
بائیں کروٹ|دائیں کروٹ|کرسی پر|(Back (مطابق / صرف آرام کے لیے|خود مختار )خود کروٹ لیتے ہیں(|پوزیشن|کمر کے بل کروٹ / پوزیشن درج کریں|کال بیل پہنچ میں ہے|بیڈ ریلز اوپر ہیں|ایئر میٹرس چیک کیا +|(Mobilising (بیٹھے ہیں|چلنا پھرنا
گیا|نگرانی کا درجہ|درجہ :1 عمومی|درجہ :2 وقفے وقفے سے|درجہ :3 نظر کے سامنے|درجہ :4 ہاتھ کی پہنچ کے اندر|مزاج /
آوازیں|(Confused (کیفیت|پرسکون اور تعاون کرنے واال|پریشان / بے چین|مشتعل / بے قرار|اداس / خاموش|الجھن کا شکار
لگانا / پکارنا|پرجوش|جارحانہ / مخالفانہ|مقام / سرگرمی|بستر پر سو رہے ہیں|بستر پر آرام کر رہے ہیں|کرسی پر بیٹھے ہیں|ٹہل
رہے ہیں / بے چین|باتھ روم میں / ذاتی صفائی|مشترکہ کمرے میں|مالقاتیوں کے ساتھ|باہر نکلنے کی کوشش|اقدام / طبی
وجہ|معمول کا معائنہ — محفوظ اور پرسکون|1:1 بات چیت اور تسلی دی گئی|زبانی طور پر پرسکون کیا / توجہ ہٹائی|وقت اور
(PRN (وارڈ کے بارے میں آگاہ کیا|ماحول چیک کیا گیا اور محفوظ ہے|کھانے پینے کی ترغیب دی گئی|ضرورت کے مطابق
شناختی رسٹ بینڈ|(cm (قد|(kg (دوا دی گئی|انچارج نرس / ڈاکٹر کو مطلع کیا|اضافی نوٹس )اختیاری(|نتیجہ / کارروائی|وزن
,"چیک کیا گیا|مریض کے پاس|وارڈ کے الکر میں|گھر بھیج دیا گیا
بے ہوش / کوئی) U)|درد پر ردعمل) P)|آواز پر ردعمل) V)|Confusion / نئی الجھن) C)|Alert / چوکس) A ":acvpu
,"(ردعمل نہیں
ذاتی صفائی اور نگہداشت فراہم کی گئی|نہالیا اور کپڑے پہنائے گئے|دباؤ والی جگہیں محفوظ ہیں|کرسی پر بٹھایا" :phrases
,"کو مطلع کیا گیا|خاندان کو آگاہ کر دیا گیا (RN (گیا|نرس
,"بلیڈر اسکین|کینوال چیک کریں|(BM (وائیٹلز دوبارہ لیں|بلڈ شوگر|ECG)|Bloods (بلڈ ٹیسٹ" :tasks
,"عینک|سننے کی مشین|واکنگ فریم / چھڑی|فون اور چارجر|چابیاں|نقد رقم / بٹوہ|(Dentures (مصنوعی دانت" :admits
"(Abdomen (بائیں ایڑی|دائیں ایڑی|بائیں ٹانگ|دائیں ٹانگ|پیٹ|(Sacrum (سیکرم" :drSites
});
// 17. தமிழ் (ta)
_regLang('ta', {
g1: "ஷிப்ட் அமை ப்பு|100% ஆஃப்லை ன் டிஜிட்டல் ஷிப்ட் ந ோட்பே ட். தகவல்
உங்கள் சாதனத்தை விட்டு வெ ளியே றாது.|தனிப்பட்ட ஷிப்ட் குறிப்பே டு
மட்டுமே . மருத்துவ ஆல ோசனை , ந ோயறிதல் அல்லது முடிவு ஆதரவை
வழங்காது.|Care Digipad Pro-வை த் திறக்கவும் (£9.99 வாழ்நாள்)|வரம்பற்ற
படுக்கை கள், சே மித்த வார்டு அமை ப்புகள், தீம்கள், அலாரங்கள் மற்றும்
அனை த்து பகுதிகளை யும் திறக்கும்.|உரிமக் குறியட்ீ டை
உள்ளிடவும்|திறக்கவும்|வாழ்நாள் உரிமக் குறியட்ீ டை ப் பெ றுக
→|விருப்பத்தே ர்வுகள் & அலகுகள்|தீம்|கிளினிக்கல் டீல்|ஹெ ல்த்கே ர்
நீலம்|ஸ்க்ரப் பச்சை |பிளம் & பெ ர்ரி|மிட்நை ட் ஸ்லே ட்|வார்ம் க ோரல்|ஷிப்ட்
நே ரம்|பகல் (07:00)|இரவு (19:00)|குளுக்க ோஸ் அலகு|வெ ப்பநிலை அலகு|சே மித்த
வார்டு அமை ப்புகள்|சே மித்த அமை ப்பை த் தே ர்ந்தெ டுக்கவும்...|உங்கள் ந ோயாளி
படுக்கை கள் (அதிகபட்சம் 4 எழுத்துக்கள்)|இன்றை ய ஷிப்டிற்கு படுக்கை யை த்
தே ர்ந்தெ டுக்க (✓) அல்லது நீக்க கீழே தட்டவும்:|படுக்கை கள் இன்னும்
சே ர்க்கப்படவில்லை . மே லே படுக்கை எண்ணை உள்ளிட்டு + சே ர் என்பதை த்
தட்டவும்.|இன்றை ய ஷிப்டிற்கு குறை ந்தது ஒரு படுக்கை யை யாவது
தே ர்ந்தெ டுக்கவும் (✓).|+ சே ர்|நீக்கு|+ புதிதாகச் சே மி|செ யலில் உள்ள பகுதிகள்
(காட்ட டிக் செ ய்யவும் • வரிசை ப்படுத்த ▲ ▼ தட்டவும்)|அல்லது புதிய
அமை ப்பாகச் சே மிக்கவும் (எ.கா. இரவு)|⚙ ஷிப்ட் நே ரம், அலகுகள் & செ யலில்
உள்ள பகுதிகள் ▾|ஷிப்டை த் த ொடங்கு|த ொடங்க படுக்கை களை த்
தே ர்ந்தெ டுக்கவும்|சே மித்து ஷிப்டிற்குத் திரும்பு|படுக்கை |படுக்கை கள்|சக
ஊழியருடன் Care Digipad-ஐப் பகிரவும்|ஷிப்ட் முடிவு / தரவை
அழி|திருத்து|மறை |டார்க்|திரை மறை க்கப்பட்டுள்ளது|ஷிப்ட் குறிப்புகளுக்குத்
திரும்ப எங்கே னும் தட்டவும்", g2: "இந்தப் பதிவை நீக்கவா?|படுக்கை யை நிர்வகி|படுக்கை பெ யரை
மாற்று|ந ோயாளியை மாற்று / இடமாற்றம் செ ய்|இலக்கு படுக்கை யை
உள்ளிடவும் (அதிகபட்சம் 4 எழுத்துக்கள்):|பயன்பாட்டில் உள்ளது.
ந ோயாளிகளை மாற்றவா? (ரத்து = இலக்கை மே லெ ழுது)|படுக்கை யை காலி
செ ய் (டிஸ்சார்ஜ்)|இந்தப் படுக்கை யின் அனை த்து ஷிப்ட் தரவை யும்
அழிக்கவா?|ஷிப்டிலிருந்து படுக்கை யை அகற்று|இந்தப் படுக்கை யை யும்
அதன் தரவை யும் ஷிப்டிலிருந்து அகற்றவா?|இதில் சே மி|அமை ப்பில்
சே மிக்கப்பட்டது|ஷிப்டில் படுக்கை யை ச் சே ர்|சே மித்த வார்டு படுக்கை கள்
(சே ர்க்க தட்டவும்):|சுருக்கம்|வை ட்டல்ஸ்|குளுக்க ோஸ்|படுத்து/நின்று
BP|திரவங்கள் (Fluids)|மலம் (Bowels)|த ோல் & கட்டுகள்|உணவு (Diet)|புரட்டிப்
படுக்க வை த்தல்|மனநலம்|குறிப்புகள்|பணிகள் (Tasks)|சே ர்க்கை
(Admissions)|முடிந்தது|முடிந்ததாகக் குறி|படுக்கை முடிந்தது|நிலுவை யில்
உள்ளவை |அனை த்தும் காட்டு|திரை யை இயக்கத்தில் வை |படுக்கை
வாரியாக|பகுதி வாரியாக",
g3: "நே ரம்|உரிய நே ரம்|சாதாரண காற்று|எப்ப ோது எடுக்கப்பட்டது /
சூழல்|சுவாச வதீம் (RR)|ஆக்ஸிஜன் அளவு (SpO2%)|காற்று / ஆக்ஸிஜன்
(O2)|இரத்த அழுத்தம் (Sys / Dia)|நாடித்துடிப்பு / இதயத் துடிப்பு
(HR)|வெ ப்பநிலை |விழிப்புணர்வு (ACVPU)|வலி|வலி அளவு (0-10)|நாசி
கானுலா|முகமூடி (Mask)|வெ ஞ்சுரி மாஸ்க்|இரத்த சர்க்கரை (Glucose)|காலை
உணவுக்கு முன் (வெ றும் வயிற்றில்)|காலை உணவுக்குப் பின் (2
மணிநே ரம்)|மதிய உணவுக்கு முன்|மதிய உணவுக்குப் பின் (2
மணிநே ரம்)|இரவு உணவுக்கு முன்|இரவு உணவுக்குப் பின் (2
மணிநே ரம்)|படுக்கை க்குச் செ ல்லும் முன்|இரவு (02:00 - 04:00)|சீரற்ற / அறிகுறி
இருக்கும்ப ோது|மீண்டும் பரிச ோதனை (ஹை ப்ப ோ சிகிச்சை க்குப்
பின்)|உணவுக்கு முன்|உணவுக்குப் பின்|இரவு|ஹை ப்ப ோ
சிகிச்சை யளிக்கப்பட்டது|கீட்ட ோன்கள் சரிபார்க்கப்பட்டது|செ விலியரிடம் (RN)
தெ ரிவிக்கப்பட்டது|படுத்த நிலை யில்|நின்ற நிலை யில்|அறிகுறிகள்
இல்லை |தலை ச்சுற்றல் / மயக்கம்|நிற்க முடியவில்லை ",
g4: "உள்ளடுீ (Input)|வெ ளியடுீ (Output)|சமநிலை (Balance)|ம ொத்தம்|அழி|ஈரமான
பே ட்|சிறுநீர் (Urine)|கத்தீட்டர்|மலம்|வாந்தி|அளவு|மலத்தின் தன்மை / வகை
(1-7)|மலம் கழிக்கவில்லை (BNO)|மலம் கழிக்கவில்லை
(BNO)|முறை |சிறியது|நடுத்தரம்|பெ ரியது|சிறிதளவு கறை |கடினமானது — வகை 1
(தனித்தனி கடின கட்டிகள்)|கடினமானது — வகை 2 (கட்டியான
வடிவம்)|சாதாரணமானது — வகை 3 (விரிசல் க ொண்ட
வடிவம்)|சாதாரணமானது — வகை 4 (மெ ன்மை யானது)|மெ ன்மை யானது —
வகை 5 (மெ ன்மை யான துண்டுகள்)|தளர்வானது — வகை 6 (கூழ்
ப ோன்றது)|திரவம் — வகை 7 (நீர் ப ோன்றது)|கழிப்பறை |கம ோட்
நாற்காலி|பெ ட்பே ன்|பே ட் (Incontinent)",
g5: "சாக்ரம் (Sacrum)|த ொடை இடுக்கு
(Groin)|குதிகால்கள்|முழங்கை கள்|பாதிப்பில்லை (Intact)|சிவப்பு (அழுத்தினால்
வெ ளுக்கும்)|சிவப்பு (அழுத்தினால் வெ ளுக்காது)|ஈரப்பதப் புண் / சிராய்ப்பு|புண்
/ குழி|த ோல் கிழிவு / சிராய்ப்பு|வறண்ட / மெ ன்மை யான த ோல்|அனை த்தும் பாதிப்பில்லை எனக் குறி|+ உடல் பகுதியை ச் சே ர்|இடுப்பு (Hip)|கணுக்கால்
(Ankle)|முழங்கால் கீழ் / கால்|பாதம் / விரல்கள்|கை / முன்கை |முதுகு /
முதுகெ லும்பு|த ோள்பட்டை |காது|மற்ற பகுதி|இடது|வலது|இரண்டும்|பே ரியர்
கிரீம்|நிலை மாற்றப்பட்டது / அழுத்தம் குறை க்கப்பட்டது|குதிகால் பூட்ஸ் /
தலை யணை கள்|கட்டு (Dressing)|இடம் / குறிப்புகள்|அடுத்த மாற்றம்|கட்டு
ப ோட்ட / சரிபார்த்த தே தி|இன்று|மாற்ற வே ண்டிய தே தி|தே தியை த்
தே ர்ந்தெ டு|1 நாள்|2 நாட்கள்|3 நாட்கள்|5 நாட்கள்|7 நாட்கள்|நன்றாக & உலர்ந்து
உள்ளது|இன்று மாற்றப்பட்டது|கசிவு உள்ளது|பிரிந்து வருகிறது|காலை
உணவு|மதிய உணவு|இரவு உணவு|சத்துணவு /
சிற்றுண்டி|எடுத்துக்க ொண்டார்|மறுத்துவிட்டார்|வாய் வழியாக எதுவும்
இல்லை (NBM)|தானாக|உதவியுடன்|ஊக்குவிப்புடன்|தடிப்பான திரவங்கள்",
g6: "புரட்டிப் படுக்க வை க்கும் திட்டம்|2 மணி நே ரத்திற்கு ஒருமுறை |3 மணி
நே ரத்திற்கு ஒருமுறை |4 மணி நே ரத்திற்கு ஒருமுறை |தே வை ப்பட்டால் /
வசதிக்காக மட்டும்|சுயமாக (தானாகத் திரும்புவார்)|நிலை (Position)|மல்லாந்து
(Back)|இடது பக்கம்|வலது பக்கம்|நாற்காலியில் அமர்ந்துள்ளார்|நடக்கிறார்
(Mobilising)|+ நிலை மாற்றத்தை ப் பதிவு செ ய்|அழை ப்பு மணி கை க்கு எட்டும்
தூரத்தில்|படுக்கை கம்பிகள் உயர்த்தப்பட்டுள்ளன|காற்று மெ த்தை
சரிபார்க்கப்பட்டது|கண்காணிப்பு நிலை |நிலை 1: ப ொதுவானது|நிலை 2:
இடை யிடை யே |நிலை 3: கண் பார்வை யில்|நிலை 4: கை க்கு எட்டும்
தூரத்தில்|மனநிலை / நடத்தை |அமை தியான & ஒத்துழை க்கும்|பதட்டமான /
கவலை யான|பரபரப்பான / அமை தியற்ற|ச ோர்வான /
ஒதுங்கியிருக்கும்|குழப்பமான (Confused)|சத்தமிடும் / அழை க்கும்|மிகுந்த
உற்சாகமான|எதிர்க்கும் / ஆக்கிரமிப்பு|இடம் / செ யல்பாடு|படுக்கை யில்
தூங்குகிறார்|படுக்கை யில் ஓய்வெ டுக்கிறார்|நாற்காலியில்
அமர்ந்துள்ளார்|நடந்து க ொண்டிருக்கிறார்|குளியலறை யில் / தன் சுத்தம்|ப ொது
அறை யில்|பார்வை யாளர்களுடன்|வெ ளியே ற முயற்சிக்கிறார்|நடவடிக்கை /
மருத்துவக் காரணம்|வழக்கமான ச ோதனை — பாதுகாப்பாக & அமை தியாக
உள்ளார்|1:1 உரை யாடல் & ஆறுதல் அளிக்கப்பட்டது|பே ச்சு மூலம்
அமை திப்படுத்தப்பட்டது|நே ரம் & வார்டு நினை வூட்டப்பட்டது|சூழல்
சரிபார்க்கப்பட்டு பாதுகாப்பாக உள்ளது|உணவு & நீர் எடுக்க
ஊக்குவிக்கப்பட்டது|தே வை க்கே ற்ப (PRN) மருந்து வழங்கப்பட்டது|ப ொறுப்பு
செ விலியர் / மருத்துவரிடம் தெ ரிவிக்கப்பட்டது|கூடுதல் குறிப்புகள்
(விருப்பப்பட்டால்)|முடிவு / நடவடிக்கை |எடை (kg)|உயரம் (cm)|அடை யாளப்
பட்டை சரிபார்க்கப்பட்டது|ந ோயாளியுடன்|வார்டு பாதுகாப்புப்
பெ ட்டகத்தில்|வட்ீ டிற்கு அனுப்பப்பட்டது",
acvpu: "A (விழிப்புடன் / Alert)|C (புதிய குழப்பம்)|V (குரலுக்கு எதிர்வினை )|P
(வலிக்கு எதிர்வினை )|U (சுயநினை வற்ற / எதிர்வினை இல்லை )",
phrases: "தன் சுத்தம் செ ய்யப்பட்டது|குளிப்பாட்டி உடை
மாற்றப்பட்டது|அழுத்தப் பகுதிகள் பாதிப்பின்றி உள்ளன|நாற்காலியில் அமர
வை க்கப்பட்டார்|செ விலியரிடம் (RN) தெ ரிவிக்கப்பட்டது|குடும்பத்தினருக்குத்
தகவல் தெ ரிவிக்கப்பட்டது", tasks: "இரத்தப் பரிச ோதனை |ECG|வை ட்டல்ஸ் மீண்டும் எடுக்கவும்|இரத்த
சர்க்கரை (BM)|சிறுநீர்ப்பை ஸ்கே ன்|கானுலா ச ோதனை ",
admits: "செ யற்கை ப் பல்|மூக்குக் கண்ணாடி|காது கே ட்கும் கருவி|வாக்கிங்
பிரே ம் / ஊன்றுக ோல்|த ொலை பே சி & சார்ஜர்|சாவிகள்|பணம் / பர்ஸ்",
drSites: "சாக்ரம் (Sacrum)|இடது குதிகால்|வலது குதிகால்|இடது கால்|வலது
கால்|வயிறு (Abdomen)"
});
// 18. മലയാ ളം (ml)
_regLang('ml', {
g1: "ഷി ഫ്റ്റ് സജ്ജീ കരണം |100% ഓഫ്‌ലൈ ൻ ഡി ജി റ്റൽ ഷി ഫ്റ്റ് നോ ട്ട്പാ ഡ്. ഡാ റ്റ ഒരി ക്കലും നി ങ്ങളുടെ
ഫോ ണി ൽ നി ന്ന് പുറത്തുപോ കി ല്ല.|വ്യ ക്തി ഗത ഷി ഫ്റ്റ് നോ ട്ട്പാ ഡ് മാ ത്രം . വൈ ദ്യോ പദേ ശമോ
രോ ഗനി ർണയമോ നൽകു ന്നി ല്ല.|Care Digipad Pro അൺലോ ക്ക് ചെ യ്യുക (£9.99 ലൈ ഫ്
ടൈം )|അൺലി മി റ്റഡ് ബെ ഡുകൾ, സേ വ് ചെ യ്ത വാ ർഡ് ലേ ഔട്ടുകൾ, തീ മുകൾ, ടാ സ്ക് അലാ റങ്ങൾ, എല്ലാ
മൊ ഡ്യൂ ളുകളും ലഭ്യ മാ ക്കുന്നു.|ലൈ സൻസ് കീ നൽകു ക|അൺലോ ക്ക്|ലൈ ഫ് ടൈം ലൈ സൻസ് കീ നേ ടുക
→|ആപ്പ് ക്രമീ കരണങ്ങളും യൂണി റ്റുകളും |തീം |ക്ലി നി ക്കൽ ടീ ൽ|ഹെ ൽത്ത്കെ യർ ബ്ലൂ|സ്ക്രബ് ഗ്രീ ൻ|പ്ലം &
ബെ റി |മി ഡ്നൈ റ്റ് സ്ലേ റ്റ്|വാം കോ റൽ|ഷി ഫ്റ്റ് സമയം |പകൽ (07:00)|രാ ത്രി (19:00)|ഗ്ലൂക്കോ സ്
യൂണി റ്റ്|താ പനി ല യൂണി റ്റ്|സേ വ് ചെ യ്ത വാ ർഡ് ലേ ഔട്ടുകൾ|സേ വ് ചെ യ്ത ലേ ഔട്ട് തി രഞ്ഞെ ടുക്കുക...|നി ങ്ങളുടെ
രോ ഗി കളുടെ ബെ ഡുകൾ (പരമാ വധി 4 അക്ഷരങ്ങൾ)|ഇന്നത്തെ ഷി ഫ്റ്റി നാ യി ബെ ഡ് തി രഞ്ഞെ ടുക്കാ ൻ (✓)
അല്ലെ ങ്കി ൽ ഒഴി വാ ക്കാ ൻ താ ഴെ ടാ പ്പ് ചെ യ്യുക:|ബെ ഡുകൾ ഒന്നും ചേ ർത്തിട്ടി ല്ല. മുകളി ൽ ബെ ഡ് നമ്പറോ
പേ രി ന്റെ ആദ്യ അക്ഷരങ്ങളോ നൽകി + ചേ ർക്കു ക അമർത്തു ക.|ഇന്നത്തെ ഷി ഫ്റ്റി നാ യി കുറഞ്ഞത് ഒരു
ബെ ഡ് എങ്കി ലും തി രഞ്ഞെ ടുക്കുക (✓).|+ ചേ ർക്കു ക|നീ ക്കു ക|+ പുതി യത് സേ വ് ചെ യ്യുക|സജീ വ മൊ ഡ്യൂ ളുകൾ
(കാ ണി ക്കാ ൻ ടി ക്ക് ചെ യ്യുക • ക്രമം മാ റ്റാ ൻ ▲ ▼ അമർത്തു ക)|അല്ലെ ങ്കി ൽ പുതി യ ലേ ഔട്ട് ആയി സേ വ്
ചെ യ്യുക (ഉദാ . രാ ത്രി )|⚙ ഷി ഫ്റ്റ് സമയം , യൂണി റ്റുകൾ & മൊ ഡ്യൂ ളുകൾ ▾|ഷി ഫ്റ്റ് ആരം ഭി ക്കുക|ആരം ഭി ക്കാ ൻ
ബെ ഡുകൾ തി രഞ്ഞെ ടുക്കുക|സേ വ് ചെ യ്ത് ഷി ഫ്റ്റി ലേ ക്ക് മടങ്ങുക|ബെ ഡ്|ബെ ഡുകൾ|സഹപ്ര വർത്തകരു മാ യി
Care Digipad പങ്കി ടുക|ഷി ഫ്റ്റ് അവസാ നി പ്പി ക്കുക / ഡാ റ്റ മാ യ്ക്കുക|മാ റ്റുക|മറയ്ക്കുക|ഡാ ർക്ക്|സ്ക്രീ ൻ
മറച്ചി രി ക്കുന്നു|ഷി ഫ്റ്റ് നോ ട്ടുകളി ലേ ക്ക് മടങ്ങാ ൻ എവി ടെ യെ ങ്കി ലും ടാ പ്പ് ചെ യ്യുക",
g2: "ഈ എൻട്രി നീ ക്കം ചെ യ്യണോ ?|ബെ ഡ് നി യന്ത്രി ക്കുക|ബെ ഡി ന്റെ പേ ര് മാ റ്റുക|രോ ഗി യെ മാ റ്റുക /
പരസ്പരം മാ റ്റുക|ലക്ഷ്യ സ്ഥാ ന ബെ ഡ് നൽകു ക (പരമാ വധി 4 അക്ഷരങ്ങൾ):|ഒഴി വി ല്ല. രോ ഗി കളെ പരസ്പരം
മാ റ്റണോ ? (റദ്ദാ ക്കുക = ലക്ഷ്യ സ്ഥാ നത്ത് ഓവർറൈ റ്റ് ചെ യ്യുക)|ബെ ഡ് ഒഴി വാ ക്കുക (ഡി സ്ചാ ർജ്)|ഈ
ബെ ഡി ന്റെ എല്ലാ ഷി ഫ്റ്റ് ഡാ റ്റയും മാ യ്ക്കണോ ?|ഷി ഫ്റ്റി ൽ നി ന്ന് ബെ ഡ് നീ ക്കുക|ഈ ബെ ഡും അതി ന്റെ ഡാ റ്റയും
ഷി ഫ്റ്റി ൽ നി ന്ന് നീ ക്കം ചെ യ്യണോ ?|ഇതി ലേ ക്ക് സേ വ് ചെ യ്യുക|ലേ ഔട്ടി ൽ സേ വ് ചെ യ്തു|ഷി ഫ്റ്റി ലേ ക്ക് ബെ ഡ്
ചേ ർക്കു ക|സേ വ് ചെ യ്ത വാ ർഡ് ബെ ഡുകൾ (ചേ ർക്കാ ൻ ടാ പ്പ്
ചെ യ്യുക):|സം ഗ്രഹം |വൈ റ്റൽസ്|ഗ്ലൂ ക്കോ സ്|കി ടന്നും /നി ന്നും BP|ദ്രാ വകങ്ങൾ
(Fluids)|മലവി സർജ്ജനം |ചർമ്മവും ഡ്രസ്സിം ഗും |ഭക്ഷണം
(Diet)|തി രി ച്ചുകി ടത്തൽ|മാ നസി കാ രോ ഗ്യം |കു റി പ്പു കൾ|ജോ ലി കൾ
(Tasks)|അഡ്മി ഷൻ|പൂ ർത്തിയാ യി |പൂ ർത്തിയാ യതാ യി അടയാ ളപ്പെ ടുത്തുക|ബെ ഡ്
പൂർത്തിയാ യി |ബാ ക്കി യു ള്ളവ മാ ത്രം |എല്ലാം കാ ണി ക്കുക|സ്ക്രീ ൻ ഓൺ ആക്കി വെ ക്കുക|ബെ ഡ്
അടി സ്ഥാ നത്തി ൽ|മൊ ഡ്യൂ ൾ അടി സ്ഥാ നത്തി ൽ",
g3: "സമയം |നി ശ്ചി ത സമയം |സാ ധാ രണ വാ യു|എപ്പോ ൾ എടുത്തു / സന്ദർഭം |ശ്വ സന നി രക്ക് (RR)|ഓക്സി ജൻ
അളവ് (SpO2%)|വാ യു / ഓക്സി ജൻ (O2)|രക്തസമ്മർദ്ദം (Sys / Dia)|മി ടി പ്പ് / ഹൃദയമി ടി പ്പ്
(HR)|താ പനി ല|ബോ ധനി ല (ACVPU)|വേ ദന|വേ ദന സ്കോ ർ (0-10)|നേ സൽ കാ നുല|മാ സ്ക്|വെ ഞ്ചുറി
മാ സ്ക്|ബ്ലഡ് ഷുഗർ (Glucose)|പ്രഭാ തഭക്ഷണത്തി ന് മുമ്പ് (വെ റും വയറ്റി ൽ)|പ്ര ഭാ തഭക്ഷണത്തിന് ശേ ഷം (2
മണി ക്കൂർ)|ഉച്ചഭക്ഷണത്തിന് മുമ്പ്|ഉച്ചഭക്ഷണത്തി ന് ശേ ഷം (2 മണി ക്കൂർ)|അത്താ ഴത്തിന് മുമ്പ്|അത്താ ഴത്തി ന് ശേ ഷം (2 മണി ക്കൂർ)|ഉറങ്ങു ന്നതി ന് മുമ്പ്|രാ ത്രി (02:00 - 04:00)|റാ ൻഡം /
ലക്ഷണങ്ങൾ ഉള്ളപ്പോ ൾ|വീണ്ടും പരി ശോ ധന (ഹൈ പ്പോ ചി കി ത്സയ്ക്ക് ശേ ഷം )|ഭക്ഷണത്തി ന്
മുമ്പ്|ഭക്ഷണത്തി ന് ശേ ഷം |രാ ത്രി |ഹൈ പ്പോ ചി കി ത്സ നൽകി |കീ റ്റോ ണു കൾ പരി ശോ ധി ച്ചു|നഴ്സി നെ (RN)
അറി യി ച്ചു|കി ടന്നുകൊ ണ്ട്|നി ന്നുകൊ ണ്ട്|ലക്ഷണങ്ങൾ ഇല്ല|തലകറക്കം |നി ൽക്കാ ൻ കഴി യുന്നി ല്ല",
g4: "അകത്തേ ക്ക് (Input)|പുറത്തേ ക്ക് (Output)|ബാ ലൻസ്|ആകെ |മാ യ്ക്കു ക|നനഞ്ഞപാ ഡ്|മൂത്രം
(Urine)|കത്തീ റ്റർ|മലം |ഛർദ്ദി |അളവ്|മലത്തിന്റെ സ്വ ഭാ വം / തരം (1-7)|മലവി സർജ്ജനം നടന്നി ല്ല
(BNO)|മലവി സർജ്ജനം നടന്നി ല്ല (BNO)|രീ തി |കുറച്ച്|ഇടത്തരം |കൂടുതൽ|നേ രി യ കറ|കട്ടി യുള്ളത് — തരം 1
(വേ റി ട്ട കട്ടി യുള്ള കട്ടകൾ)|കട്ടി യു ള്ളത് — തരം 2 (കട്ടപി ടി ച്ച രൂപം )|സാ ധാ രണ — തരം 3 (വി ള്ളലുകളുള്ള
രൂപം )|സാ ധാ രണ — തരം 4 (മി നുസമുള്ളതും മൃദുവാ യതും )|മൃദുവാ യത് — തരം 5 (മൃദുവാ യ
കഷണങ്ങൾ)|അയഞ്ഞത് — തരം 6 (കുഴമ്പ് രൂപത്തി ൽ)|ദ്രാ വകം — തരം 7 (വെ ള്ളം
പോ ലെ )|ടോ യ്‌ലറ്റ്|കമ്മോ ഡ് ചെ യർ|ബെ ഡ്പാ ൻ|പാ ഡ് (ഇൻകോ ണ്ടിനൻസ്)",
g5: "സാ ക്രം (Sacrum)|തുടയി ടുക്ക് (Groin)|ഉപ്പൂറ്റി |കൈ മുട്ടുകൾ|തകരാ റി ല്ല (Intact)|ചുവപ്പ്
(അമർത്തു മ്പോ ൾ നി റം മങ്ങുന്നത്)|ചുവപ്പ് (അമർത്തു മ്പോ ൾ നി റം മങ്ങാ ത്തത്)|ഈർപ്പം കൊ ണ്ടുള്ള
മുറി വ്|പൊ ട്ടി യ ചർമ്മം / കുഴി |ചർമ്മം കീ റൽ / ചതവ്|വരണ്ട / ദുർബലമാ യ ചർമ്മം |എല്ലാം തകരാ റി ല്ലെ ന്ന്
അടയാ ളപ്പെ ടുത്തുക|+ ശരീ രഭാ ഗം ചേ ർക്കു ക|ഇടു പ്പ് (Hip)|കണങ്കാ ൽ (Ankle)|കണങ്കാ ൽ / കാ ൽ|പാ ദം /
വി രലുകൾ|കൈ / മുൻകൈ |പു റം / നട്ടെ ല്ല്|തോ ൾ|ചെ വി |മറ്റ് ഭാ ഗം |ഇടത്|വലത്|രണ്ടും |ബാ രി യർ ക്രീം |സ്ഥാ നം
മാ റ്റി / സമ്മർദ്ദം ഒഴി വാ ക്കി |ഹീ ൽ ബൂട്ട്സ് / തലയി ണകൾ|ഡ്ര സ്സിം ഗ്|സ്ഥാ നം / കുറി പ്പുകൾ|അടു ത്ത
മാ റ്റം |ഡ്രസ്സിം ഗ് ചെ യ്ത / പരി ശോ ധി ച്ച തീ യതി |ഇന്ന്|അവസാ ന തീ യതി |തീ യതി തി രഞ്ഞെ ടുക്കുക|1 ദി വസം |2
ദി വസം |3 ദി വസം |5 ദി വസം |7 ദി വസം |നല്ലതും ഉണങ്ങി യതും |ഇന്ന് മാ റ്റി |ചോ ർച്ചയു ണ്ട്|ഇളകി
വരുന്നു|പ്രഭാ തഭക്ഷണം |ഉച്ചഭക്ഷണം |അത്താ ഴം |സപ്ലി മെ ന്റുകൾ / ലഘുഭക്ഷണം |കഴി ച്ചു|നി രസി ച്ചു|വാ യി ലൂടെ ഒന്നും
നൽകരു ത് (NBM)|സ്വ യം |സഹാ യത്തോ ടെ |പ്രോ ത്സാ ഹി പ്പി ച്ച്|കട്ടി യാ ക്കി യ ദ്രാ വകങ്ങൾ",
g6: "തി രി ച്ചുകി ടത്തൽ പ്ലാ ൻ|2 മണി ക്കൂർ കൂടുമ്പോ ൾ|3 മണി ക്കൂർ കൂടുമ്പോ ൾ|4 മണി ക്കൂർ
കൂടുമ്പോ ൾ|ആവശ്യാ നു സരണം / ആശ്വാ സത്തി ന് മാ ത്രം |സ്വ യം (തനി യെ തി രി ഞ്ഞുകി ടക്കും )|സ്ഥാ നം
(Position)|മലർന്ന് (Back)|ഇടത് വശം |വലത് വശം |കസേ രയി ൽ ഇരി ക്കുന്നു|നടക്കുന്നു (Mobilising)|+ സ്ഥാ നം
രേ ഖപ്പെ ടുത്തുക|കോ ൾ ബെ ൽ കയ്യെ ത്തും ദൂരത്ത്|ബെ ഡ് റെ യി ലുകൾ ഉയർത്തിയി ട്ടു ണ്ട്|എയർ മെ ത്ത
പരി ശോ ധി ച്ചു|നി രീ ക്ഷണ നി ല|നി ല 1: പൊ തുവാ യത്|നി ല 2: ഇടയ്ക്കി ടെ |നി ല 3: കൺമു ന്നി ൽ|നി ല 4:
കയ്യെ ത്തും ദൂരത്ത്|മാ നസി കാ വസ്ഥ / പെ രുമാ റ്റം |ശാ ന്തവും സഹകരി ക്കുന്നതും |ഉത്കണ്ഠയുള്ള /
വി ഷമി ക്കുന്ന|അസ്വ സ്ഥമാ യ / ഇളക്കമുള്ള|വി ഷാ ദമുള്ള / ഒതുങ്ങി ക്കൂടി യ|ആശയക്കുഴപ്പമുള്ള
(Confused)|ഒച്ചവെ ക്കുന്ന / വി ളി ച്ചുപറയുന്ന|അമി ത ആവേ ശമുള്ള|ശത്രുതാ പരമാ യ / അക്രമാ സക്തമാ യ|സ്ഥലം /
പ്രവൃത്തി |കട്ടി ലി ൽ ഉറങ്ങുന്നു|കട്ടി ലി ൽ വി ശ്രമി ക്കുന്നു|കസേ രയി ൽ ഇരി ക്കുന്നു|നടക്കുന്നു / അസ്വ സ്ഥമാ യി
നടക്കുന്നു|കുളി മുറി യി ൽ / വ്യ ക്തി ഗത ശുചി ത്വം |പൊ തു മുറി യി ൽ|സന്ദർശകരോ ടൊ പ്പം |പു റത്തു പോ കാ ൻ
ശ്രമി ക്കുന്നു|ഇടപെ ടൽ / ക്ലി നി ക്കൽ കാ രണം |പതി വ് പരി ശോ ധന — സുരക്ഷി തവും ശാ ന്തവുമാ ണ്|1:1
സം ഭാ ഷണവും ആശ്വാ സവും നൽകി |സം സാ രി ച്ച് ശാ ന്തമാ ക്കി / ശ്രദ്ധ തി രി ച്ചു|സമയവും വാ ർഡും
മനസ്സി ലാ ക്കി ക്കൊ ടുത്തു|ചുറ്റുപാ ടും പരി ശോ ധി ച്ച് സുരക്ഷി തമാ ക്കി |ഭക്ഷണവും വെ ള്ളവും നൽകാ ൻ
പ്രോ ത്സാ ഹി പ്പി ച്ചു|ആവശ്യാ നുസരണം (PRN) മരുന്ന് നൽകി |ചു മതലയു ള്ള നഴ്സി നെ / ഡോ ക്ടറെ
അറി യി ച്ചു|കൂടുതൽ കുറി പ്പുകൾ (ഓപ്ഷണൽ)|ഫലം / നടപടി |ഭാ രം (kg)|ഉയരം (cm)|ഐഡി റി സ്റ്റ് ബാ ൻഡ്
പരി ശോ ധി ച്ചു|രോ ഗി യുടെ കൈ വശം |വാ ർഡ് ലോ ക്കറി ൽ|വീ ട്ടി ലേ ക്ക് കൊ ടുത്തുവി ട്ടു",
acvpu: "A (ജാ ഗ്രതയുള്ള / Alert)|C (പുതി യ ആശയക്കുഴപ്പം )|V (ശബ്ദത്തോ ട് പ്രതി കരി ക്കുന്നു)|P (വേ ദനയോ ട്
പ്രതി കരി ക്കുന്നു)|U (പ്രതി കരി ക്കുന്നി ല്ല / ബോ ധമി ല്ല)",
phrases: "വ്യ ക്തി ഗത ശുചി ത്വ പരി ചരണം നൽകി |കു ളി പ്പി ച്ച് വസ്ത്രം ധരി പ്പി ച്ചു|സമ്മർദ്ദ ഭാ ഗങ്ങളി ൽ
തകരാ റുകളി ല്ല|കസേ രയി ലേ ക്ക് മാ റ്റി യി രുത്തി |നഴ്സി നെ (RN) അറി യി ച്ചു|കുടും ബാം ഗങ്ങളെ വി വരം അറി യി ച്ചു",
tasks: "രക്തപരി ശോ ധന (Bloods)|ECG|വൈ റ്റൽസ് വീ ണ്ടും എടുക്കുക|ബ്ലഡ് ഷുഗർ (BM)|ബ്ലാ ഡർ
സ്കാ ൻ|കാ നു ല പരി ശോ ധന", admits: "വയ്പുപല്ല് (Dentures)|കണ്ണട|ശ്രവണ സഹാ യി |വാ ക്കിം ഗ് ഫ്രെ യിം / വടി |ഫോ ണും
ചാ ർജറും |താ ക്കോ ലു കൾ|പണം / പേ ഴ്സ്",
drSites: "സാ ക്രം (Sacrum)|ഇടത് ഉപ്പൂറ്റി |വലത് ഉപ്പൂറ്റി |ഇടത് കാ ൽ|വലത് കാ ൽ|വയറ് (Abdomen)"
});
// 19. 中文 (简体) (zh)
_regLang('zh', {
g1: "班次设置|100% 离线数字交班记事本。数据绝不离开您的设备。|仅作个人交班记事本。不
提供临床建议、诊断或决策支持。|解锁 Care Digipad Pro (£9.99 终身版)|解锁无限床位、保存病
区布局、自定义主题、任务提醒及所有专科模块。|输入许可证密钥|解锁|获取终身许可证密钥 →|
应用偏好与单位|主题|临床青|医护蓝|手术绿|梅子浆果|午夜石板|温暖珊瑚|班次时间|白班
(07:00)|夜班 (19:00)|血糖单位|体温单位|已保存的病区布局|选择已保存的布局...|您的患者床位
(最多4个字符)|点击下方床位以选择 (✓) 或取消选择今日班次床位：|尚未添加床位。请在上方输
入床号或姓名缩写并点击 + 添加。|请至少点击选择一个 (✓) 今日班次的床位。|+ 添加|删除|+ 保
存新布局|启用模块 (勾选显示 • 点击 ▲ ▼ 排序)|或另存为新布局 (如：夜班)|⚙ 班次时间、单位与
启用模块 ▾|开始交班记录|选择床位以开始|保存并返回班次|张床|张床|与同事分享 Care Digipad|
结束班次 / 清除数据|编辑|隐藏|深色|屏幕已隐藏|点击任意位置返回交班记录",
g2: "确定删除此条记录？|管理床位|重命名床位|转床 / 互换患者|输入目标床位 (最多4个字符)：|
已有患者。是否互换患者？(取消 = 覆盖目标床位)|清空床位 (出院)|确定清除此床位的所有本班
数据？|从本班移除床位|确定从本班移除此床位及其数据？|保存至|已保存至布局|班次中新增床
位|已保存的病区床位 (点击添加)：|汇总|生命体征|血糖|卧/立位血压|出入量|大便|皮肤与敷料|饮
食|翻身|精神心理|护理记录|待办任务|入院物品|已完成|标记完成|整床完成|仅看未完成|显示全部|
保持屏幕常亮|按床位|按模块",
g3: "时间|到期时间|空气|测量时间 / 状态|呼吸频率 (RR)|血氧饱和度 (SpO2%)|空气 / 吸氧 (O2)|
血压 (收缩压 / 舒张压)|脉搏 / 心率 (HR)|体温|意识状态 (ACVPU)|疼痛|疼痛评分 (0-10)|鼻导管|
面罩|文丘里面罩|血糖值|早餐前 (空腹)|早餐后 (2小时)|午餐前|午餐后 (2小时)|晚餐前|晚餐后 (2
小时)|睡前|夜间 (02:00 - 04:00)|随机 / 有症状时|复测 (低血糖处理后)|餐前|餐后|夜间|低血糖已
处理|已查酮体|已上报责任护士 (RN)|卧位|立位|无症状|头晕 / 眩晕|无法站立",
g4: "入量|出量|平衡|总计|清除|湿尿垫|尿量 (自解)|导尿管|大便|呕吐|量|性状 / 布里斯托分型
(1-7)|未解大便 (BNO)|未解大便 (BNO)|方式|少量|中量|大量|微量/便迹|硬便 — 1型 (分离的硬块/
坚果状)|硬便 — 2型 (块状香肠形)|正常 — 3型 (表面有裂纹的香肠形)|正常 — 4型 (光滑柔软的香
肠形)|软便 — 5型 (边缘清晰的软块)|糊状便 — 6型 (蓬松糊状)|水样便 — 7型 (完全液体/无固体)|
马桶|便盆椅|便盆|尿垫 (失禁)",
g5: "骶尾部|腹股沟|足跟|肘部|完好|发红 (指压变白)|发红 (指压不变白)|潮湿相关性皮损 / 破皮|
破损 / 溃疡空腔|皮肤撕裂伤 / 瘀斑|干燥 / 脆弱|全部标记为完好|+ 添加身体部位|髋部|踝部|小腿|
足部 / 脚趾|手臂 / 前臂|背部 / 脊柱|肩部|耳部|其他部位|左侧|右侧|双侧|护肤隔离霜|已翻身 / 减
压|足跟减压靴 / 软枕|敷料|部位 / 备注|下次更换周期|更换 / 检查日期|今天|到期|选择日期|1天|2
天|3天|5天|7天|完好干燥|今日已换|渗液 / 渗漏|卷边 / 松脱|早餐|午餐|晚餐|营养补充剂 / 加餐|已
进食|拒食|禁食禁水 (NBM)|自主进食|协助进食|督促下进食|增稠流质",
g6: "翻身 / 体位计划|每2小时翻身|每3小时翻身|每4小时翻身|按需 / 仅舒适护理|自主翻身 (可自
行活动)|体位|平卧 (背部)|左侧卧|右侧卧|坐椅|下床活动 / 行走|+ 记录翻身 / 体位|呼叫器在手边|
床栏已拉起|气垫床已检查|护理观察级别|1级：常规观察|2级：间歇观察|3级：视线范围内|4级：一臂
距离内|情绪 / 表现|平静且配合|焦虑 / 痛苦|躁动 / 不安|情绪低落 / 退缩|意识模糊 / 定向障碍|大
声呼喊|情绪高涨|敌对 / 攻击性|位置 / 活动|在床睡眠|在床休息|坐在椅上|来回走动 / 踱步|在卫生 间 / 个人护理|在公共活动区|有家属探视|试图离开病区 (走失风险)|干预措施 / 临床依据|常规巡视
— 安全且平稳|一对一沟通与安抚|言语缓和 / 转移注意力|重新定向时间与病区环境|环境已检查
且安全|鼓励进食与饮水|已给予按需 (PRN) 药物|已上报主管护士 / 医生|补充说明 (可选)|结果 /
处理|体重 (kg)|身高 (cm)|已核对腕带|患者自管|病区保险箱|家属带回",
acvpu: "A (清醒)|C (新发意识模糊)|V (对声音有反应)|P (对疼痛有反应)|U (无反应)",
phrases: "已予生活护理|已擦浴更衣|受压皮肤完好|已协助坐椅|已上报责任护士|已与家属沟通
",
tasks: "抽血|心电图 (ECG)|复测生命体征|测血糖 (BM)|膀胱扫描|留置针检查",
admits: "假牙|眼镜|助听器|助行器 / 手杖|手机与充电器|钥匙|现金 / 钱包",
drSites: "骶尾部|左足跟|右足跟|左腿|右腿|腹部"
});
// 20. 中文 (繁體) (zh-tw)
_regLang('zh-tw', {
g1: "班次設定|100% 離線數位交班記事本。資料絕不離開您的裝置。|僅作個人交班記事本。不
提供臨床建議、診斷或決策支援。|解鎖 Care Digipad Pro (£9.99 終身版)|解鎖無限床位、儲存病
房配置、自訂主題、任務提醒及所有專科模組。|輸入授權金鑰|解鎖|取得終身授權金鑰 →|應用程
式偏好與單位|主題|臨床青|醫護藍|手術綠|梅子漿果|午夜石板|溫暖珊瑚|班次時間|白班 (07:00)|
夜班 (19:00)|血糖單位|體溫單位|已儲存的病房配置|選擇已儲存的配置...|您的病患床位 (最多4個
字元)|點選下方床位以選擇 (✓) 或取消選擇今日班次床位：|尚未新增床位。請在上方輸入床號或
姓名縮寫並點選 + 新增。|請至少點選選擇一個 (✓) 今日班次的床位。|+ 新增|刪除|+ 儲存新配置|
啟用模組 (勾選顯示 • 點選 ▲ ▼ 排序)|或另存為新配置 (如：夜班)|⚙ 班次時間、單位與啟用模組
▾|開始交班記錄|選擇床位以開始|儲存並返回班次|張床|張床|與同事分享 Care Digipad|結束班次
/ 清除資料|編輯|隱藏|深色|畫面已隱藏|點選任意位置返回交班記錄",
g2: "確定刪除此筆記錄？|管理床位|重新命名床位|轉床 / 互換病患|輸入目標床位 (最多4個字
元)：|已有病患。是否互換病患？(取消 = 覆蓋目標床位)|清空床位 (出院)|確定清除此床位的所有
本班資料？|從本班移除床位|確定從本班移除此床位及其資料？|儲存至|已儲存至配置|班次中新
增床位|已儲存的病房床位 (點選新增)：|總覽|生命徵象|血糖|臥/立位血壓|輸出入量|排便|皮膚與
敷料|飲食|翻身|精神心理|護理記錄|待辦任務|入院物品|已完成|標記完成|整床完成|僅看未完成|
顯示全部|保持螢幕常亮|依床位|依模組",
g3: "時間|到期時間|空氣|測量時間 / 狀態|呼吸頻率 (RR)|血氧飽和度 (SpO2%)|空氣 / 氧氣
(O2)|血壓 (收縮壓 / 舒張壓)|脈搏 / 心率 (HR)|體溫|意識狀態 (ACVPU)|疼痛|疼痛評分 (0-10)|鼻
導管|面罩|文丘里面罩|血糖值|早餐前 (空腹)|早餐後 (2小時)|午餐前|午餐後 (2小時)|晚餐前|晚餐
後 (2小時)|睡前|夜間 (02:00 - 04:00)|隨機 / 有症狀時|複測 (低血糖處理後)|餐前|餐後|夜間|低血
糖已處理|已測酮體|已通報護理師 (RN)|臥位|立位|無症狀|頭暈 / 眩暈|無法站立",
g4: "輸入量|輸出量|平衡|總計|清除|濕尿墊|尿量 (自解)|導尿管|排便|嘔吐|量|性狀 / 布里斯托分
型 (1-7)|未排便 (BNO)|未排便 (BNO)|方式|少量|中量|大量|微量/便跡|硬便 — 第1型 (分離的硬球
狀)|硬便 — 第2型 (凹凸不平的香腸狀)|正常 — 第3型 (表面有裂痕的香腸狀)|正常 — 第4型 (光
滑柔軟的香腸狀)|軟便 — 第5型 (邊緣清晰的軟塊)|糊狀便 — 第6型 (蓬鬆糊狀)|水樣便 — 第7型
(完全液體/無固體)|馬桶|便盆椅|便盆|尿布/看護墊 (失禁)",
g5: "薦骨處|腹股溝|足跟|手肘|完整|發紅 (指壓變白)|發紅 (指壓不變白)|潮濕相關性皮損 / 破皮|
破損 / 潰瘍空腔|皮膚撕裂傷 / 瘀青|乾燥 / 脆弱|全部標記為完整|+ 新增身體部位|髖部|腳踝|小腿|
足部 / 腳趾|手臂 / 前臂|背部 / 脊椎|肩部|耳部|其他部位|左側|右側|雙側|護膚隔離霜|已翻身 / 減
壓|足跟減壓靴 / 枕頭|敷料|部位 / 備註|下次更換週期|更換 / 檢查日期|今天|到期|選擇日期|1天|2 天|3天|5天|7天|完整乾燥|今日已換|滲液 / 滲漏|翹起 / 鬆脫|早餐|午餐|晚餐|營養補充品 / 點心|已
進食|拒食|禁食 (NBM)|自行進食|協助進食|提醒下進食|增稠流質",
g6: "翻身 / 擺位計畫|每2小時翻身|每3小時翻身|每4小時翻身|依需要 / 僅舒適護理|自行翻身
(可自主活動)|姿勢|平躺 (背部)|左側躺|右側躺|坐椅|下床活動 / 行走|+ 記錄翻身 / 姿勢|叫人鈴在
手邊|床欄已拉起|氣墊床已檢查|護理觀察等級|第1級：常規觀察|第2級：間歇觀察|第3級：視線範
圍內|第4級：一臂距離內|情緒 / 表現|平靜且配合|焦慮 / 苦惱|躁動 / 不安|情緒低落 / 退縮|意識混
亂 / 定向感障礙|大聲呼喊|情緒高昂|敵意 / 攻擊性|位置 / 活動|在床睡眠|在床休息|坐在椅上|來回
走動 / 踱步|在浴廁 / 個人清潔|在公共區域|有訪客探視|試圖離開病房 (走失風險)|處置措施 / 臨
床依據|常規巡視 — 安全且平穩|一對一會談與安撫|口頭緩和 / 轉移注意力|重新定向時間與病房
環境|環境已檢查且安全|鼓勵進食與飲水|已給予需要時 (PRN) 藥物|已通報主責護理師 / 醫師|補
充說明 (選填)|結果 / 處置|體重 (kg)|身高 (cm)|已核對病人手圈|病患自管|病房保險箱|家屬帶回",
acvpu: "A (清醒)|C (新發意識混亂)|V (對聲音有反應)|P (對疼痛有反應)|U (無反應)",
phrases: "已予身體清潔護理|已擦澡更衣|受壓處皮膚完整|已協助下床坐椅|已通報護理師|已向
家屬說明近況",
tasks: "抽血|心電圖 (ECG)|複測生命徵象|測血糖 (BM)|膀胱掃描|靜脈留置針檢查",
admits: "假牙|眼鏡|助聽器|助行器 / 枴杖|手機與充電器|鑰匙|現金 / 皮夾",
drSites: "薦骨處|左足跟|右足跟|左腿|右腿|腹部"
});
// 21. 日本語 (ja)
_regLang('ja', {
g1: "シフト設定|100%オフラインのデジタル申し送りメモ。データが端末外に送信されることはあり
ません。|個人用のシフトメモ専用です。医学的助言、診断、臨床判断の支援は行いません。|Care
Digipad Proを解除 (£9.99 買い切り)|病床数の無制限化、病棟レイアウト保存、テーマ変更、タスク
アラーム、全モジュールを解除します。|ライセンスキーを入力|解除|永久ライセンスキーを取得 →|環
境設定・単位|テーマ|クリニカルティール|ヘルスケアブルー|スクラブグリーン|プラム＆ベリー|ミッドナ
イトスレート|ウォームコーラル|シフト時間|日勤 (07:00)|夜勤 (19:00)|血糖値単位|体温単位|保存済
みの病棟レイアウト|レイアウトを選択...|担当ベッド (最大4文字)|本日のシフトで担当するベッドをタッ
プして選択(✓)・解除してください：|ベッドが未登録です。上に部屋番号やイニシャルを入力し「+ 追
加」をタップしてください。|本日のシフト用に少なくとも1つのベッドを選択(✓)してください。|+ 追加|削
除|+ 新規保存|有効モジュール (チェックで表示 • ▲ ▼ で並び替え)|または新規レイアウト名を入力
(例: 夜勤)|⚙ シフト時間・単位・表示モジュール ▾|シフト開始|ベッドを選択して開始|保存してシフトに
戻る|床|床|同僚にCare Digipadを共有する|シフト終了 / データ消去|編集|隠す|ダーク|画面非表示
中|画面のどこかをタップするとメモに戻ります",
g2: "この記録を削除しますか？|ベッド管理|ベッド名変更|転床 / 患者入れ替え|移動先のベッドを入
力 (最大4文字):|は使用中です。患者を入れ替えますか？ (キャンセル = 移動先を上書き)|ベッドを
空にする (退院)|このベッドの全シフトデータを消去しますか？|シフトからベッドを除外|このベッドと
データを現在のシフトから除外しますか？|レイアウトに保存|レイアウトを保存しました|シフト中にベッ
ドを追加|登録済み病棟ベッド (タップで追加):|サマリー|バイタル|血糖|臥位/立位血圧|水分出納|排
便|皮膚・創傷処置|食事|体位変換|精神状態|メモ|タスク|入院時持参品|完了|完了にする|ベッド完了|
未完了のみ|すべて表示|画面を常時ON|ベッド別|項目別",
g3: "時刻|予定時刻|室内気|測定タイミング|呼吸数 (RR)|酸素飽和度 (SpO2%)|室内気 / 酸素
(O2)|血圧 (収縮期 / 拡張期)|脈拍 / 心拍数 (HR)|体温|意識レベル (ACVPU)|疼痛|ペインスケール
(0-10)|鼻カニューラ|マスク|ベンチュリーマスク|血糖値|朝食前 (空腹時)|朝食後 (2時間)|昼食前|昼 食後 (2時間)|夕食前|夕食後 (2時間)|就寝前|夜間 (02:00 - 04:00)|随時 / 症状時|再検 (低血糖対応
後)|食前|食後|夜間|低血糖対応済|ケトン体確認済|看護師(RN)へ報告済|臥位|立位|症状なし|めま
い・ふらつき|立位保持困難",
g4: "IN (摂取)|OUT (排出)|バランス|合計|クリア|おむつ湿潤|尿 (自尿)|カテーテル|排便|嘔吐|量|便
性状 / ブリストルスケール (1-7)|排便なし (BNO)|排便なし (BNO)|排泄方法|少量|中等量|多量|付着
程度|硬便 — タイプ1 (コロコロ便)|硬便 — タイプ2 (硬いソーセージ状)|普通便 — タイプ3 (ひび割れ
のあるソーセージ状)|普通便 — タイプ4 (なめらかで柔らかい)|軟便 — タイプ5 (半固形・柔らかい
塊)|泥状便 — タイプ6 (形のない泥状)|水様便 — タイプ7 (完全な水様)|トイレ|ポータブルトイレ|差し
込み便器|おむつ・パッド",
g5: "仙骨部|鼠径部|踵部 (かかと)|肘部|異常なし|発赤 (圧迫で消退)|発赤 (圧迫で消退せず)|湿潤
関連皮膚障害 / びらん|表皮剥離 / 潰瘍|スキン-テア / 皮下出血|乾燥 / 脆弱|すべて異常なしにする
|+ 部位を追加|腸骨・大転子部|足関節 (くるぶし)|下腿 / 脛|足部 / 足趾|上肢 / 前腕|背部 / 脊柱|肩
甲骨・肩|耳介|その他の部位|左|右|両側|バリアクリーム塗布|体位変換 / 除圧済|ヒールブーツ / 枕で
除圧|ドレッシング材|部位 / メモ|次回交換予定|貼付・確認日|今日|交換日|日付を選択|1日後|2日後
|3日後|5日後|7日後|清潔・乾燥|本日交換済|浸出液漏れ / 汚染|剥がれかけ|朝食|昼食|夕食|栄養
補助食品 / 間食|摂取済|拒否|絶飲食 (NBM)|自立|介助|声かけ・促し|とろみ水分",
g6: "体位変換・ポジショニング計画|2時間ごと体位変換|3時間ごと体位変換|4時間ごと体位変換|
適宜 / 安楽ポジショニングのみ|自立 (自力体位変換可)|体位|仰臥位 (仰向け)|左側臥位|右側臥位|
端座位・車椅子|歩行・離床|+ 体位変換を記録|ナースコール手の届く位置|ベッド柵挙上確認|エア
マット作動確認|観察レベル|レベル1：一般観察|レベル2：定時観察|レベル3：常時視野内|レベル4：
手の届く範囲内|気分・状態|穏やか・協力的|不安・苦痛表情|不穏・焦燥|抑うつ・引きこもり|混乱・見
当識障害|大声・頻回コール|高揚・多弁|拒絶・攻撃的|場所・活動|ベッドで入眠中|ベッドで安静中|椅
子・車椅子乗車中|室内・廊下を歩行中|浴室・洗面・清潔ケア中|デイルーム・共用部|面会中|離棟・
外出企図あり|介入・臨床的根拠|定時巡視 — 安全かつ穏やか|1対1の傾聴と安心感の提供|言語的
ディエスカレーション・気分転換|日時・場所のリアリティオリエンテーション|環境整備・安全確認済|食
事・水分摂取の促し|頓用薬 (PRN) 与薬済|リーダー看護師 / 医師へ報告済|補足メモ (任意)|結果 /
対応|体重 (kg)|身長 (cm)|ネームバンド確認済|本人管理|病棟金庫保管|家族持ち帰り",
acvpu: "A (清明 / Alert)|C (新規の混乱)|V (呼びかけに反応)|P (痛みに反応)|U (反応なし)",
phrases: "清潔ケア実施済|清拭・更衣実施|褥瘡好発部位に異常なし|車椅子・椅子へ離床|担当看
護師へ報告済|家族へ状況説明済",
tasks: "採血|心電図 (ECG)|バイタル再検|血糖測定 (BM)|ブラダースキャン|点滴ルート・刺入部確
認",
admits: "義歯 (入れ歯)|眼鏡|補聴器|歩行器 / 杖|携帯電話・充電器|鍵|現金 / 財布",
drSites: "仙骨部|左踵部|右踵部|左下肢|右下肢|腹部"
});
// 22. 한국어 (ko)
_regLang('ko', {
g1: "근무 설정|100% 오프라인 디지털 교대근무 메모장. 데이터는 기기 외부로 전송되지
않습니다.|개인용 근무 메모장입니다. 의학적 조언, 진단 또는 임상 의사결정을 지원하지
않습니다.|Care Digipad Pro 잠금 해제 (£9.99 평생 소장)|무제한 병상, 병동 레이아웃 저장,
테마, 작업 알람 및 모든 전문 모듈을 잠금 해제합니다.|라이선스 키 입력|잠금 해제|평생
라이선스 키 받기 →|앱 환경설정 및 단위|테마|클리니컬 틸|헬스케어 블루|스크럽 그린|플럼 &
베리|미드나잇 슬레이트|웜 코랄|근무 시간대|주간 (07:00)|야간 (19:00)|혈당 단위|체온 단위|저장된 병동 레이아웃|저장된 레이아웃 선택...|담당 병상 (최대 4자)|오늘 근무에 포함할
병상을 아래에서 탭하여 선택(✓) 또는 해제하세요:|추가된 병상이 없습니다. 위에 병상 번호나
이니셜을 입력하고 + 추가를 탭하세요.|오늘 근무를 위해 최소 한 개 이상의 병상을 선택(✓)해
주세요.|+ 추가|삭제|+ 새로 저장|활성 모듈 (표시할 항목 체크 • ▲ ▼ 버튼으로 순서 변경)|또는
새 레이아웃 이름으로 저장 (예: 야간)|⚙ 근무 시간, 단위 및 활성 모듈 ▾|근무 시작|시작할 병상
선택|저장 후 근무로 돌아가기|병상|병상|동료에게 Care Digipad 공유하기|근무 종료 / 데이터
초기화|편집|화면 가리기|다크 모드|화면 숨김 상태|근무 메모로 돌아가려면 아무 곳이나
탭하세요",
g2: "이 기록을 삭제하시겠습니까?|병상 관리|병상 이름 변경|전실 / 환자 맞교환|이동할 병상
입력 (최대 4자):|병상이 이미 사용 중입니다. 환자를 맞교환하시겠습니까? (취소 = 대상 병상
덮어쓰기)|병상 비우기 (퇴원)|이 병상의 모든 근무 데이터를 삭제하시겠습니까?|근무에서 병상
제외|현재 근무에서 이 병상과 데이터를 제외하시겠습니까?|레이아웃에 저장|레이아웃에
저장됨|근무 중 병상 추가|저장된 병동 병상 (탭하여 추가):|요약|활력징후|혈당|와위/기립
혈압|수분 섭취/배설|배변|피부 및 드레싱|식이|체위변경|정신건강|메모|업무 (Tasks)|입원
물품|완료|완료 표시|병상 완료|미완료 항목만|전체 보기|화면 켜짐 유지|병상별|모듈별",
g3: "시간|예정 시간|실내 공기|측정 시기 / 상황|호흡수 (RR)|산소포화도 (SpO2%)|실내 공기 /
산소 (O2)|혈압 (수축기 / 이완기)|맥박 / 심박수 (HR)|체온|의식 수준 (ACVPU)|통증|통증 점수
(0-10)|비강 캐뉼라|마스크|벤츄리 마스크|혈당 (BST)|아침 식전 (공복)|아침 식후 (2시간)|점심
식전|점심 식후 (2시간)|저녁 식전|저녁 식후 (2시간)|취침 전|야간 (02:00 - 04:00)|무작위 / 증상
발현 시|재측정 (저혈당 처치 후)|식전|식후|야간|저혈당 처치함|케톤 확인함|담당 간호사(RN)
보고함|누운 자세 (와위)|선 자세 (기립)|증상 없음|어지러움 / 현기증|기립 불가",
g4: "섭취량 (In)|배설량 (Out)|수분 균형|총계|초기화|젖은 기저귀/패드|소변 (자연배뇨)|도뇨관
(Foley)|대변|구토|양|대변 양상 / 브리스톨 단계 (1-7)|배변 없음 (BNO)|배변 없음 (BNO)|배변
방법|소량|중간|다량|묻어남 (Smear)|된변 — 1형 (딱딱하게 분리된 덩어리)|된변 — 2형
(울퉁불퉁한 소시지 모양)|정상 — 3형 (표면에 금이 간 소시지 모양)|정상 — 4형 (매끄럽고
부드러운 소시지 모양)|무른변 — 5형 (가장자리가 뚜렷한 부드러운 방울)|설사성 — 6형
(흐물흐물한 죽 같은 형태)|물설사 — 7형 (건더기 없는 완전한 액체)|화장실|이동식 변기
(Commode)|침상 변기 (Bedpan)|기저귀 / 패드",
g5: "천골 (Sacrum)|서혜부 (Groin)|발뒤꿈치|팔꿈치|온전함 (정상)|발적 (압박 시
창백해짐)|발적 (압박 시 창백해지지 않음)|습기 관련 피부손상 / 짓무름|피부 파손 / 궤양|피부
찢김 (Skin Tear) / 멍|건조함 / 연약함|모두 정상으로 표시|+ 신체 부위 추가|고관절
(엉덩이)|발목|정강이 / 다리|발 / 발가락|팔 / 전완|등 / 척추|어깨|귀|기타
부위|왼쪽|오른쪽|양쪽|배리어 크림 도포|체위변경 / 감압 시행|힐 부츠 / 베개 지지|드레싱|부위 /
메모|다음 교체 주기|적용 / 확인일|오늘|교체 예정일|날짜 선택|1일|2일|3일|5일|7일|온전하고
건조함|오늘 교체함|삼출물 배액 / 젖음|들뜸 / 떨어짐|아침|점심|저녁|영양 보충제 /
간식|섭취함|거부함|금식 (NBM)|스스로 섭취|식사 보조|격려하여 섭취|점도증진 수분",
g6: "체위변경 계획|2시간마다 체위변경|3시간마다 체위변경|4시간마다 체위변경|필요시 /
안위 도모용|자발적 체위변경 가능|자세 (Position)|앙와위 (등 대고 누움)|좌측와위
(왼쪽)|우측와위 (오른쪽)|의자에 앉음|보행 / 거동|+ 체위변경 기록|콜벨 손 닿는 곳에 있음|침대
난간(사이드레일) 올림|에어매트리스 작동 확인|관찰 단계|1단계: 일반 관찰|2단계: 간헐적
관찰|3단계: 시야 내 관찰|4단계: 팔 닿는 거리 내 밀착 관찰|기분 / 상태|차분하고 협조적임|불안
/ 고통스러워함|초조 / 안절부절못함|우울 / 위축됨|혼란 / 지남력 상실|소리침 / 계속
부름|고양됨 / 들뜸|적대적 / 공격적|위치 / 활동|침상에서 수면 중|침상에서 휴식 중|의자에 앉아
있음|병동 내 배회 / 걸어다님|화장실 / 개인위생 중|공용 공간에 있음|면회객과 함께 있음|병동 이탈 시도 (탈원 위험)|중재 / 임상적 근거|정기 순회 — 안전하고 안정적임|1:1 면담 및 정서적
지지 제공|언어적 진정 유도 / 주의 전환|시간 및 병동 지남력 재교육|주변 환경 안전 확인
완료|식이 및 수분 섭취 격려|필요시 처방약 (PRN) 투여함|책임 간호사 / 의사에게 보고함|추가
메모 (선택사항)|결과 / 조치|체중 (kg)|신장 (cm)|환자 인식밴드 확인 완료|환자 소지|병동 금고
보관|보호자 인계 (귀가)",
acvpu: "A (명료 / Alert)|C (새로운 혼란)|V (음성에 반응)|P (통증에 반응)|U (무반응)",
phrases: "개인위생 간호 시행함|세안 및 환의 교체함|욕창 호발 부위 피부 온전함|의자로 이동
보조함|담당 간호사에게 보고함|보호자에게 상태 설명함",
tasks: "채혈 (Bloods)|심전도 (ECG)|활력징후 재측정|혈당 측정 (BST)|방광 스캔 (Bladder
Scan)|정맥관(IV) 부위 확인",
admits: "틀니|안경|보청기|보행기 / 지팡이|휴대폰 및 충전기|열쇠|현금 / 지갑",
drSites: "천골|왼쪽 발뒤꿈치|오른쪽 발뒤꿈치|왼쪽 다리|오른쪽 다리|복부"
});
// 23. Tagalog (tl)
_regLang('tl', {
g1: "Pag-setup ng Shift|100% offline na digital shift notepad. Hindi kailanman lumalabas sa
iyong device ang data.|Personal na shift notepad lamang. Hindi nagbibigay ng medikal na payo,
diyagnosis o desisyong klinikal.|I-unlock ang Care Digipad Pro (£9.99
Panghabambuhay)|Nagbubukas ng walang limitasyong kama, naka-save na layout ng ward,
tema, alarma sa gawain at lahat ng module.|Ilagay ang licence key|I-unlock|Kumuha ng
Panghabambuhay na Licence Key →|Mga Kagustuhan at Yunit|Tema|Clinical Teal|Healthcare
Blue|Scrub Green|Plum at Berry|Midnight Slate|Warm Coral|Oras ng Shift|Araw (07:00)|Gabi
(19:00)|Yunit ng Glucose|Yunit ng Temp|Naka-save na mga Layout ng Ward|Pumili ng
naka-save na layout...|Iyong mga Kama ng Pasyente (Max 4 char)|I-tap ang kama sa ibaba
upang piliin (✓) o alisin sa pagkakapili para sa shift ngayon:|Wala pang naidagdag na kama.
Mag-type ng numero ng kama o inisyal sa itaas at i-tap ang + Idagdag.|Mangyaring mag-tap ng
kahit isang kama upang piliin (✓) para sa shift ngayon.|+ Idagdag|Burahin|+ I-save ang
Bago|Mga Aktibong Module (Lagyan ng tsek upang ipakita • I-tap ang ▲ ▼ upang ayusin)|O
i-save bilang bagong layout (hal. Gabi)|⚙ Oras ng Shift, Yunit at Aktibong Module ▾|Simulan ang
Shift|Pumili ng mga Kama upang Magsimula|I-save at Bumalik sa Shift|Kama|mga
Kama|Ibahagi ang Care Digipad sa Katrabaho|Tapusin ang Shift / Burahin ang
Data|I-edit|Itago|Dark|Nakatago ang Screen|I-tap kahit saan upang bumalik sa shift notes",
g2: "Burahin ang entry na ito?|Pamahalaan ang Kama|Palitan ang Pangalan ng Kama|Ilipat /
Magpalit ng Pasyente|Ilagay ang patutunguhang kama (max 4 char):|ay okupado na. Pagpalitin
ang mga pasyente? (Kanselahin = Patungan ang patutunguhan)|Linisin ang Kama
(Discharge)|Burahin lahat ng data ng shift para sa kamang ito?|Alisin ang Kama sa Shift|Alisin
ang kamang ito at ang data nito mula sa shift?|I-save sa|Na-save sa layout|Magdagdag ng
Kama sa Shift|Naka-save na mga Kama sa Ward (I-tap upang
idagdag):|Buod|Vitals|Glucose|Nakaratay/Nakatayong BP|Fluids|Dumi (Bowels)|Balat at
Dressings|Diyeta|Pagpihit (Turning)|Kalusugang Pangkaisipan|Mga Tala|Mga
Gawain|Admissions|Tapos na|Markahang Tapos|Kama Tapos na|Nakabinbin Lang|Ipakita
Lahat|Panatilihing Bukas ang Screen|Ayon sa Kama|Ayon sa Module",
g3: "Oras|Takdang Oras|Hangin (Air)|Kailan Kinuha / Konteksto|Paghinga (RR)|Oxygen Sats
(SpO2%)|Hangin / Oxygen (O2)|Presyon ng Dugo (Sys / Dia)|Pulso / Heart Rate (HR)|Temperatura|Antas ng Kamalayan (ACVPU)|Kirot (Pain)|Iskor ng Kirot (0-10)|Nasal
Cannula|Mask|Venturi Mask|Blood Glucose|Bago Mag-almusal (Fasting)|Pagkatapos
Mag-almusal (2 oras)|Bago Mananghalian|Pagkatapos Mananghalian (2 oras)|Bago
Maghapunan|Pagkatapos Maghapunan (2 oras)|Bago Matulog|Gabi (02:00 - 04:00)|Random /
May Sintomas|Ulitin (Pagkatapos ng Hypo)|Bago Kumain|Pagkatapos Kumain|Gabi|Ginamot
ang Hypo|Sinuri ang Ketones|Ipinaalam sa RN|Nakaratay (Lying)|Nakatayo (Standing)|Walang
Sintomas|Nahihilo / Naliliyo|Hindi Makatayo",
g4: "Input|Output|Balanse|Kabuuan|Linisin|Basang Pad|Ihi (PU)|Catheter|Dumi (Bowels)|Suka
(Vomit)|Dami|Lapot / Uri ng Dumi (1-7)|Hindi Dumumi (BNO)|Hindi Dumumi
(BNO)|Paraan|Kaunti|Katamtaman|Marami|Bahid (Smear)|Matigas — Uri 1 (Hiwa-hiwalay na
matigas na buo)|Matigas — Uri 2 (Bukul-bukol na parang sausage)|Normal — Uri 3 (Parang
sausage na may bitak)|Normal — Uri 4 (Makinis at malambot)|Malambot — Uri 5 (Malalambot
na piraso)|Malabnaw — Uri 6 (Mushy / parang lugaw)|Likido — Uri 7 (Matubig)|Kubeta
(Toilet)|Commode|Bedpan|Pad / Diaper (Incontinent)",
g5: "Sacrum|Singit (Groin)|Sakong (Heels)|Siko (Elbows)|Buo (Intact)|Mapula (Namumuti
kapag diniinan)|Mapula (Hindi namumuti)|Sugat sa Halumigmig / Gasgas|Sugat / Butas
(Broken)|Punit sa Balat / Pasa|Tuyo / Manipis|Markahan Lahat na Buo|+ Magdagdag ng Bahagi
ng Katawan|Balakang (Hip)|Bukung-bukong (Ankle)|Lulod / Binti|Paa / Daliri sa Paa|Braso|Likod
/ Gulugod|Balikat|Tainga|Ibang Bahagi|Kaliwa|Kanan|Pareho|Barrier Cream|Inilipat ng Posisyon
/ Inalis ang Daan|Heel Boots / Unan|Dressing|Lokasyon / Tala|Susunod na Palit|Petsa Nilagay /
Sinuri|Ngayon|Takdang Araw|Pumili ng Petsa|1 Araw|2 Araw|3 Araw|5 Araw|7 Araw|Buo at
Tuyo|Pinalitan Ngayon|May Tagas (Leaking)|Umaangat
(Lifting)|Almusal|Tanghalian|Hapunan|Supplements / Meryenda|Nakain /
Nainom|Tumanggi|Walang Ipapasok sa Bibig (NBM)|Kaya
Mag-isa|Tinulungan|Pinaalalahanan|Pinapot na Inumin (Thickened)",
g6: "Plano sa Pagpihit / Posisyon|Pagpihit Bawat 2 Oras|Pagpihit Bawat 3 Oras|Pagpihit
Bawat 4 na Oras|Kung Kinakailangan / Para sa Ginhawa|Kaya Mag-isa (Kusang
Pumipihit)|Posisyon|Nakatihaya (Back)|Kaliwang Tagiliran|Kanang Tagiliran|Nakaupo sa
Silya|Naglalakad / Kumikilos|+ I-log ang Pagpihit / Posisyon|Abot-kamay ang Call Bell|Nakataas
ang Bed Rails|Sinuri ang Air Mattress|Antas ng Obserbasyon|Antas 1: Pangkalahatan|Antas 2:
Pana-panahon (Intermittent)|Antas 3: Abot-tanaw|Antas 4: Abot-kamay|Mood / Kilos|Kalmado at
Nakikiisa|Balisa / Nababahala|Hindi Mapakali / Agitated|Malungkot / Tahimik|Nalilito /
Disorientated|Maingay / Sumisigaw|Masigla / Elevated|Galit / Agresibo|Lokasyon /
Gawain|Natutulog sa Kama|Nagpapahinga sa Kama|Nakaupo sa Silya|Naglalakad-lakad|Sa
Banyo / Personal Care|Sa Communal Area|May Bisita|Sinusubukang Lumabas|Interbensyon /
Klinikal na Dahilan|Regular na Pagsusuri — Ligtas at Payapa|1:1 Pakikipag-usap at
Pagpapakalma|Verbal De-escalation / Pagbaling ng Atensyon|Ipinaalala ang Oras at
Lugar|Sinuri at Ligtas ang Paligid|Hinikayat Kumain at Uminom|Binigyan ng PRN na
Gamot|Ipinaalam sa Nurse-in-Charge / Doktor|Karagdagang Tala (Opsyonal)|Resulta /
Aksyon|Timbang (kg)|Taas (cm)|Sinuri ang ID Wristband|Nasa Pasyente|Nasa Safe ng
Ward|Ipina-uwi sa Bahay",
acvpu: "A (Alerto)|C (Bagong Pagkalito)|V (Tumutugon sa Boses)|P (Tumutugon sa Kirot)|U
(Walang Tugon)", phrases: "Nabigyan ng personal care|Nahilamusan at nabihisan|Buo ang mga pressure
area|Inilipat sa silya|Ipinaalam sa RN|Na-update ang pamilya",
tasks: "Kunan ng Dugo (Bloods)|ECG|Ulitin ang Vitals|Blood Glucose (BM)|Bladder
Scan|Suriin ang Cannula",
admits: "Pustiso (Dentures)|Salamin sa Mata|Hearing Aid|Andador / Tungkod|Telepono at
Charger|Mga Susi|Pera / Pitaka",
drSites: "Sacrum|Kaliwang Sakong|Kanang Sakong|Kaliwang Binti|Kanang Binti|Tiyan
(Abdomen)"
});
// 24. Indonesia (id)
_regLang('id', {
g1: "Pengaturan Shift|Buku catatan shift digital 100% offline. Data tidak pernah keluar dari
perangkat Anda.|Hanya buku catatan shift pribadi. Tidak memberikan saran medis, diagnosis,
atau dukungan keputusan.|Buka Care Digipad Pro (£9.99 Selamanya)|Membuka tempat tidur
tanpa batas, denah bangsal tersimpan, tema, alarm tugas, dan semua modul.|Masukkan kunci
lisensi|Buka Kunci|Dapatkan Kunci Lisensi Seumur Hidup →|Preferensi & Satuan|Tema|Teal
Klinis|Biru Medis|Hijau Bedah|Plum & Beri|Abu Malam|Koral Hangat|Jam Shift|Pagi/Siang
(07:00)|Malam (19:00)|Satuan Glukosa|Satuan Suhu|Denah Bangsal Tersimpan|Pilih denah
tersimpan...|Tempat Tidur Pasien Anda (Maks 4 kar)|Ketuk tempat tidur di bawah untuk memilih
(✓) atau membatalkan pilihan shift hari ini:|Belum ada tempat tidur. Ketik nomor bed atau inisial
di atas lalu ketuk + Tambah.|Silakan ketuk minimal satu tempat tidur untuk memilihnya (✓)
pada shift hari ini.|+ Tambah|Hapus|+ Simpan Baru|Modul Aktif (Centang untuk tampil • Ketuk ▲
▼ untuk urutkan)|Atau simpan sebagai denah baru (mis. Malam)|⚙ Jam Shift, Satuan & Modul
Aktif ▾|Mulai Shift|Pilih Tempat Tidur untuk Mulai|Simpan & Kembali ke Shift|Bed|Bed|Bagikan
Care Digipad ke Rekan Kerja|Akhiri Shift / Hapus Data|Edit|Sembunyikan|Gelap|Layar
Disembunyikan|Ketuk di mana saja untuk kembali ke catatan shift",
g2: "Hapus entri ini?|Kelola Bed|Ubah Nama Bed|Pindah / Tukar Pasien|Masukkan bed tujuan
(maks 4 kar):|sedang terisi. Tukar pasien? (Batal = Timpa bed tujuan)|Kosongkan Bed (Pasien
Pulang)|Hapus semua data shift untuk bed ini?|Hapus Bed dari Shift|Hapus bed ini beserta
datanya dari shift?|Simpan ke|Disimpan ke denah|Tambah Bed ke Shift|Bed Bangsal Tersimpan
(Ketuk untuk tambah):|Ringkasan|Tanda Vital|Glukosa|TD Berbaring/Berdiri|Cairan|BAB
(Bowels)|Kulit & Balutan|Diet|Miring Kanan/Kiri|Kesehatan Jiwa|Catatan|Tugas|Pasien
Baru|Selesai|Tandai Selesai|Bed Selesai|Hanya Tertunda|Tampilkan Semua|Layar Tetap
Menyala|Per Bed|Per Modul",
g3: "Waktu|Waktu Jatuh Tempo|Udara Ruangan|Waktu Pengambilan / Konteks|Napas
(RR)|Saturasi O2 (SpO2%)|Udara / Oksigen (O2)|Tekanan Darah (Sis / Dia)|Nadi / Detak
Jantung (HR)|Suhu Tubuh|Kesadaran (ACVPU)|Nyeri|Skala Nyeri (0-10)|Kanula
Hidung|Masker|Masker Venturi|Gula Darah|Sebelum Sarapan (Puasa)|Setelah Sarapan (2
jam)|Sebelum Makan Siang|Setelah Makan Siang (2 jam)|Sebelum Makan Malam|Setelah
Makan Malam (2 jam)|Sebelum Tidur|Malam (02:00 - 04:00)|Sewaktu / Berkeluhan|Ulang
(Pasca-Hipoglikemia)|Sebelum Makan|Setelah Makan|Malam|Hipo Ditangani|Keton
Diperiksa|Dilaporkan ke Perawat (RN)|Berbaring|Berdiri|Tanpa Gejala|Pusing /
Kunang-kunang|Tidak Mampu Berdiri", g4: "Masuk (Input)|Keluar (Output)|Balans|Total|Bersihkan|Popok Basah|Urin
(BAK)|Kateter|BAB|Muntah|Jumlah|Konsistensi / Tipe Feses (1-7)|Belum BAB (BNO)|Belum
BAB (BNO)|Metode|Sedikit|Sedang|Banyak|Bercak (Smear)|Keras — Tipe 1 (Gumpalan keras
terpisah)|Keras — Tipe 2 (Bentuk sosis bergumpal)|Normal — Tipe 3 (Bentuk sosis
retak-retak)|Normal — Tipe 4 (Halus dan lunak)|Lunak — Tipe 5 (Gumpalan lunak)|Lembek —
Tipe 6 (Lembek seperti bubur)|Cair — Tipe 7 (Cair seluruhnya)|Toilet|Kursi Komod|Pispot
(Bedpan)|Popok / Pad",
g5: "Sakrum|Lipat Paha (Groin)|Tumit|Siku|Utuh (Intact)|Merah (Memucat saat ditekan)|Merah
(Tidak memucat)|Lesi Kelembapan / Lecet|Luka Terbuka / Rongga|Robekan Kulit /
Memar|Kering / Rapuh|Tandai Semua Utuh|+ Tambah Area Tubuh|Pinggul|Pergelangan
Kaki|Tulang Kering / Tungkai|Kaki / Jari Kaki|Lengan|Punggung / Tulang
Belakang|Bahu|Telinga|Area Lain|Kiri|Kanan|Keduanya|Krim Pelindung (Barrier)|Ubah Posisi /
Bebas Tekanan|Pelindung Tumit / Bantal|Balutan Luka|Lokasi / Catatan|Jadwal Ganti
Berikutnya|Tanggal Pasang / Periksa|Hari Ini|Jatuh Tempo|Pilih Tanggal|1 Hari|2 Hari|3 Hari|5
Hari|7 Hari|Utuh & Kering|Diganti Hari Ini|Rembes / Bocor|Terlepas /
Mengangkat|Sarapan|Makan Siang|Makan Malam|Suplemen / Camilan|Habis /
Diminum|Menolak|Puasa Penuh (NBM)|Mandiri|Dibantu|Didorong / Diingatkan|Cairan
Dikentalkan",
g6: "Rencana Ubah Posisi / Miring|Ubah Posisi Tiap 2 Jam|Ubah Posisi Tiap 3 Jam|Ubah
Posisi Tiap 4 Jam|Bila Perlu / Kenyamanan Saja|Mandiri (Miring Sendiri)|Posisi|Telentang
(Punggung)|Miring Kiri|Miring Kanan|Duduk di Kursi|Mobilisasi / Berjalan|+ Catat Ubah
Posisi|Bel Panggil Terjangkau|Pagar Tempat Tidur Terpasang|Kasur Dekubitus
Diperiksa|Tingkat Observasi|Tingkat 1: Umum|Tingkat 2: Berkala (Intermiten)|Tingkat 3: Dalam
Pandangan Mata|Tingkat 4: Dalam Jangkauan Tangan|Suasana Hati / Perilaku|Tenang &
Kooperatif|Cemas / Gelisah|Agitasi / Tidak Tenang|Murung / Menarik Diri|Bingung /
Disorientasi|Bersuara Keras / Memanggil|Gembira Berlebihan|Bermusuhan / Agresif|Lokasi /
Aktivitas|Tidur di Tempat Tidur|Istirahat di Tempat Tidur|Duduk di Kursi|Berjalan
Mondar-mandir|Di Kamar Mandi / Perawatan Diri|Di Ruang Bersama|Bersama
Pengunjung|Mencoba Keluar Bangsal|Intervensi / Alasan Klinis|Pemeriksaan Rutin — Aman &
Tenang|Pendekatan 1:1 & Penenangan|De-eskalasi Verbal / Pengalihan|Orientasi Ulang Waktu
& Tempat|Lingkungan Diperiksa & Aman|Mendorong Makan & Minum|Obat Bila Perlu (PRN)
Diberikan|Dilaporkan ke PJ Shift / Dokter|Catatan Tambahan (Opsional)|Hasil / Tindakan|Berat
Badan (kg)|Tinggi Badan (cm)|Gelang Identitas Diperiksa|Pada Pasien|Di Brankas
Bangsal|Dibawa Pulang Keluarga",
acvpu: "A (Sadar Penuh / Alert)|C (Kebingungan Baru)|V (Respons terhadap Suara)|P
(Respons terhadap Nyeri)|U (Tidak Responsif)",
phrases: "Perawatan kebersihan diri diberikan|Sudah dimandikan & ganti pakaian|Area tekan
utuh|Mobilisasi duduk di kursi|Dilaporkan ke perawat (RN)|Keluarga sudah diberi informasi",
tasks: "Ambil Darah|EKG|Ulang Tanda Vital|Gula Darah (BM)|Bladder Scan|Cek Infus /
Kanula",
admits: "Gigi Palsu|Kacamata|Alat Bantu Dengar|Walker / Tongkat|Telepon &
Charger|Kunci|Uang Tunai / Dompet",
drSites: "Sakrum|Tumit Kiri|Tumit Kanan|Tungkai Kiri|Tungkai Kanan|Abdomen (Perut)"
}); // 25. Tiếng Việt (vi)
_regLang('vi', {
g1: "Thiết Lập Ca Trực|Sổ tay ca trực kỹ thuật số ngoại tuyến 100%. Dữ liệu không bao giờ rời
khỏi thiết bị.|Chỉ là sổ ghi chép cá nhân. Không cung cấp lời khuyên y tế, chẩn đoán hay hỗ trợ
quyết định.|Mở khóa Care Digipad Pro (£9.99 Trọn đời)|Mở khóa không giới hạn giường, lưu sơ
đồ khoa, giao diện, báo thức công việc và mọi phân hệ.|Nhập mã bản quyền|Mở khóa|Nhận Mã
Bản Quyền Trọn Đời →|Tùy Chọn & Đơn Vị|Giao diện|Xanh Lâm Sàng|Xanh Y Tế|Xanh Phòng
Mổ|Tím Mận|Xám Đêm|Cam San Hô|Giờ Ca Trực|Ca Ngày (07:00)|Ca Đêm (19:00)|Đơn vị
Đường huyết|Đơn vị Nhiệt độ|Sơ Đồ Khoa Đã Lưu|Chọn sơ đồ đã lưu...|Giường Bệnh Của Bạn
(Tối đa 4 ký tự)|Chạm vào giường bên dưới để chọn (✓) hoặc bỏ chọn cho ca trực hôm
nay:|Chưa có giường nào. Nhập số giường hoặc tên viết tắt ở trên và chạm + Thêm.|Vui lòng
chạm chọn (✓) ít nhất một giường cho ca trực hôm nay.|+ Thêm|Xóa|+ Lưu Mới|Phân Hệ Hoạt
Động (Đánh dấu để hiện • Chạm ▲ ▼ để sắp xếp)|Hoặc lưu thành sơ đồ mới (VD: Ca Đêm)|⚙
Giờ Ca Trực, Đơn Vị & Phân Hệ ▾|Bắt Đầu Ca Trực|Chọn Giường Để Bắt Đầu|Lưu & Quay Lại
Ca Trực|Giường|Giường|Chia Sẻ Care Digipad Với Đồng Nghiệp|Kết Thúc Ca / Xóa Dữ
Liệu|Sửa|Ẩn|Tối|Đã Ẩn Màn Hình|Chạm bất kỳ đâu để quay lại ghi chú ca trực",
g2: "Xóa mục ghi này?|Quản Lý Giường|Đổi Tên Giường|Chuyển / Đổi Giường Bệnh
Nhân|Nhập giường đến (tối đa 4 ký tự):|đang có người nằm. Đổi chỗ hai bệnh nhân? (Hủy =
Ghi đè giường đến)|Làm Trống Giường (Xuất viện)|Xóa toàn bộ dữ liệu ca trực của giường
này?|Bỏ Giường Khỏi Ca Trực|Bỏ giường này và dữ liệu khỏi ca trực hiện tại?|Lưu vào|Đã lưu
vào sơ đồ|Thêm Giường Giữa Ca|Giường Đã Lưu Trong Khoa (Chạm để thêm):|Tổng
Hợp|Sinh Hiệu|Đường Huyết|HA Nằm/Đứng|Dịch Vào/Ra|Đại Tiện|Da & Băng Vết Thương|Dinh
Dưỡng|Xoay Trở|Tâm Thần|Ghi Chú|Công Việc|Nhập Viện|Xong|Đánh Dấu Xong|Xong Giường
Này|Chỉ Việc Chưa Xong|Hiện Tất Cả|Giữ Sáng Màn Hình|Theo Giường|Theo Phân Hệ",
g3: "Giờ|Giờ Hẹn|Khí Trời|Thời Điểm Đo / Bối Cảnh|Nhịp Thở (RR)|SpO2 (%)|Khí Trời / Oxy
(O2)|Huyết Áp (Tâm thu / Tâm trương)|Mạch / Nhịp Tim (HR)|Nhiệt Độ|Tri Giác
(ACVPU)|Đau|Điểm Đau (0-10)|Canuyn Mũi|Mặt Nạ|Mặt Nạ Venturi|Đường Huyết Mao
Mạch|Trước Ăn Sáng (Nhịn đói)|Sau Ăn Sáng (2 giờ)|Trước Ăn Trưa|Sau Ăn Trưa (2
giờ)|Trước Ăn Tối|Sau Ăn Tối (2 giờ)|Trước Khi Ngủ|Ban Đêm (02:00 - 04:00)|Bất Kỳ / Khi Có
Triệu Chứng|Đo Lại (Sau Xử Trí Hạ Đường Huyết)|Trước Ăn|Sau Ăn|Đêm|Đã Xử Trí Hạ Đường
Huyết|Đã Kiểm Tra Ketone|Đã Báo Điều Dưỡng (RN)|Nằm|Đứng|Không Triệu Chứng|Chóng
Mặt / Choáng Váng|Không Thể Đứng",
g4: "Dịch Vào|Dịch Ra|Cân Bằng|Tổng Cộng|Xóa|Tã Ướt|Nước Tiểu (Tự tiểu)|Thông
Tiểu|Phân|Chất Nôn|Lượng|Tính Chất / Phân Loại Phân (1-7)|Chưa Đại Tiện (BNO)|Chưa Đại
Tiện (BNO)|Phương Thức|Ít|Vừa|Nhiều|Vết Bẩn (Smear)|Cứng — Loại 1 (Từng viên cứng rời
rạc)|Cứng — Loại 2 (Khuôn lổn nhổn)|Bình thường — Loại 3 (Khuôn có vết rạn)|Bình thường —
Loại 4 (Khuôn mềm, trơn láng)|Mềm — Loại 5 (Viên mềm, bờ rõ)|Nhão — Loại 6 (Phân sệt,
nhão)|Lỏng — Loại 7 (Toàn nước)|Nhà Vệ Sinh|Ghế Bô|Bô Dẹt (Bedpan)|Tã / Bỉm",
g5: "Vùng Cùng Cụt|Bẹn|Gót Chân|Khuỷu Tay|Nguyên Vẹn|Đỏ (Ấn mất màu)|Đỏ (Ấn không
mất màu)|Tổn Thương Do Ẩm / Trợt Da|Loét Hở / Tạo Hốc|Rách Da / Bầm Tím|Khô / Mỏng
Yếu|Đánh Dấu Tất Cả Nguyên Vẹn|+ Thêm Vị Trí Cơ Thể|Hông|Mắt Cá Chân|Cẳng Chân|Bàn
Chân / Ngón Chân|Cánh Tay / Cẳng Tay|Lưng / Cột Sống|Vai|Tai|Vị Trí Khác|Trái|Phải|Cả
Hai|Kem Bảo Vệ Da|Đã Xoay Trở / Giảm Áp|Giày Bảo Vệ Gót / Gối Kê|Băng Vết Thương|Vị Trí / Ghi Chú|Lần Thay Tiếp Theo|Ngày Thay / Kiểm Tra|Hôm Nay|Hạn Thay|Chọn Ngày|1 Ngày|2
Ngày|3 Ngày|5 Ngày|7 Ngày|Nguyên Vẹn & Khô|Đã Thay Hôm Nay|Thấm Dịch / Rò Rỉ|Bong
Mép Băng|Bữa Sáng|Bữa Trưa|Bữa Tối|Sữa Bổ Sung / Ăn Phụ|Đã Dùng|Từ Chối|Nhịn Ăn
Uống Hoàn Toàn (NBM)|Tự Ăn|Có Hỗ Trợ|Cần Nhắc Nhở|Chất Lỏng Làm Đặc",
g6: "Kế Hoạch Xoay Trở Tư Thế|Xoay Trở Mỗi 2 Giờ|Xoay Trở Mỗi 3 Giờ|Xoay Trở Mỗi 4
Giờ|Khi Cần / Chỉ Tạo Sự Thoải Mái|Tự Chủ (Tự Xoay Trở)|Tư Thế|Nằm Ngửa|Nghiêng
Trái|Nghiêng Phải|Ngồi Ghế|Vận Động / Đi Lại|+ Ghi Nhận Xoay Trở / Tư Thế|Chuông Gọi
Trong Tầm Tay|Đã Nâng Thanh Chắn Giường|Đã Kiểm Tra Đệm Hơi|Mức Độ Theo Dõi|Mức 1:
Thường Quy|Mức 2: Định Kỳ Ngắt Quãng|Mức 3: Trong Tầm Mắt|Mức 4: Trong Tầm Tay|Khí
Sắc / Biểu Hiện|Bình Tĩnh & Hợp Tác|Lo Lắng / Căng Thẳng|Kích Động / Bứt Rứt|Trầm Buồn /
Thu Mình|Lú Lẫn / Mất Định Hướng|La Hét / Gọi Nhiều|Hưng Phấn|Thù Địch / Hung Hăng|Vị Trí
/ Hoạt Động|Đang Ngủ Trên Giường|Nằm Nghỉ Trên Giường|Ngồi Ghế|Đi Lại Trong
Phòng|Trong Nhà Tắm / Vệ Sinh Cá Nhân|Ở Khu Sinh Hoạt Chung|Đang Có Khách Thăm|Tìm
Cách Rời Khỏi Khoa|Can Thiệp / Lý Do Lâm Sàng|Kiểm Tra Thường Quy — An Toàn & Ổn
Định|Trò Chuyện 1:1 & Trấn An|Giải Tỏa Bằng Lời Nói / Đánh Lạc Hướng|Định Hướng Lại Thời
Gian & Nơi Chốn|Đã Kiểm Tra Môi Trường An Toàn|Khuyến Khích Ăn Uống|Đã Dùng Thuốc Khi
Cần (PRN)|Đã Báo Điều Dưỡng Trưởng Ca / Bác Sĩ|Ghi Chú Thêm (Tùy chọn)|Kết Quả / Xử
Trí|Cân Nặng (kg)|Chiều Cao (cm)|Đã Kiểm Tra Vòng Tay Định Danh|Bệnh Nhân Giữ|Két Sắt
Của Khoa|Đã Gửi Về Nhà",
acvpu: "A (Tỉnh Táo)|C (Lú Lẫn Mới Xuất Hiện)|V (Đáp Ứng Với Lời Nói)|P (Đáp Ứng Với
Đau)|U (Không Đáp Ứng)",
phrases: "Đã chăm sóc vệ sinh cá nhân|Đã lau người & thay quần áo|Các vùng tỳ đè nguyên
vẹn|Đã hỗ trợ ra ngồi ghế|Đã báo điều dưỡng phụ trách|Đã cập nhật tình hình cho gia đình",
tasks: "Lấy Máu Xét Nghiệm|Đo Điện Tim (ECG)|Đo Lại Sinh Hiệu|Thử Đường Huyết
(BM)|Siêu Âm Bàng Quang|Kiểm Tra Kim Luồn",
admits: "Răng Giả|Kính Mắt|Máy Trợ Thính|Khung Tập Đi / Gậy|Điện Thoại & Sạc|Chìa
Khóa|Tiền Mặt / Ví",
drSites: "Vùng Cùng Cụt|Gót Chân Trái|Gót Chân Phải|Chân Trái|Chân Phải|Bụng"
});
(ar (العربية 26. //
_regLang('ar', {
إعداد المناوبة|مفكرة مناوبة رقمية تعمل بدون إنترنت .%100 البيانات ال تغادر جهازك .|مفكرة " 1:g
أبدا مناوبة شخصية فقط. ال ً
تقدم استشارة طبية أو
تشخيصا أو ً
مدى الحياة(|يفتح عدداً غير £9.99) Pro Digipad Care دعما للقرار السريري.|فتح نسخة ً
محدود من األسرة، وتخطيطات األجنحة المحفوظة، والسمات، ومنبهات المهام وجميع الوحدات.|أدخل مفتاح الترخيص|فتح القفل|احصل
على مفتاح ترخيص مدى الحياة ←|التفضيالت والوحدات|السمة|تركواز سريري|أزرق طبي|أخضر جراحي|برقوقي وتوتي|رمادي
ليلي|مرجاني دافئ|ساعات المناوبة|نهاري )07:00(|ليلي )19:00(|وحدة السكر|وحدة الحرارة|تخطيطات الجناح المحفوظة|اختر
تخطيطا ...|أسرة ً
محفوظا المرضى الخاصة بك )بحد أقصى 4 أحرف(|اضغط على السرير أدناه لتحديده )✓( أ ( إلإلغ تحتحدي لملمناو ً
الالي:|م|: تتت إضإضا أسأس بعب. د .اك رقر الالسر أو الألأح الألأو أععأل واواض + إ +إضا.|ة|.ير اخاختي سرسر واوا علع الألأ ( ل)
لبد ( مناومن الیوا.|+ وم|. +إ|حذف|| حفظ جدید|الوحالو النشال (شطة للإظللإ • اضغط ▲ ▼ للترللت)|تي احفظ كتخطكت جدید (ديد 
مثل :)| ي ساعات ساعاتوبة، اوبة،ات وحداتدات وحداتة ل|شطة شطةناوبة|اختر ابوةرة تربدء|سرة للبدءدة ظلمناوبة|سریر|اوبة|سريركة
كة DreCa paiig dمعء ميلناوبة مسح اوبة/ نات|تعدیل|ناتاء|ديلن|خفاءشة كنفیة|اشةط خف أي مكان للأيدة انى لوعدةات Digipad Care
 "ىلمناوبة هل تريد حذف هذا السجل؟|إدارة السرير|إعادة تسمية السرير|نقل / تبديل المريض|أدخل السرير المستهدف )بحد أقصى 4" 2:g
أحرف(:|مشغول .
حاليا هل تريد تبديل المريضين؟ )إلغاء = الكتابة فوق السرير المستهدف(|تفريغ السرير )خروج(|هل تريد مسح جميع ً
بيانات المناوبة لهذا السرير؟|إزالة السرير من المناوبة|هل تريد إزالة هذا السرير وبياناته من المناوبة؟|حفظ في|تم الحفظ في
التخطيط|إضافة سرير للمناوبة|أسرة الجناح المحفوظة )اضغط لإلضافة(:|الملخص|العالمات الحيوية|سكر الدم|ضغط الدم
|السوائل|اإلخراج
/واقفاً
مستلقيا )األمعاء(|الجلد والضمادات|التغذية|التقليب وتغيير الوضع|الصحة النفسية|المالحظات|المهام|بيانات ً
,"الدخول|تم|تحديد كـ تم|اكتمال السرير|المعلق فقط|إظهار الكل|إبقاء الشاشة قيد التشغيل|حسب السرير|حسب الوحدة
هواء / أكسجين|(2%SpO (تشبع األكسجين|(RR (الوقت|وقت االستحقاق|هواء الغرفة|وقت القياس / السياق|معدل التنفس" 3:g
األلم|مقياس|(ACVPU (درجة الحرارة|مستوى الوعي|(HR (ضغط الدم )انقباضي / انبساطي(|النبض / معدل ضربات القلب|(2O(
األلم )10-0(|قنية أنفية|قناع وجه|قناع فنتوري|سكر الدم|قبل اإلفطار )صائم(|بعد اإلفطار )ساعتين(|قبل الغداء|بعد الغداء )ساعتين(|قبل
)02:00 - 04:00(|عشوائي / عند األعراض|إعادة القياس )بعد عالج الهبوط(|قبل العشاء|بعد العشاء )ساعتين(|عند
النوم|ليالً
مستل توجد أعراض|دوار ٍق|واقف|ال |(RN (الوجبة|ليالً عالج هبوط السكر|تم فحص الكيتونات|تم إبالغ الممرض المسؤول الوجبة|بعد |تم
,"/ دوخة|غير قادر على الوقوف
التوازن|اإلجمالي|مسح|حفاض مبلل|بول )تبول طبيعي(|قسطرة|(Output (الخارج|(Input (الداخل" 4:g
الطريقة|قليلة|متوسطة|كبيرة|مسحة خفيفة|صلب|(BNO (لم يتبرز|(BNO (بولية|براز|قيء|الكمية|القوام / نوع البراز )7-1(|لم يتبرز
— النوع 1 )كتل صلبة منفصلة(|صلب — النوع 2 )متكتل كالسجق(|طبيعي — النوع 3 )مع تشققات سطحية(|طبيعي — النوع 4
)أملس ولين(|لين — النوع 5 )قطع لينة واضحة الحواف(|شبه سائل — النوع 6 )طري عصيدي(|سائل — النوع 7 )مائي
,"(بالكامل(|المرحاض|كرسي الحمام )كومود(|مبولة السرير )نونية(|حفاض )سلس
العجز )أسفل الظهر(|المغبن )أعلى الفخذ(|الكعبين|المرفقين|سليم|أحمر )يبيض بالضغط(|أحمر )ال يبيض بالضغط(|آفة رطوبة /" 5:g
تسلخ|جرح مفتوح / تجويف|تمزق جلدي / كدمة|جاف / هش|تحديد الكل كـ سليم|+ إضافة موضع بالجسم|الورك|الكاحل|الساق|القدم /
األصابع|الذراع / الساعد|الظهر / العمود الفقري|الكتف|األذن|موضع آخر|أيسر|أيمن|كالهما|كريم عازل|تم تغيير الوضع / تخفيف
الضغط|حوافظ الكعب / وسائد|ضماد|الموقع / مالحظات|التغيير القادم|تاريخ الوضع / الفحص|اليوم|مستحق في|اختر التاريخ|يوم
واحد|يومان|3 أيام|5 أيام|7 أيام|سليم وجاف|تم تغييره اليوم|تسرب إفرازات|منفك األطراف|اإلفطار|الغداء|العشاء|المكمالت / وجبات
,"مستقل|بمساعدة|بتشجيع وتذكير|سوائل مكثفة|(NBM (خفيفة|تم تناوله|رفض|صائم تماماً عن الفم
خطة التقليب وتغيير الوضعية|تقليب كل ساعتين|تقليب كل 3 ساعات|تقليب كل 4 ساعات|عند الحاجة / للراحة فقط|مستقل" 6:g
)يتقلب بمفرده(|الوضعية|على الظهر )استلقاء(|الجانب األيسر|الجانب األيمن|جالس على الكرسي|يتحرك / يمشي|+ تسجيل تقليب /
وضعية|جرس النداء في المتناول|حواجز السرير مرفوعة|تم فحص المرتبة الهوائية|مستوى المالحظة|المستوى :1 عام|المستوى :2
متقطع|المستوى :3 في مجال الرؤية|المستوى :4 على مسافة ذراع|المزاج / المظهر العام|هادئ ومتعاون|قلق / متوتر|متهيج / غير
مستقر|منخفض المزاج / منعزل|مشوش / غير مدرك|يصوت / ينادي|مبتهج بشكل مفرط|عدائي / عنيف|المكان / النشاط|نائم في
ٍ
السرير|مسترخ في السرير|جالس على الكرسي|يمشي / يتجول|في الحمام / عناية شخصية|في الصالة المشتركة|مع الزوار|يحاول مغادرة
القسم|التدخل / المبرر السريري|فحص روتيني — آمن ومستقر|تواصل فردي 1:1 وطمأنة|تهدئة لفظية / توجيه االنتباه|إعادة التوجيه
إبالغ الممرض المسؤول /|(PRN (للزمان والمكان|تم فحص البيئة وهي آمنة|تشجيع تناول الطعام والسوائل|إعطاء دواء عند اللزوم
الطبيب|مالحظات إضافية )اختياري(|النتيجة / اإلجراء|الوزن )كجم(|الطول )سم(|تم التحقق من سوار الهوية|مع المريض|في خزنة
رسل
,"القسم|ُأ إلى المنزل ُأ
,"(ال يستجيب) U)|يستجيب لأللم) P)|يستجيب للصوت) V)|تشوش ذهني جديد) C)|واعي ومتيقظ) A ":acvpu
تم تقديم العناية الشخصية|تم االغتسال وتبديل المالبس|مناطق الضغط سليمة|تم إجالسه على الكرسي|تم إبالغ الممرض" :phrases
,"المسؤول|تم اطالع العائلة على الحالة
فحص|(Scan Bladder (مسح المثانة|(BM (إعادة العالمات الحيوية|فحص سكر الدم|(ECG (سحب دم|تخطيط قلب" :tasks
,"(القنية الوريدية )الكانيوال
,"طقم أسنان|نظارات|سماعة طبية لألذن|مشاية / عكاز|هاتف وشاحن|مفاتيح|نقود / محفظة" :admits
"العجز|الكعب األيسر|الكعب األيمن|الساق اليسرى|الساق اليمنى|البطن" :drSites
});
// 27. Türkçe (tr)
_regLang('tr', { g1: "Nöbet Kurulumu|%100 çevrimdışı dijital nöbet not defteri. Veriler cihazınızdan asla
çıkmaz.|Yalnızca kişisel nöbet not defteridir. Tıbbi tavsiye, teşhis veya klinik karar desteği
sağlamaz.|Care Digipad Pro'yu Aç (£9.99 Ömür Boyu)|Sınırsız yatak, kayıtlı servis düzenleri,
temalar, görev alarmları ve tüm uzman modülleri açar.|Lisans anahtarını girin|Kilidi Aç|Ömür
Boyu Lisans Anahtarı Alın →|Uygulama Tercihleri & Birimler|Tema|Klinik Turkuaz|Sağlık
Mavisi|Cerrahi Yeşil|Mürdüm & Böğürtlen|Gece Kayrak|Sıcak Mercan|Nöbet Saatleri|Gündüz
(07:00)|Gece (19:00)|Glukoz Birimi|Sıcaklık Birimi|Kayıtlı Servis Düzenleri|Kayıtlı bir düzen
seçin...|Hasta Yataklarınız (Maks 4 krk)|Bugünkü nöbet için seçmek (✓) veya kaldırmak üzere
aşağıdaki yatağa dokunun:|Henüz yatak eklenmedi. Yukarıya yatak numarası veya baş harfleri
yazıp + Ekle'ye dokunun.|Bugünkü nöbet için lütfen en az bir yatak seçin (✓).|+ Ekle|Sil|+ Yeni
Kaydet|Aktif Modüller (Göstermek için işaretleyin • Sıralamak için ▲ ▼ dokunun)|Veya yeni
düzen olarak kaydet (örn. Gece)|⚙ Nöbet Saatleri, Birimler ve Aktif Modüller ▾|Nöbeti
Başlat|Başlamak İçin Yatak Seçin|Kaydet ve Nöbete Dön|Yatak|Yatak|Care Digipad'i İş
Arkadaşınla Paylaş|Nöbeti Bitir / Verileri Temizle|Düzenle|Gizle|Koyu|Ekran Gizlendi|Nöbet
notlarına dönmek için herhangi bir yere dokunun",
g2: "Bu kaydı silmek istiyor musunuz?|Yatağı Yönet|Yatağı Yeniden Adlandır|Hasta Nakli /
Yatak Değiştir|Hedef yatağı girin (maks 4 krk):|dolu. Hastalar yer değiştirsin mi? (İptal = Hedefin
üzerine yaz)|Yatağı Boşalt (Taburcu)|Bu yatak için tüm nöbet verileri silinsin mi?|Yatağı Nöbetten
Çıkar|Bu yatak ve verileri nöbetten çıkarılsın mı?|Şuraya Kaydet|Düzene kaydedildi|Nöbete
Yatak Ekle|Kayıtlı Servis Yatakları (Eklemek için dokunun):|Özet|Vital Bulgular|Kan
Şekeri|Yatarak/Ayakta KB|Sıvı İzlemi|Dışkılama|Cilt ve Pansuman|Diyet|Pozisyon Verme|Ruh
Sağlığı|Notlar|Görevler|Hasta Kabul|Tamam|Tamam İşaretle|Yatak Tamam|Sadece
Bekleyenler|Tümünü Göster|Ekranı Açık Tut|Yatağa Göre|Modüle Göre",
g3: "Saat|Planlanan Saat|Oda Havası|Alınma Zamanı / Durum|Solunum Sayısı (RR)|Oksijen
Satürasyonu (SpO2%)|Oda Havası / Oksijen (O2)|Kan Basıncı (Sis / Dia)|Nabız / Kalp Hızı
(HR)|Vücut Sıcaklığı|Bilinç Durumu (ACVPU)|Ağrı|Ağrı Skoru (0-10)|Nazal Kanül|Maske|Venturi
Maske|Kan Şekeri|Kahvaltı Öncesi (Açlık)|Kahvaltı Sonrası (2. saat)|Öğle Yemeği Öncesi|Öğle
Yemeği Sonrası (2. saat)|Akşam Yemeği Öncesi|Akşam Yemeği Sonrası (2. saat)|Yatmadan
Önce|Gece (02:00 - 04:00)|Rastgele / Semptomatik|Tekrar Ölçüm (Hipoglisemi Sonrası)|Yemek
Öncesi|Yemek Sonrası|Gece|Hipo Tedavi Edildi|Keton Bakıldı|Hemşireye (RN)
Bildirildi|Yatarak|Ayakta|Semptom Yok|Baş Dönmesi / Sersemlik|Ayakta Duramıyor",
g4: "Aldığı (Input)|Çıkardığı (Output)|Denge|Toplam|Temizle|Islak Bez/Ped|İdrar
(Normal)|Sonda (Kateter)|Dışkı|Kusma|Miktar|Kıvam / Dışkı Tipi (1-7)|Dışkılama Yok
(BNO)|Dışkılama Yok (BNO)|Yöntem|Az|Orta|Bol|Lekelenme (Smear)|Sert — Tip 1 (Ayrı sert
topaklar)|Sert — Tip 2 (Topaklı sosis görünümü)|Normal — Tip 3 (Yüzeyi çatlaklı sosis)|Normal
— Tip 4 (Pürüzsüz ve yumuşak)|Yumuşak — Tip 5 (Yumuşak parçalar)|Cıvık — Tip 6 (Lapamsı /
püremsi)|Sıvı — Tip 7 (Tamamen sulu)|Tuvalet|Komod (Tuvalet Sandalyesi)|Sürgü|Hasta Bezi
(İnkontinans)",
g5: "Sakrum|Kasık|Topuklar|Dirsekler|Bütünlüğü Tam|Kızarık (Basmakla solan)|Kızarık
(Basmakla solmayan)|Nem Lezyonu / Tahriş|Açık Yara / Kavite|Cilt Yırtığı / Ekimoz|Kuru /
Hassas|Tümünü Tam İşaretle|+ Vücut Bölgesi Ekle|Kalça|Ayak Bileği|Alt Bacak / İncik|Ayak /
Parmaklar|Kol / Ön Kol|Sırt / Omurga|Omuz|Kulak|Diğer Bölge|Sol|Sağ|Her İkisi|Bariyer
Krem|Pozisyon Verildi / Basınç Azaltıldı|Topuk Koruyucu / Yastık|Pansuman|Bölge /
Notlar|Sonraki Değişim|Uygulama / Kontrol Tarihi|Bugün|Değişim Tarihi|Tarih Seçin|1 Gün|2 Gün|3 Gün|5 Gün|7 Gün|Temiz ve Kuru|Bugün Değiştirildi|Sızıntı / Akıntı Var|Kenarları
Kalkmış|Kahvaltı|Öğle Yemeği|Akşam Yemeği|Takviye / Ara Öğün|Alındı|Reddetti|Oral Alım
Kapalı (NBM)|Bağımsız|Yardımla|Teşvikle|Kıvamlaştırılmış Sıvı",
g6: "Pozisyon / Çevirme Planı|2 Saatte Bir Pozisyon|3 Saatte Bir Pozisyon|4 Saatte Bir
Pozisyon|Gerektiğinde / Sadece Konfor Amaçlı|Bağımsız (Kendisi dönebiliyor)|Pozisyon|Sırtüstü
(Supin)|Sol Yan|Sağ Yan|Koltukta Oturuyor|Mobilize / Yürüyor|+ Pozisyon Kaydet|Çağrı Zili
Ulaşılabilir|Yatak Korkulukları Yukarıda|Havalı Yatak Kontrol Edildi|Gözlem Seviyesi|Seviye 1:
Genel Gözlem|Seviye 2: Aralıklı Gözlem|Seviye 3: Görüş Alanı İçinde|Seviye 4: Kol
Mesafesinde Yakın|Duygudurum / Görünüm|Sakin ve İşbirlikçi|Endişeli / Sıkıntılı|Ajite /
Huzursuz|Çökkün / İçe Kapanık|Konfüze / Dezoryante|Sesli / Bağırıyor|Taşkın /
Öforik|Düşmanca / Saldırgan|Konum / Aktivite|Yatakta Uyuyor|Yatakta Dinleniyor|Koltukta
Oturuyor|Yürüyor / Volta Atıyor|Banyoda / Öz Bakım|Ortak Alanda|Ziyaretçileriyle
Birlikte|Servisten Çıkmaya Çalışıyor|Girişim / Klinik Gerekçe|Rutin Kontrol — Güvende ve
Sakin|1:1 Görüşme ve Güven Verme|Sözel Yatıştırma / Dikkatini Yönlendirme|Zaman ve
Mekana Yeniden Oryante Edildi|Çevre Kontrol Edildi ve Güvenli|Yemek ve Sıvı Alımı Teşvik
Edildi|Lüzum Halinde (PRN) İlaç Uygulandı|Sorumlu Hemşireye / Doktora Bildirildi|Ek Notlar
(İsteğe Bağlı)|Sonuç / İşlem|Kilo (kg)|Boy (cm)|Kimlik Bilekliği Kontrol Edildi|Hastanın
Yanında|Servis Kasasında|Eve Gönderildi",
acvpu: "A (Uyanık / Alert)|C (Yeni Konfüzyon)|V (Sese Yanıt Veriyor)|P (Ağrıya Yanıt Veriyor)|U
(Yanıtsız)",
phrases: "Öz bakım verildi|Yıkandı ve giydirildi|Basınç bölgeleri sağlam|Koltuğa mobilize
edildi|Sorumlu hemşireye bildirildi|Ailesine bilgi verildi",
tasks: "Kan Alma|EKG|Vital Bulguları Tekrarla|Kan Şekeri (BM)|Mesane Ultrasonu|Damar Yolu
Kontrolü",
admits: "Diş Protezi|Gözlük|İşitme Cihazı|Yürüteç / Baston|Telefon ve Şarj
Aleti|Anahtarlar|Nakit / Cüzdan",
drSites: "Sakrum|Sol Topuk|Sağ Topuk|Sol Bacak|Sağ Bacak|Batın (Karın)"
});
(fa (فارسی 28. //
_regLang('fa', {
تنظیمات شیفت|دفترچه یادداشت دیجیتال شیفت ٪۱۰۰ آفالین. اطالعات هرگز از دستگاه شما خارج نمیشود.|فقط دفترچه" 1:g
Pro Digipad Care یادداشت شخصی شیفت. توصیه پزشکی، تشخیص یا پشتیبانی تصمیمگیری بالینی ارائه نمیدهد.|فعالسازی
دائمی(|تختهای نامحدود، چیدمانهای ذخیرهشده بخش، پوستهها، هشدار وظایف و تمام ماژولها را باز میکند.|کلید مجوز £9.99)
را وارد کنید|باز کردن قفل|دریافت کلید مجوز دائمی ←|تنظیمات و واحدها|پوسته|سبز آبی بالینی|آبی سالمت|سبز جراحی|آلویی و
توتی|سنگی شب|مرجانی گرم|ساعات شیفت|روز )07:00(|شب )19:00(|واحد قند خون|واحد دما|چیدمانهای ذخیرهشده
بخش|انتخاب چیدمان ذخیرهشده...|تختهای بیمار شما )حداکثر ۴ نویسه(|برای انتخاب )✓( ی ( لغل انانتخ تخت در شیشی امامر
رور آن بزبزن:|د|:هن تختخ اضاضا نشنش اسا. ت .شما تخت یا حرحر اوا را در بااب بنبنویس و ا +افزو را بزبزن.|د|.لطف حدحدا یک
تخت را بربر شیشی امامر انانتخ ( ب) کنی (.|+ ید|. +اف|حذف|| ذخی +ذ جدید|ماژومھای فعال (عال) نماین تیک بزنیب • برای
(دی) دم شب)|⚙ ساعات ساعات شیفت،ا ا ماژوواژو فعها ▾|عالع ترتیت ▲ ▼ را بزنیب)|نی ذخیرذ بھ هنواع چیدمچی جدید
ار ھDreCa paiig dبان مکار / Digipad Care عالت|اشروعب یفتنت برات شروه|ذبرای ش بازذخی بھ شباز|تخت|تخش|اشتتختختاری
, ایا کشیف ا /اپکات|دنرایش|عاتی|یرای|صمخف متیر شص|برام بازشدت را یبازگشتهای دداش روه ھر قسمت بزنهر
این مورد حذف شود؟|مدیریت تخت|تغییر نام تخت|انتقال / جابجایی بیمار|تخت مقصد را وارد کنید )حداکثر ۴ نویسه(:|پر" 2:g
است. بیماران جابجا شوند؟ )لغو = بازنویسی روی تخت مقصد(|تخلیه تخت )ترخیص(|تمام اطالعات شیفت برای این تخت پاک شود؟|حذف تخت از شیفت|این تخت و اطالعات آن از شیفت حذف شود؟|ذخیره در|در چیدمان ذخیره شد|افزودن تخت به
شیفت|تختهای ذخیرهشده بخش )برای افزودن بزنید(:|خالصه|عالئم حیاتی|قند خون|فشار خون خوابیده/ایستاده|مایعات|اجابت
مزاج|پوست و پانسمان|رژیم غذایی|تغییر وضعیت|سالمت روان|یادداشتها|وظایف|پذیرش|انجام شد|عالمت انجام شد|تکمیل
,"تخت|فقط در انتظار|نمایش همه|روشن ماندن صفحه|بر اساس تخت|بر اساس ماژول
هوا / اکسیژن|(2%SpO (اشباع اکسیژن|(RR (زمان|زمان مقرر|هوای اتاق|زمان اندازهگیری / وضعیت|تعداد تنفس" 3:g
درد|نمره درد|(ACVPU (دمای بدن|سطح هوشیاری|(HR (فشار خون )سیستول / دیاستول(|نبض / ضربان قلب|(2O(
)10-0(|کانوالی بینی|ماسک|ماسک ونچوری|قند خون|قبل از صبحانه )ناشتا(|بعد از صبحانه )۲ ساعت(|قبل از ناهار|بعد از ناهار
)۲ ساعت(|قبل از شام|بعد از شام )۲ ساعت(|قبل از خواب|شب )02:00 - 04:00(|تصادفی / هنگام بروز عالئم|تکرار )پس از
اطالع داده شد|خوابیده|ایستاده|بدون (RN (درمان افت قند(|قبل از غذا|بعد از غذا|شب|افت قند درمان شد|کتون بررسی شد|به پرستار
,"عالمت|سرگیجه / سیاهی رفتن چشم|قادر به ایستادن نیست
مجموع|پاک کردن|پوشک خیس|ادرار|سوند|(Balance (تراز|(Output (دفع|(Input (جذب" 4:g
عدم اجابت مزاج|(BNO (ادراری|مدفوع|استفراغ|مقدار|قوام / نوع مدفوع )7-1(|عدم اجابت مزاج
روش|کم|متوسط|زیاد|لکه جزئی|سفت — نوع ۱ )تکههای سفت و جدا(|سفت — نوع ۲ )گلولهای به هم چسبیده(|طبیعی|(BNO(
— نوع ۳ )دارای ترک روی سطح(|طبیعی — نوع ۴ )صاف و نرم(|نرم — نوع ۵ )قطعات نرم با لبه مشخص(|شل — نوع ۶
آبکی(|توالت|صندلی لگندار )کمود(|لگن تخت|پوشک )بیاختیاری )خمیری و آبکی(|مایع — نوع ۷
,"( )کامالً
ساکروم )خاجی(|کشاله ران|پاشنهها|آرنجها|سالم|قرمز )با فشار سفید میشود(|قرمز )با فشار سفید نمیشود(|ضایعه رطوبتی /" 5:g
سائیدگی|زخم باز / حفره|پارگی پوست / کبودی|خشک / شکننده|عالمت زدن همه به عنوان سالم|+ افزودن ناحیه بدن|لگن / مفصل
ران|مچ پا|ساق پا|پا / انگشتان پا|بازو / ساعد|پشت / ستون فقرات|شانه|گوش|سایر نواحی|چپ|راست|هر دو|کرم محافظ )بریر(|تغییر
وضعیت / کاهش فشار|محافظ پاشنه / بالش|پانسمان|محل / یادداشت|تعویض بعدی|تاریخ انجام / بررسی|امروز|موعد تعویض|انتخاب
تاریخ|۱ روز|۲ روز|۳ روز|۵ روز|۷ روز|سالم و خشک|امروز تعویض شد|نشت ترشحات|بلند شدن
مستقل|با کمک|با تشویق و|(NBM (چسب|صبحانه|ناهار|شام|مکملها / میانوعده|میل شد|امتناع کرد|ممنوعیت مصرف از راه دهان
,"یادآوری|مایعات غلیظشده
برنامه تغییر وضعیت بیمار|تغییر وضعیت هر ۲ ساعت|تغییر وضعیت هر ۳ ساعت|تغییر وضعیت هر ۴ ساعت|در صورت" 6:g
نیاز / فقط جهت راحتی|مستقل )خودش جابجا میشود(|وضعیت|طاقباز )پشت(|پهلوی چپ|پهلوی راست|نشسته روی صندلی|راه
رفتن / تحرک|+ ثبت تغییر وضعیت|زنگ احضار در دسترس|نردههای تخت باال|تشک مواج بررسی شد|سطح مشاهده|سطح :۱
عمومی|سطح :۲ متناوب|سطح :۳ در دید مستقیم|سطح :۴ در فاصله یک دست|خلق و خو / وضعیت|آرام و همکار|مضطرب /
نگران|بیقرار / آشفته|افسرده / گوشهگیر|گیج / فاقد آگاهی به زمان و مکان|پر سر و صدا / صدا زدن مداوم|سرخوش /
برانگیخته|خصمانه / پرخاشگر|مکان / فعالیت|خوابیده در تخت|در حال استراحت در تخت|نشسته روی صندلی|در حال قدم زدن در
بخش|در حمام / بهداشت فردی|در فضای عمومی بخش|همراه با مالقاتکنندگان|تالش برای خروج از بخش|مداخله / علت
بالینی|بررسی روتین — ایمن و آرام|گفتگوی فردبهفرد و آرامشبخشی|آرامسازی کالمی / تغییر توجه|آگاهسازی مجدد به زمان و
داده شد|اطالع به سرپرستار / (PRN (مکان|محیط بررسی شد و ایمن است|تشویق به مصرف غذا و مایعات|داروی در صورت نیاز
مچبند شناسایی بررسی شد|نزد بیمار|در گاوصندوق|(cm (قد|(kg (پزشک|یادداشتهای تکمیلی )اختیاری(|نتیجه / اقدام|وزن
,"(بخش|تحویل به خانواده )ارسال به منزل
,"(بدون پاسخ) U)|پاسخ به درد) P)|پاسخ به صدا) V)|گیجی جدید) C)|هوشیار) A ":acvpu
مراقبت بهداشت فردی انجام شد|شستشو و تعویض لباس انجام شد|نواحی تحت فشار سالم هستند|به صندلی منتقل شد|به" :phrases
,"پرستار مسئول اطالع داده شد|به خانواده اطالعرسانی شد
,"اسکن مثانه|بررسی آنژیوکت|(BM (تکرار عالئم حیاتی|قند خون|(ECG (خونگیری|نوار قلب" :tasks
,"دندان مصنوعی|عینک|سمعک|واکر / عصا|تلفن همراه و شارژر|کلیدها|پول نقد / کیف پول" :admits
"ساکروم|پاشنه چپ|پاشنه راست|پای چپ|پای راست|شکم" :drSites
});
// 29. Kiswahili (sw)
_regLang('sw', { g1: "Mpangilio wa Zamu|Daftari la kidijitali la zamu linalofanya kazi 100% bila mtandao. Data
haiachi kifaa chako kamwe.|Daftari binafsi la zamu pekee. Halitoi ushauri wa kitabibu, utambuzi
wala uamuzi wa matibabu.|Fungua Care Digipad Pro (£9.99 Maisha Yote)|Hufungua vitanda
visivyo na kikomo, mipangilio ya wodi, mandhari, kengele za kazi na moduli zote.|Weka ufunguo
wa leseni|Fungua|Pata Ufunguo wa Leseni ya Maisha Yote →|Mapendeleo na
Vipimo|Mandhari|Teal ya Kitabibu|Bluu ya Afya|Kijani cha Upasuaji|Plamu na Beri|Kijivu cha
Usiku|Matumbawe Joto|Saa za Zamu|Mchana (07:00)|Usiku (19:00)|Kipimo cha Sukari|Kipimo
cha Joto|Mipangilio ya Wodi Iliyohifadhiwa|Chagua mpangilio uliohifadhiwa...|Vitanda vya
Wagonjwa Wako (Upeo herufi 4)|Gusa kitanda hapa chini ili kukichagua (✓) au kukiondoa kwa
zamu ya leo:|Hakuna vitanda vilivyoongezwa bado. Andika nambari ya kitanda hapo juu kisha
gusa + Ongeza.|Tafadhali gusa angalau kitanda kimoja ili kukichagua (✓) kwa zamu ya leo.|+
Ongeza|Futa|+ Hifadhi Mpya|Moduli Zinazotumika (Weka alama kuonyesha • Gusa ▲ ▼
kupanga)|Au hifadhi kama mpangilio mpya (mf. Usiku)|⚙ Saa za Zamu, Vipimo na Moduli
▾|Anza Zamu|Chagua Vitanda ili Kuanza|Hifadhi na Urudi Kwenye Zamu|Kitanda|Vitanda|Shiriki
Care Digipad na Mwenzako|Maliza Zamu / Futa Data|Hariri|Ficha|Giza|Skrini Imefichwa|Gusa
popote ili kurudi kwenye kumbukumbu za zamu",
g2: "Futa kumbukumbu hii?|Simamia Kitanda|Badilisha Jina la Kitanda|Hamisha / Badilisha
Mgonjwa|Weka kitanda anachohamia (upeo herufi 4):|kina mgonjwa. Badilisha wagonjwa?
(Ghairi = Andika juu ya kitanda hicho)|Safisha Kitanda (Ruhusa ya Kuondoka)|Futa data zote za
zamu kwa kitanda hiki?|Ondoa Kitanda Kwenye Zamu|Ondoa kitanda hiki na data zake kwenye
zamu?|Hifadhi kwenye|Imehifadhiwa kwenye mpangilio|Ongeza Kitanda Kwenye Zamu|Vitanda
vya Wodi Vilivyohifadhiwa (Gusa kuongeza):|Muhtasari|Dalili za Uhai|Sukari (Glucose)|BP ya
Kulala/Kusimama|Vimiminika (Fluids)|Choo Kubwa (Bowels)|Ngozi na Vidonda|Lishe
(Diet)|Kumgeuza Mgonjwa|Afya ya Akili|Maelezo|Majukumu (Tasks)|Mapokezi
(Admissions)|Imekamilika|Weka Imekamilika|Kitanda Kimekamilika|Zinazosubiri Pekee|Onyesha
Zote|Weka Skrini Ikiwa Imewaka|Kwa Kitanda|Kwa Moduli",
g3: "Muda|Muda Unaopaswa|Hewa ya Kawaida|Muda Uliochukuliwa / Muktadha|Upumuaji
(RR)|Kiwango cha Oksijeni (SpO2%)|Hewa / Oksijeni (O2)|Shinikizo la Damu (Sys / Dia)|Mapigo
ya Moyo (HR)|Joto la Mwili|Ufahamu (ACVPU)|Maumivu|Kiwango cha Maumivu (0-10)|Mirija ya
Puani (Nasal Cannula)|Barakoa (Mask)|Barakoa ya Venturi|Sukari kwenye Damu|Kabla ya
Kifungua Kinywa (Fasting)|Baada ya Kifungua Kinywa (Saa 2)|Kabla ya Chakula cha
Mchana|Baada ya Chakula cha Mchana (Saa 2)|Kabla ya Chakula cha Jioni|Baada ya Chakula
cha Jioni (Saa 2)|Wakati wa Kulala|Usiku (02:00 - 04:00)|Wakati Wowote / Akiwa na Dalili|Rudia
Kipimo (Baada ya Kutibu Hypo)|Kabla ya Mlo|Baada ya Mlo|Usiku|Hypo Imetibiwa|Ketones
Zimepimwa|Muuguzi (RN) Amejulishwa|Amelala|Amesimama|Hakuna Dalili|Kizunguzungu|Hana
Uwezo wa Kusimama",
g4: "Kuingia (Input)|Kutoka (Output)|Urari (Balance)|Jumla|Futa|Pedi Iliyolowa|Mkojo
(PU)|Mpira wa Mkojo (Catheter)|Choo Kubwa|Matapishi|Kiasi|Hali / Aina ya Choo (1-7)|Hajapata
Choo (BNO)|Hajapata Choo (BNO)|Njia|Kidogo|Wastani|Kingi|Alama Kidogo (Smear)|Kigumu —
Aina 1 (Vipande vigumu vilivyotengana)|Kigumu — Aina 2 (Umbo lenye vinundu)|Kawaida —
Aina 3 (Umbo lenye mipasuko)|Kawaida — Aina 4 (Laini na nyororo)|Laini — Aina 5 (Vipande
laini)|Uji — Aina 6 (Laini kama uji)|Kimiminika — Aina 7 (Maji kabisa)|Choo cha Kawaida|Kiti
cha Choo (Commode)|Chombo cha Kitandani (Bedpan)|Pedi / Nepi", g5: "Sehemu ya chini ya mgongo (Sacrum)|Kinena (Groin)|Visigino|Viwiko|Salama
(Intact)|Nyekundu (Inabadilika rangi ikibonyezwa)|Nyekundu (Haibadiliki ikibonyezwa)|Jeraha la
Unyevu / Michubuko|Kidonda Wazi / Shimo|Kuchanika kwa Ngozi / Michubuko|Kavu /
Dhaifu|Weka Zote Salama|+ Ongeza Sehemu ya Mwili|Nyonga (Hip)|Kifundo cha Mguu|Muundi
/ Mguu|Mguu / Vidole|Mkono|Mgongo / Uti wa Mgongo|Bega|Sikio|Sehemu
Nyingine|Kushoto|Kulia|Zote Mbili|Krimu Kinga (Barrier Cream)|Amegeuzwa / Shinikizo
Limeondolewa|Viatu vya Kisigino / Mito|Bandeji (Dressing)|Mahali / Maelezo|Mabadiliko
Yanayofuata|Tarehe Iliyofungwa / Kukaguliwa|Leo|Inapaswa|Chagua Tarehe|Siku 1|Siku 2|Siku
3|Siku 5|Siku 7|Imara na Kavu|Imebadilishwa Leo|Inavuja|Inabanduka|Kifungua Kinywa|Chakula
cha Mchana|Chakula cha Jioni|Virutubisho / Vitafunwa|Amekula /
Amekunywa|Amekataa|Usipewe Chochote Mdomoni (NBM)|Mwenyewe|Kwa Msaada|Kwa
Kuhimizwa|Vimiminika Vilivyoongezwa Uzito",
g6: "Mpango wa Kumgeuza Mgonjwa|Kugeuzwa Kila Saa 2|Kugeuzwa Kila Saa 3|Kugeuzwa
Kila Saa 4|Inapohitajika / Kwa Faraja Pekee|Anajitegemea (Anajigeuza Mwenyewe)|Mkao
(Position)|Chali (Mgongo)|Upande wa Kushoto|Upande wa Kulia|Amekaa Kitini|Anatembea
(Mobilising)|+ Rekodi Mkao / Kugeuzwa|Kengele ya Wito Karibu Naye|Vyuma vya Kitanda
Vimepandishwa|Godoro la Hewa Limekaguliwa|Kiwango cha Uangalizi|Kiwango 1: Cha
Kawaida|Kiwango 2: Cha Muda baada ya Muda|Kiwango 3: Ndani ya Macho Daima|Kiwango 4:
Umbali wa Mkono|Hali ya Hewa / Mwonekano|Mtulivu na Anashirikiana|Wasiwasi /
Mfadhaiko|Msukosuko / Kutotulia|Huzuni / Amejitenga|Amechanganyikiwa|Anapiga Kelele /
Anaita|Furaha Iliyopitiliza|Chuki / Mkali|Mahali / Shughuli|Amelala Kitandani|Amepumzika
Kitandani|Amekaa Kitini|Anatembea-tembea|Bafuni / Usafi wa Mwili|Sehemu ya Pamoja|Yuko
na Wageni|Anajaribu Kuondoka Wodini|Hatua / Sababu ya Kitabibu|Ukaguzi wa Kawaida —
Salama na Mtulivu|Mazungumzo ya 1:1 na Kumtuliza|Kumtuliza kwa Maneno / Kuelekeza
Fikra|Amekumbushwa Muda na Mahali Alipo|Mazingira Yamekaguliwa na Salama|Amehimizwa
Kula na Kunywa|Amepewa Dawa ya Wakati wa Mahitaji (PRN)|Muuguzi Mkuu / Daktari
Amejulishwa|Maelezo ya Ziada (Hiari)|Matokeo / Hatua|Uzito (kg)|Urefu (cm)|Kikuku cha
Utambulisho Kimekaguliwa|Kwa Mgonjwa|Kwenye Kabati Salama la Wodi|Vimerudishwa
Nyumbani",
acvpu: "A (Macho / Alert)|C (Kuchanganyikiwa Kupya)|V (Anaitikia Sauti)|P (Anaitikia
Maumivu)|U (Haitikii)",
phrases: "Amepewa huduma ya usafi wa mwili|Ameoshwa na kuvalishwa|Maeneo ya
mgandamizo yako salama|Amehamishwa kukaa kitini|Muuguzi (RN) amejulishwa|Familia
imepewa taarifa",
tasks: "Kutoa Damu (Bloods)|ECG|Rudia Dalili za Uhai|Pima Sukari (BM)|Bladder Scan|Kagua
Mrija wa Mshipa (Cannula)",
admits: "Meno ya Bandia|Miwani|Kifaa cha Kusikia|Kitembezi / Fimbo|Simu na
Chaja|Funguo|Pesa Taslimu / Pochi",
drSites: "Sacrum|Kisigino cha Kushoto|Kisigino cha Kulia|Mguu wa Kushoto|Mguu wa
Kulia|Tumbo (Abdomen)"
});
