
package com.example.storeStatusApplication.controller;

import com.example.storeStatusApplication.model.Store;
import com.example.storeStatusApplication.repository.StoreRepository;
import com.example.storeStatusApplication.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/store")
public class StoreController {

    @Autowired
    private StoreService storeService;

    // Get all stores
    @GetMapping("/all")
    public List<Store> getAllStores() {
        return storeService.getAllStores();
    }

    // Get stores by status (open or closed)
    @GetMapping("/status/{status}")
    public List<Store> getStoresByStatus(@PathVariable Boolean status) {
        return storeService.getStoresByStatus(status);
    }

    // Search stores by name
    @GetMapping("/search/{name}")
    public List<Store> searchStoresByName(@PathVariable String name) {
        return storeService.searchStoresByName(name);
    }

    // Get store by ID
    @GetMapping("/{id}")
    public ResponseEntity<Store> getStoreById(@PathVariable Long id) {
        Optional<Store> store = storeService.getStoreById(id);
        return store.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add or update a store
    @PostMapping("/add")
    public ResponseEntity<Store> addStore(@RequestBody Store store) {
        Store savedStore = storeService.saveStore(store);
        System.out.println("Saved Store: " + savedStore);
        return ResponseEntity.ok(savedStore);
    }

    // Delete a store by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteStore(@PathVariable Long id) {
        Optional<Store> store = storeService.getStoreById(id);
        if (store.isPresent()) {
            storeService.deleteStore(id);
            return ResponseEntity.noContent().build(); // No content to return after successful deletion
        } else {
            return ResponseEntity.notFound().build(); // Return 404 if the store was not found
        }
    }
}



