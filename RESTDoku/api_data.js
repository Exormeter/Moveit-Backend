define({ "api": [
  {
    "type": "get",
    "url": "/allEventsCircle?lon=:lon&lat=:lat&dis=:dis",
    "title": "Alle Events im Umkreis",
    "name": "GetAllEventsCircle",
    "group": "Event",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lon",
            "description": "<p>Longitude aktuelle Position</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "lat",
            "description": "<p>Latitude aktuelle Position</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "dis",
            "description": "<p>Radius des Umkreis in ?</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Event[]",
            "optional": false,
            "field": "response",
            "description": "<p>Alle Events im Umkreis</p>"
          },
          {
            "group": "Success 200",
            "type": "Event",
            "optional": false,
            "field": "response.event",
            "description": "<p>Ein Event im Umkreis</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/allEventsCircleRoute.ts",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/myEvents",
    "title": "Alle Events des Benutzers",
    "name": "GetMyEvents",
    "group": "Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Event[]",
            "optional": false,
            "field": "response",
            "description": "<p>Alle Events des Benutzers</p>"
          },
          {
            "group": "Success 200",
            "type": "Event",
            "optional": false,
            "field": "response.event",
            "description": "<p>Ein Event des Benutzers</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/myEventsRoute.ts",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/myEventsSubscriber",
    "title": "Alle Events, an denen der Benutzer teilnimmt",
    "name": "GetMyEventsSubscriber",
    "group": "Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Event[]",
            "optional": false,
            "field": "response",
            "description": "<p>Alle Events, an denen der Benutzer teilnimmt</p>"
          },
          {
            "group": "Success 200",
            "type": "Event",
            "optional": false,
            "field": "response.event",
            "description": "<p>Ein Event, an dem der Benutzer teilnimmt</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/myEventsSubscriberRoute.ts",
    "groupTitle": "Event"
  },
  {
    "type": "post",
    "url": "/newEvent",
    "title": "Neues Event erstellen",
    "name": "PostNewEvent",
    "group": "Event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Event erstellt</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/newEventRoute.ts",
    "groupTitle": "Event"
  },
  {
    "type": "get",
    "url": "/allUsers",
    "title": "Alle Benutzernamen",
    "name": "GetAllUsers",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String[]",
            "optional": false,
            "field": "response",
            "description": "<p>Alle Benutzernamen</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response.benutzername",
            "description": "<p>Ein Benutzername</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/allUsersRoute.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/logout",
    "title": "Logout",
    "name": "GetLogout",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Logout erfolgreich</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "response",
            "description": "<p>Nicht angemeldet</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/logoutRoute.ts",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/user",
    "title": "Aktueller Benutzer",
    "name": "GetUser",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "User",
            "optional": false,
            "field": "response",
            "description": "<p>Aktueller Benutzer</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/userRoute.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "name": "PostLogin",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Login succesful</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message1",
            "description": "<p>Missing credentials</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message2",
            "description": "<p>User Not found</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message3",
            "description": "<p>Invalid Password</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/loginRoute.ts",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/signup",
    "title": "Signup",
    "name": "PostSignup",
    "group": "User",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>User Registration succesful</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message1",
            "description": "<p>Missing credentials</p>"
          },
          {
            "group": "Error 4xx",
            "type": "String",
            "optional": false,
            "field": "message2",
            "description": "<p>User Already Exists</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "src/routes/signupRoute.ts",
    "groupTitle": "User"
  }
] });
