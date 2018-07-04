package com.javasampleapproach.springrest.mysql.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.javasampleapproach.springrest.mysql.model.Customer;

//public interface CustomerRepository extends CrudRepository<Customer, Long> {
public interface CustomerRepository extends JpaRepository<Customer, Long> {
	List<Customer> findByAge(int age);
}
