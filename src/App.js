// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

//dodanie flagi na sprawdzenie czy dane były załadowane
let isDataLoaded = false;

function Form() {
  //równoważne do:
  //const Form = () => {
  const [firstname, setFirstname] = useState('wartość');
  const [lastname, setLastname] = useState('domyślna');
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('');

  //funkcja do zapisu użytkownika po kliknięciu przycisku
  function saveUserToLocalStorage() {
    console.log(firstname);
    console.log(lastname);
    console.log(email);

    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }

    //równoważne:
    // const user = {
    //   firstname,
    //   lastname,
    //   email,
    //   password
    // }

    const userSerialized = JSON.stringify(user)
    console.log(userSerialized)
    localStorage.setItem("user", userSerialized);
    //metoda poniżej pozwala wysłać maila z userem
    //window.open(`mailto:test@example.com?body=${userSerialized}`);
  }

  //funkcja do odczytu użytkownika z localStorage przy ładowaniu strony
  function readUserFromLocalStorage() {
    const userAsString = localStorage.getItem("user")

    if (userAsString) { //jeżeli wartość w local Storage istnieje - nie jest null lub undefined
      //konwertujemy go do obiektu
      const user = JSON.parse(userAsString)
      console.log(user)
      setFirstname(user.firstname)
      setLastname(user.lastname)
      setEmail(user.email)
      setPassword(user.password) //w "normalnych" warunkach (spięcie z backendem) ta zmienna nigdy nie wraca do nas
    }
  }

  useEffect(() => {
    //jeśli dane nie były załadowane - załadowanie, inaczej - odpuszczenie zmian.
    if (isDataLoaded === false) {
      //wywołanie tego zastąpi nam "admin@admin.pl"
      //w mailu wartością z localStorage'u - jeśli istnieje
      //inaczej zostanie wartość domyślna
      readUserFromLocalStorage()
      isDataLoaded = true
    }
  })

  //wywołanie w takiej formie - wywoła błąd (dotyczy Reacta, w JS jest ok)
  // readUserFromLocalStorage()

  return (
    // className zamiast class - używamy tutaj, ponieważ to poniżej to rodzaj kodu JS -
    // celem zapobiegnięcia
    // pomylenia ze słowem kluczowym class (definiującym klasę)
    // w trakcie "kompilacji" jest to przekształcane na class widoczny w DevToolsach
    <div className="form-container">
      <form onSubmit={(event) => event.preventDefault()}> {/*
      onSubmit - zablokowanie domyslnej akcji (GET) i przeładowania formularza - podgląd w konsoli
      równoważne do:  action="javascript:void(0)" */}
        <p>
          {/*htmlFor - używamy tutaj, ponieważ to poniżej to rodzaj kodu JS - celem zapobiegnięcia
          pomylenia ze słowem kluczowym for (pętla)*/}
          <label htmlFor="firstname">Twoje imię:</label>
          <input type="text" name="firstname" value={firstname} onChange={(event) => setFirstname(event.target.value)} />
        </p>
        <p>
          <label htmlFor="lastname">Twoje nazwisko:</label>
          <input type="text" name="lastname" value={lastname} onChange={(event) => setLastname(event.target.value)} />
        </p>
        <p>
          <label htmlFor="email">Twój e-mail:</label>
          <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </p>
        <p>
          <label htmlFor="password">Twoje hasło:</label>
          <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </p>

        <button onClick={saveUserToLocalStorage}>Zapisz</button>
      </form>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      {/* wywołanie formularza z komponentu powyżej */}
      <Form />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
