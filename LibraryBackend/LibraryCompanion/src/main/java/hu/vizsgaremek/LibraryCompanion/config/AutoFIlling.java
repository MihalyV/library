package hu.vizsgaremek.LibraryCompanion.config;

import hu.vizsgaremek.LibraryCompanion.model.*;
import hu.vizsgaremek.LibraryCompanion.service.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.util.Set;

@Configuration
public class AutoFIlling {

    @Bean
    CommandLineRunner initDatabes(
            AuthorService authorService,
            ItemGenreService itemGenreService,
            ItemTypeService itemTypeService,
            ItemService itemService,
            ItemCopyService itemCopyService,
            WorkerService workerService,
            PasswordEncoder passwordEncoder
    ) {
        return args -> {

            if (workerService.getAllWorkers().isEmpty()) {
                Worker systemAdmin = new Worker();
                systemAdmin.setFirstName("Rendszer");
                systemAdmin.setLastName("Adminisztrátor");
                systemAdmin.setWorkerEmail("admin@library.com");
                systemAdmin.setPhoneNumber("06301234567");
                systemAdmin.setPassword(passwordEncoder.encode("admin123"));
                systemAdmin.setRegDate(LocalDate.now());
                systemAdmin.setRole(Role.ROLE_LIBRARIAN);
                workerService.saveWorker(systemAdmin);
            }


            if (authorService.getAllAuthors().isEmpty()) {
                authorService.saveAuthor(new Author("J.K. Rowling"));
                authorService.saveAuthor(new Author("Stephen King"));
                authorService.saveAuthor(new Author("William Shakespeare"));
                authorService.saveAuthor(new Author("Leo Tolstoy"));
                authorService.saveAuthor(new Author("Franz Kafka"));
                authorService.saveAuthor(new Author("Frank Herbert"));
                authorService.saveAuthor(new Author("Arthur C. Clarke"));
                authorService.saveAuthor(new Author("Agatha Christie"));
                authorService.saveAuthor(new Author("Isaac Asimov"));
                authorService.saveAuthor(new Author("Bram Stoker"));
            }

            if (itemGenreService.getAllItemGenres().isEmpty()) {
                itemGenreService.saveItemGenre(new ItemGenre("fantasy"));
                itemGenreService.saveItemGenre(new ItemGenre("klasszikus"));
                itemGenreService.saveItemGenre(new ItemGenre("horror"));
                itemGenreService.saveItemGenre(new ItemGenre("sci-fi"));
                itemGenreService.saveItemGenre(new ItemGenre("akció"));
            }

            if (itemTypeService.getAllItemTypes().isEmpty()) {
                itemTypeService.saveItemType(new ItemType("Könyv"));
                itemTypeService.saveItemType(new ItemType("DVD"));
                itemTypeService.saveItemType(new ItemType("Kazetta"));
                itemTypeService.saveItemType(new ItemType("Magazin"));
            }

            if (itemService.getAllItems().isEmpty()) {

                ItemType konyv   = itemTypeService.getAllItemTypes().get(0);
                ItemType dvd     = itemTypeService.getAllItemTypes().get(1);
                ItemType kazetta = itemTypeService.getAllItemTypes().get(2);
                ItemType magazin = itemTypeService.getAllItemTypes().get(3);

                ItemGenre fantasy     = itemGenreService.getAllItemGenres().get(0);
                ItemGenre klasszikus  = itemGenreService.getAllItemGenres().get(1);
                ItemGenre horror      = itemGenreService.getAllItemGenres().get(2);
                ItemGenre scifi       = itemGenreService.getAllItemGenres().get(3);
                ItemGenre akcio       = itemGenreService.getAllItemGenres().get(4);

                Author rowling     = authorService.getAuthorById(1L);
                Author king        = authorService.getAuthorById(2L);
                Author shakespeare = authorService.getAuthorById(3L);
                Author tolstoy     = authorService.getAuthorById(4L);
                Author kafka       = authorService.getAuthorById(5L);
                Author herbert     = authorService.getAuthorById(6L);
                Author clarke      = authorService.getAuthorById(7L);
                Author christie    = authorService.getAuthorById(8L);
                Author asimov      = authorService.getAuthorById(9L);
                Author stoker      = authorService.getAuthorById(10L);

                Item item1 = itemService.saveItem(new Item(
                        "Harry Potter és a tűz serlege", true, "ISBN-1234",
                        konyv, Set.of(fantasy), Set.of(rowling),
                        "Harry Potter negyedik éve Roxfortban izgalmas fordulatot vesz.",
                        "A Trimágus Tusa három iskolát hoz össze egy veszélyes varázslatos versenyre. Harry nevét titokzatos módon kihúzza a Tűz Serlege, és részt kell vennie a halálos próbákon, miközben Voldemort visszatérésének árnyéka egyre sötétebb.", 10));
                ItemCopy copy1 = new ItemCopy();
                copy1.setItem(item1); copy1.setStatus("Elérhető");
                copy1.setCondition("Jó"); copy1.setDateOfPurchase(LocalDate.of(2020, 3, 15));
                itemCopyService.saveItemCopy(copy1);

                Item item2 = itemService.saveItem(new Item(
                        "IT", true, "ISBN-1235",
                        konyv, Set.of(horror), Set.of(king),
                        "Egy ősi gonosz ébred fel Derry kisvárosában.",
                        "Pennywise, a táncoló bohóc harmincévente tér vissza, hogy gyerekek életére törjön. A Vesztes Klub tagjai gyermekként már legyőzték egyszer – most felnőttként kell szembenézniük az újra felébredt rémülettel.", 16));
                ItemCopy copy2 = new ItemCopy();
                copy2.setItem(item2); copy2.setStatus("Elérhető");
                copy2.setCondition("Jó"); copy2.setDateOfPurchase(LocalDate.of(2019, 7, 10));
                itemCopyService.saveItemCopy(copy2);

                Item item3 = itemService.saveItem(new Item(
                        "2001: Űrodüsszeia", true, "DVD-0001",
                        dvd, Set.of(scifi), Set.of(clarke),
                        "Stanley Kubrick és Arthur C. Clarke ikonikus sci-fi filmje.",
                        "Az emberiség egy titokzatos monolitot talál a Holdon, amely Jupiter felé mutat. A Discovery One hajó legénysége – és a fedélzeti mesterséges intelligencia, HAL 9000 – az ismeretlen felé indul. A film az emberi evolúció és a gépi intelligencia örök kérdéseit feszegeti.", 12));
                ItemCopy copy3 = new ItemCopy();
                copy3.setItem(item3); copy3.setStatus("Elérhető");
                copy3.setCondition("Kiváló"); copy3.setDateOfPurchase(LocalDate.of(2021, 1, 5));
                itemCopyService.saveItemCopy(copy3);

                Item item4 = itemService.saveItem(new Item(
                        "Dűne", true, "ISBN-1236",
                        konyv, Set.of(scifi), Set.of(herbert),
                        "Az évszázad science fiction eposza a sivatagbolygó Arrakisról.",
                        "Paul Atreides fiatal nemesúr egy veszélyes sivatagbolygóra érkezik, ahol az univerzum legértékesebb anyagát, a fűszert termelik. Árulás, politikai intrika és egy ősi prófécia szövevényében kell megtalálnia saját sorsát.", 14));
                ItemCopy copy4 = new ItemCopy();
                copy4.setItem(item4); copy4.setStatus("Kikölcsönözve");
                copy4.setCondition("Jó"); copy4.setDateOfPurchase(LocalDate.of(2021, 6, 20));
                itemCopyService.saveItemCopy(copy4);

                Item item5 = itemService.saveItem(new Item(
                        "Hamlet", false, "ISBN-1237",
                        konyv, Set.of(klasszikus), Set.of(shakespeare),
                        "Shakespeare leghíresebb tragédiája a bosszú és az elmúlás témájáról.",
                        "Hamlet dán herceg apja szellemétől megtudja, hogy nagybátyja, Claudius gyilkolta meg a királyt és vette el a trónt. A bosszú útján Hamlet saját lelkével is küzd, miközben mindenki körülötte elpusztul.", 14));
                ItemCopy copy5 = new ItemCopy();
                copy5.setItem(item5); copy5.setStatus("Kikölcsönözve");
                copy5.setCondition("Közepes"); copy5.setDateOfPurchase(LocalDate.of(2018, 9, 1));
                itemCopyService.saveItemCopy(copy5);

                Item item6 = itemService.saveItem(new Item(
                        "Dracula", false, "DVD-0002",
                        dvd, Set.of(horror), Set.of(stoker),
                        "Bram Stoker klasszikus vámpírtörténetének filmadaptációja.",
                        "Jonathan Harker ügyvéd Erdélybe utazik Drakula gróf kastélyába, ahol hamarosan rájön, hogy fogoly. A gróf Londonba indul, hogy új áldozatokat keressen, köztük Harker menyasszonyát, Minát.", 16));
                ItemCopy copy6 = new ItemCopy();
                copy6.setItem(item6); copy6.setStatus("Elérhető");
                copy6.setCondition("Jó"); copy6.setDateOfPurchase(LocalDate.of(2020, 10, 31));
                itemCopyService.saveItemCopy(copy6);

                Item item7 = itemService.saveItem(new Item(
                        "National Geographic – Világűr különszám", false, "MAG-0001",
                        magazin, Set.of(scifi), Set.of(asimov),
                        "Különszám az emberiség űrkutatási mérföldköveiről.",
                        "Ez a különkiadás végigkíséri az emberiség legfontosabb űrkutatási eredményeit, az Apollo-programtól a Mars-küldetésekig. Exkluzív fotókkal és interjúkkal az iparág meghatározó személyiségeivel.", 0));
                ItemCopy copy7 = new ItemCopy();
                copy7.setItem(item7); copy7.setStatus("Elérhető");
                copy7.setCondition("Kiváló"); copy7.setDateOfPurchase(LocalDate.of(2023, 4, 1));
                itemCopyService.saveItemCopy(copy7);

                Item item8 = itemService.saveItem(new Item(
                        "Háború és béke – Hangoskönyv", false, "KAZ-0001",
                        kazetta, Set.of(klasszikus), Set.of(tolstoy),
                        "Tolsztoj monumentális regényének hangoskönyv változata.",
                        "Az orosz irodalom egyik csúcsteljesítménye: öt nemesi família sorsa fonódik össze a napóleoni háborúk viharos évtizedeiben. Szerelem, veszteség, hősiesség és megváltás egy lenyűgöző panorámában.", 14));
                ItemCopy copy8 = new ItemCopy();
                copy8.setItem(item8); copy8.setStatus("Elérhető");
                copy8.setCondition("Jó"); copy8.setDateOfPurchase(LocalDate.of(2017, 2, 14));
                itemCopyService.saveItemCopy(copy8);

                Item item9 = itemService.saveItem(new Item(
                        "Tíz kis néger – Thrillerfilm", true, "DVD-0003",
                        dvd, Set.of(akcio), Set.of(christie),
                        "Agatha Christie legendás krimijének feszültségteli filmverziója.",
                        "Tíz ismeretlen embert hívnak egy elszigetelt szigetre, ahol egyenként meggyilkolják őket. Mindenki gyanús, senki sem ártatlan – a túlélők kétségbeesetten próbálják kideríteni, ki közöttük a gyilkos.", 16));
                ItemCopy copy9 = new ItemCopy();
                copy9.setItem(item9); copy9.setStatus("Elérhető");
                copy9.setCondition("Kiváló"); copy9.setDateOfPurchase(LocalDate.of(2022, 5, 18));
                itemCopyService.saveItemCopy(copy9);

                Item item10 = itemService.saveItem(new Item(
                        "Az átváltozás", false, "ISBN-1238",
                        konyv, Set.of(klasszikus), Set.of(kafka),
                        "Kafka leghíresebb elbeszélése az elidegenedésről.",
                        "Gregor Samsa egy reggel arra ébred, hogy óriási bogárrá változott. Miközben testével küzd, egykori emberi élete – munkája, családja, kötelességei – lassan szétmállik körülötte. Kafka örök érvényű allegóriája az emberi elidegenedésről.", 14));
                ItemCopy copy10 = new ItemCopy();
                copy10.setItem(item10); copy10.setStatus("Kikölcsönözve");
                copy10.setCondition("Közepes"); copy10.setDateOfPurchase(LocalDate.of(2016, 11, 3));
                itemCopyService.saveItemCopy(copy10);

                Item item11 = itemService.saveItem(new Item(
                        "A Gyűrűk Ura – Hangoskönyv", true, "KAZ-0002",
                        kazetta, Set.of(fantasy), Set.of(rowling),
                        "Tolkien epikus fantasy regényének hangoskönyv feldolgozása.",
                        "Frodó és a Gyűrű Szövetsége hosszú útra indul, hogy megsemmisítsék az Egy Gyűrűt a Végzet hegyénél, mielőtt Sauron újra uralma alá vonhatja Középföldet. Barátság, áldozat és a jó és rossz örök harca elevenedik meg.", 12));
                ItemCopy copy11 = new ItemCopy();
                copy11.setItem(item11); copy11.setStatus("Elérhető");
                copy11.setCondition("Jó"); copy11.setDateOfPurchase(LocalDate.of(2022, 8, 22));
                itemCopyService.saveItemCopy(copy11);

                Item item12 = itemService.saveItem(new Item(
                        "Kalandok Magazin – 2023. évi különszám", false, "MAG-0002",
                        magazin, Set.of(akcio), Set.of(clarke),
                        "Extrém sporttól a hadtörténetig – akció minden oldalon.",
                        "Ez a különkiadás az emberi teljesítmény határait feszegető kalandokba kalauzol: hegycsúcs-meghódítástól búvárkodáson át ejtőernyős rekordokig. Riportok, képek és személyes történetek a világ legmerészebb kalandoraitól.", 0));
                ItemCopy copy12 = new ItemCopy();
                copy12.setItem(item12); copy12.setStatus("Kikölcsönözve");
                copy12.setCondition("Jó"); copy12.setDateOfPurchase(LocalDate.of(2023, 9, 10));
                itemCopyService.saveItemCopy(copy12);
            }
        };
    }
}