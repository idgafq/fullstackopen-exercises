```mermaid
sequenceDiagram
    title 0.6: New note in Single page app diagram
    participant browser
    participant server
    
    Note right of browser: The browser executes the event handler function that rerenders the note list with the new note and sends the new note to the server
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    browser-->>server: the new note as JSON data
    Note right of server: The server saves the note sent by the browser
    deactivate server
```
