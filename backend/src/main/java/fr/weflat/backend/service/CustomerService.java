package fr.weflat.backend.service;

import java.util.Set;

import fr.weflat.backend.domaine.Customer;

public interface CustomerService {

	Customer save(Customer acheteur);
	
	Customer findById(Long id);
	
	Set<Customer> findAll();
}
