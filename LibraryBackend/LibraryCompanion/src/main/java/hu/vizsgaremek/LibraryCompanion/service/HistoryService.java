package hu.vizsgaremek.LibraryCompanion.service;
import hu.vizsgaremek.LibraryCompanion.model.ActionType;
import hu.vizsgaremek.LibraryCompanion.model.History;
import hu.vizsgaremek.LibraryCompanion.model.Item;
import hu.vizsgaremek.LibraryCompanion.model.User;
import hu.vizsgaremek.LibraryCompanion.repository.HistoryRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoryService {
    private final HistoryRepository historyRepository;

    public HistoryService(HistoryRepository historyRepository) {
        this.historyRepository = historyRepository;
    }

    public List<History> getAllHistory() {
        return historyRepository.findAll();
    }

    public void logEvent(User user, Item item, ActionType type, String details) {
        History history = new History();
        history.setUser(user);
        history.setItem(item);
        history.setActionType(type);
        history.setDetails(details);
        history.setChangeTime(LocalDateTime.now());
        historyRepository.save(history);
    }


}
