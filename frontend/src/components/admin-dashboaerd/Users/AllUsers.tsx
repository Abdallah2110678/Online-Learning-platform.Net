import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { REST_API_BASE_URL } from "./../../../App";

const AllUsers = () => {
  const [active, setActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 4000);
    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${REST_API_BASE_URL}/user/users/delete/${id}`
      );

      if (response.status === 200) {
        setSuccessMessage(`User deleted successfully`);
        setStudents(students.filter((student) => student.id !== id));
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handlePromoteToAdmin = async (id) => {
    try {
      const response = await axios.put(
        `${REST_API_BASE_URL}/user/promote-to-admin/${id}`
      );

      if (response.status === 200) {
        setSuccessMessage(`User promoted to admin successfully`);
        // Refresh the user list after promoting to admin
        fetchAllUsers();
      } else {
        console.error("Failed to promote user to admin");
      }
    } catch (error) {
      console.error("Error promoting user to admin:", error.message);
    }
  };

  const fetchAllUsers = () => {
    fetch(`${REST_API_BASE_URL}/user/allusers`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const toggleMenu = () => {
    setActive(!active);
  };

  return (
    <div className={`main ${active ? "active" : ""}`}>
      <div className="detailss ">
        <div className="recentOrderss">
          <div style={{ padding: "5px" }}>
            <h1>Promote user to admin</h1> {/* Added h1 element */}
            <table className="table table-hover text-center">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="6">No users found</td>
                  </tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.fname}</td>
                      <td>{student.lname}</td>
                      <td>{student.email}</td>
                      <td>{student.role}</td>
                      <td>
                        <button
                          className="btn"
                          onClick={() => handlePromoteToAdmin(student.id)}
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleDelete(student.id)}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
