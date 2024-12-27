package com.example.storeStatusApplication.service;

import com.example.storeStatusApplication.model.Store;
import com.example.storeStatusApplication.repository.StoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StoreService {

    @Autowired
    private StoreRepository storeRepository;

    // Get all stores
    public List<Store> getAllStores() {
        return storeRepository.findAll();
    }

    // Get stores by their status (open or closed)
    public List<Store> getStoresByStatus(Boolean status) {
        return storeRepository.findByStatus(status);
    }

    // Search stores by name
    public List<Store> searchStoresByName(String name) {
        return storeRepository.findByNameContaining(name);
    }

    // Get a store by its ID
    public Optional<Store> getStoreById(Long id) {
        return storeRepository.findById(id);
    }

    // Add or update a store
    public Store saveStore(Store store) {
        return storeRepository.save(store);
    }

    // Delete a store by ID
    public void deleteStore(Long id) {
        storeRepository.deleteById(id);
    }
}