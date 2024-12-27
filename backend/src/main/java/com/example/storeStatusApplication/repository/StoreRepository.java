
package com.example.storeStatusApplication.repository;

import com.example.storeStatusApplication.model.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {
    // Custom query methods can be added here if needed
    // For example, find stores by their status
    List<Store> findByStatus(Boolean status);

    // You can also add other custom queries like finding stores by name, location, etc.
    List<Store> findByNameContaining(String name);
}
