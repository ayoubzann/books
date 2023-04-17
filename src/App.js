import axios from 'axios';
import React, { useState, useEffect } from 'react'
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


//#region KODE V1
// import React, { useState } from 'react'
// import BookCreate from './components/BookCreate';
// import BookList from './components/BookList';

// function App() {

//     const [books, setBooks] = useState([]);

//     const deleteBookById = (id) => {
//         // Mapper over hele books-arrayet. Vi filtrerer på ID. Siden vi mapper books-staten,
//         // kan vi innenfor prop til filter definere hva vi skal kalle hvert objekt.
//         // Objektet her kalles for book. 
//         const updatedBooks = books.filter((book) => {
//             // Her sier vi: Så lenge bokens ID ikke er lik den deleteBookById tar inn,
//             // kopier den inn i det nye arrayet! Hvis de er like, ikke kopier den inn.
//             return book.id !== id;
//         })
//         // Her setter vi book-staten til den nye listen som ikke har bokID lik ID.
//         setBooks(updatedBooks);
//     };

//     const createBook = (title) => {
//         const updatedBooks = [
//             //Spread-operatoren her legger inn en kopi av det eksisterende arrayet
//             ...books,
//             // Her legger vi inn ny bok med en random ID. Når både key og value har samme
//             // navn, kan man legge inn ordet en gang ({id:123, title}),
//             // istedenfor {id: 123, title: title}.
//             { id: Math.round(Math.random() * 9999), title: title }
//         ];
//         // Sett books til denne nye listen
//         setBooks(updatedBooks);
//     };

//     // Her skal en bok redigere tittel. Da tar vi inn to props, id og nye tittelen.
//         //Deretter mapper vi over books- arrayet, og kaller hver bok for book.
//     // Vi lager et nytt array i updatedBooks-variabelen. 

//      // Etter dette, sjekker vi hver bok. Om book.id er lik den IDen vi er ute etter,
//             // så returnerer vi et nytt objekt.

//     const editBookById = (id, newTitle) => {
//         const updatedBooks = books.map((book) => {
//             if (book.id === id){
//                 return {...book, title: newTitle };
//             }
//             return book;
//         })
//         // Oppdaterer state til book.
//         setBooks(updatedBooks);

//     };

//     return (
//         <div className='app'>
//             <h1> Reading List </h1>
//             <BookList onEdit={editBookById} onDelete={deleteBookById} books={books} />
//             <BookCreate onCreate={createBook} />

//         </div>
//     )
// };

// export default App
//#endregion

function App() {

    const [books, setBooks] = useState([]);


    // Her definerer vi en ny funksjon, som henter bøker gjennom en GET-request.
    const fetchBooks = async () => {
        const response = await axios.get("http://localhost:3001/books");

        setBooks(response.data);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    const deleteBookById = async (id) => {
        const response = axios.delete(`http://localhost:3001/books/${id}`);


        // Mapper over hele books-arrayet. Vi filtrerer på ID. Siden vi mapper books-staten,
        // kan vi innenfor prop til filter definere hva vi skal kalle hvert objekt.
        // Objektet her kalles for book. 
        const updatedBooks = books.filter((book) => {
            // Her sier vi: Så lenge bokens ID ikke er lik den deleteBookById tar inn,
            // kopier den inn i det nye arrayet! Hvis de er like, ikke kopier den inn.
            return book.id !== id;
        })
        // Her setter vi book-staten til den nye listen som ikke har bokID lik ID.
        setBooks(updatedBooks);
    };

    const createBook = async (title) => {
        // Her gjør vi en POST-request til /books, og sender inn title = ("title": title).
        const response = await axios.post("http://localhost:3001/books", {
            title
        });

        // Vi lager et nytt array som heter updatedBooks, og bruker spread-operatoren
        // til å kopiere over alle eksisterende elementer i nåværende state, samt 
        // response.data, ettersom det er i data objektet ligger.
        const updatedBooks = [
            ...books,
            response.data
        ];

        // Her setter vi books til den oppdaterte listen men kopi av tidligere state 
        // samt ny bok.
        setBooks(updatedBooks);
    };


        // Rediger bok gjennom ID
    const editBookById = async (id, newTitle) => {

        // PUT-req til server, med ny tittel på books[id]. Lagres i response.
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        })

        console.log(response)

        // For hver book i books (map), sjekk om objektets ID tilsvarer id man ønsker å redigere.
        // Hvis ja, lag et nytt array med alle eksisterende bøker, og 
        // oppdater hele objektet med den nyeste dataen (best practice fordi alle ser samme array).
        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data };
            }
            return book;
        })

        // Oppdaterer state til books-array.
        setBooks(updatedBooks);

    };

    return (
        <div className='app'>
            <h1> Reading List </h1>
            <BookList onEdit={editBookById} onDelete={deleteBookById} books={books} />
            <BookCreate onCreate={createBook} />

        </div>
    )
};

export default App