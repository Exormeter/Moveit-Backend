# moveit-backend


```npm install``` zum installieren  
```npm run grunt``` zum kompilieren  
```npm start``` um den Server zu starten


Das Grunt Modul kompiliert die Typescript Dateien und kopiert alles an die richtige Stelle.  
Im Moment gibt der Server nur ein *Welcome* unter localhost:8080 aus, aber das Grundgrüst  
kann zu einem REST Server mit MongoDB anbindung umgebaut werden.


## Sites / API
```
```/``` - Einfache Willkommensseite, das Backend läuft (GET)
```/signup``` - Einfaches Formular zum Registrieren (GET und POST)
```/login``` - Einfaches Formular zum Anmelden (GET und POST)
```/home``` - Einfache home-Seite
```/newEvent``` - Einfaches Formular für ein neues Event (GET und POST)
```/myEvents``` - Alle Events, die der user erstellt hat (GET und JSON)
```/myEventsSubscriber``` - Alle Events, an denen der user teilnimmt (GET und JSON)
```/allUsers``` - Ein Array mit allen Benutzernamen (GET und JSON)
```
