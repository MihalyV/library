package hu.vizsgaremek.LibraryCompanion.controller;

import hu.vizsgaremek.LibraryCompanion.model.Workers;
import hu.vizsgaremek.LibraryCompanion.service.WorkerService;
import org.hibernate.jdbc.Work;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/workers")
public class WorkerController {

    private final WorkerService workerService;


    public WorkerController(WorkerService workerService) {
        this.workerService = workerService;
    }

    @GetMapping
    public ResponseEntity<List<Workers>> getAll() {
        return  ResponseEntity.ok(workerService.getAllWorkers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Workers> searchById(@PathVariable Long id) {
        return ResponseEntity.ok(workerService.getWorkerById(id));
    }

    @PostMapping
    public ResponseEntity<Workers> createWorker(@RequestBody Workers worker) {
        Workers savedWorker = workerService.saveWorker(worker);
        return new ResponseEntity<>(savedWorker, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id{")
    public ResponseEntity<Void> deleteWorkerById(@PathVariable Long id) {
        workerService.deleteWorkerById(id);
        return ResponseEntity.noContent().build();
    }
}
