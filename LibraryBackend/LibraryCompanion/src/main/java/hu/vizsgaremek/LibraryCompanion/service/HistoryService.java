package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.History;
import hu.vizsgaremek.LibraryCompanion.repository.HistoryRepository;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

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

    public List<History> filterHistory(String userEmail, String itemTitle, String actionType) {
        Specification<History> spec = Specification.where((Specification<History>) null);

        if (userEmail != null && !userEmail.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    builder.like(builder.lower(root.join("user").get("email")),
                            "%" + userEmail.toLowerCase() + "%"));
        }

        if (itemTitle != null && !itemTitle.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    builder.like(builder.lower(root.join("item").get("title")),
                            "%" + itemTitle.toLowerCase() + "%"));
        }

        if (actionType != null && !actionType.isEmpty()) {
            spec = spec.and((root, query, builder) ->
                    builder.like(builder.lower(root.join("actionType").get("actionTypeName")),
                            "%" + actionType.toLowerCase() + "%"));
        }

        return historyRepository.findAll(spec);
    }
}
