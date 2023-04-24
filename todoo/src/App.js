import "./App.css";
import { useState ,useEffect} from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [users, setUsers] = useState([]);
  const [active, setActive] = useState(null);
  const [edit, setEdit] = useState(false);
  const addUser = (e) => {
    e.preventDefault();
    const user = {
      name,
      email,
      address,
    };
    if (edit) {
      // edit users||update user
      let copy = users;
      Object.assign(copy[active], user);
      setUsers([...copy]);
      setEdit(false);
      setActive(null);
      localStorage.setItem("taskAdded", JSON.stringify(copy));
      // window.location.reload();
    } else {
      // add users
      console.log(users);
      setUsers([...users, user]);
      localStorage.setItem("users", JSON.stringify([...users, user]));
    }
    setName("");
    setEmail("");
    setAddress("");
    // setEdit(true);
  };
  // update||edit
  const onUpdate = (index) => {

    const user = users[index];
    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);
    setActive(index);
    setEdit(true);
  };
  // delete
  const deleteUser = (user) => {
    let copy = users.filter((item) => item !== user);
  setUsers([...copy]);
  localStorage.setItem("deleteUser", JSON.stringify(deleteUser));
  };

  
// useEffect(() => {
//   // const users = JSON.parse(localStorage.getItem('users'));
//   if (users) {
//    setUsers(users);
//   }
// }, [])
useEffect(()=>{
})

  return (
    <>
      <div className="App">
        <h3>curd</h3>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xs-12 col-sm-10 col-md-8 col-lg-5">
              <form onSubmit={addUser}>
                <div className="form-group">
                  <lable htmlfor="">Name</lable>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <lable htmlfor="">Email</lable>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <lable htmlfor="">Address</lable>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div>
                  <button className="btn btn-success form-control">
                    {edit ? "Update" : "Add"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <table className="table table-bordered mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              console.log(users);
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <button
                      className="btn btn-info"
                      onClick={() => onUpdate(index)}
                    >
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser(user)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
