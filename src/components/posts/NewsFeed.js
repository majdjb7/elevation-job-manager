import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import Masonry from "react-masonry-css";
import PostCard from "./PostCard";
////////////////////////////
import { inject, observer } from "mobx-react";
import { observe } from "mobx";
import { toJS } from "mobx";
/////////////////////////////

const NewsFeed = inject("adminstore")(
  observer((props) => {
    const [AcceptedStudents, setAcceptedStudents] = useState([]);

    useEffect(() => {
      props.adminstore.getAllAcceptedStudents();

      setAcceptedStudents([...props.adminstore.allAcceptedStudents]);
    }, []);

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
          {AcceptedStudents.map((student, index) => (
            <div key={index}>
              <PostCard student={student} />
            </div>
          ))}
        </Masonry>
      </Container>
    );
  })
);
export default NewsFeed;
