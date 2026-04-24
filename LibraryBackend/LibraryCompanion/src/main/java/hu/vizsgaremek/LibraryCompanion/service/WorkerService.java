package hu.vizsgaremek.LibraryCompanion.service;

import hu.vizsgaremek.LibraryCompanion.model.Worker;
import hu.vizsgaremek.LibraryCompanion.repository.WorkerRepository;
import hu.vizsgaremek.LibraryCompanion.specifaications.GenericSpecifications;
import org.springframework.data.jpa.domain.PredicateSpecification;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WorkerService {

    private final WorkerRepository workerRepository;

    public WorkerService(WorkerRepository workerRepository) {
        this.workerRepository = workerRepository;
    }

    public List<Worker> getAllWorkers() {
        return workerRepository.findAll();
    }

    public List<Worker> filterWorkers(String name, String email) {
        Specification<Worker> spec = Specification.where((Specification<Worker>) null);

        if (name != null && !name.isEmpty()) {
            spec = spec.and((PredicateSpecification<Worker>) GenericSpecifications.likeAttribute("firstName", name)
                    .or(GenericSpecifications.likeAttribute("lastName", name)));
        }
        if (email != null && !email.isEmpty())
            spec = spec.and(GenericSpecifications.likeAttribute("workerEmail", email));

        return workerRepository.findAll(spec);
    }

    public Worker saveWorker(Worker worker) {
        return workerRepository.save(worker);
    }

    public Worker getWorkerById(Long id) {
        return workerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nem található ilyen ID-jú dolgozó!"));
    }

    public void deleteWorkerById(Long id) {
        workerRepository.deleteById(id);
    }
}

