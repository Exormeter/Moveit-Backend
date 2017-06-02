# moveit-backend


```npm install``` zum installieren  
```npm run grunt``` zum kompilieren  
```npm start``` um den Server zu starten


Das Grunt Modul kompiliert die Typescript Dateien und kopiert alles an die richtige Stelle.  
Im Moment gibt der Server nur ein *Welcome* unter localhost:8080 aus, aber das Grundgrüst  
kann zu einem REST Server mit MongoDB anbindung umgebaut werden.


## Sites / API
```
/ - Einfache Willkommensseite, das Backend läuft (GET)
/signup - Einfaches Formular zum Registrieren (GET und POST)
  {"message":"Missing credentials"} - Wenn Benutzername und/oder Passwort fehlen
  {"message":"User Already Exists"} - Wenn Benutzername doppelt
  {"message":"User Registration succesful"} - Wenn erfolgreich, dann auch angemeldet
/login - Einfaches Formular zum Anmelden (GET und POST)
/home - Einfache home-Seite
/newEvent - Einfaches Formular für ein neues Event (GET und POST)
/myEvents - Alle Events, die der user erstellt hat (GET und JSON)
/myEventsSubscriber - Alle Events, an denen der user teilnimmt (GET und JSON)
/allEventsCircle?lon=<number>&lat=<number>&dis=<number> - Alle Events im Umkreis (GET und JSON)
  lon: Longitude aktuelle Position
  lat: Latitude aktuelle Position
  dis: Distanz zur aktuellen Position (Umkreis)
/allUsers - Ein Array mit allen Benutzernamen (GET und JSON)
```
