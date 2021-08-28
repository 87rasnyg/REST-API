# REST API
Jag har skapat ett REST-API som hanterar information om filmer. Varje film har id, en titel, ett utgivningsdatum samt körtid. Från API:et kan en klient få informationen om alla filmer, från en specifik film, lägga till en ny film, uppdatera informationen om en specifik film samt ta bort en film. All Data om filmerna sparas i API:et i en Json-fil.

### Uppfyllda krav:
#### Krav för godkänt:
1. Projektet innehåller minst 4 st. endpoints (GET, POST, PUT & DELETE för en resurs) **[JA]**
2. Samtliga endpoints skall kunna nås via en REST Client fil (.rest|.http) **[JA]**
3. Datan som API:et hanterar sparas lokalt i serverfilen **[JA (till en början, bytte senare till Json)]**
4. Git & GitHub har använts **[JA (främst Git, men jag laddade upp det till Github också)]**
5. Projektmappen innehåller en README.md fil **[JA]**
6. Uppgiften lämnas in i tid! **[Förhoppningsvis]**

#### Krav för väl godkänt:
1. Alla punkter för godkänt är uppfyllda **[Tror det]**
2. All data skall vara sparad i en JSON-fil istället för i serverfilen **[JA]**
3. Datan i JSON-filen skall uppdateras då något läggs till, uppdateras eller tas bort **[JA]**
4. Ett simpelt klient-gränssnitt skall finnas för att anropa API:ets olika endpoints, samt visa upp resultatet vid GET anrop **[JA]**
5. Ytterligare en GET endpoint skall läggas till där det går att hämta ett specifikt objekt **[JA]**

Själva API:et innehåller fyra JavaScript-filer, nämligen: server, movies.router, movie.controllers och movie.validation. Jag valde det här upplägget för att försöka se till att varje JavaScript-fil har ett specifikt ansvarsområde och göra koden lite tydligare. 

server.js ser till att API:et lyssnar på port 3000 samt att ett anrop till ”`http://localhost:3000/`” utan någon extra information returnerar en hemsida. server.js är även kopplad till movies.router.js.

movies.router.js innehåller kopplingar till både movie.controllers och movie.validation. Syftet med den här filen är att se till att anropen som API:et tar emot hanteras av rätt funktioner. I ett sådant här litet projekt skulle det fungera lika bra att slopa den här filen och lägga den här koden i server.js. Jag hade dock två anledningar till att bryta ut den här koden till en egen fil. Den första anledningen var att detta gör det enklare att bygga ut API:et ifall det skulle behövas. Den andra och huvudsakliga anledningen var att vi just hade gått igenom under en lektion att man kan göra på det här sättet och jag ville testa och se om jag kunde få det att fungera.

movie.controllers.js ansvarar för att handlingarna som efterfrågas i anropen faktiskt görs. Den innehåller följande funktioner:
* getMovies: Den här funktionen tar alla filmer som finns i Json-filen och returnerar dem som en lista i Json-format med statuskoden 200. Om listan som ska skickas tillbaka är null så ska programmet istället skicka statuskoden 404 med ett felmeddelande. Detta tror jag dock aldrig kommer kunna hända men det är med i alla fall för att vara på den säkra sidan.
* getMovie: Tar id som sickas med i anropen via URL och matchar den med alla filmer i Json-filen. Om en matchande id hittas skickas den filmen tillbaka med statuskoden 200. Om ingen film med samma id hittades, skickas statuskoden 404 tillbaka med meddelandet att inget matchande id hittades. 
* postMovie: Hämtar först ut alla filmer ur Json-filen som en lista, sedan skapar den ett nytt filmobjekt med informationen som skickades med i body samt med ett unikt id. Filmobjektet läggs efter det till i listan och Json-filen skrivs över med innehållet i denna list. Funktionen skickar sedan tillbaka den nya filmen med statuskoden 201. Till en början använde jag mig av ”spread syntax” (…) för att lägga till informationen som skickas in, detta gjorde dock att all information som skickades in sparades på Json-filen. Med andra ord kan en användare skicka in hur mycket information som helst och allt sparas på serven (så länge de skickar med en titel, utgivningsdatum och körtid). Detta kändes inte säkert, och därför lägger programmet nu bara till den data som ska vara där.
* updateMovie: Hämtar även den först ut alla filmer ur Json-filen. Efter det tar den det id som skickades in i anropet och försöker hitta indexet som filmen med matchande id ligger på i listan. Hittar den inte en film med samma id så skickar funktionen tillbaka ett 404 meddelande. Om ett index hittades skapar funktionen ett nytt filmobjekt med informationen som skickades med i body. Om någon property i body är tom utgår programmet ifrån att den propertyn inte ska ändras och sätter då den till det värde som filmen som ska uppdateras hade innan. Filmobjektet som skapas ersätter sedan det gamla filmobjektet i listan. Json-filen skrivs sedan över med innehållet i listan och funktionen skickar tillbaka den uppdaterade filmen med statuskoden 200.
* deleteMovie: Även den här funktionen hämtar ut alla filmer ur Json-filen som en lista. Den tar sedan id från anropet och försöker hitta indexet på filmen med matchande id. Om den inte hittar något index så returneras ett 404 meddelande. Annars så tas filmobjektet på indexet bort från listan, Json-filen skrivs över med den nya listan och funktionen skickar tillbaka statuskoden 204. 

movie.validation.js består främst utav två valideringar som kollar anropen till post och put.
* createMovieValidation: Kolar post-anropen och ser till att titeln, utgivningsdatum och körtid inte är tomma. Den kollar även att utgivningsdatum är en siffra, att den är större än eller lika med 1888 (vilket är året när den första filmen gjordes) och mindre än det nuvarande året. createMovieValidation kollar också att körtiden är större än noll.
* updateMovieValidation: När en film ska uppdateras ska det vara möjligt att skicka en ett tomt värde och därför kollar programmet först bara om alla värden som krävs finns med. Sedan kollar den att utgivningsdatum och körtid har ett giltigt värde om de inte är tomma.

Utöver API:et skapade jag även en mycket enkel hemsida som kan anropa API:et och visa data. Utöver den funktionaliteten har jag knappt lagt någon tid alls på presentationen av sidan.

### Brister och vidareutveckling
Just nu finns det brister på felhantering med Json-filen. Finns det till exempel ingen Json-fil så kraschar programmet. Detta skulle man kunna arbeta vidare med och se till att programmet istället ger ifrån sig ett vettigt felmeddelande.

En annan sak som skulle kunna göras är att funktionerna för att skriva och läsa från Json-filen borde ligga i en egen fil och inte ligga i movie.controllers som de gör nu. 

Ytterligare en del som känns lite onödig är i funktionen getMovies som först anropar en funktion som läser all data i Json-filen och gör om den till en lista som den returnerar. getMovies tar sedan listan och konverterar tillbaka listan till Json-format och skickar det. Detta borde nog göras på ett bättre sätt. 
