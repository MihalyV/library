package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.Workers;
import hu.vizsgaremek.LibraryCompanion.repository.WorkerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {

    private final WorkerRepository workerRepository;


    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public List<Workers> getAllWorkers() {
        return workerRepository.findAll();
    }

    public Workers saveWorker (Workers worker) {
        return workerRepository.save(worker);
    }

    public Workers getWorkerById(Long id) {
        return workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nem található ilyen ID-jú dolgozó!"));
    }

    public void deleteWorkerById(Long id) {
        if (!workerRepository.existsById(id)) {
            throw new RuntimeException("Nem rendelkezik egyik dolgozó sem ilyen ID-val!");
        } else {
            workerRepository.deleteById(id);
        }
    }


}
