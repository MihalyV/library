package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.History;
import hu.vizsgaremek.LibraryCompanion.service.HistoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/history")
public class HistoryController {

    private final HistoryService historyService;

    public HistoryController(HistoryService historyService) {
        this.historyService = historyService;
    }

    @GetMapping
    public ResponseEntity<List<History>> getAll() {
        return ResponseEntity.ok(historyService.getAllHistory());
    }

    @GetMapping("/filter")
    public ResponseEntity<List<History>> filterHistory(
            @RequestParam(required = false) String userEmail,
            @RequestParam(required = false) String itemTitle,
            @RequestParam(required = false) String actionType) {
        return ResponseEntity.ok(historyService.filterHistory(userEmail, itemTitle, actionType));
    }
}
