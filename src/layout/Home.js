import React from "react";

function Home() {
  return (
    <div className="container mt-5">
      <h2>Login with these account</h2>
      <h4>these account have different authentication</h4>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Password</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>admin</td>
            <td>admin</td>
            <td>admin</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>mod</td>
            <td>mod</td>
            <td>moderator</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>user</td>
            <td>user</td>
            <td>user</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
