import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ViewPost from './components/ViewPost';
import NewPost from './components/NewPost';
import Footer from './components/Footer';
import About from './components/About';
import NotFound from './components/NotFound';
import { format } from 'date-fns';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
    {
      id: 2,
      title: 'My 2nd Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
    {
      id: 3,
      title: 'My 3rd Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
    {
      id: 4,
      title: 'My Fourth Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!',
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  // function to delete post
  const handleDelete = (id) => {
    const blogPosts = posts.filter((post) => id !== post.id);
    setPosts(blogPosts);
  };

  // function to submit a blog post
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMM dd yyy pp');
    const newPost = { id, datetime, title: postTitle, body: postBody };
    const allPost = [...posts, newPost];
    setPosts(allPost);
    setPostBody('');
    setPostTitle('');
  };

  // useEffect hook
  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(filteredResults.reverse());
  }, [posts, search]);

  return (
    <div className="App">
      <Router>
        <Header title="React JS Blog post site" />
        <Navbar search={search} setSearch={setSearch} />
        <Routes>
          <Route exact path="/" element={<Home posts={searchResult} />} />
          <Route path="/about" element={<About />} />
          <Route
            exact
            path="/post"
            element={
              <NewPost
                postTitle={postTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                setPostTitle={setPostTitle}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route
            path="/post/:id"
            element={<ViewPost posts={posts} handleDelete={handleDelete} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
