import { useState } from "react";
import { loginUser } from "../routes/auth";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await loginUser(email, password);

    if (response.success) {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } else {
        toast.error('Invalid credentials');
    }
  };

  return (
    <div className="formWrapper">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Your email.."
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <button type="submit" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Login;
