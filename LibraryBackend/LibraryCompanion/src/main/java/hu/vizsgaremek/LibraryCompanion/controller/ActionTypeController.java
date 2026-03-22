package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.ActionType;
import hu.vizsgaremek.LibraryCompanion.service.ActionTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/action-types")
public class ActionTypeController {

    private final ActionTypeService actionTypeService;

    public ActionTypeController(ActionTypeService actionTypeService) {
        this.actionTypeService = actionTypeService;
    }

    @GetMapping
    public ResponseEntity<List<ActionType>> getAllActionTypes() {
        return ResponseEntity.ok(actionTypeService.getAllActionTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ActionType> getActionTypeById(@PathVariable Long id) {
        return ResponseEntity.ok(actionTypeService.getActionTypeById(id));
    }

    @PostMapping
    public ResponseEntity<ActionType> createActionType(@RequestBody ActionType actionType) {
        return new ResponseEntity<>(actionTypeService.saveActionType(actionType), HttpStatus.CREATED);
    }
}
