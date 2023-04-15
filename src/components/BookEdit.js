import React, {useState} from 'react'

function BookEdit({book, onSubmit }) {
  const [title, setTitle] = useState(book.title);

  const handleChange = (event) => {
setTitle(event.target.value);
  };


  // Her tar vi inn onSubmit, for å lukke vinduet når redigeringen er ferdig. onSubmit her tar inn en referanse 
  // til funksjonen handleSubmit i BookShow, og der så tar handleSubmit inn to parametre: ny id og bok. Dermed må
  // vi gi denne til onSubmit slik at handleSubmit har det den trenger for å gjøre jobben sin.
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(book.id, title);

  };

  return (
    <form onSubmit={handleSubmit} className='book-edit'>
      <label> Title </label>
      <input value={title} onChange={handleChange} className='input' />
      <button className='button is-primary'>
        Save
      </button>
    </form>
  )
}

export default BookEdit