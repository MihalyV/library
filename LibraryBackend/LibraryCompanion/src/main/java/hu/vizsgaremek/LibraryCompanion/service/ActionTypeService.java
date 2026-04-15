package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ActionType;
import hu.vizsgaremek.LibraryCompanion.repository.ActionTypeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ActionTypeService {
    private final ActionTypeRepository actionTypeRepository;

    public ActionTypeService(ActionTypeRepository actionTypeRepository) {
        this.actionTypeRepository = actionTypeRepository;
    }

    public List<ActionType> getAllActionTypes() {
        return actionTypeRepository.findAll();
    }

    public ActionType getActionTypeById(Long id) {
        return actionTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nincs ilyen ID-jú action."));
    }

    public ActionType saveActionType(ActionType actionType) {
        return actionTypeRepository.save(actionType);
    }

    public void deleteActionTypeById(Long id) {
        if (!actionTypeRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "ActionType nem található ezzel az ID-val: " + id);
        }
        actionTypeRepository.deleteById(id);
    }
}
