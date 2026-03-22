package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.ActionType;
import hu.vizsgaremek.LibraryCompanion.repository.ActionTypeRepository;
import org.springframework.stereotype.Service;

import javax.swing.*;
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
}
