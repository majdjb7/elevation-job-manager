import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import NoteCard from "../components/NoteCard";

import data from "../data/db";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    setNotes(data.notes);
  }, []);

  const handleDelete = async (id) => {
    // by id
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {/* Masonry it external libary to make the carde close to each other */}
        {notes.map((note) => (
          <div key={note.id}>
            <NoteCard note={note} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
