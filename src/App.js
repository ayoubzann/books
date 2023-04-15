import React, { useState } from 'react'
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {

    const [books, setBooks] = useState([]);

    const deleteBookById = (id) => {
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

    const createBook = (title) => {
        const updatedBooks = [
            //Spread-operatoren her legger inn en kopi av det eksisterende arrayet
            ...books,
            // Her legger vi inn ny bok med en random ID. Når både key og value har samme
            // navn, kan man legge inn ordet en gang ({id:123, title}),
            // istedenfor {id: 123, title: title}.
            { id: Math.round(Math.random() * 9999), title: title }
        ];
        // Sett books til denne nye listen
        setBooks(updatedBooks);
    };

    // Her skal en bok redigere tittel. Da tar vi inn to props, id og nye tittelen.
        //Deretter mapper vi over books- arrayet, og kaller hver bok for book.
    // Vi lager et nytt array i updatedBooks-variabelen. 

     // Etter dette, sjekker vi hver bok. Om book.id er lik den IDen vi er ute etter,
            // så returnerer vi et nytt objekt.
    
    const editBookById = (id, newTitle) => {
        const updatedBooks = books.map((book) => {
            if (book.id === id){
                return {...book, title: newTitle };
            }
            return book;
        })
        // Oppdaterer state til book.
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