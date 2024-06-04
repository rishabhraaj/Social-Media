import { RxCross2 } from "react-icons/rx";
import { PostList } from "../store/post-list-store";
import { useContext } from "react";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);
  return (
    <div className="card post-card" style={{ width: "90%" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger delete-btn"
            onClick={() => deletePost(post.id)}
          >
            <RxCross2 />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>
        {post.tags.map((tag) => {
          return (
            <span key={tag} className="badge text-primary text hashtag">
              #{tag}
            </span>
          );
        })}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by {post.reaction} people.
        </div>
      </div>
    </div>
  );
};
export default Post;
