import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { fetchAllUser } from "../service/UserService";

const TableUsers = (props) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const res = await fetchAllUser();
    if (res && res.data && res.data) {
      setUsers(res.data);
    }
  };
  console.log(users);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>EMAIL</th>
            <th>FIRST NAME</th>
            <th>LAST NAME</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr key={`users-${index}`}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default TableUsers;
