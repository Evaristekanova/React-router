import { useParams, Link } from 'react-router-dom';

const ViewPost = ({ posts, handleDelete }) => {
  const { id } = useParams();
  const post = posts.find((post) => id === post.id.toString());
  return (
    <main className="PostPage">
      <article className="Post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="PostDate">{post.datatime}</p>
            <p className="PostBody">{post.body}</p>
            <button onClick={()=>handleDelete(post.id)}>Delete Post</button>
          </>
        )}
        {!post && 
          <>
          <h2>Post Not Found</h2>
          <p>It's Disappointing</p>
          <p>
            <Link to='/'>Browser To Home Page</Link>
          </p>
        </>}
      </article>
    </main>
  );
};

export default ViewPost;
