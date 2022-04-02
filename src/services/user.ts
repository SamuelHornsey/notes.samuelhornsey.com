import { createContext } from "react";
import { User } from "firebase/auth";

const UserContext = createContext<User | null>(null);

export default UserContext;