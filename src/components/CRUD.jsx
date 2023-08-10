import React, { useState } from "react";

const CRUD = () => {
  const [signin, setsignin] = useState({
    name: "",
    email: "",
    pass: "",
  });

  return (
    <>
      <header>
        <nav>
          <h1>
            <span>FIRE</span>BASE TODO
          </h1>
          <ul>
            <li>
              <button>Signin</button>
            </li>
            <li>
              <button id="logout">Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="auth">
          <h2>Signin</h2>
          <div className="container">
            <form>
              <div>
                <input type="text" placeholder="Name" />
              </div>
              <div>
                <input type="email" placeholder="Email" />
              </div>
              <div>
                <input type="password" placeholder="Password" />
              </div>
              <button>Register</button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="box1">
          <h3>Full stack todo app with react and firebase.</h3>
        </div>
        <div className="box2">
          <address>
            <h3>&copy; Dipak Mali</h3>
            <p>thedipakmali@gmail.com</p>
          </address>
        </div>
      </footer>
    </>
  );
};

export default CRUD;
