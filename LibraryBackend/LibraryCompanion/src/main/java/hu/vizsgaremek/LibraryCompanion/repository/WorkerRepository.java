package hu.vizsgaremek.LibraryCompanion.repository;

import hu.vizsgaremek.LibraryCompanion.model.Worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface WorkerRepository extends JpaRepository<Worker, Long>, JpaSpecificationExecutor<Worker> {
    Optional<Worker> findByWorkerEmail(String workerEmail);
}