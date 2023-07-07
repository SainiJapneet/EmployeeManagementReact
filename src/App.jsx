import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [employeeId, setEmployeeId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');
  const [email, setEmail] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4040/api/getEmployee');
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmployee = async () => {
    const employeeData = {
      id: parseInt(employeeId),
      name,
      age: parseInt(age),
      designation,
      salary: parseFloat(salary),
      email,
    };

    try {
      const response = await axios.post('http://localhost:4040/api/addEmployee', employeeData);
      console.log(response.data); // Handle the response from the server
      setEmployeeId('');
      setName('');
      setAge('');
      setDesignation('');
      setSalary('');
      setEmail('');
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error(error);
    }
  };

  const getEmployeeByID = async () => {
    try {
      const response = await axios.get(`http://localhost:4040/api/getEmployee/${employeeId}`);
      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmployee = async () => {
    try {
      const response = await axios.patch(`http://localhost:4040/api/updateEmployee/${employeeId}`, {
        name,
        age: parseInt(age),
        designation,
        salary: parseFloat(salary),
        email,
      });
      console.log(response.data); // Handle the response from the server
      setEmployeeId('');
      setName('');
      setAge('');
      setDesignation('');
      setSalary('');
      setEmail('');
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmployee = async () => {
    try {
      const response = await axios.delete(`http://localhost:4040/api/deleteEmployee/${employeeId}`);
      console.log(response.data); // Handle the response from the server
      setEmployeeId('');
      fetchEmployees(); // Refresh the employee list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Employee Management Dashboard</h1>
      <div className="button-container">
        <div>
          <label>Employee ID:</label>
          <input type="number" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
        </div>
        <div>
          <label>Designation:</label>
          <input type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
        </div>
        <div>
          <label>Salary:</label>
          <input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <button className="app-button" onClick={addEmployee}>Add Employee</button>
        <button className="app-button" onClick={getEmployeeByID}>Search Employee</button>
        <button className="app-button" onClick={updateEmployee}>Update Employee</button>
        <button className="app-button" onClick={deleteEmployee}>Delete Employee</button>
        <button className="app-button" onClick={fetchEmployees}>Employee List</button>
      </div>

      <div className="employee-list">
        <h2>Employee List</h2>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee.id}>
                ID: {employee.id}, Name: {employee.name}, Age: {employee.age}, Designation: {employee.designation}, Salary: {employee.salary}, Email: {employee.email}
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
}

export default App;