import React, { useState } from "react";
import BookEdit from "./BookEdit";

function BookShow({ book, onDelete, onEdit }) {
  const [showEdit, setShowEdit] = useState(false);

  const handleDeleteClick = () => {
    onDelete(book.id);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };


  // HandleSubmit tar seg av to ting: den tar inn det nye navnet og iden på boken som blir redigert.
  // Deretter setter vi show-edit til false, slik at når man har submittet formen, så lukkes redigeringsvinduet.
  // I <BookEdit> så får den da onSubmit={HandleSubmit}, som tar seg av både redigering og lukking av redigering ved enter.
  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    onEdit(id, newTitle);
  }

//Denne koden sier at dersom bookedit er sant, så skal content være <BookEdit />. 
// 
let content = <h3>{book.title}</h3>;
if (showEdit) {
  content = <BookEdit onSubmit={handleSubmit} book={book}/>;
}



  return (
    <div className="book-show">
      <img alt="books" src={`https://picsum.photos/seed/${book.id}/300/200`} />
      <div>{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditClick}>
          Edit
        </button>
        <button className="delete" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default BookShow;
