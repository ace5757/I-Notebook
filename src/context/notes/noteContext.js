//telling react that we are using and creating a context api in our app

import { createContext } from "react";

const noteContext = createContext()

export default noteContext


//context API
//its a way to use our states without passing as parameters
//in an component we can update it...and we dont need to pass it as parameter too