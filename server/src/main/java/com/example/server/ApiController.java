package com.example.server;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(maxAge = 3600)
@RestController
public class ApiController {

    @Autowired
    private EmployeeRepo employeeRepo;

    @GetMapping(value = "/employees")
    public List<Employee> getEmployees() {
        return employeeRepo.findAll();
    }

    @PostMapping(value = "/create")
    public String createEmployee(@RequestBody Employee employee) {
        employeeRepo.save(employee);
        return "Saved..";
    }

    @PutMapping(value = "/update/{employee_id}") 
    public String updateEmployee(@PathVariable long employee_id, @RequestBody Employee employee) {
        Employee updateEmployee = employeeRepo.findById(employee_id).get();
        
        updateEmployee.setEmployee_name(employee.getEmployee_name());
        updateEmployee.setAge(employee.getAge());
        updateEmployee.setMobile_number(employee.getMobile_number());
        updateEmployee.setPincode(employee.getPincode());
        updateEmployee.setDob(employee.getDob());
        updateEmployee.setAddress_line1(employee.getAddress_line1());
        updateEmployee.setAddress_line2(employee.getAddress_line2());
        updateEmployee.setState_id(employee.getState_id());
        updateEmployee.setCountry_id(employee.getCountry_id());

        employeeRepo.save(updateEmployee);

        return "updated..";
    }
    
    @DeleteMapping(value = "/delete/{employee_id}")
    public String deleteEmployee(@PathVariable long employee_id){
        Employee deleteEmployee = employeeRepo.findById(employee_id).get();
        employeeRepo.delete(deleteEmployee);

        return "Deleted..";
    }
}
