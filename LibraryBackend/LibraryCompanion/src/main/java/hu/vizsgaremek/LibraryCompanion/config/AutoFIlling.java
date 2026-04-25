package hu.vizsgaremek.LibraryCompanion.config;

import hu.vizsgaremek.LibraryCompanion.model.Author;
import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.model.ItemGenre;
import hu.vizsgaremek.LibraryCompanion.model.ItemType;
import hu.vizsgaremek.LibraryCompanion.service.AuthorService;
import hu.vizsgaremek.LibraryCompanion.service.ItemGenreService;
import hu.vizsgaremek.LibraryCompanion.service.ItemService;
import hu.vizsgaremek.LibraryCompanion.service.ItemTypeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.awt.print.Book;
import java.util.Set;

@Configuration
public class AutoFIlling {

    @Bean
    CommandLineRunner initDatabes(AuthorService authorService, ItemGenreService itemGenreService, ItemTypeService itemTypeService, ItemService itemService){
        return args -> {
            if (authorService.getAllAuthors().isEmpty()) {
                Author author1 = new Author( "J.K. Rowling");
                authorService.saveAuthor(author1);
                Author author2 = new Author( "Stephen King");
                authorService.saveAuthor(author2);
                Author author3 = new Author( "William Shakespeare");
                authorService.saveAuthor(author3);
                Author author4 = new Author( "Leo Tolstoy");
                authorService.saveAuthor(author4);
                Author author5 = new Author( "Franz Kafka");
                authorService.saveAuthor(author5);
            }

            if(itemGenreService.getAllItemGenres().isEmpty()){
                ItemGenre itemGenre1 = new ItemGenre("fantasy");
                itemGenreService.saveItemGenre(itemGenre1);
                ItemGenre itemGenre2 = new ItemGenre("classic");
                itemGenreService.saveItemGenre(itemGenre2);
                ItemGenre itemGenre3 = new ItemGenre("horror");
                itemGenreService.saveItemGenre(itemGenre3);
                ItemGenre itemGenre4 = new ItemGenre("sci-fi");
                itemGenreService.saveItemGenre(itemGenre4);
                ItemGenre itemGenre5 = new ItemGenre("action");
                itemGenreService.saveItemGenre(itemGenre5);
            }

            if(itemTypeService.getAllItemTypes().isEmpty()){
                ItemType itemType1 = new ItemType("Book");
                itemTypeService.saveItemType(itemType1);
                ItemType itemType2 = new ItemType("DvD");
                itemTypeService.saveItemType(itemType2);
                ItemType itemType3 = new ItemType("Casette");
                itemTypeService.saveItemType(itemType3);
                ItemType itemType4 = new ItemType("Magazine");
                itemTypeService.saveItemType(itemType4);
            }

            if(itemService.getAllItems().isEmpty()){
                Item item1 = new Item("Harry Potter and the Goblet of Fire", true, "1234", itemTypeService.getAllItemTypes().get(0), (Set.of(itemGenreService.getAllItemGenres().get(1))), Set.of(authorService.getAuthorById((long )1)),"This is the short description of the book","This is a way longer description. The book follows Potter and his friends, on adventures and fight against the Deatheaters", 10);
                itemService.saveItem(item1);
                Item item2 = new Item("Harry Potter And the prisoner of Ascaban ", true, "1235",itemTypeService.getAllItemTypes().get(0), (Set.of(itemGenreService.getAllItemGenres().get(1))), Set.of(authorService.getAuthorById((long )1)),"This is the short description of the book2","This is a way longer description. The book follows Potter and his friends, on adventures and fight against the Deatheaters and now against Voldemort", 10);
                itemService.saveItem(item2);
                Item item3 = new Item("IT", true, "1238", itemTypeService.getAllItemTypes().get(0), (Set.of(itemGenreService.getAllItemGenres().get(1))), Set.of(authorService.getAuthorById((long )2)),"This is the short description of the book3","This is a way longer description. The book follows Gorgie and hsi friends who are against the evil entity Pennywise", 10);
                itemService.saveItem(item3);
                Item item4 = new Item("Metamorphosis", false, "123", itemTypeService.getAllItemTypes().get(0), (Set.of(itemGenreService.getAllItemGenres().get(1))), Set.of(authorService.getAuthorById((long )5)),"This is the short description of the book4","This is a way longer description. The book follows the main character who wakes up, and finds out that he has turned into a bug ", 10);
                itemService.saveItem(item4);
                Item item5 = new Item("Hamlet", false, "12345", itemTypeService.getAllItemTypes().get(0), (Set.of(itemGenreService.getAllItemGenres().get(1))), Set.of(authorService.getAuthorById((long )3)),"This is the short description of the book5","This is a way longer description. \"Hamlet,\" one of William Shakespeare's most famous tragedies, follows Prince Hamlet of Denmark as he seeks revenge against his uncle Claudius, who murdered Hamlet's father and married his mother to claim the throne.", 10);
                itemService.saveItem(item5);
            }
        };

    }
}
