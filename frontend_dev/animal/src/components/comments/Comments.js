import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";

function Comments({ comments, getComments, id }) {

  return (
    <div>
      {comments.map((item, idx) => {
        return (
          <CommentItem
            isAuthor={item.user_id === id ? true : false}
            item={item}
            key={idx}
            getComments={getComments}
          />
        );
      })}
    </div>
  );
}

export default Comments;
